/**
 * Experience Section Component
 * 
 * Displays professional work experience and research positions
 * Features timeline design with detailed descriptions of achievements
 */

import { Calendar, MapPin, ExternalLink, Award, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function ExperienceSection() {
  const experiences = [
    {
      title: "AI/ML Research Intern",
      company: "Grandios Mobility",
      location: "Remote",
      period: "Aug 2024 – Present",
      type: "Internship",
      achievements: [
        "Proposed AI integration strategies to align product roadmap with mobility innovation goals",
        "Partnered with cross-functional teams to accelerate timelines by 10% through automation and ML-driven feature planning",
        "Contributed to the development of the core Flutter-based app, improving cross-platform performance and reducing UI/UX issues by 25%",
        "Engineered an ML-based voice-to-ride-booking pipeline using speech-to-text transcription and NLP, enabling hands-free ride scheduling in the driver app"
      ],
      skills: ["Flutter", "NLP", "Speech-to-Text", "ML Pipeline", "Cross-platform Development"]
    },
    {
      title: "Instructional Assistant – Web Development & CMS",
      company: "University of Houston",
      location: "Houston, TX",
      period: "Sep 2024 – May 2025",
      type: "Academic",
      achievements: [
        "Collaborated with the Director of Communications to modernize university pages using HTML, CSS, and WordPress, improving accessibility and design responsiveness",
        "Migrated and streamlined 15+ web pages, reducing content update cycles by 40% through reusable CMS templates and structured layout guidelines",
        "Enhanced site usability by identifying bottlenecks and implementing front-end fixes, contributing to a 30% improvement in website load times",
        "Integrated AI-based content analysis tools to auto-summarize and organize faculty materials, reducing manual formatting time by 40% and accelerating web update workflows"
      ],
      skills: ["WordPress", "HTML/CSS", "CMS", "AI Content Analysis", "Web Optimization"]
    },
    {
      title: "NLP Research Assistant",
      company: "University of Houston",
      location: "Houston, TX",
      period: "Jan 2024 – July 2024",
      type: "Research",
      achievements: [
        "Investigated rising misinformation in 'pink slime' journalism by analyzing 600k+ news article sentences across multiple categories to detect deceptive patterns in textual style and structure",
        "Built an NLP pipeline using Python, NLTK, SpaCy, and TextBlob to extract stylistic features, applied TF-IDF vectorization and dimensionality reduction",
        "Produced a clean, labeled dataset of 27K sentences, uncovered up to 8 distinct clusters in categories like Politics and Business. Pink slime articles exhibited 3× sentiment exaggeration, lower linguistic diversity",
        "Discovered that pink slime journalism favors overly positive tone, minimal sentence depth, and active voice dominance. Visualizations (t-SNE, heatmaps, boxplots) revealed stark readability and stylistic contrasts"
      ],
      skills: ["Python", "NLTK", "SpaCy", "TextBlob", "TF-IDF", "t-SNE", "Data Visualization"]
    },
    {
      title: "Data Science Intern",
      company: "Yoshops",
      location: "Remote",
      period: "April 2023 - June 2023",
      type: "Internship",
      achievements: [
        "Automated the data validation process for product listings using Python; built a script to detect missing product images and output details into a structured Excel report, reducing manual QA time by 75%",
        "Conducted end-to-end web scraping using BeautifulSoup and Requests to extract product metadata, contact details, and address info from dynamic HTML pages",
        "Performed exploratory data analysis (EDA) to identify anomalies, optimize data pipelines, and validate integrity across scraped datasets",
        "Demonstrated strong creative problem-solving by designing scalable scraping and validation routines adaptable to evolving site structures and large product inventories"
      ],
      skills: ["Python", "BeautifulSoup", "Web Scraping", "EDA", "Data Validation", "Excel Automation"]
    },
    {
      title: "Research Assistant",
      company: "SRM University AP",
      location: "Andhra Pradesh, India",
      period: "Aug 2022 - March 2023",
      type: "Research",
      achievements: [
        "Addressed the challenge of poor visibility in night surveillance by designing a real-time object detection system tailored for low-light environments",
        "Developed and fine-tuned a lightweight deep learning pipeline using SSD with MobileNetV2, enabling object detection on mobile and edge devices under varied weather conditions",
        "Achieved object detection accuracy ranging from 12% to 64%, with inference times < 0.35 sec/image, validating its efficiency for real-world deployment",
        "Enhanced detection robustness through anchor box matching, receptive field scaling, and bounding box regression across varying object sizes and scenes"
      ],
      skills: ["Deep Learning", "SSD", "MobileNetV2", "Object Detection", "Edge Computing", "Computer Vision"],
      publication: true
    },
    {
      title: "Machine Learning Researcher",
      company: "SRM University AP",
      location: "Andhra Pradesh, India",
      period: "Jan 2020 - May 2021",
      type: "Research",
      achievements: [
        "Tackled the challenge of accurately estimating the State of Health (SOH) of lithium-ion batteries in electric vehicles by adopting a data-driven approach over complex electrochemical modeling",
        "Developed and optimized a probabilistic Gaussian Process Regression (GPR) model using Python (scikit-learn) and MATLAB, leveraging Bayesian inference to generate both predictions and uncertainty estimates",
        "Refined hyperparameters with Bayesian optimization, minimizing RMSE and MAE across prediction points; achieved a minimum MAE of 0.0058 and RMSE of 0.0141 on battery B0007, outperforming baselines",
        "Co-authored peer-reviewed publication, showcasing the robustness of GPR for real-time battery prognostics; presented findings at ICAIA 2023 and ATCON-1 conferences"
      ],
      skills: ["Gaussian Process Regression", "Bayesian Optimization", "Python", "MATLAB", "Time Series", "Battery Analytics"],
      publication: true
    }
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Internship": return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      case "Academic": return "bg-green-500/10 text-green-600 border-green-500/20"
      case "Research": return "bg-purple-500/10 text-purple-600 border-purple-500/20"
      default: return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Work Experience</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            5+ years of hands-on experience in AI/ML research, software development, and data science across various domains
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-primary/20"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10"></div>

                {/* Content card */}
                <div className={`flex-1 ml-12 md:ml-0 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <Card className="glass-card hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <CardHeader>
                      <div className="flex flex-wrap items-start gap-3 mb-4">
                        <Badge className={`${getTypeColor(exp.type)} font-medium`}>
                          {exp.type}
                        </Badge>
                        {exp.publication && (
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Award className="h-3 w-3" />
                            Published
                          </Badge>
                        )}
                      </div>
                      
                      <CardTitle className="text-2xl mb-2">{exp.title}</CardTitle>
                      
                      <div className="space-y-2 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-primary">{exp.company}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm">{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">{exp.location}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Achievements */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Award className="h-4 w-4 text-primary" />
                          Key Achievements
                        </h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Skills */}
                      <div>
                        <h4 className="font-semibold mb-3">Technologies & Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, idx) => (
                            <Badge key={idx} variant="secondary" className="skill-badge text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Publication link for research positions */}
                      {exp.publication && (
                        <Button variant="outline" size="sm" className="flex items-center gap-2 mt-4">
                          <ExternalLink className="h-3 w-3" />
                          View Publication
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}