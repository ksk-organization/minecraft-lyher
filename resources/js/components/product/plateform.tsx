import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import {
    Monitor,
    Gamepad2,
    Smartphone
} from 'lucide-react';

export function PlatformSelector({
    value,
    onChange,
}: {
    value: 'java' | 'bedrock' | 'pocket';
    onChange: (v: 'java' | 'bedrock' | 'pocket') => void;
}) {
    const platforms = [
        { id: 'java', label: 'Java', icon: Monitor },
        { id: 'bedrock', label: 'Bedrock', icon: Gamepad2 },
        // { id: 'pocket', label: 'Pocket', icon: Smartphone },
    ] as const;

    return (
        <TooltipProvider>
            <div className="grid grid-cols-2 gap-3">
                {platforms.map(({ id, label, icon: Icon }) => (
                    <Tooltip key={id}>
                        <TooltipTrigger asChild>
                            <button
                                type="button"
                                onClick={() => onChange(id)}
                                className={cn(
                                    'flex flex-col items-center gap-2 rounded-xl border p-4 transition-all',
                                    value === id
                                        ? 'border-primary bg-primary/10 text-primary shadow-sm'
                                        : 'border-white/5 bg-black/20 text-muted-foreground hover:border-white/20',
                                )}
                            >
                                <Icon size={20} />
                                <span className="text-xs font-black uppercase">
                                    {label}
                                </span>
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>{label} Edition</TooltipContent>
                    </Tooltip>
                ))}
            </div>
        </TooltipProvider>
    );
}