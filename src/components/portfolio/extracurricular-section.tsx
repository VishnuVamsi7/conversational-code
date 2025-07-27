/**
 * Extracurricular Activities Section Component
 * 
 * Showcases leadership roles, mentorship, and community involvement
 * Demonstrates well-rounded personality beyond technical skills
 */

import { Users, Award, Calendar, TrendingUp, Heart, Gamepad2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ExtracurricularSection() {
  const activities = [
    {
      title: "Graduate Mentor",
      organization: "SACNAS-UH",
      period: "2024",
      type: "Mentorship",
      description: "Provided 1:1 mentorship to 10+ undergraduates in research and academics, guiding them through their academic journey and research opportunities.",
      impact: "10+ students mentored",
      skills: ["Leadership", "Mentoring", "Academic Guidance", "Research Support"],
      icon: <Users className="h-5 w-5" />
    },
    {
      title: "Student Council Associate",
      organization: "SRM University",
      period: "2022",
      type: "Leadership",
      description: "Contributed to 5+ campus initiatives focused on student engagement and infrastructure improvements, working with administration to enhance student life.",
      impact: "5+ campus initiatives",
      skills: ["Project Management", "Communication", "Team Collaboration", "Event Planning"],
      icon: <Award className="h-5 w-5" />
    },
    {
      title: "Member",
      organization: "Gaming and Welfare Clubs, SRM University",
      period: "2021",
      type: "Community",
      description: "Organized 8+ events, boosting student engagement by 30%. Coordinated gaming tournaments, welfare drives, and community building activities.",
      impact: "30% engagement boost",
      skills: ["Event Organization", "Community Building", "Marketing", "Volunteer Coordination"],
      icon: <Gamepad2 className="h-5 w-5" />
    }
  ]

  const achievements = [
    {
      metric: "10+",
      description: "Students Mentored",
      icon: <Users className="h-6 w-6" />
    },
    {
      metric: "8+",
      description: "Events Organized",
      icon: <Calendar className="h-6 w-6" />
    },
    {
      metric: "30%",
      description: "Engagement Increase",
      icon: <TrendingUp className="h-6 w-6" />
    },
    {
      metric: "5+",
      description: "Campus Initiatives",
      icon: <Award className="h-6 w-6" />
    }
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Mentorship": return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      case "Leadership": return "bg-green-500/10 text-green-600 border-green-500/20"
      case "Community": return "bg-purple-500/10 text-purple-600 border-purple-500/20"
      default: return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  return (
    <section id="extracurricular" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Leadership & Community</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Beyond technical expertise, I'm passionate about mentoring, leadership, and building inclusive communities
          </p>
        </div>

        {/* Impact Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <Card key={index} className="glass-card text-center hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <div className="flex justify-center mb-3 text-primary">
                  {achievement.icon}
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">
                  {achievement.metric}
                </div>
                <div className="text-sm text-muted-foreground">
                  {achievement.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Activities */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {activities.map((activity, index) => (
            <Card key={index} className="glass-card hover:shadow-2xl transition-all duration-300 h-full">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      {activity.icon}
                    </div>
                    <Badge className={`${getTypeColor(activity.type)} font-medium`}>
                      {activity.type}
                    </Badge>
                  </div>
                </div>
                
                <CardTitle className="text-xl mb-2">{activity.title}</CardTitle>
                
                <div className="space-y-1 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-primary">{activity.organization}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{activity.period}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {activity.description}
                </p>

                {/* Impact */}
                <div className="p-3 bg-primary/5 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Heart className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold">Impact</span>
                  </div>
                  <span className="text-sm text-primary font-medium">{activity.impact}</span>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="font-semibold mb-3 text-sm">Skills Developed</h4>
                  <div className="flex flex-wrap gap-1">
                    {activity.skills.map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Values and Philosophy */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Leadership Philosophy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-3">Mentorship Approach</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  I believe in empowering others through knowledge sharing and providing guidance that helps 
                  individuals discover their own potential. My mentorship style focuses on active listening, 
                  practical advice, and creating opportunities for growth.
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Personalized guidance for each mentee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Focus on research and academic excellence</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Building confidence and technical skills</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Community Building</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Creating inclusive environments where everyone can contribute and grow is essential. 
                  Through organizing events and leading initiatives, I've learned the importance of 
                  collaboration, communication, and fostering a sense of belonging.
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Inclusive event planning and execution</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Cross-functional team collaboration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Driving measurable engagement outcomes</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}