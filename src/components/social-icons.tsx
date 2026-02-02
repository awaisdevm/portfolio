import Link from "next/link";

import { contactInfo } from "@/constants/contact";
import { BsGithub, BsLinkedin, BsStackOverflow, BsWhatsapp } from "react-icons/bs";

export function SocialIcons() {
    const socialLinks = [
        {
            name: "GitHub",
            href: contactInfo.github,
            icon: BsGithub,
            ariaLabel: "Follow on Github",
        },
        {
            name: "LinkedIn",
            href: contactInfo.linkedin,
            icon: BsLinkedin,
            ariaLabel: "Follow on LinkedIn",
        },
        {
            name: "WhatsApp",
            href: contactInfo.whatsappUrl,
            icon: BsWhatsapp,
            ariaLabel: "Follow on WhatsApp",
        },
        {
            name: "Stack Overflow",
            href: contactInfo.stackOverFlow,
            icon: BsStackOverflow,
            ariaLabel: "Visit Stack Overflow",
        },
    ]
   
    return (
        <div className="

    group fixed top-4 right-6 z-50
      hidden sm:flex
      h-[220px] w-[60px] items-center justify-center
      border border-white/30 dark:border-gray-600/30 shadow-2xl
      px-2 py-2 rounded-lg flex items-center
      space-x-1 bg-white/10 dark:bg-gray-800/20 backdrop-blur-md
    
  ">
            {/* Social icons */}
            <div
                className="flex flex-col items-center transition-all duration-300
               gap-2 translate-y-[-20px] group-hover:gap-4 group-hover:translate-y-[-10px] pb-6"
            >
                {socialLinks.map((link) => (
                    <Link
                        key={link.name}
                        className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 hover:bg-white/20 hover:scale-110"
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.ariaLabel}
                    >
                        <link.icon className="h-5 w-5 text-white" />
                    </Link>
                ))}
            </div>

            {/* Follow Me rotated at bottom */}
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 rotate-90 rounded-[4px] bg-[#6698FF]/50 px-2 py-2 backdrop-blur-xl 
               transition-all duration-300 group-hover:rotate-0 group-hover:bg-blue-800"
                data-framer-name="FollowMePlate"
            >
                <p
                    className="whitespace-nowrap text-[10px] font-light uppercase tracking-[0.09em] text-white group-hover:text-white"
                    data-framer-component-type="RichTextContainer"
                >
                    Follow Me
                </p>
            </div>
        </div>


    )
}
