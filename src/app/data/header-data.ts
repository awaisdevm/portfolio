import { Menu, X, Sun, Moon } from "lucide-react"
import { githubUrl,linkedinUrl } from "@/constants/contact" 
import { SiGithub, SiLinkedin } from "react-icons/si"
export const headerContent = {
 

  socialLinks: [
   
    {
      icon: SiGithub,
      href: githubUrl,
      label: "GitHub",
      color: "#333",
    },
    {
      icon: SiLinkedin,
      href: linkedinUrl,
      label: "LinkedIn",
      color: "#0077B5",
    },
    
  ],

  icons: {
    menu: Menu,
    close: X,
    sun: Sun,
    moon: Moon,
  },

}
