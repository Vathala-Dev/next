"use client";

import type { ReactNode } from "react";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CallbackRequestModal } from "@/components/vathala/callback-request-modal";
import { preloadCaptcha } from "@/components/vathala/ui/captcha-field";

export type OpenCallbackModalOptions = {
  serviceSlug?: string;
};

type CallbackModalContextValue = {
  openModal: (options?: OpenCallbackModalOptions) => void;
  closeModal: () => void;
};

const CallbackModalContext = createContext<
  CallbackModalContextValue | undefined
>(undefined);

export const useCallbackModal = (): CallbackModalContextValue => {
  const value = useContext(CallbackModalContext);
  if (!value) {
    throw new Error(
      "useCallbackModal must be used within a CallbackModalProvider",
    );
  }
  return value;
};

export const CallbackModalProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [initialService, setInitialService] = useState("");

  useEffect(() => {
    preloadCaptcha();
  }, []);

  const value = useMemo<CallbackModalContextValue>(
    () => ({
      openModal: (options) => {
        setInitialService(options?.serviceSlug ?? "");
        setOpen(true);
      },
      closeModal: () => setOpen(false),
    }),
    [],
  );

  return (
    <CallbackModalContext.Provider value={value}>
      {children}
      <CallbackRequestModal
        open={open}
        initialService={initialService}
        onClose={() => setOpen(false)}
      />
    </CallbackModalContext.Provider>
  );
};

