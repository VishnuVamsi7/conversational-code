/**
 * Visitor Counter Component
 * 
 * Displays real-time visitor count for portfolio engagement tracking.
 * Uses localStorage for persistent counting and provides visual feedback.
 * 
 * Features:
 * - Persistent visitor counting
 * - Animated number increments
 * - Eye-catching badge design
 * - Hover effects for interactivity
 * 
 * Note: For production, replace localStorage with proper analytics service
 * like Google Analytics, Mixpanel, or custom backend tracking.
 */

import { useState, useEffect } from "react"
import { Eye, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initialize visitor count from localStorage
    const initializeVisitorCount = () => {
      try {
        const stored = localStorage.getItem('portfolio-visitors')
        const currentCount = stored ? parseInt(stored, 10) : 0
        
        // Increment count for new visit
        const newCount = currentCount + 1
        setVisitorCount(newCount)
        localStorage.setItem('portfolio-visitors', newCount.toString())
        
        // Simulate loading for smooth animation
        setTimeout(() => setIsLoading(false), 500)
      } catch (error) {
        console.warn('Failed to access localStorage:', error)
        setVisitorCount(1)
        setIsLoading(false)
      }
    }

    initializeVisitorCount()
  }, [])

  // Format large numbers with K/M suffixes
  const formatCount = (count: number): string => {
    if (count < 1000) return count.toString()
    if (count < 1000000) return `${(count / 1000).toFixed(1)}K`
    return `${(count / 1000000).toFixed(1)}M`
  }

  if (isLoading) {
    return (
      <Badge variant="secondary" className="animate-pulse">
        <Eye className="h-3 w-3 mr-1" />
        <span className="text-xs">Loading...</span>
      </Badge>
    )
  }

  return (
    <div className="flex items-center gap-2 group">
      <Badge 
        variant="secondary" 
        className="visitor-counter hover:scale-105 transition-all duration-300 cursor-help"
        title={`Exactly ${visitorCount.toLocaleString()} visitors have viewed this portfolio`}
      >
        <Users className="h-3 w-3 mr-1 group-hover:animate-pulse" />
        <span className="text-xs font-medium">
          {formatCount(visitorCount)} visitors
        </span>
      </Badge>
      
      {/* Additional engagement indicator */}
      <div className="hidden sm:flex items-center text-xs text-muted-foreground">
        <Eye className="h-3 w-3 mr-1" />
        <span>Live count</span>
      </div>
    </div>
  )
}

/**
 * Usage Instructions for Production:
 * 
 * 1. Replace localStorage with backend tracking:
 *    - Create API endpoint: POST /api/track-visit
 *    - Store visitor data in database (IP-based or session-based)
 *    - Return current count in response
 * 
 * 2. Integrate with analytics services:
 *    - Google Analytics: gtag('event', 'page_view')
 *    - Mixpanel: mixpanel.track('Portfolio View')
 *    - Custom analytics: Send to your tracking service
 * 
 * 3. Add privacy considerations:
 *    - Respect DNT (Do Not Track) headers
 *    - Comply with GDPR/CCPA requirements
 *    - Provide opt-out mechanism
 * 
 * 4. Enhanced features to consider:
 *    - Unique vs total visits
 *    - Geographic visitor distribution
 *    - Time-based analytics (daily/weekly/monthly)
 *    - Referrer tracking
 */