/**
 * Publications Section Component
 * 
 * Displays academic publications, research papers, and conference presentations
 * Features professional formatting with citation information and links
 */

import { ExternalLink, Calendar, Award, Users, BookOpen } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function PublicationsSection() {
  const publications = [
    {
      title: "Real-time Object Detection in Low-light Environments using Optimized SSD with MobileNetV2",
      authors: ["Sai Vishnu Vamsi Senagasetty", "et al."],
      venue: "International Conference on Advanced Intelligent Applications (ICAIA 2023)",
      year: "2023",
      type: "Conference Paper",
      abstract: "This paper addresses the challenge of poor visibility in night surveillance by designing a real-time object detection system tailored for low-light environments. We developed and fine-tuned a lightweight deep learning pipeline using SSD with MobileNetV2, enabling efficient object detection on mobile and edge devices.",
      keywords: ["Object Detection", "Computer Vision", "SSD", "MobileNetV2", "Low-light", "Edge Computing"],
      metrics: {
        accuracy: "12-64%",
        inference: "< 0.35s",
        deployment: "Mobile/Edge"
      },
      status: "Published"
    },
    {
      title: "State of Health Estimation of Lithium-ion Batteries using Gaussian Process Regression",
      authors: ["Sai Vishnu Vamsi Senagasetty", "et al."],
      venue: "ATCON-1 Conference",
      year: "2023",
      type: "Conference Paper",
      abstract: "We present a data-driven approach for accurately estimating the State of Health (SOH) of lithium-ion batteries in electric vehicles using probabilistic Gaussian Process Regression. Our method leverages Bayesian inference to generate both predictions and uncertainty estimates, outperforming traditional electrochemical modeling approaches.",
      keywords: ["Battery Analytics", "Gaussian Process Regression", "Electric Vehicles", "Bayesian Optimization", "Prognostics"],
      metrics: {
        mae: "0.0058",
        rmse: "0.0141",
        optimization: "Bayesian"
      },
      status: "Published"
    }
  ]

  const researchInterests = [
    "Machine Learning",
    "Natural Language Processing", 
    "Computer Vision",
    "Deep Learning",
    "Battery Analytics",
    "Misinformation Detection",
    "Edge Computing",
    "AI for Mobility"
  ]

  return (
    <section id="publications" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Publications & Research</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Peer-reviewed publications showcasing research contributions in machine learning, 
            computer vision, and battery analytics
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {publications.map((pub, index) => (
            <Card key={index} className="glass-card hover:shadow-2xl transition-all duration-300 h-full">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <Badge 
                    variant={pub.status === "Published" ? "default" : "secondary"}
                    className="mb-2"
                  >
                    {pub.status}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {pub.type}
                  </Badge>
                </div>
                
                <CardTitle className="text-lg leading-tight mb-4">
                  {pub.title}
                </CardTitle>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{pub.authors.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>{pub.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{pub.year}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Abstract */}
                <div>
                  <h4 className="font-semibold mb-2">Abstract</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pub.abstract}
                  </p>
                </div>

                {/* Keywords */}
                <div>
                  <h4 className="font-semibold mb-2">Keywords</h4>
                  <div className="flex flex-wrap gap-1">
                    {pub.keywords.map((keyword, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div>
                  <h4 className="font-semibold mb-2">Key Results</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {Object.entries(pub.metrics).map(([key, value], idx) => (
                      <div key={idx} className="flex justify-between items-center p-2 bg-muted/50 rounded">
                        <span className="text-xs font-medium capitalize">{key}:</span>
                        <span className="text-xs text-primary font-semibold">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 pt-4">
                  <Button size="sm" className="flex items-center gap-2 flex-1">
                    <ExternalLink className="h-3 w-3" />
                    View Paper
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center gap-2">
                    <Award className="h-3 w-3" />
                    Cite
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Research Interests Card */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Research Interests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Current and future research directions focusing on applied AI/ML solutions for real-world problems.
              </p>
              
              <div className="flex flex-wrap gap-2">
                {researchInterests.map((interest, index) => (
                  <Badge key={index} variant="outline" className="skill-badge">
                    {interest}
                  </Badge>
                ))}
              </div>

              <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                <h4 className="font-semibold text-sm mb-2">Future Work</h4>
                <p className="text-xs text-muted-foreground">
                  Exploring large language models for domain-specific applications, 
                  advancing edge AI deployment, and developing robust misinformation detection systems.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Conference Presentations */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Conference Presentations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">ICAIA 2023</h4>
                  <p className="text-sm text-muted-foreground">
                    Presented research on real-time object detection in low-light environments
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">International Conference</p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">ATCON-1 2023</h4>
                  <p className="text-sm text-muted-foreground">
                    Demonstrated battery health estimation using Gaussian Process Regression
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Technical Conference</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Research Impact</h4>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">2+</div>
                      <div className="text-xs text-muted-foreground">Publications</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">2+</div>
                      <div className="text-xs text-muted-foreground">Conferences</div>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  View All Research
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}