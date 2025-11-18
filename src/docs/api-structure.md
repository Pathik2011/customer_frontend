# Homepage API Structure Documentation

## Overview
This document outlines the optimized API structure for the homepage sections integration.

## Architecture

### 1. Configuration Layer (`src/config/api.ts`)
- Centralized API configuration
- Environment-specific settings
- Error types and utilities
- Retry and timeout configurations
- Cache settings

### 2. Types Layer (`src/types/homepage.ts`)
- Well-organized type definitions
- Separated by API sections (top, mid, bottom)
- Common interfaces for reusability
- Utility types for better type safety

### 3. Service Layer (`src/services/homepageService.ts`)
- Generic fetch function with retry logic
- Timeout handling
- Error handling with proper error types
- Health check functionality
- Organized by API sections

### 4. Store Layer (`src/store/useHomepageStore.ts`)
- Zustand store with devtools
- Caching mechanism with TTL
- Individual loading/error states
- Utility methods for cache management
- Organized state management

## API Endpoints

### Top Section
- **URL**: `/user/homepage/sections/top`
- **Sections**: farmers_bundle, prob_solution, brand
- **Components**: ProductsSection, SeasonalSection, TopBrands

### Mid Section
- **URL**: `/user/homepage/sections/mid`
- **Sections**: youtube_video, crop, seed
- **Components**: WatchUsOnYoutube, ProductsAccordingToCrops, SeedsSection

### Bottom Section
- **URL**: `/user/homepage/sections/bottom`
- **Sections**: products_upcoming, popular_product
- **Components**: ProductsForUpcomingSeasons, PopularProducts

## Features

### Caching
- 5-minute cache TTL in production
- 1-second cache TTL in development
- Cache validation before API calls
- Manual cache clearing functionality

### Error Handling
- Retry logic with exponential backoff
- Proper error categorization
- Timeout handling
- Network error recovery

### Performance
- Parallel API calls for all sections
- Individual section loading states
- Optimistic caching
- Minimal re-renders

### Type Safety
- Full TypeScript coverage
- Proper interface definitions
- Generic type utilities
- Runtime type validation

## Usage Examples

### Fetching All Sections
```typescript
const { fetchAllSections } = useHomepageStore();
await fetchAllSections();
```

### Fetching Individual Sections
```typescript
const { fetchHomepageData, fetchHomepageMidData, fetchHomepageBottomData } = useHomepageStore();
await fetchHomepageData(); // Top section
await fetchHomepageMidData(); // Mid section
await fetchHomepageBottomData(); // Bottom section
```

### Cache Management
```typescript
const { clearCache, refreshAllSections, isCacheValid } = useHomepageStore();

// Check if cache is valid
if (!isCacheValid('top')) {
  await fetchHomepageData();
}

// Clear cache and refresh
await refreshAllSections();
```

### Error Handling
```typescript
const { errorStates, clearErrors } = useHomepageStore();

if (errorStates.homepage) {
  console.error('Top section error:', errorStates.homepage);
  clearErrors();
}
```

## Best Practices

1. **Always check cache before fetching**
2. **Handle loading and error states in components**
3. **Use proper TypeScript types**
4. **Implement proper error boundaries**
5. **Monitor API health with health check**

## Environment Configuration

### Development
- Shorter cache TTL (1 second)
- More verbose logging
- Faster retry intervals

### Production
- Longer cache TTL (5 minutes)
- Optimized retry logic
- Error reporting integration

## Monitoring

### Health Check
```typescript
const isHealthy = await homepageService.healthCheck();
```

### Error Tracking
- All errors are properly typed
- Timestamps included
- Endpoint information preserved
- Retry attempt tracking