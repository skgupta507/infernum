"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[#0a0000] group-[.toaster]:text-foreground group-[.toaster]:border-crimson-900/40 group-[.toaster]:shadow-glow",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-crimson-800 group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
