import { OrbitingCircles } from "@/components/orbiting-circle";

export function Frameworks() {
  const skills = [
    "Android Studio",
    "Flutter",
    "git",
    "github",
    "java",
    "Kotlin",
    "nodejs",
    "sqlite",
    "tailwindcss",
    "visualstudiocode",
    "xcode",
  ];
  return (
    <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
      <OrbitingCircles iconSize={36} radius={120}>
        {skills.map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
      <OrbitingCircles iconSize={24} radius={80} reverse speed={2}>
        {skills.reverse().map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
    </div>
  );
}

const Icon = ({ src }) => (
  <img src={src} className="duration-200 rounded-sm hover:scale-110" />
);