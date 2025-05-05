'use client';
import { useEffect, useState } from 'react';
import AlertaGlobal from './AlertaGlobal';

export default function GlobalErrorListener() {
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handler = (event: any) => {
            if (event.detail?.message) {
                setError(event.detail.message);
            }
        };

        window.addEventListener("global-error", handler);
        return () => window.removeEventListener("global-error", handler);
    }, []);

    return error ? <AlertaGlobal mensaje={error} /> : null;
}

