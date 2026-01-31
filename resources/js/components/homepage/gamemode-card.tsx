import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface GamemodeCardProps {
    title: string;
    desc: string;
    img: string;
    href?: string; // Added for Inertia navigation
}

export default function GamemodeCard({ title, desc, img, href = "#" }: GamemodeCardProps) {
    return (
        <Link href={href} className="block">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -12 }} // Performance: smoother than CSS translate
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                <Card className="group overflow-hidden border-white/5 bg-[#121212] shadow-2xl transition-colors duration-500 hover:border-primary/40">
                    {/* Image Container */}
                    <div className="relative h-56 overflow-hidden">
                        <motion.img
                            src={img}
                            alt={title}
                            className="h-full w-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            loading="lazy"
                        />
                        {/* Overlay Gradient: Faster than complex CSS filters */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
                    </div>

                    {/* Content Section */}
                    <CardContent className="p-8">
                        <h3 className="mb-4 text-2xl font-black tracking-tighter uppercase italic text-white">
                            {title}
                        </h3>
                        <p className="mb-8 text-sm leading-relaxed font-medium text-muted-foreground line-clamp-2">
                            {desc}
                        </p>
                        
                        <div className="flex items-center gap-2 text-xs font-black tracking-[0.2em] text-primary uppercase group-hover:text-white transition-colors">
                            Enter Arena
                            <motion.div
                                variants={{
                                    initial: { x: 0 },
                                    hover: { x: 8 }
                                }}
                                initial="initial"
                                whileHover="hover"
                            >
                                <ArrowRight size={16} />
                            </motion.div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </Link>
    );
}