import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  HomepageResponse,
  HomepageSection,
  FarmersBundleItem,
  ProblemSolutionItem,
  BrandItem,
  HomepageMidResponse,
  YouTubeVideoItem,
  CropItem,
  SeedItem,
  HomepageBottomResponse,
} from "@/types/homepage";
import { LoadingState } from "@/types/api";
import { homepageService } from "@/services/homepageService";
import { getApiConfig } from "@/config/api";

interface HomepageStore extends LoadingState {
  // ===== TOP SECTION STATE =====
  homepageData: HomepageResponse | null;
  farmersBundle: HomepageSection<FarmersBundleItem> | null;
  problemSolution: HomepageSection<ProblemSolutionItem> | null;
  brands: HomepageSection<BrandItem> | null;

  // ===== MID SECTION STATE =====
  homepageMidData: HomepageMidResponse | null;
  youtubeVideos: HomepageSection<YouTubeVideoItem> | null;
  crops: HomepageSection<CropItem> | null;
  seeds: HomepageSection<SeedItem> | null;

  // ===== BOTTOM SECTION STATE =====
  homepageBottomData: HomepageBottomResponse | null;
  upcomingProducts: HomepageSection<SeedItem> | null;
  popularProductsBottom: HomepageSection<SeedItem> | null;

  // ===== CACHE STATE =====
  lastFetched: {
    top: number | null;
    mid: number | null;
    bottom: number | null;
  };
  cacheTimeout: number; // in milliseconds

  // Loading states for individual sections
  loadingStates: {
    homepage: boolean;
    farmersBundle: boolean;
    problemSolution: boolean;
    brands: boolean;
    homepageMid: boolean;
    youtubeVideos: boolean;
    crops: boolean;
    seeds: boolean;
    homepageBottom: boolean;
    upcomingProducts: boolean;
    popularProductsBottom: boolean;
  };

  // Error states for individual sections
  errorStates: {
    homepage: string | null;
    farmersBundle: string | null;
    problemSolution: string | null;
    brands: string | null;
    homepageMid: string | null;
    youtubeVideos: string | null;
    crops: string | null;
    seeds: string | null;
    homepageBottom: string | null;
    upcomingProducts: string | null;
    popularProductsBottom: string | null;
  };

  // Actions
  setHomepageData: (data: HomepageResponse) => void;
  setFarmersBundle: (data: HomepageSection<FarmersBundleItem>) => void;
  setProblemSolution: (data: HomepageSection<ProblemSolutionItem>) => void;
  setBrands: (data: HomepageSection<BrandItem>) => void;

  // Mid section actions
  setHomepageMidData: (data: HomepageMidResponse) => void;
  setYouTubeVideos: (data: HomepageSection<YouTubeVideoItem>) => void;
  setCrops: (data: HomepageSection<CropItem>) => void;
  setSeeds: (data: HomepageSection<SeedItem>) => void;

  // Bottom section actions
  setHomepageBottomData: (data: HomepageBottomResponse) => void;
  setUpcomingProducts: (data: HomepageSection<SeedItem>) => void;
  setPopularProductsBottom: (data: HomepageSection<SeedItem>) => void;

  setLoading: (
    section: keyof HomepageStore["loadingStates"],
    loading: boolean
  ) => void;
  setError: (
    section: keyof HomepageStore["errorStates"],
    error: string | null
  ) => void;

  // API Actions
  fetchHomepageData: () => Promise<void>;
  fetchFarmersBundle: () => Promise<void>;
  fetchProblemSolution: () => Promise<void>;
  fetchBrands: () => Promise<void>;

  // Mid API Actions
  fetchHomepageMidData: () => Promise<void>;
  fetchYouTubeVideos: () => Promise<void>;
  fetchCrops: () => Promise<void>;
  fetchSeeds: () => Promise<void>;

  // Bottom API Actions
  fetchHomepageBottomData: () => Promise<void>;
  fetchUpcomingProducts: () => Promise<void>;
  fetchPopularProductsBottom: () => Promise<void>;

  // ===== UTILITY ACTIONS =====
  refreshAllSections: () => Promise<void>;
  clearErrors: () => void;
  clearCache: () => void;
  isCacheValid: (section: "top" | "mid" | "bottom") => boolean;
  fetchAllSections: () => Promise<void>;
}

