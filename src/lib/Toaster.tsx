'use client'
import { useEffect, useRef, useState, useMemo } from "react";
import { ToastProps, ToastPosition } from "./type.ts";
import { createPortal } from "react-dom";
import { AnimatePresence } from "framer-motion";
import Toast from "./Toast.tsx";
import { toast } from "./toast-manager.ts";
import { getToastAnimation } from "./assets.tsx";
import { injectStyles } from "./inject-style.ts";

interface CustomProps {
    position?: ToastPosition;
    richColor?: boolean;
}

export function Toaster({
    position = "bottom-right",
    richColor = false,
}: CustomProps) {
    const [toasts, setToasts] = useState<ToastProps[]>([]);
    const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
    const timeoutIds = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

    const { initial, animate, exit } = useMemo(
        () => getToastAnimation(position),
        [position]
    );

    useEffect(() => {
        setPortalTarget(document.body);
        injectStyles();
    }, []);

    useEffect(() => {
        const unsubscribe = toast._subscribe((newToast) => {
            setToasts((prev) => [...prev, newToast]);

            const timeoutId = setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
                if (newToast.id) {
                    timeoutIds.current.delete(newToast.id);
                }
            }, 3000);

            if (newToast.id) {
                timeoutIds.current.set(newToast.id, timeoutId);
            }
        });

        return () => {
            unsubscribe();
            timeoutIds.current.forEach((id) => clearTimeout(id));
            timeoutIds.current.clear();
        };
    }, []);

    const dismissToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
        const timeoutId = timeoutIds.current.get(id);
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutIds.current.delete(id);
        }
    };

    if (!portalTarget) {
        return null;
    }

    return createPortal(
        <div className={`toast-container ${position}`}>
            <AnimatePresence>
                {toasts.map((t, index) => (
                    <div key={t.id} style={{ zIndex: 10 + index }}>
                        <Toast
                            initial={initial}
                            animate={animate}
                            exit={exit}
                            type={t.type}
                            richColor={richColor}
                            message={t.message}
                            onClose={t.id ? () => dismissToast(t.id!) : undefined}
                        />
                    </div>
                ))}
            </AnimatePresence>
        </div>,
        portalTarget
    );
}
