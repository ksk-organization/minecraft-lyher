import { usePage } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

interface FlashProps {
    success?: string;
    error?: string;
    payment?: string;
    errors?: any;
}

export default function FlashMessage() {
    const { flash } = usePage<{ flash: FlashProps }>().props;
    const lastToastId = useRef<string | null>(null);

    // console.log(flash?.errors)

    useEffect(() => {
        const message = flash?.success || flash?.error || flash?.payment || flash?.errors;
        if (!message) return;

        // Prevent identical toast spam if the page re-renders
        if (lastToastId.current === message) return;

        const toastOptions = { 
            duration: 3000, 
            position: 'top-right' as const,
            // Optimization: unique ID prevents duplicate toast stacking
            id: message 
        };

        if (flash.success || flash.payment) {
            toast.success(message, toastOptions);
        } else if (flash.error) {
            toast.error(message, toastOptions);
        }

        lastToastId.current = message;

        // Cleanup: Clear the ref after the duration to allow the same message 
        // to appear again later if triggered by a new action
        const timer = setTimeout(() => {
            lastToastId.current = null;
        }, 3100);

        return () => clearTimeout(timer);
    }, [flash]);

    return null;
}