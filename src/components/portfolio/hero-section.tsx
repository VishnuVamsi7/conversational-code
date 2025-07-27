/**
 * Hero Section Component
 * 
 * Main landing section featuring:
 * - Animated introduction with typing effect
 * - Gradient backgrounds and glowing elements
 * - Call-to-action buttons for engagement
 * - Responsive design for all device sizes
 * - Floating animation for visual appeal
 * 
 * This component serves as the first impression for visitors,
 * emphasizing AI/ML expertise with modern visual effects.
 */

import { useState, useEffect } from "react"
import { ChevronDown, MessageCircle, Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface HeroSectionProps {
  onChatOpen?: () => void
}

export function HeroSection({ onChatOpen }: HeroSectionProps) {
  const [typedText, setTypedText] = useState("")
  const [currentRole, setCurrentRole] = useState(0)
  
  // Dynamic role titles to showcase versatility
  const roles = [
    "AI/ML Engineer",
    "Data Scientist", 
    "Machine Learning Researcher",
    "Deep Learning Specialist"
  ]

  // Typing animation effect for role titles
  useEffect(() => {
    const currentRoleText = roles[currentRole]
    let index = 0
    
    const typeTimer = setInterval(() => {
      if (index <= currentRoleText.length) {
        setTypedText(currentRoleText.slice(0, index))
        index++
      } else {
        // Move to next role after completing current one
        setTimeout(() => {
          setCurrentRole((prev) => (prev + 1) % roles.length)
        }, 2000)
        clearInterval(typeTimer)
      }
    }, 100)

    return () => clearInterval(typeTimer)
  }, [currentRole])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 hero-gradient opacity-90" />
      
      {/* Floating geometric shapes for visual interest */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-float" 
             style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-white/5 rounded-full animate-float" 
             style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-white/15 rounded-full animate-float" 
             style={{ animationDelay: '4s' }} />
      </div>

      {/* Main content container */}
      <div className="relative z-10 container-portfolio text-center">
        <div className="animate-fade-in">
          {/* Status badge */}
          <Badge 
            variant="secondary" 
            className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30 transition-all duration-300"
          >
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
            Available for new opportunities
          </Badge>

          {/* Main heading with gradient text */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Hi, I'm{" "}
            <span className="text-gradient bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Sai Vishnu Vamsi
            </span>
          </h1>

          {/* Dynamic role with typing effect */}
          <div className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-8 h-12 flex items-center justify-center">
            <span className="mr-2">I'm a</span>
            <span className="text-gradient bg-gradient-to-r from-purple-200 to-white bg-clip-text text-transparent font-semibold min-w-[300px] text-left">
              {typedText}
              <span className="animate-pulse">|</span>
            </span>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Passionate about building intelligent systems that solve real-world problems. 
            Specializing in machine learning, deep learning, and AI-driven solutions 
            that make a meaningful impact.
          </p>

          {/* Call-to-action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              size="lg"
              onClick={onChatOpen}
              className="bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-lg group"
            >
              <MessageCircle className="h-5 w-5 mr-2 group-hover:animate-pulse" />
              Chat with AI Assistant
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 hover:scale-105 transition-all duration-300"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Resume
            </Button>
            
            <Button
              size="lg"
              variant="ghost"
              className="text-white hover:bg-white/10 hover:scale-105 transition-all duration-300"
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ 
                  behavior: 'smooth' 
                })
              }}
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              View Projects
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="animate-bounce">
            <Button
              variant="ghost"
              size="icon"
              className="text-white/60 hover:text-white/80 hover:bg-white/10 rounded-full"
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ 
                  behavior: 'smooth' 
                })
              }}
            >
              <ChevronDown className="h-6 w-6" />
              <span className="sr-only">Scroll to projects</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}

/**
 * Customization Instructions:
 * 
 * 1. Replace placeholder text:
 *    - Update [Your Name] with actual name
 *    - Modify roles array to match expertise
 *    - Customize description paragraph
 * 
 * 2. Add resume download functionality:
 *    - Place resume PDF in public folder
 *    - Update download button href
 * 
 * 3. Connect social links:
 *    - Add GitHub, LinkedIn, etc. buttons
 *    - Implement proper external link handling
 * 
 * 4. Analytics integration:
 *    - Track button clicks
 *    - Monitor scroll behavior
 *    - Measure time spent in hero section
 */