
import React from "react";
import GradientBlob from "../ui/GradientBlob";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPES & PROPS
// ============================================================================
interface SectionWrapperProps {
    children: React.ReactNode;
    className?: string;
    blobColorLeft?: string;
    blobColorRight?: string;
    showBlobs?: boolean;
    id?: string;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function SectionWrapper({
    children,
    className = "",
    blobColorLeft = "var(--color-brand-subtle)",
    blobColorRight = "var(--color-accent-subtle)",
    showBlobs = true,
    id,
}: SectionWrapperProps) {
    return (

        <section id={id} className={cn("relative overflow-hidden", className)}>
            {showBlobs && (
                <>
                    <GradientBlob className="-left-32 -top-32" />
                    <GradientBlob color="var(--accent)" className="-bottom-40 -right-40" size={600} />

                </>
            )}

            <div className="relative z-10 w-full">{children}</div>
        </section>
    );
}