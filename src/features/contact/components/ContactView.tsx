
"use client";

import { motion, type Variants } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import type { StandardPageLabels } from "@/lib/utils";
import { transformSocialLinksToOptions } from "../configs/contact-options";
import SystemStatusPanel from "./SystemStatusPanel";
import ContactCard from "./ContactCard";

// ============================================================================
// TYPES & PROPS
// ============================================================================
interface ContactViewProps {
  labels: StandardPageLabels;
  location: string;
}

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
    },
  },
};

// ============================================================================
// MAIN VIEW COMPONENT
// ============================================================================
export default function ContactView({ labels, location }: ContactViewProps) {
  const contactOptions = transformSocialLinksToOptions();

  return (
    <>
      {/* Top Section Header */}
      <PageHeader
        eyebrow={labels.title}
        title={labels.headerTitle}
        description={labels.headerDesc}
      />

      {/* Main Content Layout */}
      <section className="pb-20 md:pb-28">
        <div className="container-page">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            {/* Left Panel: Location & Status */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="lg:col-span-5"
            >
              <SystemStatusPanel location={location} />
            </motion.div>

            {/* Right Panel: Interactive Contact Cards */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="grid gap-4 lg:col-span-7"
            >
              {contactOptions.map((option) => (
                <ContactCard
                  key={option.value}
                  option={option}
                  variants={cardVariants}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}