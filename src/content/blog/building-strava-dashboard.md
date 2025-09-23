---
title: 'Building a Performance-Optimized Strava Dashboard'
description: 'Deep dive into optimizing React components, API caching, and bundle splitting for a lightning-fast cycling analytics platform.'
pubDate: 'Jan 15 2024'
heroImage: '../../assets/blog-placeholder-3.jpg'
category: 'Development'
readTime: '8 min read'
tags: ['React', 'Performance', 'Strava', 'TypeScript']
---

Building a high-performance Strava dashboard taught me valuable lessons about React optimization, API design, and the delicate balance between feature richness and speed. Here's how I built a dashboard that loads in under 2 seconds while handling thousands of activities.

## The Challenge

When I set out to build a comprehensive Strava analytics platform, I had ambitious goals:
- Display detailed power analysis for cyclists
- Show training trends and progress charts
- Handle multiple athletes with different data volumes
- Maintain sub-2-second load times
- Work flawlessly on mobile devices

The reality check came quickly. My initial implementation was loading 15MB of JavaScript, making dozens of API calls, and taking 8+ seconds to render on mobile. Time for some serious optimization.

## Performance Wins

### 1. Intelligent Code Splitting

Instead of loading everything upfront, I implemented strategic lazy loading:

```typescript
// Dynamic imports for heavy components
const CalendarHeatmap = dynamic(() => import('./CalendarHeatmap'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-xl" />
})

const ProgressChart = dynamic(() => import('./ProgressChart'), {
  ssr: false
})
```

**Result**: 40% reduction in initial bundle size

### 2. Smart API Caching

Strava's API rate limits forced me to get creative with caching:

```typescript
// In-memory cache with TTL
const activityCache = new Map<string, {
  data: Activity[];
  timestamp: number;
  ttl: number;
}>()

// Cache activities for 5 minutes, user data for 24 hours
const getCachedActivities = (userId: string) => {
  const cached = activityCache.get(userId)
  if (cached && Date.now() - cached.timestamp < cached.ttl) {
    return cached.data
  }
  return null
}
```

**Result**: 80% fewer API calls, dramatically faster subsequent loads

### 3. Optimized Data Processing

Power calculations were happening on every render. Moving to useMemo and web workers:

```typescript
// Expensive calculations moved to useMemo
const powerProfile = useMemo(() => {
  if (!activities.length) return null
  
  return calculatePowerProfile(activities)
}, [activities])

// Heavy processing moved to web workers
const processActivities = useCallback(async (activities: Activity[]) => {
  const worker = new Worker('/workers/activity-processor.js')
  return new Promise((resolve) => {
    worker.postMessage(activities)
    worker.onmessage = (e) => resolve(e.data)
  })
}, [])
```

**Result**: UI stays responsive during heavy calculations

## Architecture Decisions

### Database vs. API-Only

Initially, I built everything as API passthrough to Strava. This created problems:
- Rate limiting issues
- Slow response times
- No offline capability

Moving to a hybrid approach with Postgres:
- Cache user data in the database
- Sync incrementally in the background
- Serve from DB with periodic refresh

### Component Structure

Breaking down the monolithic dashboard into focused components:

```typescript
// Instead of one massive component
<StravaDashboard />

// Focused, reusable components
<AthleteHeader />
<PowerAnalytics />
<TrainingCalendar />
<ProgressCharts />
<RecentActivities />
```

Each component manages its own data fetching and error states, making the codebase much more maintainable.

## Key Learnings

### 1. Measure First, Optimize Second
I spent weeks optimizing the wrong things. Using Chrome DevTools and Lighthouse from day one would have saved massive time.

### 2. User Perception Matters
A 3-second load that shows progressive content feels faster than a 2-second blank screen. Strategic loading states and skeleton screens make a huge difference.

### 3. Mobile-First Performance
Desktop performance rarely translates to mobile. Testing on actual devices (not just Chrome DevTools) revealed critical issues I'd missed.

## The Results

Final performance metrics:
- **First Contentful Paint**: 1.2s
- **Largest Contentful Paint**: 1.8s
- **Total Bundle Size**: 180KB (down from 800KB)
- **API Calls**: 3 initial (down from 12)
- **Lighthouse Score**: 98/100

## What's Next

The dashboard is now fast, but there's always room for improvement:
- Service worker for offline functionality
- Edge caching with Cloudflare
- Real-time updates with WebSockets
- Advanced data visualizations

Building performant web applications is as much about discipline as it is about technique. Every feature addition should be weighed against its performance impact.

*Want to see the dashboard in action? Check out the [Strava Showcase](/strava-showcase) on the main site.* 