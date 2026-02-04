import { useEffect, useRef, useState } from 'react';

export function useAnimatedCounter(
    endValue: number,
    duration = 2200,
    once = true,
) {
    const [count, setCount] = useState(0);
    const [hasRun, setHasRun] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (once && hasRun) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;

                let start = 0;
                const startTime = performance.now();

                const step = (now: number) => {
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    setCount(Math.floor(progress * endValue));

                    if (progress < 1) {
                        requestAnimationFrame(step);
                    } else if (once) {
                        setHasRun(true);
                    }
                };

                requestAnimationFrame(step);
            },
            { threshold: 0.4 },
        );

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, [endValue, duration, once, hasRun]);

    return { count, ref };
}
