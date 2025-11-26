import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
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
} from '@/types/homepage';
import { homepageService } from '@/services/homepageService';
import { CACHE_CONFIG } from '@/config/api';

interface HomepageStore {
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

  // Loading states
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

  // Error states
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
  setLoading: (section: keyof HomepageStore['loadingStates'], loading: boolean) => void;
  setError: (section: keyof HomepageStore['errorStates'], error: string | null) => void;

  // API Actions
  fetchHomepageData: () => Promise<void>;
  fetchFarmersBundle: () => Promise<void>;
  fetchProblemSolution: () => Promise<void>;
  fetchBrands: () => Promise<void>;

  fetchHomepageMidData: () => Promise<void>;
  fetchYouTubeVideos: () => Promise<void>;
  fetchCrops: () => Promise<void>;
  fetchSeeds: () => Promise<void>;

  fetchHomepageBottomData: () => Promise<void>;
  fetchUpcomingProducts: () => Promise<void>;
  fetchPopularProductsBottom: () => Promise<void>;

  // Utility Actions
  fetchAllSections: () => Promise<void>;
  refreshAllSections: () => Promise<void>;
  clearErrors: () => void;
  clearCache: () => void;
  isCacheValid: (section: 'top' | 'mid' | 'bottom') => boolean;
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

      lastFetched: {
        top: null,
        mid: null,
        bottom: null,
      },

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

      // ===== ACTIONS =====
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

        if (isCacheValid('top')) return;

        setLoading('homepage', true);
        setError('homepage', null);

        const response = await homepageService.getTopSection();

        if (response.success && response.res) {
          const data = response.res;
          set((state) => ({
            homepageData: data,
            farmersBundle: data.farmers_bundle,
            problemSolution: data.prob_solution,
            brands: data.brand,
            lastFetched: { ...state.lastFetched, top: Date.now() },
          }));
        } else {
          setError('homepage', response.error || 'Failed to fetch homepage data');
        }

        setLoading('homepage', false);
      },

      fetchFarmersBundle: async () => {
        const { setLoading, setError } = get();

        setLoading('farmersBundle', true);
        setError('farmersBundle', null);

        const response = await homepageService.getTopSection();

        if (response.success && response.res) {
          set({ farmersBundle: response.res.farmers_bundle });
        } else {
          setError('farmersBundle', response.error || 'Failed to fetch farmers bundle');
        }

        setLoading('farmersBundle', false);
      },

      fetchProblemSolution: async () => {
        const { setLoading, setError } = get();

        setLoading('problemSolution', true);
        setError('problemSolution', null);

        const response = await homepageService.getTopSection();

        if (response.success && response.res) {
          set({ problemSolution: response.res.prob_solution });
        } else {
          setError('problemSolution', response.error || 'Failed to fetch problem solution');
        }

        setLoading('problemSolution', false);
      },

      fetchBrands: async () => {
        const { setLoading, setError } = get();

        setLoading('brands', true);
        setError('brands', null);

        const response = await homepageService.getTopSection();

        if (response.success && response.res) {
          set({ brands: response.res.brand });
        } else {
          setError('brands', response.error || 'Failed to fetch brands');
        }

        setLoading('brands', false);
      },

      // ===== MID SECTION API ACTIONS =====
      fetchHomepageMidData: async () => {
        const { setLoading, setError, isCacheValid } = get();

        if (isCacheValid('mid')) return;

        setLoading('homepageMid', true);
        setError('homepageMid', null);

        const response = await homepageService.getMidSection();

        if (response.success && response.res) {
          const data = response.res;
          set((state) => ({
            homepageMidData: data,
            youtubeVideos: data.youtube_video,
            crops: data.crop,
            seeds: data.seed,
            lastFetched: { ...state.lastFetched, mid: Date.now() },
          }));
        } else {
          setError('homepageMid', response.error || 'Failed to fetch mid section');
        }

        setLoading('homepageMid', false);
      },

      fetchYouTubeVideos: async () => {
        const { setLoading, setError } = get();

        setLoading('youtubeVideos', true);
        setError('youtubeVideos', null);

        const response = await homepageService.getMidSection();

        if (response.success && response.res) {
          set({ youtubeVideos: response.res.youtube_video });
        } else {
          setError('youtubeVideos', response.error || 'Failed to fetch YouTube videos');
        }

        setLoading('youtubeVideos', false);
      },

      fetchCrops: async () => {
        const { setLoading, setError } = get();

        setLoading('crops', true);
        setError('crops', null);

        const response = await homepageService.getMidSection();

        if (response.success && response.res) {
          set({ crops: response.res.crop });
        } else {
          setError('crops', response.error || 'Failed to fetch crops');
        }

        setLoading('crops', false);
      },

      fetchSeeds: async () => {
        const { setLoading, setError } = get();

        setLoading('seeds', true);
        setError('seeds', null);

        const response = await homepageService.getMidSection();

        if (response.success && response.res) {
          set({ seeds: response.res.seed });
        } else {
          setError('seeds', response.error || 'Failed to fetch seeds');
        }

        setLoading('seeds', false);
      },

      // ===== BOTTOM SECTION API ACTIONS =====
      fetchHomepageBottomData: async () => {
        const { setLoading, setError, isCacheValid } = get();

        if (isCacheValid('bottom')) return;

        setLoading('homepageBottom', true);
        setError('homepageBottom', null);

        const response = await homepageService.getBottomSection();

        if (response.success && response.res) {
          const data = response.res;
          set((state) => ({
            homepageBottomData: data,
            upcomingProducts: data.products_upcoming,
            popularProductsBottom: data.popular_products,
            lastFetched: { ...state.lastFetched, bottom: Date.now() },
          }));
        } else {
          setError('homepageBottom', response.error || 'Failed to fetch bottom section');
        }

        setLoading('homepageBottom', false);
      },

      fetchUpcomingProducts: async () => {
        const { setLoading, setError } = get();

        setLoading('upcomingProducts', true);
        setError('upcomingProducts', null);

        const response = await homepageService.getBottomSection();

        if (response.success && response.res) {
          set({ upcomingProducts: response.res.products_upcoming });
        } else {
          setError('upcomingProducts', response.error || 'Failed to fetch upcoming products');
        }

        setLoading('upcomingProducts', false);
      },

      fetchPopularProductsBottom: async () => {
        const { setLoading, setError } = get();

        setLoading('popularProductsBottom', true);
        setError('popularProductsBottom', null);

        const response = await homepageService.getBottomSection();

        if (response.success && response.res) {
          set({ popularProductsBottom: response.res.popular_products });
        } else {
          setError('popularProductsBottom', response.error || 'Failed to fetch popular products');
        }

        setLoading('popularProductsBottom', false);
      },

      // ===== UTILITY METHODS =====
      isCacheValid: (section: 'top' | 'mid' | 'bottom') => {
        const { lastFetched } = get();
        const lastFetchTime = lastFetched[section];
        if (!lastFetchTime) return false;
        return Date.now() - lastFetchTime < CACHE_CONFIG.defaultTTL;
      },

      clearCache: () =>
        set({
          lastFetched: { top: null, mid: null, bottom: null },
        }),

      fetchAllSections: async () => {
        const { fetchHomepageData, fetchHomepageMidData, fetchHomepageBottomData } = get();
        await Promise.all([
          fetchHomepageData(),
          fetchHomepageMidData(),
          fetchHomepageBottomData(),
        ]);
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
    { name: 'homepage-store' }
  )
);
