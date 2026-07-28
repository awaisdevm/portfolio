import {
  KotlinIcon,
  AndroidIcon,
  FlutterIcon,
  GithubIcon,
  SparkleIcon,
  ComposeMultiplatformIcon,
  StackOutlinedIcon,
  SqliteIcon,
  JavaIcon,
  DartIcon,
  SocketIoIcon,
  AndroidStudioIcon,
  XCodeIcon,
  SwiftIcon,
  VSCodeIcon,

} from "../icons/";

export default function TechMarquee() {
  // expertise.json se selected key skills & tools
  const techList = [
    // --- 1. Core Languages ---
    { name: "Kotlin", icon: <KotlinIcon size={24} /> },
    { name: "Java", icon: <JavaIcon size={24} /> },
    { name: "Dart", icon: <DartIcon size={24} /> },
    { name: "Swift", icon: <SwiftIcon size={24} /> },

    // --- 2. Frameworks & Multiplatform ---
    { name: "Jetpack Compose", icon: <AndroidIcon size={24} /> },
    { name: "Flutter", icon: <FlutterIcon size={24} /> },
    { name: "Kotlin Multiplatform (KMP)", icon: <ComposeMultiplatformIcon size={24} /> },
    { name: "Compose Multiplatform (CMP)", icon: <ComposeMultiplatformIcon size={24} /> },

    // --- 3. Architecture & Patterns ---
    { name: "Clean Architecture", icon: <StackOutlinedIcon size={24} /> },
    { name: "Modular Architecture", icon: <SparkleIcon size={24} /> },
    { name: "App Architecture", icon: <SparkleIcon size={24} /> },
    { name: "MVVM", icon: <SparkleIcon size={24} /> },
    { name: "MVI", icon: <SparkleIcon size={24} /> },
    { name: "MVC", icon: <SparkleIcon size={24} /> },

    // --- 4. Concurrency ---
    { name: "Coroutines", icon: <SparkleIcon size={24} /> },
    { name: "Flow", icon: <SparkleIcon size={24} /> },

    // --- 5. Networking & APIs ---
    { name: "Retrofit", icon: <SparkleIcon size={24} /> },
    { name: "Ktor", icon: <SparkleIcon size={24} /> },
    { name: "Socket.IO", icon: <SocketIoIcon size={24} /> },

    // --- 6. Database & Storage ---
    { name: "Room DB", icon: <SqliteIcon size={24} /> },
    { name: "SQLDelight", icon: <SqliteIcon size={24} /> },

    // --- 7. Dependency Injection ---
    { name: "Dagger Hilt", icon: <SparkleIcon size={24} /> },
    { name: "Koin", icon: <SparkleIcon size={24} /> },
    { name: "getIt", icon: <SparkleIcon size={24} /> },

    // --- 8. Tools & DevOps ---
    { name: "Work Manager", icon: <SparkleIcon size={24} /> },
    { name: "CI/CD", icon: <SparkleIcon size={24} /> },
    { name: "Github", icon: <GithubIcon size={24} /> },
    { name: "Android Studio", icon: <AndroidStudioIcon size={24} /> },
    { name: "XCode", icon: <XCodeIcon size={24} /> },
    { name: "VsCode", icon: <VSCodeIcon size={24} /> },


  ];

  return (
    <div className="relative w-full overflow-hidden py-8 bg-background">
      <div className="absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>

      {/* Marquee Track */}
      <div className="animate-marquee flex gap-6 items-center w-max">
        {[...techList, ...techList, ...techList].map((tech, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-5 py-3 rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all hover:border-primary/50"
          >
            <span className="text-primary flex items-center justify-center">{tech.icon}</span>
            <span className="font-medium text-sm tracking-wide whitespace-nowrap">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}