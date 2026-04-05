import { Linkedin, Mail, GithubIcon } from "lucide-react"
import portfolioData from "@/data/portfolio.json"

export const Footer: React.FC = () => {
  const { contact, name, roles } = portfolioData.profile;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-blue-800/30 relative overflow-hidden py-12 px-4 md:px-6 bg-black/20 backdrop-blur-md">
      <div className="w-full max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12">
          
          {/* Left: Logo and Name */}
          <div className="flex flex-col items-center md:items-start">
            {/* Logo */}
            <div className="w-14 h-14 md:w-16 md:h-16 mb-6 relative group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rotate-45 rounded-lg group-hover:rotate-90 transition-transform duration-500 shadow-[0_0_20px_rgba(37,99,235,0.3)]" />
              <div className="absolute inset-2 bg-gray-950 rotate-45 rounded-lg flex items-center justify-center group-hover:rotate-0 transition-transform duration-500">
                <span className="text-white font-black text-lg md:text-xl -rotate-45 group-hover:rotate-0 transition-transform">MA</span>
              </div>
            </div>

            {/* Text */}
            <h3 className="text-xl md:text-2xl font-black text-white tracking-tighter uppercase italic">
              {name}
            </h3>
            <p className="text-blue-400 font-mono text-[10px] uppercase tracking-widest font-bold mt-1">
              {roles[0]}
            </p>
          </div>

          {/* Right: Let's Connect & Social Icons */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-xl font-black text-white mb-3 tracking-tighter uppercase italic">Initialize Uplink</h3>
            <p className="text-gray-500 mb-6 max-w-xs text-xs font-medium text-center md:text-right leading-relaxed">
              Engineering high-performance mobile ecosystems for global industries. Follow for technical updates.
            </p>
            <nav aria-label="Social media links" className="flex space-x-6">
              <a href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="Visit GitHub profile" className="text-gray-400 hover:text-blue-400 transition-all hover:scale-110">
                <GithubIcon className="w-5 h-5" />
              </a>
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Visit LinkedIn profile" className="text-gray-400 hover:text-blue-400 transition-all hover:scale-110">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={`mailto:${contact.email}`} aria-label="Send email to Muhammad Awais" className="text-gray-400 hover:text-blue-400 transition-all hover:scale-110">
                <Mail className="w-5 h-5" />
              </a>
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent my-10" />

        {/* Bottom: Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-[10px] font-mono font-bold uppercase tracking-widest">
          <p>© {currentYear} {name} {/* DEPLOY_V2.0 */}</p>
        </div>
      </div>
    </footer>
  );
};

