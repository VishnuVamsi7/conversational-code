/**
 * Portfolio Index Page - Main landing page
 * 
 * This is the main portfolio homepage featuring:
 * - Hero section with animated introduction
 * - Featured projects showcase
 * - Skills and experience sections
 * - Interactive chatbot for visitor engagement
 * - Visitor counter for social proof
 * - Dark mode toggle for accessibility
 * 
 * The page is built with responsive design principles and
 * optimized for both desktop and mobile viewing experiences.
 */

import { useState, useRef } from "react"
import { HeroSection } from "@/components/portfolio/hero-section"
import { AboutSection } from "@/components/portfolio/about-section"
import { ExperienceSection } from "@/components/portfolio/experience-section"
import { ProjectsSection } from "@/components/portfolio/projects-section"
import { PublicationsSection } from "@/components/portfolio/publications-section"
import { ExtracurricularSection } from "@/components/portfolio/extracurricular-section"
import { ChatbotInterface } from "@/components/portfolio/chatbot-interface"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { VisitorCounter } from "@/components/ui/visitor-counter"

const Index = () => {
  const chatbotRef = useRef<{ openChat: () => void }>(null)
  
  const handleChatOpen = () => {
    chatbotRef.current?.openChat()
  }
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header with theme toggle */}
      <header className="fixed top-4 right-4 z-40 flex gap-4">
        <VisitorCounter />
        <ThemeToggle />
      </header>

      {/* Main content */}
      <main>
        <HeroSection onChatOpen={handleChatOpen} />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <PublicationsSection />
        <ExtracurricularSection />
      </main>

      {/* Chatbot Interface */}
      <ChatbotInterface ref={chatbotRef} />

      {/* Footer - Coming in next iteration */}
      <footer className="bg-muted/30 border-t border-border py-8">
        <div className="container-portfolio text-center">
          <p className="text-muted-foreground">
            Built with ❤️ using React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
