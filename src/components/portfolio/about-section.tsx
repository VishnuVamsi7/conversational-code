/**
 * About Section Component
 * 
 * Displays comprehensive information about Sai Vishnu Vamsi including:
 * - Professional summary
 * - Education background
 * - Skills and expertise
 * - Contact information
 */

import { MapPin, Mail, Phone, Linkedin, Github, GraduationCap, Award, Code, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AboutSection() {
  const skills = {
    programming: ["Python", "R", "SQL", "C++", "JavaScript", "Flutter", "CUDA", "Bash", "HTML/CSS"],
    analytics: ["Machine Learning", "Predictive Analytics", "Time-Series Modeling", "Statistics", "Data Visualization", "Text Processing", "Topic Modeling", "LLM Integration", "Model Tuning", "Prompt Engineering", "GPU Computing"],
    frameworks: ["TensorFlow", "PyTorch", "Scikit-learn", "ONNX", "LangChain", "RAG"],
    tools: ["Power BI", "Tableau", "Excel", "Git", "GitHub", "Databricks", "Jupyter", "Google Colab", "VS Code", "Linux", "Hadoop", "Spark", "Kubernetes", "Docker", "Azure ML", "Palantir Foundry"]
  }

  const education = [
    {
      degree: "Master of Science in Computer Science",
      institution: "University of Houston",
      period: "Expected May 2025",
      coursework: ["Machine Learning", "Deep Learning", "Big Data Analytics", "Cloud Computing", "AI Systems"]
    },
    {
      degree: "Bachelor of Technology in Computer Science",
      institution: "SRM University, AP",
      period: "2019 – 2023",
      coursework: []
    }
  ]

  const certifications = [
    "Machine Learning A-Z™: Hands-On Python and R In Data Science",
    "JPMorgan Chase Excel Skills",
    "Analyzing Marketing Campaigns with Pandas",
    "Data Manipulation in SQL"
  ]

  return (
    <section id="about" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Software Engineer with 5 years of experience building AI/ML systems, full-stack applications, 
            and end-to-end RAG chatbots, seeking full-time roles in applied machine learning or AI product development.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact & Personal Info */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href="mailto:saivishnuvamsis07@gmail.com" className="hover:text-primary transition-colors">
                  saivishnuvamsis07@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>+1 (346) 901 8158</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>Houston, TX</span>
              </div>
              <div className="flex gap-4 pt-4">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  Portfolio
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="border-l-2 border-primary/20 pl-4">
                  <h3 className="font-semibold text-lg">{edu.degree}</h3>
                  <p className="text-primary font-medium">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground mb-2">{edu.period}</p>
                  {edu.coursework.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {edu.coursework.map((course, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Skills Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Code className="h-5 w-5 text-primary" />
                Programming
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.programming.map((skill, index) => (
                  <Badge key={index} variant="outline" className="skill-badge">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Brain className="h-5 w-5 text-primary" />
                Analytics & ML
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.analytics.slice(0, 8).map((skill, index) => (
                  <Badge key={index} variant="outline" className="skill-badge">
                    {skill}
                  </Badge>
                ))}
                <Badge variant="secondary" className="text-xs">
                  +{skills.analytics.length - 8} more
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Award className="h-5 w-5 text-primary" />
                Frameworks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.frameworks.map((skill, index) => (
                  <Badge key={index} variant="outline" className="skill-badge">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Code className="h-5 w-5 text-primary" />
                Tools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.tools.slice(0, 8).map((skill, index) => (
                  <Badge key={index} variant="outline" className="skill-badge">
                    {skill}
                  </Badge>
                ))}
                <Badge variant="secondary" className="text-xs">
                  +{skills.tools.length - 8} more
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Certifications */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                  <Award className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-sm">{cert}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}