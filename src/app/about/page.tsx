import Link from "next/link";

import {  Rocket, Target, Users, Lightbulb ,Briefcase, GraduationCap, Heart ,Github, Linkedin, Mail, ExternalLink, Snowflake, Wind, Cloud, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"
export default function AboutSection() {
 const values = [
    {
      icon: Rocket,
      title: "Innovation",
      description: "Always pushing boundaries and exploring new technologies",
    },
    {
      icon: Target,
      title: "Precision",
      description: "Attention to detail in every line of code and design decision",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Believing that the best solutions come from working together",
    },
    {
      icon: Lightbulb,
      title: "Creativity",
      description: "Finding unique solutions to complex problems",
    },
  ]
   const timeline = [
    {
      year: "2024 - Present",
      title: "Senior Mobile App Developer",
      company: "Egora Pvt Ltd",
      description: "Leading development of CrossPlatform applications",
    },
    {
      year: "2022",
      title: "Software Engineer Android Developer",
      company: "Healthwire Pvt Ltd",
      description: "Built MVP and scaled to 10k+ users",
    },
    {
      year: "2020",
      title: "Senior Android Developer",
      company: "Dongamers Pvt Ltd",
      description: "Created responsive websites for various clients",
    },
    {
      year: "2019",
      title: "Android Developer Intern",
      company: "Netroots Technologies LLC",
      description: "Graduated with honors, specialized in software engineering",
    },
  ]
  return (<div>

   <div className="text-center mb-20">
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 inline-block shadow-2xl">
            <h2 className="text-5xl font-light text-white mb-4">
              Featured Works
            </h2>
            <p className="text-white/70">Crafted with precision and care</p>
          </div>
        </div>
   
    <section >
      <div className="max-w-7xl mx-auto">
        {/* Magazine-style Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Header Span */}
          <div className="col-span-12 glass rounded-3xl p-12 glass-hover">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3">
                <div className="w-40 h-40 bg-gradient-to-br from-violet-500 to-blue-600 rounded-3xl"></div>
              </div>
              <div className="md:w-2/3">
                <div className="glass-subtle rounded-full px-6 py-2 inline-block mb-4">
                  <span className="text-violet-400 font-semibold">Featured Developer</span>
                </div>
                <h1 className="text-5xl font-bold mb-4 leading-tight">
                  Meet{" "}
                  <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                    Jordan Smith
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  A passionate full-stack developer who believes in the power of clean code, beautiful design, and
                  meaningful user experiences.
                </p>
                 <div className="flex flex-wrap gap-3">
                {["Problem Solver", "Team Player", "Continuous Learner", "Open Source Contributor"].map((trait) => (
                  <span
                    key={trait}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-300 rounded-lg text-sm border border-blue-400/30"
                  >
                    {trait}
                  </span>
                ))}
              </div>
              </div>
            </div>
          </div>

          {/* Left Column */}
          <div className="col-span-12 md:col-span-4 space-y-6">
            <div className="glass rounded-2xl p-6 glass-hover">
              <h3 className="text-xl font-bold mb-4">Quick Facts</h3>
              <div className="space-y-3">
                {[
                  { label: "Location", value: "San Francisco, CA" },
                  { label: "Experience", value: "7+ Years" },
                  { label: "Specialization", value: "Full Stack" },
                  { label: "Favorite Language", value: "TypeScript" },
                ].map((fact) => (
                  <div key={fact.label} className="flex justify-between">
                    <span className="text-muted-foreground">{fact.label}</span>
                    <span className="font-semibold text-violet-400">{fact.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-6 glass-hover">
              <h3 className="text-xl font-bold mb-4">Current Focus</h3>
              <div className="space-y-3">
                {["AI Integration", "Web3 Technologies", "Performance Optimization"].map((focus) => (
                  <div key={focus} className="glass-subtle rounded-lg p-3">
                    <span className="text-sm">{focus}</span>
                  </div>
                ))}
              </div>
                            <h3 className="text-xl font-bold mb-4">Specialization</h3>

              <div className="space-y-3">
                {["Cross Platform Apps", "Android Mobile Tv/Apps", "Performance Optimization"].map((focus) => (
                  <div key={focus} className="glass-subtle rounded-lg p-3">
                    <span className="text-sm">{focus}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center Column */}
          <div className="col-span-12 md:col-span-5 space-y-6">
            <div className="glass rounded-2xl p-8 glass-hover">
              <h3 className="text-2xl font-bold mb-6">My Story</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Started my journey as a curious kid who loved taking apart electronics. Fast forward to today, and I'm
                  building digital products that impact thousands of users daily.
                </p>
                <p>
                  I believe in writing code that's not just functional, but elegant and maintainable. Every project is
                  an opportunity to learn something new and push the boundaries of what's possible.
                </p>
                <p>
                  When I'm not coding, you'll find me hiking, experimenting with new recipes, or contributing to open
                  source projects.
                </p>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 glass-hover">
              <h3 className="text-xl font-bold mb-4">Tech Arsenal</h3>
              <div className="grid grid-cols-3 gap-3">
                {["React", "Node.js", "Python", "PostgreSQL", "AWS", "Docker", "TypeScript", "GraphQL", "Redis"].map(
                  (tech) => (
                    <div key={tech} className="glass-subtle rounded-lg p-2 text-center text-sm">
                      {tech}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-12 md:col-span-3 space-y-6">
            <div className="glass rounded-2xl p-6 glass-hover">
              <h3 className="text-xl font-bold mb-4">Achievements</h3>
              <div className="space-y-4">
                {[
                  { metric: "200+", label: "Projects" },
                  { metric: "50+", label: "Happy Clients" },
                  { metric: "10k+", label: "GitHub Stars" },
                  { metric: "5", label: "Awards" },
                ].map((achievement) => (
                  <div key={achievement.label} className="text-center glass-subtle rounded-lg p-3">
                    <div className="text-2xl font-bold text-violet-400">{achievement.metric}</div>
                    <div className="text-sm text-muted-foreground">{achievement.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-6 glass-hover">
              
              <h3 className="text-xl font-bold mb-4 text-violet-400">Creative Process</h3>
                <div className="space-y-3">
                  {["Ideation & Research", "Design & Prototyping", "Development & Testing", "Launch & Iterate"].map(
                    (step, index) => (
                      <div key={step} className="flex items-center gap-3">
                        <div className="w-8 h-8 glass-strong rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <span className="text-muted-foreground">{step}</span>
                      </div>
                    ),
                  )}
                </div>
            </div>
          </div>
        </div>
         <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Professional</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                With 5+ years in the industry, I've worked with startups and enterprises, building everything from MVPs
                to large-scale applications. I specialize in React, Node.js, and cloud technologies.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Education</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Computer Science graduate with a focus on software engineering. Continuously learning through online
                courses, conferences, and hands-on projects. Certified in AWS and Google Cloud Platform.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Personal</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Outside of coding, I enjoy hiking, photography, and playing guitar. I'm passionate about mentoring
                junior developers and contributing to open-source projects that make a positive impact.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-white mb-8">My Journey</h3>
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
                    {index < timeline.length - 1 && (
                      <div className="w-0.5 h-16 bg-gradient-to-b from-blue-400/50 to-transparent mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="text-sm text-blue-400 font-medium mb-1">{item.year}</div>
                    <h4 className="text-lg font-semibold text-white mb-1">{item.title}</h4>
                    <div className="text-gray-400 text-sm mb-2">{item.company}</div>
                    <p className="text-gray-300 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
         <div className="grid md:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">{value.title}</h4>
              <p className="text-gray-400 text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    
    {/* Frosted Hero */}
    <section className="min-h-screen flex items-center justify-center pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-12 shadow-2xl">
              <div className="space-y-6">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center">
                  <Snowflake className="w-10 h-10 text-blue-300" />
                </div>

                <h1 className="text-6xl lg:text-7xl font-light leading-tight">
                  <span className="text-white">Frosted</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">Design</span>
                </h1>

                <p className="text-xl text-white/70 leading-relaxed">
                  Creating ethereal digital experiences with layers of frosted glass and subtle elegance.
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button className="bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 px-8 py-4 rounded-2xl">
                <Wind className="w-5 h-5 mr-2" />
                Explore Work
              </Button>
              <Button className="bg-gradient-to-r from-blue-300/20 to-cyan-300/20 backdrop-blur-xl border border-blue-300/30 text-blue-200 hover:bg-blue-300/30 px-8 py-4 rounded-2xl">
                Get in Touch
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Cloud, label: "Cloud Native", desc: "Scalable solutions" },
                { icon: Wind, label: "Performance", desc: "Lightning fast" },
                { icon: Sun, label: "Bright Ideas", desc: "Creative thinking" },
                { icon: Snowflake, label: "Unique Design", desc: "One of a kind" }
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all group">
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-blue-300" />
                  </div>
                  <h3 className="font-medium text-white text-lg mb-2">{label}</h3>
                  <p className="text-white/60 text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Frosted Projects */}
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 inline-block shadow-2xl">
            <h2 className="text-5xl font-light text-white mb-4">
              Featured Works
            </h2>
            <p className="text-white/70">Crafted with precision and care</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Ethereal Dashboard", gradient: "from-blue-200/30 to-cyan-200/30" },
            { title: "Misty Interface", gradient: "from-cyan-200/30 to-sky-200/30" },
            { title: "Frosted CMS", gradient: "from-sky-200/30 to-blue-300/30" },
            { title: "Glass Navigation", gradient: "from-blue-300/30 to-indigo-300/30" },
            { title: "Crystal Forms", gradient: "from-indigo-300/30 to-purple-300/30" },
            { title: "Vapor UI", gradient: "from-purple-300/30 to-blue-300/30" }
          ].map((project, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl hover:bg-white/10 transition-all group">
              <div className={`h-56 bg-gradient-to-br ${project.gradient} relative`}>
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Snowflake className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-xl font-medium text-white">{project.title}</h3>
                </div>
              </div>
              <div className="p-8">
                <div className="flex space-x-4">
                  <Button size="sm" className="bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 rounded-2xl flex-1">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button size="sm" className="bg-white/5 backdrop-blur-xl border border-white/10 text-white/70 hover:bg-white/10 rounded-2xl">
                    <Github className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Frosted Contact */}
    <section className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-16 shadow-2xl">
          <div className="text-center mb-16">
            <div className="w-24 h-24 mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl flex items-center justify-center mb-8">
              <Wind className="w-12 h-12 text-blue-300" />
            </div>
            <h2 className="text-5xl font-light text-white mb-6">
              Let's Create Together
            </h2>
            <p className="text-white/70 text-lg">Ready to craft something beautiful and ethereal?</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Mail, label: "Email", value: "hello@frosted.design" },
              { icon: Linkedin, label: "LinkedIn", value: "@frosteddesign" },
              { icon: Github, label: "GitHub", value: "@frosteddev" }
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all group text-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-blue-300" />
                </div>
                <h3 className="font-medium text-white mb-3">{label}</h3>
                <p className="text-white/60 text-sm">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </div>);
}