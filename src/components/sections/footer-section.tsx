import { Github, Linkedin, Mail, Twitter, Instagram, Youtube, GithubIcon } from "lucide-react"

interface FooterProps {

}
export const Footer: React.FC<FooterProps> = ({
   

}) => {
    const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Mail, href: "#", label: "Email" },
  ]
    return (

     <footer className="border-t border-blue-800 relative overflow-hidden py-8 px-4 md:px-6">
  <div className="w-full max-w-[96%] mx-auto relative z-10 text-center">
    <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 text-center md:text-left">
      
   {/* Left: Logo and Name */}
<div className="flex flex-col items-center">
  {/* Logo */}
  <div className="w-14 h-14 md:w-16 md:h-16 mb-4 relative">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rotate-45 rounded-lg" />
    <div className="absolute inset-2 bg-gray-950 rotate-45 rounded-lg flex items-center justify-center">
      <span className="text-white font-bold text-lg md:text-xl -rotate-45">MA</span>
    </div>
  </div>

  {/* Text */}
  <h3 className="text-lg md:text-xl font-bold text-white text-center">
    Muhammad Awais
  </h3>
  <p className="text-gray-400 text-sm text-center">Mobile Apps Engineer</p>
</div>
      {/* Right: Let's Connect & Social Icons */}
      <div className="flex flex-col items-center md:items-end">
        <h3 className="text-xl font-bold text-white mb-2">Let's Connect</h3>
        <p className="text-gray-400 mb-4 max-w-xs text-sm text-center md:text-right">
          Follow me on social media for updates and insights.
        </p>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <GithubIcon className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>

    {/* Divider */}
    <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto my-6" />

    {/* Bottom: Copyright */}
    <p className="text-gray-400 text-sm text-center">
      © 2024 Muhammad Awais, All Rights Reserved
    </p>
  </div>
</footer>

    );
};

