'use client'
import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface NavbarProps {
    className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = [
        { name: 'Work', href: '#portfolio' },
        { name: 'Services', href: '#services' },
        { name: 'Pricing', href: '#calculator' },
    ];
    
    return (
        <header>
            <motion.nav
                data-state={isMobileMenuOpen && 'active'}
                className="fixed z-50 w-full px-2 group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <div className={cn(
                    'mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12', 
                    isScrolled && 'bg-black/50 max-w-4xl rounded-2xl border border-white/10 backdrop-blur-lg lg:px-5'
                )}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        
                        {/* Logo and Mobile Toggle */}
                        <div className="flex w-full justify-between lg:w-auto">
                            <motion.div
                                className="flex items-center space-x-2"
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                <div className="relative w-8 h-8 bg-gradient-to-br from-black to-gray-800 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">C</span>
                                </div>
                                <span className="text-white text-lg font-bold">Code Craft</span>
                            </motion.div>

                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                            >
                                <motion.div
                                    className="w-6 h-6 flex items-center justify-center"
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <svg 
                                        className={cn(
                                            "w-6 h-6 text-white transition-all duration-200",
                                            isMobileMenuOpen ? "rotate-180 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
                                        )}
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                    <svg 
                                        className={cn(
                                            "absolute w-6 h-6 text-white transition-all duration-200",
                                            isMobileMenuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-180 scale-0 opacity-0"
                                        )}
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </motion.div>
                            </button>
                        </div>

                        {/* Desktop Menu - Center */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block">
                            <motion.ul 
                                className="flex gap-8 text-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                            >
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <a
                                            href={item.href}
                                            className="text-white/80 hover:text-white block duration-150 font-medium"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                document.getElementById(item.href.substring(1))?.scrollIntoView({ behavior: 'smooth' })
                                            }}
                                        >
                                            <span>{item.name}</span>
                                        </a>
                                    </li>
                                ))}
                            </motion.ul>
                        </div>

                        {/* Desktop Actions - Right */}
                        <div className="hidden lg:flex items-center gap-3">
                            <motion.button
                                className={cn(
                                    "inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white border border-white/20 rounded-full hover:bg-white/10 transition-colors cursor-pointer",
                                    isScrolled && 'lg:hidden'
                                )}
                                onClick={() => {
                                    document.getElementById('calculator')?.scrollIntoView({ 
                                        behavior: 'smooth',
                                        block: 'start'
                                    });
                                }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                Contact
                            </motion.button>
                            
                            <motion.button
                                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-black bg-white rounded-full hover:bg-white/90 transition-colors cursor-pointer"
                                onClick={() => {
                                    document.getElementById('calculator')?.scrollIntoView({ 
                                        behavior: 'smooth',
                                        block: 'start'
                                    });
                                }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                            >
                                Get Started
                            </motion.button>
                        </div>
                    </div>

                    {/* Mobile Menu Dropdown */}
                    <AnimatePresence>
                        {isMobileMenuOpen && (
                            <motion.div
                                className="lg:hidden mt-2 mx-4 overflow-hidden backdrop-blur-lg bg-black/50 rounded-xl border border-white/10"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="flex flex-col py-4 px-6 space-y-4">
                                    {/* Mobile Menu Items */}
                                    <div className="space-y-4">
                                        {menuItems.map((item, index) => (
                                            <a
                                                key={index}
                                                href={item.href}
                                                className="text-white/80 hover:text-white block duration-150 font-medium py-2"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    setIsMobileMenuOpen(false)
                                                    document.getElementById(item.href.substring(1))?.scrollIntoView({ behavior: 'smooth' })
                                                }}
                                            >
                                                <span>{item.name}</span>
                                            </a>
                                        ))}
                                    </div>

                                    {/* Mobile Action Buttons */}
                                    <div className="flex flex-col space-y-3 pt-4 border-t border-white/10">
                                        <motion.button
                                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white border border-white/20 rounded-full hover:bg-white/10 transition-colors cursor-pointer w-full"
                                            onClick={() => {
                                                setIsMobileMenuOpen(false);
                                                setTimeout(() => {
                                                    document.getElementById('calculator')?.scrollIntoView({ 
                                                        behavior: 'smooth',
                                                        block: 'start'
                                                    });
                                                }, 300);
                                            }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Contact
                                        </motion.button>
                                        
                                        <motion.button
                                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-black bg-white rounded-full hover:bg-white/90 transition-colors cursor-pointer w-full"
                                            onClick={() => {
                                                setIsMobileMenuOpen(false);
                                                setTimeout(() => {
                                                    document.getElementById('calculator')?.scrollIntoView({ 
                                                        behavior: 'smooth',
                                                        block: 'start'
                                                    });
                                                }, 300);
                                            }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Get Started
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.nav>
        </header>
    );
};

interface TextRotatorProps {
    words: string[];
    className?: string;
    interval?: number;
    textGradient?: boolean;
    letterAnimation?: boolean;
}

const TextRotator = ({
    words,
    className = "",
    interval = 3000,
    textGradient = true,
    letterAnimation = true
}: TextRotatorProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, interval);

        return () => clearInterval(timer);
    }, [words.length, interval]);

    // Animation variants for letter-by-letter effect
    const letterVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            filter: "blur(5px)",
            scale: 0.9
        },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            scale: 1,
            transition: {
                delay: i * 0.05,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1]
            }
        }),
        exit: (i: number) => ({
            opacity: 0,
            y: -20,
            filter: "blur(5px)",
            scale: 0.9,
            transition: {
                delay: i * 0.02,
                duration: 0.3,
                ease: "easeInOut"
            }
        })
    };

    // Generate gradient colors for letters
    const getGradientColors = (index: number, total: number) => {
        const hueStart = (currentIndex * 30) % 360; // Rotate hue based on word
        const hue = hueStart + (index / total * 60); // Spread across 60 degrees
        return `hsl(${hue}, 80%, 60%)`;
    };

    return (
        <span className={cn(
            "relative inline-block min-w-[250px] min-h-[1.5em]",
            !letterAnimation && textGradient && "bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
            className
        )}>
            <AnimatePresence mode="wait">
                {letterAnimation ? (
                    <motion.span
                        key={currentIndex}
                        className="absolute inset-0 flex items-center justify-center w-full -mt-3"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {words[currentIndex].split('').map((letter, i, array) => (
                            <motion.span
                                key={`${currentIndex}-${i}`}
                                custom={i}
                                variants={letterVariants}
                                style={textGradient ? {
                                    color: getGradientColors(i, array.length),
                                    display: 'inline-block',
                                    textShadow: '0 0 15px rgba(100, 100, 200, 0.15)',
                                    fontWeight: 'inherit'
                                } : {}}
                                className={letter === ' ' ? 'ml-2' : ''}
                            >
                                {letter === ' ' ? '\u00A0' : letter}
                            </motion.span>
                        ))}
                    </motion.span>
                ) : (
                    <motion.span
                        key={currentIndex}
                        className="absolute inset-0 flex items-center justify-center w-full"
                        initial={{
                            y: 40,
                            opacity: 0,
                            filter: "blur(8px)",
                            scale: 0.95,
                        }}
                        animate={{
                            y: 0,
                            opacity: 1,
                            filter: "blur(0px)",
                            scale: 1,
                        }}
                        exit={{
                            y: -40,
                            opacity: 0,
                            filter: "blur(8px)",
                            scale: 0.95,
                        }}
                        transition={{
                            y: { type: "spring", stiffness: 100, damping: 15 },
                            opacity: { duration: 0.5 },
                            filter: { duration: 0.4 },
                            scale: { duration: 0.4 }
                        }}
                    >
                        {words[currentIndex]}
                    </motion.span>
                )}
            </AnimatePresence>
            <span className="opacity-0">{words[0]}</span>
        </span>
    );
};

