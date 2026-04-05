import { motion } from "framer-motion";
import { Rocket, Target, MapPin, Cpu, Users, Lightbulb } from "lucide-react";
import { Globe } from "@/components/ui/globe";
import { Frameworks } from "@/components/sections/tech-stack";
import { ExpandableJourney } from "@/components/sections/journey-section";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { systemInitVariants } from "@/lib/animations";
import portfolioData from "@/data/portfolio.json";

export const AboutSection = () => {
  const aboutSection = portfolioData.sections.about;

  return (
    <SectionWrapper
      id={aboutSection.id}
      title={aboutSection.title}
      subTitle={aboutSection.subtitle}
      description={aboutSection.description}
    >
      <motion.div
        variants={systemInitVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* TOP SECTION: Command Center (Bio, Location, Metrics) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Core Bio Panel (HUD Command Center) */}
          <motion.div
            variants={systemInitVariants}
            className="lg:col-span-2 glass-strong rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden group shadow-2xl flex flex-col justify-between"
          >

            <div>
              <h3 className="text-3xl md:text-4xl font-black mb-8 text-white tracking-tighter uppercase italic">
                {portfolioData.profile.aboutBio.heading}
              </h3>

              <div className="space-y-6 text-gray-400 leading-relaxed font-medium text-base md:text-lg relative z-10">
                {portfolioData.profile.aboutBio.paragraphs.map((para, idx) => (
                  <p key={idx}>
                    {para.split(/(\*\*.*?\*\*)/g).map((part, i) =>
                      part.startsWith("**") && part.endsWith("**") ? (
                        <strong key={i} className="text-primary font-bold">{part.slice(2, -2)}</strong>
                      ) : part
                    )}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {portfolioData.profile.aboutBio.bulletPoints.map((point, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 group/point hover:bg-white/10 transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary group-hover/point:scale-150 transition-transform" />
                  <span className="text-[10px] font-bold text-gray-400 group-hover/point:text-white transition-colors uppercase tracking-widest">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* COLUMN 3: Intelligence & Presence Module (Location + Tech Stack) */}
          <motion.div
            variants={systemInitVariants}
            className="lg:col-span-1 flex flex-col glass-strong rounded-3xl border border-white/10 overflow-hidden shadow-2xl group"
          >
            {/* TOP HALF: Location Hub */}
            <div className="relative h-1/2 overflow-hidden bg-background group/loc">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08)_0%,transparent_70%)]" />
              <div className="absolute top-0 right-0 w-full h-full -mr-20 -mt-20 opacity-40 group-hover/loc:opacity-80 transition-opacity duration-1000 pointer-events-none scale-150">
                <Globe className="w-full h-full" />
              </div>
              <div className="absolute bottom-0 left-0 p-6 z-10 w-full bg-gradient-to-t from-background via-background/60 to-transparent">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-primary animate-pulse" />
                  </div>
                  <h4 className="text-white font-black text-lg tracking-tighter uppercase italic">Location</h4>
                </div>
                <p className="text-gray-400 text-[10px] font-mono font-bold uppercase tracking-widest truncate">
                  {portfolioData.profile.location}
                </p>
              </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent relative" />

            {/* BOTTOM HALF: TECH_STACK (Futuristic Upgrade) */}
            <div className="relative h-1/2 overflow-hidden flex flex-col justify-center bg-background/50 group/tech border-t border-white/5">
              {/* Futuristic HUD Brackets */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-primary/30 group-hover/tech:border-primary transition-colors z-20" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-primary/30 group-hover/tech:border-primary transition-colors z-20" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-primary/30 group-hover/tech:border-primary transition-colors z-20" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-primary/30 group-hover/tech:border-primary transition-colors z-20" />

              {/* Scanline Effect */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_2px,3px_100%] opacity-20" />

              {/* Header Module */}
              <div className="z-20 absolute top-4 left-6">
                <div className="flex items-center gap-2 mb-1">
                  <div className="relative">
                    <Cpu className="w-3 h-3 text-primary group-hover/tech:rotate-90 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-primary/40 blur-sm animate-pulse rounded-full" />
                  </div>
                  <h4 className="text-[10px] font-black text-white tracking-widest uppercase italic flex items-center gap-2">
                    TECH_STACK
                    <span className="inline-block w-1 h-1 rounded-full bg-primary animate-ping" />
                  </h4>
                </div>

              </div>

              {/* Data Stream (Sidebar Decoration) */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-20 group-hover/tech:opacity-40 transition-opacity z-20">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className={`h-1 w-1 rounded-full ${i % 2 === 0 ? 'bg-primary' : 'bg-gray-600'}`} />
                ))}
              </div>

              <div className="absolute inset-0 flex items-center justify-center origin-center translate-y-2 z-10">
                <Frameworks compact={true} />
              </div>

              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover/tech:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover/tech:scale-x-100 transition-transform duration-700" />
            </div>
          </motion.div>

          {/* COLUMN 4: Core Metrics Matrix */}
          <motion.div variants={systemInitVariants} className="lg:col-span-1 grid grid-cols-1 gap-6">
            {[
              { metric: portfolioData.profile.achievements.projects, label: "Deployments", color: "blue" },
              { metric: portfolioData.profile.achievements.clients, label: "Stakeholders", color: "purple" },
              { metric: portfolioData.profile.achievements.followers, label: "Engagement", color: "cyan" },
              { metric: portfolioData.profile.achievements.certifications, label: "Validation", color: "indigo" },
            ].map((achievement, index) => (
              <div
                key={achievement.label}
                className="relative flex flex-col justify-center items-center text-center rounded-2xl border border-white/10 p-6 bg-white/5 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-500 group overflow-hidden"
              >
                <div className="text-4xl font-black text-white mb-2 group-hover:scale-110 transition-transform tracking-tighter">
                  {achievement.metric}
                </div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-black group-hover:text-blue-400 transition-colors">
                  {achievement.label}
                </div>
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-blue-500 w-0 group-hover:w-full transition-all duration-700"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* MIDDLE SECTION: Digital Arsenal (Simplified High-Precision Skills) */}
        <motion.div
          variants={systemInitVariants}
          className="glass-strong bg-white/5 rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h4 className="text-2xl font-black text-white tracking-tighter uppercase italic">Digital_Arsenal</h4>
                <p className="text-gray-500 text-[8px] font-mono font-bold uppercase tracking-[0.3em]">
                  Core Proficiency Matrix // All Systems Optimized
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {portfolioData.profile.quickFacts.map((fact) => (
                <div key={fact.label} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-[8px] font-mono text-gray-500 uppercase tracking-widest">
                  {fact.label}: {fact.value}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 relative z-10">
            {portfolioData.profile.techArsenal.map((tech) => (
              <motion.div
                key={tech}
                variants={systemInitVariants}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-gray-300 hover:text-white hover:border-primary/30 transition-all cursor-default flex items-center gap-3 group/skill shadow-sm"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover/skill:bg-primary transition-colors" />
                {tech}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Professional Journey Hub */}
        <motion.div variants={systemInitVariants}>
          <ExpandableJourney data={portfolioData.profile.timeline} />
        </motion.div>

        {/* BOTTOM SECTION: Operational Directives */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {portfolioData.profile.values.map((value, index) => {
            const Icon = index === 0 ? Rocket : index === 1 ? Target : index === 2 ? Users : Lightbulb;
            return (
              <motion.div
                key={index}
                variants={systemInitVariants}
                className="group relative bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl p-8 hover:bg-primary/5 hover:border-primary/20 transition-all duration-500 overflow-hidden"
              >
                {/* Sector Corners */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-white/20 group-hover:border-primary/50 transition-colors" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-white/20 group-hover:border-primary/50 transition-colors" />

                <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-secondary/10 border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-primary/30 transition-all relative overflow-hidden">
                  <Icon className="w-6 h-6 text-primary group-hover:rotate-12 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <h4 className="text-lg font-black text-white tracking-tighter uppercase italic">{value.title}</h4>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed font-medium">
                  {value.description}
                </p>

                {/* Micro-Scanner Sweep */}
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-primary/40"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                />
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </SectionWrapper>
  );
};
