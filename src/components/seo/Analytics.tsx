"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { useReportWebVitals } from "next/web-vitals";

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fetchLater?: (url: string | URL, init?: any) => { readonly activated: boolean };
  }
}

// 1. Polyfill for fetchLater to support reliable analytics and telemetry sending on session exit
if (typeof window !== "undefined") {
  window.fetchLater ??= function fetchLater(url: string | URL, init: any = {}) {
    let timeoutHandle: any;
    let activated = false;

    function sendNow() {
      if (!(init.signal && init.signal.aborted)) {
        if (
          "keepalive" in Request.prototype ||
          init.method !== "POST" ||
          init.headers
        ) {
          fetch(url, Object.assign({}, init, { keepalive: true }));
          activated = true;
        } else {
          activated = navigator.sendBeacon(url.toString(), init.body);
        }
      }
      destroy();
    }

    function destroy() {
      document.removeEventListener("visibilitychange", sendNow);
      clearTimeout(timeoutHandle);
    }

    if (document.visibilityState === "hidden") {
      queueMicrotask(sendNow);
    } else {
      document.addEventListener("visibilitychange", sendNow);

      if (typeof init.activateAfter === "number" && init.activateAfter >= 0) {
        timeoutHandle = setTimeout(sendNow, init.activateAfter);
      }
    }

    if (init.signal) {
      init.signal.addEventListener("abort", destroy);
    }

    return {
      get activated() {
        return activated;
      },
    };
  };
}

function GAInner({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
      window.gtag("config", gaId, {
        page_path: url,
      });
    }
  }, [pathname, searchParams, gaId]);

  // Report Core Web Vitals (LCP, FID/INP, CLS, FCP, TTFB)
  useReportWebVitals((metric) => {
    let rating = "good";
    if (metric.name === "CLS") {
      rating = metric.value > 0.25 ? "poor" : metric.value > 0.1 ? "needs-improvement" : "good";
    } else if (metric.name === "FCP") {
      rating = metric.value > 3000 ? "poor" : metric.value > 1800 ? "needs-improvement" : "good";
    } else if (metric.name === "LCP") {
      rating = metric.value > 4000 ? "poor" : metric.value > 2500 ? "needs-improvement" : "good";
    } else if (metric.name === "TTFB") {
      rating = metric.value > 1800 ? "poor" : metric.value > 800 ? "needs-improvement" : "good";
    }

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", metric.name, {
        event_category: "Web Vitals",
        value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
        event_label: metric.id,
        non_interaction: true,
        metric_rating: rating,
        metric_value: metric.value,
      });
    }

    if (process.env.NODE_ENV === "development") {
      console.log(`[Web Vitals] ${metric.name}: ${metric.value} (${rating})`);
    }
  });

  return null;
}

export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            send_page_view: false
          });
        `}
      </Script>
      <Suspense fallback={null}>
        <GAInner gaId={gaId} />
      </Suspense>
    </>
  );
}
