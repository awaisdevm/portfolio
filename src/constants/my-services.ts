import { Smartphone, Tv, Brain, Globe, Server } from "lucide-react"

export const services = [
  {
    id: "mobile-development",
    title: "Mobile App Development",
    description: "Cross-platform and native mobile applications with modern frameworks and best practices.",
    technologies: ["Flutter", "Kotlin", "iOS", "React Native"],
    icon: Smartphone,
    gradient: "from-blue-500 to-cyan-500",
    features: [
      "Cross-platform development with Flutter",
      "Native Android apps with Kotlin",
      "iOS app development with Swift",
      "Responsive UI/UX design",
      "App Store & Play Store deployment",
    ],
iconColor: "text-blue-500",

  },
  {
    id: "android-tv",
    title: "Android TV Apps",
    description: "Smart TV applications optimized for large screens and remote control navigation.",
    technologies: ["Android TV", "Kotlin", "Leanback", "ExoPlayer"],
    icon: Tv,
    gradient: "from-purple-500 to-pink-500",
    features: [
      "Android TV platform expertise",
      "Leanback UI components",
      "Media streaming integration",
      "Remote control optimization",
      "Google Play Console publishing",
    ],
iconColor: "text-red-500",

  },
  {
    id: "ai-ml",
    title: "AI/ML Solutions",
    description: "Intelligent applications powered by machine learning and artificial intelligence.",
    technologies: ["TensorFlow", "PyTorch", "OpenAI", "Scikit-learn"],
    icon: Brain,
    gradient: "from-green-500 to-emerald-500",
    features: [
      "Machine Learning model development",
      "Natural Language Processing",
      "Computer Vision solutions",
      "AI API integrations",
      "Data analysis and insights",
    ],
        iconColor: "text-green-500",

  },
  {
    id: "fullstack",
    title: "Full Stack Development",
    description: "End-to-end web applications with modern frontend and robust backend solutions.",
    technologies: ["React", "Next.js", "Node.js", "TypeScript"],
    icon: Globe,
    gradient: "from-orange-500 to-red-500",
    features: [
      "Modern React/Next.js frontends",
      "Responsive web design",
      "Progressive Web Apps (PWA)",
      "Database integration",
      "Authentication & authorization",
    ],
        iconColor: "text-orange-500",

  },
  {
    id: "backend",
    title: "Backend Development",
    description: "Scalable server-side solutions with robust APIs and database management.",
    technologies: ["Node.js", "Python", "PostgreSQL", "MongoDB"],
    icon: Server,
    gradient: "from-indigo-500 to-purple-500",
    features: [
      "RESTful API development",
      "GraphQL implementations",
      "Database design & optimization",
      "Cloud deployment & scaling",
      "Microservices architecture",
    ],
        iconColor: "text-purple-500",

  },
]