'use client'
import {useEffect, useState} from "react";
import {ToastProps} from "./type.ts";
import {createPortal} from "react-dom";
import {AnimatePresence} from "framer-motion";
import Toast from "./Toast.tsx";
import {toast} from "./toast-manager.ts";
import {getPosition, getToastAnimation} from "./assets.tsx";
import {injectStyles} from "./inject-style.ts";

interface CustomProps {
    type?: ToastProps;
    position?:
        | "top-left"
        | "top-right"
        | "bottom-left"
        | "bottom-right"
        | "top-center"
        | "bottom-center";
    richColor?: boolean | false;
}

export function Toaster({
                            position = "bottom-right",
                            richColor = false,
                        }: CustomProps) {
    const [toasts, setToasts] = useState<ToastProps[]>([]);
    const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
    const {initial, animate, exit} = getToastAnimation(position);
    const positionValue = getPosition(position);

    useEffect(() => {
        const unsubscribe = toast._subscribe((newToast) => {
            setToasts((prev) => [...prev, newToast]);
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
            }, 3000);
        });

        return unsubscribe;
    }, []);
    useEffect(() => {
        setPortalTarget(document.body);
    }, []);

    useEffect(() => {
        injectStyles()
    }, [])

    if (!portalTarget) {
        return null;
    }

    return createPortal(
        <div
            className={`toast-container ${positionValue}   sm:w-1/3  xl:w-1/5 2xl:w-1/6 `}
        >
            <AnimatePresence>
                {toasts?.map((toast, index) => (
                    <div key={toast.id} style={{zIndex: 10 + index}}>
                        <Toast
                            initial={initial}
                            animate={animate}
                            exit={exit}
                            type={toast.type}
                            richColor={richColor}
                            message={toast.message}
                        />
                    </div>
                ))}
            </AnimatePresence>
        </div>,
        portalTarget
    );
}