export const useHomepageStore = create<HomepageStore>()(
  devtools(
    (set, get) => ({
      // ===== INITIAL STATE =====
      homepageData: null,
      farmersBundle: null,
      problemSolution: null,
      brands: null,
      homepageMidData: null,
      youtubeVideos: null,
      crops: null,
      seeds: null,
      homepageBottomData: null,
      upcomingProducts: null,
      popularProductsBottom: null,
      isLoading: false,
      error: null,

      // Cache state
      lastFetched: {
        top: null,
        mid: null,
        bottom: null,
      },
      cacheTimeout: getApiConfig().cache.defaultTTL,

      loadingStates: {
        homepage: false,
        farmersBundle: false,
        problemSolution: false,
        brands: false,
        homepageMid: false,
        youtubeVideos: false,
        crops: false,
        seeds: false,
        homepageBottom: false,
        upcomingProducts: false,
        popularProductsBottom: false,
      },

      errorStates: {
        homepage: null,
        farmersBundle: null,
        problemSolution: null,
        brands: null,
        homepageMid: null,
        youtubeVideos: null,
        crops: null,
        seeds: null,
        homepageBottom: null,
        upcomingProducts: null,
        popularProductsBottom: null,
      },

      // Basic Actions
      setHomepageData: (homepageData) => set({ homepageData }),
      setFarmersBundle: (farmersBundle) => set({ farmersBundle }),
      setProblemSolution: (problemSolution) => set({ problemSolution }),
      setBrands: (brands) => set({ brands }),

      // Mid section actions
      setHomepageMidData: (homepageMidData) => set({ homepageMidData }),
      setYouTubeVideos: (youtubeVideos) => set({ youtubeVideos }),
      setCrops: (crops) => set({ crops }),
      setSeeds: (seeds) => set({ seeds }),

      // Bottom section actions
      setHomepageBottomData: (homepageBottomData) =>
        set({ homepageBottomData }),
      setUpcomingProducts: (upcomingProducts) => set({ upcomingProducts }),
      setPopularProductsBottom: (popularProductsBottom) =>
        set({ popularProductsBottom }),

      setLoading: (section, loading) =>
        set((state) => ({
          loadingStates: { ...state.loadingStates, [section]: loading },
        })),

      setError: (section, error) =>
        set((state) => ({
          errorStates: { ...state.errorStates, [section]: error },
        })),

      // ===== TOP SECTION API ACTIONS =====
      fetchHomepageData: async () => {
        const { setLoading, setError, isCacheValid } = get();

        // Check cache first
        if (isCacheValid("top")) {
          return;
        }

        setLoading("homepage", true);
        setError("homepage", null);

        try {
          const data = await homepageService.getHomepageSections();

          set((state) => ({
            homepageData: data,
            farmersBundle: data.farmers_bundle,
            problemSolution: data.prob_solution,
            brands: data.brand,
            lastFetched: {
              ...state.lastFetched,
              top: Date.now(),
            },
          }));

          setLoading("homepage", false);
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Failed to fetch homepage data";
          setError("homepage", errorMessage);
          setLoading("homepage", false);
        }
      },

      fetchFarmersBundle: async () => {
        const { setLoading, setError } = get();

        setLoading("farmersBundle", true);
        setError("farmersBundle", null);

        try {
          const data = await homepageService.getFarmersBundle();
          set({ farmersBundle: data });
          setLoading("farmersBundle", false);
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Failed to fetch farmers bundle";
          setError("farmersBundle", errorMessage);
          setLoading("farmersBundle", false);
        }
      },

      fetchProblemSolution: async () => {
        const { setLoading, setError } = get();

        setLoading("problemSolution", true);
        setError("problemSolution", null);

        try {
          const data = await homepageService.getProblemSolution();
          set({ problemSolution: data });
          setLoading("problemSolution", false);
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Failed to fetch problem solution";
          setError("problemSolution", errorMessage);
          setLoading("problemSolution", false);
        }
      },

      fetchBrands: async () => {
        const { setLoading, setError } = get();

        setLoading("brands", true);
        setError("brands", null);

        try {
          const data = await homepageService.getBrands();
          set({ brands: data });
          setLoading("brands", false);
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Failed to fetch brands";
          setError("brands", errorMessage);
          setLoading("brands", false);
        }
      },

      // ===== MID SECTION API ACTIONS =====
      fetchHomepageMidData: async () => {
        const { setLoading, setError, isCacheValid } = get();

        // Check cache first
        if (isCacheValid("mid")) {
          return;
        }

        setLoading("homepageMid", true);
        setError("homepageMid", null);

        try {
          const data = await homepageService.getHomepageMidSections();

          set((state) => ({
            homepageMidData: data,
            youtubeVideos: data.youtube_video,
            crops: data.crop,
            seeds: data.seed,
            lastFetched: {
              ...state.lastFetched,
              mid: Date.now(),
            },
          }));

          setLoading("homepageMid", false);
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Failed to fetch homepage mid data";
          setError("homepageMid", errorMessage);
          setLoading("homepageMid", false);
        }
      },

      fetchYouTubeVideos: async () => {
        const { setLoading, setError } = get();

        setLoading("youtubeVideos", true);
        setError("youtubeVideos", null);

        try {
          const data = await homepageService.getYouTubeVideos();
          set({ youtubeVideos: data });
          setLoading("youtubeVideos", false);
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Failed to fetch YouTube videos";
          setError("youtubeVideos", errorMessage);
          setLoading("youtubeVideos", false);
        }
      },

      fetchCrops: async () => {
        const { setLoading, setError } = get();

        setLoading("crops", true);
        setError("crops", null);

        try {
          const data = await homepageService.getCrops();
          set({ crops: data });
          setLoading("crops", false);
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Failed to fetch crops";
          setError("crops", errorMessage);
          setLoading("crops", false);
        }
      },

      fetchSeeds: async () => {
        const { setLoading, setError } = get();

        setLoading("seeds", true);
        setError("seeds", null);

        try {
          const data = await homepageService.getSeeds();
          set({ seeds: data });
          setLoading("seeds", false);
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Failed to fetch seeds";
          setError("seeds", errorMessage);
          setLoading("seeds", false);
        }
      },

      // ===== BOTTOM SECTION API ACTIONS =====
      fetchHomepageBottomData: async () => {
        const { setLoading, setError, isCacheValid } = get();

        // Check cache first
        if (isCacheValid("bottom")) {
          return;
        }

        setLoading("homepageBottom", true);
        setError("homepageBottom", null);

        try {
          const data = await homepageService.getHomepageBottomSections();

          set((state) => ({
            homepageBottomData: data,
            upcomingProducts: data.products_upcoming,
            popularProductsBottom: data.popular_products,
            lastFetched: {
              ...state.lastFetched,
              bottom: Date.now(),
            },
          }));

          setLoading("homepageBottom", false);
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Failed to fetch homepage bottom data";
          setError("homepageBottom", errorMessage);
          setLoading("homepageBottom", false);
        }
      },

      fetchUpcomingProducts: async () => {
        const { setLoading, setError } = get();

        setLoading("upcomingProducts", true);
        setError("upcomingProducts", null);

        try {
          const data = await homepageService.getUpcomingProducts();
          set({ upcomingProducts: data });
          setLoading("upcomingProducts", false);
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Failed to fetch upcoming products";
          setError("upcomingProducts", errorMessage);
          setLoading("upcomingProducts", false);
        }
      },

      fetchPopularProductsBottom: async () => {
        const { setLoading, setError } = get();

        setLoading("popularProductsBottom", true);
        setError("popularProductsBottom", null);

        try {
          const data = await homepageService.getPopularProductsBottom();
          set({ popularProductsBottom: data });
          setLoading("popularProductsBottom", false);
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Failed to fetch popular products";
          setError("popularProductsBottom", errorMessage);
          setLoading("popularProductsBottom", false);
        }
      },

      // ===== UTILITY METHODS =====
      isCacheValid: (section: "top" | "mid" | "bottom") => {
        const { lastFetched, cacheTimeout } = get();
        const lastFetchTime = lastFetched[section];
        if (!lastFetchTime) return false;
        return Date.now() - lastFetchTime < cacheTimeout;
      },

      clearCache: () =>
        set({
          lastFetched: {
            top: null,
            mid: null,
            bottom: null,
          },
        }),

      fetchAllSections: async () => {
        const {
          fetchHomepageData,
          fetchHomepageMidData,
          fetchHomepageBottomData,
        } = get();
        try {
          await Promise.all([
            fetchHomepageData(),
            fetchHomepageMidData(),
            fetchHomepageBottomData(),
          ]);
        } catch (error) {
          console.error("Failed to fetch all sections:", error);
          throw error;
        }
      },

      refreshAllSections: async () => {
        const { clearCache, fetchAllSections } = get();
        clearCache();
        await fetchAllSections();
      },

      clearErrors: () =>
        set({
          errorStates: {
            homepage: null,
            farmersBundle: null,
            problemSolution: null,
            brands: null,
            homepageMid: null,
            youtubeVideos: null,
            crops: null,
            seeds: null,
            homepageBottom: null,
            upcomingProducts: null,
            popularProductsBottom: null,
          },
        }),
    }),
    {
      name: "homepage-store",
    }
  )
);
