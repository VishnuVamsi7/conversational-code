/**
 * Projects Section Component
 * 
 * Showcases AI/ML projects in an interactive grid layout.
 * Features expandable project structure for future additions.
 * 
 * Key Features:
 * - Responsive grid layout (1-2-3 columns)
 * - Hover effects with glowing animations
 * - Technology stack badges
 * - Project filtering capabilities
 * - Link to detailed project pages
 * - GitHub and live demo links
 * 
 * Each project includes:
 * - Hero image/thumbnail
 * - Title and brief description
 * - Technology stack used
 * - Project metrics (if available)
 * - Action buttons for exploration
 */

import { useState } from "react"
import { ExternalLink, Github, Eye, Filter, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Project data structure - easily expandable for new projects
interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  category: 'computer-vision' | 'nlp' | 'deep-learning' | 'data-science' | 'robotics'
  image: string
  githubUrl?: string
  liveUrl?: string
  demoUrl?: string
  metrics?: {
    accuracy?: string
    dataset?: string
    performance?: string
  }
  year: number
  featured: boolean
}

// Sample project data - replace with your actual projects
const projects: Project[] = [
  {
    id: "1",
    title: "Advanced Image Classification System",
    description: "Deep learning model for multi-class image recognition with 95%+ accuracy",
    longDescription: "Comprehensive computer vision solution using transfer learning and custom CNN architectures",
    technologies: ["Python", "TensorFlow", "OpenCV", "FastAPI", "Docker"],
    category: "computer-vision",
    image: "/api/placeholder/400/300",
    githubUrl: "https://github.com/username/project1",
    liveUrl: "https://demo.project1.com",
    metrics: {
      accuracy: "95.8%",
      dataset: "100K+ images",
      performance: "23ms inference"
    },
    year: 2024,
    featured: true
  },
  {
    id: "2", 
    title: "Natural Language Processing Pipeline",
    description: "End-to-end NLP system for sentiment analysis and text classification",
    longDescription: "Production-ready NLP pipeline with real-time processing capabilities",
    technologies: ["Python", "Transformers", "BERT", "Flask", "PostgreSQL"],
    category: "nlp",
    image: "/api/placeholder/400/300",
    githubUrl: "https://github.com/username/project2",
    demoUrl: "https://demo.project2.com",
    metrics: {
      accuracy: "92.4%",
      dataset: "1M+ documents",
      performance: "45ms processing"
    },
    year: 2024,
    featured: true
  },
  {
    id: "3",
    title: "Predictive Analytics Dashboard", 
    description: "Machine learning platform for business intelligence and forecasting",
    longDescription: "Interactive dashboard with predictive models for business decision making",
    technologies: ["Python", "Scikit-learn", "Plotly", "Streamlit", "MLflow"],
    category: "data-science",
    image: "/api/placeholder/400/300",
    githubUrl: "https://github.com/username/project3",
    liveUrl: "https://dashboard.project3.com",
    metrics: {
      accuracy: "89.2%",
      dataset: "500K+ records",
      performance: "Real-time updates"
    },
    year: 2023,
    featured: false
  }
  // Add more projects here as needed
]

const categories = [
  { value: "all", label: "All Projects" },
  { value: "computer-vision", label: "Computer Vision" },
  { value: "nlp", label: "Natural Language Processing" },
  { value: "deep-learning", label: "Deep Learning" },
  { value: "data-science", label: "Data Science" },
  { value: "robotics", label: "Robotics" }
]

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

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
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
      } ${isHovered ? 'glow-effect' : ''}`}
      style={{ animationDelay: `${animationDelay}s` }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Project image */}
      <div className="relative overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
            <Calendar className="h-3 w-3 mr-1" />
            {project.year}
          </Badge>
        </div>
        {featured && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary/90 text-primary-foreground">
              Featured
            </Badge>
          </div>
        )}
      </div>

      <CardHeader>
        <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
          {project.title}
        </CardTitle>
        <CardDescription className="text-base">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Technology stack */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{project.technologies.length - 4} more
            </Badge>
          )}
        </div>

        {/* Project metrics */}
        {project.metrics && (
          <div className="grid grid-cols-2 gap-2 text-sm">
            {project.metrics.accuracy && (
              <div className="bg-muted/50 rounded-lg p-2 text-center">
                <div className="font-semibold text-primary">{project.metrics.accuracy}</div>
                <div className="text-xs text-muted-foreground">Accuracy</div>
              </div>
            )}
            {project.metrics.dataset && (
              <div className="bg-muted/50 rounded-lg p-2 text-center">
                <div className="font-semibold text-primary">{project.metrics.dataset}</div>
                <div className="text-xs text-muted-foreground">Dataset</div>
              </div>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2 pt-2">
          <Button size="sm" variant="default" className="flex-1">
            <Eye className="h-3 w-3 mr-1" />
            View Details
          </Button>
          
          {project.githubUrl && (
            <Button size="sm" variant="outline" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-3 w-3 mr-1" />
                Code
              </a>
            </Button>
          )}
          
          {(project.liveUrl || project.demoUrl) && (
            <Button size="sm" variant="outline" asChild>
              <a href={project.liveUrl || project.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3 mr-1" />
                Demo
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Implementation Instructions:
 * 
 * 1. Replace sample project data:
 *    - Update projects array with your actual projects
 *    - Add real images to public folder or use image URLs
 *    - Include accurate metrics and descriptions
 * 
 * 2. Add routing for project details:
 *    - Create individual project pages
 *    - Implement navigation from "View Details" button
 *    - Add URL structure like /projects/[id]
 * 
 * 3. Enhance with real data:
 *    - Connect to CMS or database
 *    - Add project search functionality
 *    - Implement dynamic loading for large portfolios
 * 
 * 4. Analytics integration:
 *    - Track project view clicks
 *    - Monitor most popular projects
 *    - Measure engagement with different categories
 */