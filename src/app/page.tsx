import type { Metadata } from "next";
import { MainContent } from "@/app/home-page";

export const metadata: Metadata = {
  title: "Portfolio — Senior Android Architect & Flutter Expert",
  description:
    "Explore the portfolio of Muhammad Awais — a Senior Mobile Engineer specializing in scalable Android (Jetpack Compose) and Flutter apps for healthcare, e-sports, and enterprise platforms.",
  alternates: {
    canonical: "https://devawais.com",
  },
};

export default function Portfolio() {
  return (
    <div className="relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-32 left-32 w-80 h-80 bg-gradient-to-r from-blue-300/20 to-cyan-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-40 w-96 h-96 bg-gradient-to-r from-sky-300/20 to-blue-300/20 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-r from-cyan-300/15 to-sky-200/15 rounded-full blur-3xl" />
        </div>
      </div>

      <MainContent />
    </div>
  );
}

