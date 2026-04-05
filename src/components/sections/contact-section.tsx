"use client";

import { Mail, Linkedin, Github, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import portfolioData from "@/data/portfolio.json";
import { motion } from "framer-motion";
import { systemInitVariants } from "@/lib/animations";

export const ContactSection = () => {
  const contactSection = portfolioData.sections.contact;

  const contactOptions = [
    {
      icon: Mail,
      label: "Direct_Email",
      value: portfolioData.profile.contact.email,
      meta: "UPLINK_01",
      color: "text-primary",
      glow: "shadow-primary/20",
    },
    {
      icon: Linkedin,
      label: "Social_Node_LI",
      value: portfolioData.profile.contact.linkedin.split('/').pop(),
      meta: "UPLINK_02",
      color: "text-secondary",
      glow: "shadow-secondary/20",
    },
    {
      icon: Github,
      label: "Source_Node_GH",
      value: portfolioData.profile.contact.github.split('/').pop(),
      meta: "UPLINK_03",
      color: "text-accent",
      glow: "shadow-accent/20",
    },
  ];

  const getHref = (label: string, value: string) => {
    if (label === 'Direct_Email') return `mailto:${value}`;
    if (label === 'Social_Node_LI') return value.startsWith('http') ? value : `https://linkedin.com/in/${value.replace('@', '')}`;
    if (label === 'Source_Node_GH') return value.startsWith('http') ? value : `https://github.com/${value.replace('@', '')}`;
    return '#';
  };

  return (
    <div className="relative">
      <SectionWrapper
        id={contactSection.id}
        title={contactSection.title}
        subTitle={contactSection.subtitle}
        description={contactSection.description}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">

            {/* LEFT CONTENT: System Status Panel */}
            <motion.div
              variants={systemInitVariants}
              className="lg:col-span-5 p-8 sm:p-12 bg-primary/5 backdrop-blur-3xl border border-primary/20 rounded-[2rem] relative overflow-hidden group flex flex-col justify-between"
            >

              <div>
                <motion.div
                  className="w-16 h-16 bg-primary/10 border border-primary/30 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(139,92,246,0.2)]"
                >
                  <ShieldCheck className="w-8 h-8 text-primary" />
                </motion.div>
                <h3 className="text-4xl font-black text-white mb-6 tracking-tighter uppercase italic">Secure Uplink</h3>
                <p className="text-gray-400 text-lg mb-10 max-w-sm leading-relaxed font-medium">
                  Communication lines are open. Initialize a transmission to discuss architecture or strategic partnerships.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-black/20 rounded-xl border border-white/5 backdrop-blur-sm group/item hover:bg-black/40 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center border border-secondary/20">
                      <Zap className="w-5 h-5 text-secondary animate-pulse" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Efficiency</p>
                      <p className="text-sm text-white font-bold">24h Response Cycle</p>
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>

            {/* RIGHT CONTENT: Tactical Contact Nodes */}
            <div className="lg:col-span-7 grid gap-4">
              {contactOptions.map(({ icon: Icon, label, value = "", color, glow, meta }) => (
                <motion.a
                  variants={systemInitVariants}
                  href={getHref(label, value)}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={label}
                  aria-label={`Contact via ${label.replace(/_/g, ' ')}: ${value}`}
                  className={`group relative flex items-center p-6 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl transition-all duration-500 hover:border-primary/30 hover:bg-primary/5 hover:-translate-x-2 overflow-hidden`}
                >
                  {/* Energy Rail Animation */}
                  <motion.div
                    className="absolute top-0 left-0 w-1 h-full bg-primary/40 opacity-0 group-hover:opacity-100"
                    initial={{ height: 0 }}
                    whileHover={{ height: "100%" }}
                  />

                  <div className={`w-14 h-14 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center mr-6 group-hover:scale-110 group-hover:border-primary/40 transition-all duration-500 shadow-2xl ${glow}`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.2em]">{label}</h3>
                    </div>
                    <p className="text-white font-black text-lg sm:text-xl tracking-tighter truncate">{value}</p>
                  </div>

                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:rotate-[360deg] transition-all duration-700 ml-4">
                    <ArrowRight className="w-5 h-5 text-primary" />
                  </div>

                  {/* Corner Particle */}
                  <div className="absolute bottom-2 right-2 w-1 h-1 bg-white/10 rounded-full animate-pulse" />
                </motion.a>
              ))}
            </div>

          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};
