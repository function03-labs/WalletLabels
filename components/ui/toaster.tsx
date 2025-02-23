"use client"

import { useToast } from "@/lib/hooks/use-toast"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider data-oid="9un0n3t">
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} data-oid="fjqfi0e">
            <div className="grid gap-1" data-oid="4jgtg75">
              {title && <ToastTitle data-oid="tsfs.vt">{title}</ToastTitle>}
              {description && (
                <ToastDescription data-oid="x.2boy7">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose data-oid="gie5k.2" />
          </Toast>
        )
      })}
      <ToastViewport data-oid="792-oum" />
    </ToastProvider>
  )
}
