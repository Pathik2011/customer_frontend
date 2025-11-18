import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UIStore {
  // Loading states for different sections
  isLoadingGlobal: boolean;
  isLoadingProducts: boolean;
  isLoadingCategories: boolean;
  isLoadingBrands: boolean;

  // Modal states
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;

  // Search state
  searchQuery: string;
  searchResults: any[];

  // Toast notifications
  toasts: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    duration?: number;
  }>;

  // Actions
  setGlobalLoading: (loading: boolean) => void;
  setProductsLoading: (loading: boolean) => void;
  setCategoriesLoading: (loading: boolean) => void;
  setBrandsLoading: (loading: boolean) => void;

  toggleCart: () => void;
  toggleSearch: () => void;
  toggleMobileMenu: () => void;
  closeAllModals: () => void;

  setSearchQuery: (query: string) => void;
  setSearchResults: (results: any[]) => void;
  clearSearch: () => void;

  addToast: (toast: Omit<UIStore['toasts'][0], 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export const useUIStore = create<UIStore>()(
  devtools(
    (set, get) => ({
      // Initial State
      isLoadingGlobal: false,
      isLoadingProducts: false,
      isLoadingCategories: false,
      isLoadingBrands: false,

      isCartOpen: false,
      isSearchOpen: false,
      isMobileMenuOpen: false,

      searchQuery: '',
      searchResults: [],

      toasts: [],

      // Loading Actions
      setGlobalLoading: (isLoadingGlobal) => set({ isLoadingGlobal }),
      setProductsLoading: (isLoadingProducts) => set({ isLoadingProducts }),
      setCategoriesLoading: (isLoadingCategories) => set({ isLoadingCategories }),
      setBrandsLoading: (isLoadingBrands) => set({ isLoadingBrands }),

      // Modal Actions
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
      toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
      closeAllModals: () => set({
        isCartOpen: false,
        isSearchOpen: false,
        isMobileMenuOpen: false,
      }),

      // Search Actions
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setSearchResults: (searchResults) => set({ searchResults }),
      clearSearch: () => set({ searchQuery: '', searchResults: [] }),

      // Toast Actions
      addToast: (toast) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newToast = { ...toast, id };
        
        set((state) => ({
          toasts: [...state.toasts, newToast],
        }));

        // Auto remove toast after duration
        if (toast.duration !== 0) {
          setTimeout(() => {
            get().removeToast(id);
          }, toast.duration || 5000);
        }
      },

      removeToast: (id) => set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      })),

      clearToasts: () => set({ toasts: [] }),
    }),
    {
      name: 'ui-store',
    }
  )
);