interface RippleProps {
    x: number;
    y: number;
    size: number;
}

const ButtonRipple = ({
    children,
    className = "",
    onClick,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
    onClick?: (e: React.MouseEvent) => void;
    [key: string]: any;
}) => {
    const [ripples, setRipples] = useState<RippleProps[]>([]);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = (e: React.MouseEvent) => {
        if (!buttonRef.current) return;

        const button = buttonRef.current;
        const rect = button.getBoundingClientRect();

        // Calculate ripple position relative to button
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate ripple size (should cover the button)
        const size = Math.max(rect.width, rect.height) * 1.5;

        // Add new ripple
        const newRipple = { x, y, size };
        setRipples([...ripples, newRipple]);

        // Remove ripple after animation
        setTimeout(() => {
            setRipples((prevRipples) => prevRipples.filter(r => r !== newRipple));
        }, 1000);

        // Call original onClick if provided
        if (onClick) onClick(e);
    };

    return (
        <motion.button
            ref={buttonRef}
            className={cn(
                "relative overflow-hidden bg-white text-black px-8 py-3 rounded-full font-medium transition-all duration-300 hover:bg-white/90 hover:scale-105",
                className
            )}
            onClick={handleClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            {...props}
        >
            {children}
            
            {/* Ripple effects */}
            {ripples.map((ripple, index) => (
                <motion.span
                    key={index}
                    className="absolute bg-black/10 rounded-full pointer-events-none"
                    style={{
                        left: ripple.x - ripple.size / 2,
                        top: ripple.y - ripple.size / 2,
                        width: ripple.size,
                        height: ripple.size,
                    }}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 1, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                />
            ))}
        </motion.button>
    );
};

const HeroBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
            
            {/* Animated background elements */}
            <motion.div
                className="absolute inset-0 opacity-30"
                animate={{
                    background: [
                        'radial-gradient(circle at 20% 80%, #000000 0%, transparent 50%)',
                        'radial-gradient(circle at 80% 20%, #374151 0%, transparent 50%)',
                        'radial-gradient(circle at 40% 40%, #000000 0%, transparent 50%)',
                    ],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
            />

            {/* Floating orbs */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-64 h-64 bg-black/20 rounded-full blur-3xl"
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
            />
            
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"
                animate={{
                    x: [0, -80, 0],
                    y: [0, 60, 0],
                    scale: [1, 0.8, 1],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 2,
                }}
            />

            {/* Grid pattern */}
            <div 
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '100px 100px'
                }}
            />

            {/* Noise texture */}
            <motion.div
                className="absolute inset-0 opacity-20 pointer-events-none"
                animate={{
                    opacity: [0.05, 0.15, 0.05],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 1
                }}
            />

            {/* Diagonal highlight animation */}
            <motion.div
                className="absolute -inset-full h-[300%] w-[200%] opacity-10"
                style={{
                    background: 'linear-gradient(115deg, transparent 30%, rgba(255, 255, 255, 0.4) 40%, rgba(255, 255, 255, 0.2) 50%, transparent 60%)',
                    transform: 'rotate(-15deg)',
                }}
                animate={{
                    left: ['-100%', '100%'],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatDelay: 8,
                    ease: "easeInOut"
                }}
            />
        </div>
    );
};

