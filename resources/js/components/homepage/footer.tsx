export default function Footer() {
    return (
        <footer className="border-t border-border bg-card/30 py-12">
            <div className="container mx-auto px-6 text-center">
                <div className="mb-6 flex justify-center gap-6 text-muted-foreground">
                    <a
                        href="#"
                        className="text-xs font-bold tracking-widest uppercase transition-colors hover:text-primary"
                    >
                        Terms
                    </a>
                    <a
                        href="#"
                        className="text-xs font-bold tracking-widest uppercase transition-colors hover:text-primary"
                    >
                        Privacy
                    </a>
                    <a
                        href="#"
                        className="text-xs font-bold tracking-widest uppercase transition-colors hover:text-primary"
                    >
                        Rules
                    </a>
                </div>
                <p className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase opacity-60">
                    &copy; {new Date().getFullYear()} NOMROTI Network &bull;
                    Engineered for Performance
                </p>
            </div>
        </footer>
    );
}
