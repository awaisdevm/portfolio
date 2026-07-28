
"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { SparkleIcon } from "../icons";

interface LiquidMetalButtonProps {
    label?: string;
    onClick?: () => void;
    viewMode?: "text" | "icon";
}

const SMOOTH_TRANSITION =
    "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease";

export function LiquidMetalButton({
    label = "Get Started",
    onClick,
    viewMode = "text",
}: LiquidMetalButtonProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [ripples, setRipples] = useState<
        Array<{ x: number; y: number; id: number }>
    >([]);

    const shaderRef = useRef<HTMLDivElement>(null);
    const shaderMount = useRef<{ setSpeed?: (speed: number) => void; destroy?: () => void } | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const rippleId = useRef(0);

    const dim = useMemo(() => {
        return viewMode === "icon"
            ? { w: 46, h: 46, innerW: 42, innerH: 42, shaderW: 46, shaderH: 46 }
            : { w: 142, h: 46, innerW: 138, innerH: 42, shaderW: 142, shaderH: 46 };
    }, [viewMode]);

    useEffect(() => {
        let isMounted = true;

        const loadShader = async () => {
            try {
                const { liquidMetalFragmentShader, ShaderMount } = await import(
                    "@paper-design/shaders"
                );

                if (isMounted && shaderRef.current) {
                    if (shaderMount.current?.destroy) shaderMount.current.destroy();

                    shaderMount.current = new ShaderMount(
                        shaderRef.current,
                        liquidMetalFragmentShader,
                        {
                            u_repetition: 4,
                            u_softness: 0.55,
                            u_shiftRed: 0.1,
                            u_shiftBlue: 0.35,
                            u_distortion: 0.1,
                            u_contour: 0.1,
                            u_angle: 45,
                            u_scale: 8,
                            u_shape: 1,
                            u_offsetX: 0.1,
                            u_offsetY: -0.1,
                        },
                        undefined,
                        0.6
                    );
                }
            } catch (error) {
                console.error("[LiquidMetalButton] Failed to load shader:", error);
            }
        };

        loadShader();

        return () => {
            isMounted = false;
            if (shaderMount.current?.destroy) {
                shaderMount.current.destroy();
                shaderMount.current = null;
            }
        };
    }, [dim.w, dim.h]);

    const handleMouseEnter = () => {
        setIsHovered(true);
        shaderMount.current?.setSpeed?.(1);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setIsPressed(false);
        shaderMount.current?.setSpeed?.(0.6);
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (shaderMount.current?.setSpeed) {
            shaderMount.current.setSpeed(2.4);
            setTimeout(() => {
                shaderMount.current?.setSpeed?.(isHovered ? 1 : 0.6);
            }, 300);
        }

        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const ripple = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
                id: rippleId.current++,
            };

            setRipples((prev) => [...prev, ripple]);
            setTimeout(() => {
                setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
            }, 600);
        }

        onClick?.();
    };

    const transformZState = isPressed
        ? "translateY(1px) scale(0.98)"
        : "translateY(0) scale(1)";

    return (
        <div className="relative inline-block">
            <style>{`
        .shader-container-exploded canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          border-radius: 100px !important;
        }
        @keyframes ripple-animation {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0.4; }
          100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
        }
      `}</style>

            <div style={{ perspective: "1000px", perspectiveOrigin: "50% 50%" }}>
                <div
                    style={{
                        position: "relative",
                        width: `${dim.w}px`,
                        height: `${dim.h}px`,
                        transformStyle: "preserve-3d",
                        transition: SMOOTH_TRANSITION,
                        transform: "none",
                    }}
                >
                    {/* Layer 1: Text / Icon Content */}
                    <div
                        className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center gap-1.5 text-heading"
                        style={{
                            transformStyle: "preserve-3d",
                            transition: `${SMOOTH_TRANSITION}, gap 0.4s ease`,
                            transform: "translateZ(20px)",
                        }}
                    >
                        {viewMode === "icon" ? (
                            <SparkleIcon
                                size={16}
                                className="drop-shadow-sm transition-all"
                            />
                        ) : (
                            <span
                                className="whitespace-nowrap font-mono text-xs font-semibold uppercase tracking-wider drop-shadow-md"
                                style={{ transition: SMOOTH_TRANSITION }}
                            >
                                {label}
                            </span>
                        )}
                    </div>

                    {/* Layer 2: Inner Dark Button Body */}
                    <div
                        className="absolute inset-0 z-20"
                        style={{
                            transformStyle: "preserve-3d",
                            transition: SMOOTH_TRANSITION,
                            transform: `translateZ(10px) ${transformZState}`,
                        }}
                    >
                        <div
                            className="m-[2px] rounded-full border border-border-subtle bg-surface-sunken shadow-inner transition-all"
                            style={{
                                width: `${dim.innerW}px`,
                                height: `${dim.innerH}px`,
                                transition: `${SMOOTH_TRANSITION}, box-shadow 0.15s`,
                            }}
                        />
                    </div>

                    {/* Layer 3: Shader Background Frame */}
                    <div
                        className="absolute inset-0 z-10"
                        style={{
                            transformStyle: "preserve-3d",
                            transition: SMOOTH_TRANSITION,
                            transform: `translateZ(0px) ${transformZState}`,
                        }}
                    >
                        <div
                            className={`h-full w-full rounded-full bg-transparent transition-all ${isPressed
                                ? "shadow-sm"
                                : isHovered
                                    ? "shadow-lg shadow-primary/20"
                                    : "shadow-md shadow-primary/10"
                                }`}
                            style={{ transition: `${SMOOTH_TRANSITION}, box-shadow 0.15s` }}
                        >
                            <div
                                ref={shaderRef}
                                className="shader-container-exploded relative overflow-hidden rounded-full transition-all"
                                style={{
                                    width: `${dim.shaderW}px`,
                                    height: `${dim.shaderH}px`,
                                    transition: "width 0.4s ease, height 0.4s ease",
                                }}
                            />
                        </div>
                    </div>

                    {/* Layer 4: Interactive Button Surface */}
                    <button
                        ref={buttonRef}
                        onClick={handleClick}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onMouseDown={() => setIsPressed(true)}
                        onMouseUp={() => setIsPressed(false)}
                        aria-label={label}
                        className="absolute inset-0 z-40 cursor-pointer overflow-hidden rounded-full border-none bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                        style={{
                            transformStyle: "preserve-3d",
                            transform: "translateZ(25px)",
                            transition: SMOOTH_TRANSITION,
                        }}
                    >
                        {ripples.map((ripple) => (
                            <span
                                key={ripple.id}
                                className="pointer-events-none absolute h-5 w-5 rounded-full bg-primary/30"
                                style={{
                                    left: `${ripple.x}px`,
                                    top: `${ripple.y}px`,
                                    animation: "ripple-animation 0.6s ease-out",
                                }}
                            />
                        ))}
                    </button>
                </div>
            </div>
        </div>
    );
}