const ClassyHero = () => {
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    // Words to rotate through
    const rotatingWords = ["Websites", "Applications", "Solutions"];

    // Enhanced function to handle button click with better scrolling
    const handleButtonClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsButtonClicked(true);
        
        // Navigate to calculator
        document.getElementById('calculator')?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });

        // Reset after animation completes
        setTimeout(() => {
            setIsButtonClicked(false);
        }, 3000);
    };

    return (
        <>
            <Navbar />
            <div className="relative bg-black h-screen w-full flex flex-col items-center justify-center overflow-hidden">
                <HeroBackground />

                {/* Hero content with animation */}
                <motion.div
                    className="z-20 text-center px-4 relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <motion.h1
                        className="text-white text-4xl md:text-5xl lg:text-6xl font-bold max-w-3xl mx-auto leading-tight flex flex-col items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <span>We Build Modern</span>
                        <TextRotator
                            words={rotatingWords}
                            className="font-bold block"
                            interval={4000}
                            letterAnimation={true}
                        />
                    </motion.h1>

                    <motion.p
                        className="text-white/70 text-base md:text-lg mt-6 max-w-xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.1 }}
                    >
                        Professional web development services for Indian businesses. From static websites to custom applications, we deliver quality solutions at competitive prices.
                    </motion.p>

                    <motion.div
                        className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.4 }}
                    >
                        <ButtonRipple
                            onClick={handleButtonClick}
                            className="bg-white text-black hover:bg-white/90"
                        >
                            Get Started Today
                        </ButtonRipple>
                        
                        <motion.a
                            href="#portfolio"
                            className="text-white border border-white/30 px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={(e) => {
                                e.preventDefault()
                                document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
                            }}
                        >
                            View Our Work
                        </motion.a>
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 2 }}
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-white/50 text-sm flex flex-col items-center gap-2"
                    >
                        <span>Scroll to explore</span>
                        <svg 
                            className="w-4 h-4" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                            />
                        </svg>
                    </motion.div>
                </motion.div>
            </div>
        </>
    );
};

export default ClassyHero;