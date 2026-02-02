import { Button } from "@/components/ui/button"
import { Code, ExternalLink, Mail, Palette, Smartphone, } from "lucide-react"
import { useRouter } from "next/navigation"
import { LiaHackerrank } from "react-icons/lia"
import { TypewriterEffect } from "../typewriter-effect"

export function HeroSection() {
  const router = useRouter()

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col pt-12 sm:pt-20 lg:pt-24 space-y-12 sm:space-y-16 lg:space-y-20">
      {/* HERO CONTENT */}
      <div className="relative z-10 w-full grid lg:grid-cols-2 gap-4 lg:gap-8 xl:gap-12 items-center">
        {/* LEFT CONTENT */}
        <div className="flex flex-col space-y-8 sm:space-y-10 lg:space-y-12 order-2 lg:order-1">
          <div className="space-y-6 sm:space-y-8">
            {/* Heading */}
            <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight">
                <span className="text-[#BDD8E9]">I'm Muhammad Awais</span>
                <br />
                <TypewriterEffect
                  words={["a Mobile Engineer", "a Flutter Developer", "a Kotlin Expert"]}
                  className="bg-gradient-to-r from-[#4E8EA2] via-[#6EA2B3] to-[#7BBDE8] bg-clip-text text-transparent"
                />

                <br />
                <span className="text-[#BDD8E9]">based in Pakistan.</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-[#BDD8E9] max-w-2xl mx-auto lg:mx-0">
                Discover the artistry Behind a Portfolio that Echoes Innovation and Creativity
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button
                className="bg-white/10  border border-white/20 text-white hover:bg-white/20 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl transition-all duration-300"
                // className="bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl transition-all duration-300"
                onClick={() => window.open("https://www.hackerrank.com/certificates/794ccb84d359", "_blank")}
              >
                <LiaHackerrank className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Hackerrank Certified
              </Button>
              <Button
                className="bg-gradient-to-r from-blue-300/20 to-cyan-300/20  border border-blue-300/30 text-blue-200 hover:bg-blue-300/30 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl transition-all duration-300"
                // className="bg-gradient-to-r from-blue-300/20 to-cyan-300/20 backdrop-blur-xl border border-blue-300/30 text-blue-200 hover:bg-blue-300/30 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl transition-all duration-300"
                onClick={() => router.push("/about")}
              >
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                View My Work
              </Button>
              <Button className="bg-white/10  border border-white/20 text-white hover:bg-white/20 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl transition-all duration-300"
              // <Button className="bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl transition-all duration-300"
                onClick={() => router.push("/contact")}>
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Get in Touch
              </Button>

            </div>
          </div>
        </div>

        {/* RIGHT CONTENT (Profile Image) */}
        <div className="flex justify-end order-1 lg:order-2">
          <div className="relative">
            {/* 🔵 Outer Ring */}
    <div className="absolute -inset-4 rounded-full border border-blue-400/50" />

            {/* 🔵 Your existing capsule container */}
            <div className="relative">
              {/* Outer glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-400/20 via-cyan-400/20 to-sky-400/20 rounded-full blur-xl scale-110 animate-pulse" />

              {/* Main capsule container - Responsive sizing */}
              <div className="relative w-56 sm:w-64 lg:w-72 xl:w-80 aspect-[3/4] rounded-full overflow-hidden border border-3 border-blue-300/30 bg-gradient-to-b from-slate-800/50 to-slate-900/50">
              {/* <div className="relative w-56 sm:w-64 lg:w-72 xl:w-80 aspect-[3/4] rounded-full overflow-hidden border border-3 border-blue-300/30 bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-xl"> */}
                {/* Inner frame */}
                <div className="absolute rounded-full overflow-hidden bg-gradient-to-b from-slate-700/30 via-slate-800/30 to-slate-900/30">
                  {/* Profile image */}
                  <img
                    src="/images/dev-hero.png"
                    alt="Muhammad Awais - Mobile Engineer"
                    className="w-full h-full object-cover object-center"
                  />

                  {/* Overlay gradient for better contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"/>
                </div>
              </div>

              {/* Additional shadow - Responsive sizing */}
              <div className="absolute -bottom-4 sm:-bottom-6 lg:-bottom-8 left-1/2 transform -translate-x-1/2 w-24 sm:w-28 lg:w-32 h-4 sm:h-6 lg:h-8 bg-blue-400/10 rounded-full blur-lg"></div>
            </div>
          </div>
        </div>

      </div>

      {/* FEATURE CARDS - Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
        {[
          {
            icon: Smartphone,
            label: "Mobile First",
            desc: "Transforming Ideas into stunning digital experiences",
            gradient: "from-blue-300/20 to-cyan-300/20",
          },
          {
            icon: Code,
            label: "Clean Code",
            desc: "Best practices & maintainable code",
            gradient: "from-cyan-300/20 to-sky-300/20",
          },
          {
            icon: Palette,
            label: "UI/UX Focus",
            desc: "Crafting beautiful designs",
            gradient: "from-sky-300/20 to-blue-300/20",
          },
          {
            icon: ExternalLink,
            label: "App Store",
            desc: "Published production apps",
            gradient: "from-indigo-300/20 to-blue-300/20",
          },
        ].map(({ icon: Icon, label, desc, gradient }) => (
          <div
            key={label}
            className={`bg-gradient-to-br ${gradient}  border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300 group`}
            // className={`bg-gradient-to-br ${gradient} backdrop-blur-3xl border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300 group`}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10  border border-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
            {/* <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300"> */}
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-300" />
            </div>
            <h3 className="font-medium text-white text-sm sm:text-base mb-2 text-left">{label}</h3>
            <p className="text-white/60 text-xs sm:text-sm text-left leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )

}
