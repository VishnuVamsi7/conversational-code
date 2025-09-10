/**
 * Projects Section Component
 * 
 * Showcases AI/ML projects from GitHub repositories.
 * Features clean, professional layout with direct GitHub links.
 * 
 * Key Features:
 * - Responsive grid layout
 * - Hover effects with animations
 * - Technology stack badges
 * - Direct GitHub links
 * - Real project data from portfolio
 */

import { useState } from "react"
import { ExternalLink, Github, Eye, Filter, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Project data structure
interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  category: 'computer-vision' | 'nlp' | 'deep-learning' | 'data-science'
  githubUrl: string
  year: number
  featured: boolean
}

// Real projects from GitHub portfolio
const projects: Project[] = [
  {
    id: 1,
    title: "Energy Provider Churn Analysis",
    description: "Comprehensive analysis of customer churn patterns in energy sector using machine learning algorithms. Implemented predictive models to identify at-risk customers and reduce churn by 25%.",
    technologies: ["Python", "Pandas", "Scikit-learn", "Data Analysis", "Machine Learning"],
    category: "data-science",
    githubUrl: "https://github.com/VishnuVamsi7/Energy-Provider-Churn-Analysis",
    year: 2024,
    featured: true
  },
  {
    id: 2,
    title: "IMageCraft - Text-to-Image using Transformers", 
    description: "Advanced text-to-image generation system using transformer architecture. Implements state-of-the-art deep learning techniques for creative AI applications with high-quality image synthesis.",
    technologies: ["Python", "Transformers", "PyTorch", "Computer Vision", "Deep Learning"],
    category: "deep-learning",
    githubUrl: "https://github.com/VishnuVamsi7/IMageCraft-Text-to-Image-using-Transformers",
    year: 2024,
    featured: true
  },
  {
    id: 3,
    title: "Video Keyword Extraction",
    description: "Automated keyword extraction from video content using NLP techniques. Processes audio transcription and visual content for comprehensive analysis and content tagging.",
    technologies: ["Python", "NLP", "Video Processing", "Machine Learning", "OpenCV"],
    category: "nlp",
    githubUrl: "https://github.com/VishnuVamsi7/video_keyword_extraction",
    year: 2024,
    featured: false
  },
  {
    id: 4,
    title: "Pink Slime Journalism Analysis",
    description: "NLP research project analyzing misinformation patterns in 'pink slime' journalism. Processed 600k+ articles to detect deceptive textual patterns with 3x sentiment detection accuracy.",
    technologies: ["Python", "NLTK", "SpaCy", "Research", "Data Analysis"],
    category: "nlp",
    githubUrl: "https://github.com/VishnuVamsi7/Pink-slime",
    year: 2024,
    featured: true
  },
  {
    id: 5,
    title: "Oil & Gas Utility Performance Analysis",
    description: "Data-driven analysis of utility performance in oil and gas sector. Comprehensive statistical analysis and visualization of industry metrics with actionable insights.",
    technologies: ["Python", "Data Analysis", "Visualization", "Statistics", "Pandas"],
    category: "data-science",
    githubUrl: "https://github.com/VishnuVamsi7/Data-Driven-Analysis-of-Utility-Performance-in-the-Oil-and-Gas-Sector",
    year: 2023,
    featured: false
  },
  {
    id: 6,
    title: "Night Objects Detection Using TensorFlow",
    description: "Real-time object detection system optimized for low-light conditions. Achieved 64% accuracy with <0.35 sec inference time, specifically designed for edge deployment in surveillance systems.",
    technologies: ["Python", "TensorFlow", "Computer Vision", "Edge Computing", "OpenCV"],
    category: "computer-vision",
    githubUrl: "https://github.com/VishnuVamsi7/Night-Objects---Detection-Using-TensorFlow",
    year: 2023,
    featured: false
  }
]

const categories = [
  { value: "all", label: "All Projects" },
  { value: "computer-vision", label: "Computer Vision" }, 
  { value: "nlp", label: "Natural Language Processing" },
  { value: "deep-learning", label: "Deep Learning" },
  { value: "data-science", label: "Data Science" }
]

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  const featuredProjects = filteredProjects.filter(project => project.featured)
  const regularProjects = filteredProjects.filter(project => !project.featured)

  return (
    <section id="projects" className="section-padding bg-gradient-to-b from-background to-muted/20">
      <div className="container-portfolio">
        {/* Section header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="outline" className="mb-4">
            <Eye className="h-3 w-3 mr-1" />
            Featured Work
          </Badge>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gradient">
            AI & Machine Learning Projects
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Explore my portfolio of innovative AI/ML solutions, from computer vision systems 
            to natural language processing applications. Each project demonstrates practical 
            implementations of cutting-edge machine learning techniques.
          </p>

          {/* Category filter */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filter by category:</span>
            </div>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-64 px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Featured projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <span className="text-primary">✨</span>
              Featured Projects
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  featured={true}
                  isHovered={hoveredProject === project.id}
                  onHover={() => setHoveredProject(project.id)}
                  onLeave={() => setHoveredProject(null)}
                  animationDelay={index * 0.1}
                />
              ))}
            </div>
          </div>
        )}

        {/* Regular projects */}
        {regularProjects.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold mb-8">
              All Projects
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  featured={false}
                  isHovered={hoveredProject === project.id}
                  onHover={() => setHoveredProject(project.id)}
                  onLeave={() => setHoveredProject(null)}
                  animationDelay={index * 0.1}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground">
              Try selecting a different category or view all projects.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

// Individual project card component
interface ProjectCardProps {
  project: Project
  featured: boolean
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  animationDelay: number
}

function ProjectCard({ project, featured, isHovered, onHover, onLeave, animationDelay }: ProjectCardProps) {
  return (
    <Card 
      className={`project-card overflow-hidden border-0 ${
        featured ? 'bg-gradient-card' : 'bg-card'
      } ${isHovered ? 'glow-effect' : ''} hover:scale-105 transition-all duration-300`}
      style={{ animationDelay: `${animationDelay}s` }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Project header */}
      <div className="relative p-6 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="flex justify-between items-start mb-4">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
            <Calendar className="h-3 w-3 mr-1" />
            {project.year}
          </Badge>
          {featured && (
            <Badge className="bg-primary/90 text-primary-foreground">
              Featured
            </Badge>
          )}
        </div>
        
        <CardTitle className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </CardTitle>
        
        <CardDescription className="text-base leading-relaxed">
          {project.description}
        </CardDescription>
      </div>

      <CardContent className="space-y-4 p-6">
        {/* Technology stack */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs hover:bg-primary/10 transition-colors">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{project.technologies.length - 4} more
            </Badge>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 pt-2">
          <Button 
            size="sm" 
            asChild
            className="bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 flex-1"
          >
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              View Code
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Production Notes:
 * 
 * 1. All projects link to real GitHub repositories
 * 2. Technology stacks match actual project implementations  
 * 3. Descriptions include key metrics and achievements
 * 4. Projects are categorized for easy filtering
 * 5. Featured projects highlight most significant work
 * 6. Responsive design works on all devices
 * 7. Hover effects provide interactive feedback
 * 8. Clean, professional appearance suitable for recruiters
 */