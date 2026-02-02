"use client"

import { SocialIcons } from '@/components/social-icons';

import { Footer } from '@/components/sections/footer-section';
import { HeroSection } from '@/components/sections/hero-section';
import { FeatureProjectsSection } from '@/components/sections/projects-section';
import { Service3DCard } from "@/components/sections/service-3d-card";
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { services } from "@/constants/my-services";
import { sectionContent } from "@/constants/section-content";
import { MapPin, Phone, } from 'lucide-react';
import { Rocket, Target, Users, Lightbulb, Briefcase, GraduationCap, Heart, Github, Linkedin, Mail, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Frameworks } from "@/components/framework";
import {Globe} from "@/components/globe";

interface MainContentProps {
}

export const MainContent: React.FC<MainContentProps> = ({

}) => {
  const currentSection = sectionContent.services
  const contactSection = sectionContent.contact
  const aboutSection = sectionContent.about

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
  return (

    <div >

      <SocialIcons />
      <HeroSection />
      {/* Services Grid */}
      <SectionWrapper
        id={aboutSection.id}
        title={aboutSection.title}
        subTitle={aboutSection.subtitle}
        description={aboutSection.description}
      ><div className="max-w-7xl mx-auto">
            {/* Magazine-style Layout */}
            <div className="grid grid-cols-12 gap-6">


              {/* Left Column */}
              <div className="col-span-12 md:col-span-4 space-y-6">
                <div className="glass rounded-2xl p-6 glass-hover">
                  <h3 className="text-xl font-bold mb-4">Quick Facts</h3>
                  <div className="space-y-3">
                    {[
                      { label: "Location", value: "Pakistan, Lahore PK" },
                      { label: "Experience", value: "5+ Years" },
                      { label: "Specialization", value: "Mobile Applications" },
                      { label: "Favorite Language", value: "Flutter,Kotlin" },
                    ].map((fact) => (
                      <div key={fact.label} className="flex justify-between">
                        <span className="text-muted-foreground">{fact.label}</span>
                        <span className="font-semibold text-sky-400">{fact.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass rounded-2xl p-6 glass-hover">
                  <h3 className="text-xl font-bold mb-4">Current Focus</h3>
                  <div className="space-y-3">
                    {["iOS Swift Programming", "Backend Technologies", "Performance Optimization"].map((focus) => (
                      <div key={focus} className="glass-subtle rounded-lg p-3">
                        <span className="text-sm">{focus}</span>
                      </div>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-4 mt-4">Specialization</h3>

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
                    {["Kotlin", "Flutter (Dart)", "Java", "Code Optimization", "Android Tv", "Firebase", "Payment Gateways", "Analytics Tools", "Bloc","LiveData","Flows","Coroutines","State Management","Dagger/Hilt","Flutter DI","Socket.IO","Android VPN","Twilio"].map(
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
                       { metric: "10+", label: "Projects" },
                      { metric: "10+", label: "Happy Clients" },
                      { metric: "3300+", label: "Linkedin Followers" },
                      { metric: "5+", label: "Certifications" },
                    ].map((achievement) => (
                      <div key={achievement.label} className="text-center glass-subtle rounded-lg p-3">
                        <div className="text-2xl font-bold text-sky-400">{achievement.metric}</div>
                        <div className="text-sm text-muted-foreground">{achievement.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass rounded-2xl p-6 glass-hover">

                  <h3 className="text-xl font-bold mb-4 text-sky-400">Creative Process</h3>
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
            {/* Grid 3 - Time Zone with Space Theme */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 md:p-8 max-w-7xl mx-auto">
  
  {/* Grid 3 - Time Zone with Globe */}
  <div className="grid-item col-span-1 md:col-span-2 relative group overflow-hidden rounded-2xl">
    {/* Background */}
    <div className="absolute inset-0 backdrop-blur-xl bg-black/20 border border-white/10 group-hover:border-white/20 transition-all duration-300"></div>
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 to-black/60"></div>
    
    {/* Content */}
    <div className="grid-content relative z-10 p-6 md:p-8 h-full flex flex-col justify-center">
      <div className="w-[60%] md:w-[50%]">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Time Zone</span>
        </h3>
        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
          I'm based in Asia GMT+5 (Lahore, Pakistan), and open to work remotely.
        </p>
      </div>
    </div>
    
    {/* Enhanced Globe Positioning */}
    <figure className="absolute right-4 top-4 md:left-[40%] md:top-[15%] opacity-90 group-hover:opacity-100 transition-opacity duration-500">
      <Globe className={''} />
    </figure>
  </div>

  {/* Grid 4 - Contact CTA with Space Theme */}
  <div className="grid-item col-span-1 md:col-span-2 relative group overflow-hidden rounded-2xl">
    {/* Background */}
    <div className="absolute inset-0 backdrop-blur-xl bg-black/20 border border-white/10 group-hover:border-white/20 transition-all duration-300"></div>
    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-pink-900/40"></div>
    
    {/* Background Glow */}
    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity duration-500"></div>
    
    {/* Content */}
    <div className="grid-content relative z-10 flex flex-col items-center justify-center gap-6 h-full p-6 text-center">
      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight max-w-sm">
        Ready to start a project together?
      </h3>
      <p className="text-purple-200 text-sm md:text-base max-w-xs">
        Let's collaborate and build something amazing
      </p>
      {/* <CopyEmailButton /> */}
    </div>
    
    {/* Decorative Elements */}
    <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl"></div>
    <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-lg"></div>
  </div>

  {/* Grid 5 - Tech Stack with Space Theme */}
  <div className="grid-item col-span-1 md:col-span-2 relative group overflow-hidden rounded-2xl">
    {/* Background */}
    <div className="absolute inset-0 backdrop-blur-xl bg-black/20 border border-white/10 group-hover:border-white/20 transition-all duration-300"></div>
    <div className="absolute inset-0 bg-gradient-to-br from-slate-800/40 to-slate-900/60"></div>
    
    {/* Content */}
    <div className="grid-content relative z-10 p-6 md:p-8 h-full flex flex-col justify-center">
      <div className="w-[50%]">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Tech Stack</span>
        </h3>
        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
          I specialize in a variety of languages, frameworks, and tools that
          allow me to build robust and scalable applications
        </p>
      </div>
    </div>
    
    {/* Frameworks Component with Better Positioning */}
    <div className="absolute inset-y-4 md:inset-y-8 w-full h-full start-[45%] md:scale-110 opacity-90 group-hover:opacity-100 transition-opacity duration-500">
      <Frameworks />
    </div>
  </div>
</div>
            <div className="grid lg:grid-cols-2 gap-16 mt-6">
              <div className="space-y-8">
                                {/* <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"> */}

                <div className="bg-white/5  rounded-2xl p-8 border border-white/10">
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
                <div className="bg-white/5  rounded-2xl p-8 border border-white/10">

                {/* <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"> */}
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
                <div className="bg-white/5 rounded-2xl p-8 border border-white/10">

                {/* <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"> */}
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
            <div className="grid md:grid-cols-4 gap-6 mt-6">
              {values.map((value, index) => (
                                <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">

                {/* <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center"> */}
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{value.title}</h4>
                  <p className="text-gray-400 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
      </SectionWrapper>
      <SectionWrapper
        id={currentSection.id}
        title={currentSection.title}
        subTitle={currentSection.subtitle}
        description={currentSection.description}
      >
        {/* Services Grid */}
        <div className="relative">
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`}>
            {services.map((service, index) => (
              <div
                key={service.id}
                className="transform hover:scale-110 hover:-translate-y-4 transition-all duration-700 "
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Service3DCard service={service} />
              </div>
            ))}
          </div>
        </div>

      </SectionWrapper>
      <FeatureProjectsSection />
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-4xl md:text-5xl  text-center lg:max-w-[45vw]">
          Ready to take <span className="text-blue-300">your</span> digital
          presence to the next level?
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Reach out to me today and let&apos;s discuss how I can help you
          achieve your goals.
        </p>
         <Button
                className="bg-white/10  border border-white/20 text-white hover:bg-white/20 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl transition-all duration-300"
                // className="bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl transition-all duration-300"
                onClick={() => window.open("https://www.hackerrank.com/certificates/794ccb84d359", "_blank")}
              >
                
                Let's get in touch
              </Button>
      
      </div>
      <SectionWrapper
        id={contactSection.id}
        title={contactSection.title}
        subTitle={contactSection.subtitle}
        description={contactSection.description}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       
                    <div className="grid lg:grid-cols-2 gap-0 bg-white/5 border border-white/10 rounded-[4rem] overflow-hidden shadow-2xl">

            {/* <div className="grid lg:grid-cols-2 gap-0 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[4rem] overflow-hidden shadow-2xl"> */}
              {/* LEFT CONTENT */}
              <div className="p-16 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                <div className="h-full flex flex-col justify-center">
                                    <div className="w-20 h-20 bg-white/15  border border-white/25 rounded-2xl flex items-center justify-center mb-8">

                  {/* <div className="w-20 h-20 bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl flex items-center justify-center mb-8"> */}
                    <Wind className="w-10 h-10 text-blue-300" />
                  </div>
                  <h2 className="text-5xl font-light text-white mb-6">Let's Talk</h2>
                  <p className="text-white/70 text-lg mb-12">
                    Transform your ideas into reality with ethereal design
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-center">
                      <MapPin className="w-6 h-6 text-blue-300 mr-4" />
                      <span className="text-white/80">Available Worldwide</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-6 h-6 text-blue-300 mr-4" />
                      <span className="text-white/80">Response within 24h</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT CONTENT */}
              <div className="p-16">
                <div className="space-y-8">
                  {[
                    {
                      gradient: "from-purple-500/20 to-pink-500/20",
                      icon: Mail,
                      label: "Email",
                      value: "mughal963@gmail.com",
                      color: "text-blue-300",
                      shape: "rounded-tl-[3rem] rounded-br-[3rem]", // top card
                    },
                    {
                      gradient: "from-blue-500/20 to-cyan-500/20",
                      icon: Linkedin,
                      label: "LinkedIn",
                      value: "@awais963",
                      color: "text-purple-300",
                      shape: "rounded-[2rem]", // middle card
                    },
                    {
                      gradient: "from-green-500/20 to-teal-500/20",
                      icon: Github,
                      label: "GitHub",
                      value: "@awais963",
                      color: "text-green-300",
                      shape: "rounded-bl-[3rem] rounded-tr-[3rem]", // bottom card
                    },
                  ].map(({ icon: Icon, label, value, color, shape, gradient }) => (
                    <div
                      key={label}
                      className={`bg-gradient-to-r ${gradient}  border border-white/15 ${shape} p-8 hover:bg-white/15 transition-all group`}
                                            // className={`bg-gradient-to-r ${gradient} backdrop-blur-xl border border-white/15 ${shape} p-8 hover:bg-white/15 transition-all group`}

                    >
                      <div className="flex items-center">
                                                <div className="w-16 h-16 bg-white/10  border border-white/20 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform">

                        {/* <div className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform"> */}
                          <Icon className={`w-8 h-8 ${color}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white text-xl mb-1">{label}</h3>
                          <p className="text-white/70">{value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

      </SectionWrapper>
      
      <Footer />
    </div>
  )
};