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

import { useState } from "react"
import { HeroSection } from "@/components/portfolio/hero-section"
import { ProjectsSection } from "@/components/portfolio/projects-section"
import { ChatbotInterface } from "@/components/portfolio/chatbot-interface"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { VisitorCounter } from "@/components/ui/visitor-counter"

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed header with utilities */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="container-portfolio flex items-center justify-between py-4">
          {/* Logo/Brand */}
          <div className="text-xl font-bold text-gradient">
            Portfolio
          </div>
          
          {/* Header utilities */}
          <div className="flex items-center gap-4">
            <VisitorCounter />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main>
        {/* Hero section - First impression with call-to-action */}
        <HeroSection onChatOpen={() => setIsChatOpen(true)} />
        
        {/* Projects showcase - Core portfolio content */}
        <ProjectsSection />
        
        {/* TODO: Add remaining sections */}
        {/* <SkillsSection /> */}
        {/* <ExperienceSection /> */}
        {/* <EducationSection /> */}
        {/* <PublicationsSection /> */}
        {/* <ExtracurricularSection /> */}
      </main>

      {/* Interactive chatbot */}
      <ChatbotInterface />

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
