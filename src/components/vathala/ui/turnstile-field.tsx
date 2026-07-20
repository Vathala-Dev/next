"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "flexible" | "compact";
        },
      ) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
  }
}

type TurnstileFieldProps = {
  onTokenChange: (token: string | null) => void;
  resetKey?: number;
  mountDelayMs?: number;
};

import { TURNSTILE_SITE_KEY as TURNSTILE_SITE_KEY_EMBEDDED } from "@/lib/turnstile-config";

const envKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? "";

const isPlaceholderKey = (key: string): boolean =>
  !key ||
  key.includes("PASTE_YOUR") ||
  key.includes("your_turnstile");

/** Env overrides embedded key when set (optional for local overrides). */
export const TURNSTILE_SITE_KEY = !isPlaceholderKey(envKey)
  ? envKey
  : !isPlaceholderKey(TURNSTILE_SITE_KEY_EMBEDDED)
    ? TURNSTILE_SITE_KEY_EMBEDDED
    : "";

const TURNSTILE_SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

let turnstileScriptPromise: Promise<void> | null = null;

const isTurnstileReady = (): boolean =>
  typeof window.turnstile?.render === "function";

const waitForTurnstile = (timeoutMs = 12_000): Promise<void> =>
  new Promise((resolve, reject) => {
    if (isTurnstileReady()) {
      resolve();
      return;
    }

    const started = Date.now();
    const tick = () => {
      if (isTurnstileReady()) {
        resolve();
        return;
      }
      if (Date.now() - started >= timeoutMs) {
        reject(new Error("Turnstile timed out"));
        return;
      }
      window.requestAnimationFrame(tick);
    };
    tick();
  });

const loadTurnstileScript = (): Promise<void> => {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (isTurnstileReady()) {
    return Promise.resolve();
  }

  const existing = document.querySelector<HTMLScriptElement>(
    `script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]`,
  );

  if (existing) {
    return waitForTurnstile();
  }

  if (!turnstileScriptPromise) {
    turnstileScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = TURNSTILE_SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        waitForTurnstile().then(resolve).catch(reject);
      };
      script.onerror = () => {
        turnstileScriptPromise = null;
        reject(new Error("Failed to load Turnstile"));
      };
      document.head.appendChild(script);
    });
  }

  return turnstileScriptPromise;
};

export const TurnstileField = ({
  onTokenChange,
  resetKey = 0,
  mountDelayMs = 0,
}: TurnstileFieldProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenChangeRef = useRef(onTokenChange);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onTokenChangeRef.current = onTokenChange;
  }, [onTokenChange]);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;

    let cancelled = false;
    let mountDelayTimer: number | undefined;

    setLoadError(null);
    setIsLoading(true);
    onTokenChangeRef.current(null);

    const removeWidget = () => {
      const widgetId = widgetIdRef.current;
      widgetIdRef.current = null;
      if (widgetId && window.turnstile) {
        try {
          window.turnstile.remove(widgetId);
        } catch {
          // ignore
        }
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };

    const mountWidget = async () => {
      try {
        await loadTurnstileScript();
      } catch {
        if (!cancelled) {
          setLoadError(
            "Could not load verification. Check your connection and try again.",
          );
          setIsLoading(false);
        }
        return;
      }

      if (cancelled || !containerRef.current) return;

      const turnstile = window.turnstile;
      if (!turnstile) {
        if (!cancelled) {
          setLoadError("Verification failed to initialize. Please refresh.");
          setIsLoading(false);
        }
        return;
      }

      removeWidget();

      try {
        widgetIdRef.current = turnstile.render(containerRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: "light",
          size: "flexible",
          callback: (token) => onTokenChangeRef.current(token),
          "expired-callback": () => onTokenChangeRef.current(null),
          "error-callback": () => {
            onTokenChangeRef.current(null);
            if (!cancelled) {
              setLoadError(
                "Turnstile could not load. In src/lib/turnstile-config.ts use your Cloudflare Site key (not the Secret key). In Turnstile → vathala-web → Hostnames, include localhost and 127.0.0.1.",
              );
              setIsLoading(false);
            }
          },
        });
        setIsLoading(false);
      } catch {
        if (!cancelled) {
          setLoadError("Verification could not be displayed. Please try again.");
          setIsLoading(false);
        }
      }
    };

    mountDelayTimer = window.setTimeout(() => {
      void mountWidget();
    }, mountDelayMs);

    return () => {
      cancelled = true;
      if (mountDelayTimer) window.clearTimeout(mountDelayTimer);
      onTokenChangeRef.current(null);
      removeWidget();
    };
  }, [resetKey, mountDelayMs]);

  if (!TURNSTILE_SITE_KEY) {
    return (
      <p className="text-sm text-amber-800" role="status">
        Turnstile site key missing. Paste your Cloudflare{" "}
        <strong>Site key</strong> into{" "}
        <code className="text-xs">src/lib/turnstile-config.ts</code> (not the
        Secret key).
      </p>
    );
  }

  return (
    <div>
      <div
        key={`turnstile-container-${resetKey}`}
        ref={containerRef}
        className="min-h-[65px]"
        aria-busy={isLoading}
        aria-live="polite"
      />
      {isLoading && !loadError ? (
        <p className="mt-2 text-sm text-vathala-muted" role="status">
          Loading verification…
        </p>
      ) : null}
      {loadError ? (
        <p className="mt-2 text-sm font-medium text-red-600" role="alert">
          {loadError}
        </p>
      ) : null}
    </div>
  );
};

export const isTurnstileConfigured = (): boolean => TURNSTILE_SITE_KEY.length > 0;

export const preloadTurnstile = (): void => {
  if (!TURNSTILE_SITE_KEY || typeof window === "undefined") return;
  void loadTurnstileScript();
};
