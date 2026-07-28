// SystemStatusPanel.tsx
"use client";

import { MapPinIcon } from "@/components/icons";
import { useI18n } from "@/i18n/i18n-client";

// ============================================================================
// TYPES & PROPS
// ============================================================================
interface SystemStatusPanelProps {
  location: string;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function SystemStatusPanel({ location }: SystemStatusPanelProps) {
  const { translate } = useI18n();

  return (
    <section className="card-surface relative flex h-full min-h-[420px] w-full flex-col justify-between overflow-hidden p-0">
      {/* Corner HUD brackets — signature framing device */}
      {[
        "top-4 left-4 border-t border-l",
        "top-4 right-4 border-t border-r",
        "bottom-4 left-4 border-b border-l",
        "bottom-4 right-4 border-b border-r",
      ].map((pos) => (
        <span
          key={pos}
          className={`pointer-events-none absolute z-20 h-5 w-5 border-border-strong/50 ${pos}`}
          aria-hidden="true"
        />
      ))}

      {/* Scanline texture */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, var(--heading) 0px, var(--heading) 1px, transparent 1px, transparent 3px)",
        }}
        aria-hidden="true"
      />

      {/* Radar sweep */}
      <div className="relative flex flex-1 items-center justify-center py-12">
        <div className="relative flex h-52 w-52 items-center justify-center">
          {/* Concentric rings */}
          {[100, 68, 36].map((size) => (
            <span
              key={size}
              className="absolute rounded-full border border-border/30"
              style={{ width: size, height: size }}
              aria-hidden="true"
            />
          ))}

          {/* Rotating sweep */}
          <div
            className="absolute inset-0 animate-[spin_6s_linear_infinite] rounded-full opacity-70"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, transparent 260deg, var(--primary) 335deg, transparent 360deg)",
            }}
            aria-hidden="true"
          />

          {/* Center pulse */}
          <span className="relative flex h-3 w-3 items-center justify-center">
            <span className="absolute h-3 w-3 animate-ping rounded-full bg-primary/60" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
        </div>
      </div>

      {/* Location Readout Footer */}
      <div className="relative z-10 w-full border-t border-border/20 bg-surface-sunken/60 p-6 backdrop-blur-sm sm:p-8">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <MapPinIcon
              className="h-3.5 w-3.5 text-primary-light"
              aria-hidden="true"
            />
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-heading">
              {translate("contact.locationTitle")}
            </h3>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            <span className="font-mono text-[9px] font-semibold uppercase tracking-widest text-muted">
              online
            </span>
          </div>
        </div>

        <p className="truncate font-display text-xl font-semibold tracking-tight text-heading">
          {location}
        </p>
      </div>
    </section>
  );
}