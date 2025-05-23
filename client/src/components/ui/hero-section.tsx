import { ArrowRight, ChevronRight, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}

export function HeroSection() {
    return (
        <>
            <HeroHeader />
            <main className="overflow-hidden">
                <div
                    aria-hidden
                    className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block">
                    <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
                    <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
                    <div className="h-[80rem] -translate-y-[350px] absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
                </div>
                <section>
                    <div className="relative pt-24 md:pt-36">
                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            delayChildren: 1,
                                        },
                                    },
                                },
                                item: {
                                    hidden: {
                                        opacity: 0,
                                        y: 20,
                                    },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            type: 'spring',
                                            bounce: 0.3,
                                            duration: 2,
                                        },
                                    },
                                },
                            }}
                            className="absolute inset-0 -z-20">
                            <img
                                src="https://ik.imagekit.io/lrigu76hy/tailark/night-background.jpg?updatedAt=1745733451120"
                                alt="background"
                                className="absolute inset-x-0 top-56 -z-20 hidden lg:top-32 dark:block"
                                width="3276"
                                height="4095"
                            />
                        </AnimatedGroup>
                        <div aria-hidden className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]" />
                        <div className="mx-auto max-w-7xl px-6">
                            <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                                <AnimatedGroup variants={transitionVariants}>
                                    <div className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-black/5 transition-all duration-300 dark:border-t-white/5 dark:shadow-zinc-950 cursor-pointer">
                                        <span className="text-foreground text-sm">Professional Web Development Services</span>
                                        <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>

                                        <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                                            <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                                                <span className="flex size-6">
                                                    <ArrowRight className="m-auto size-3" />
                                                </span>
                                                <span className="flex size-6">
                                                    <ArrowRight className="m-auto size-3" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                        
                                    <h1 className="mt-8 max-w-4xl mx-auto text-balance text-6xl md:text-7xl lg:mt-16 xl:text-[5.25rem] font-bold">
                                        Modern Web Solutions for Indian Businesses
                                    </h1>
                                    <p className="mx-auto mt-8 max-w-2xl text-balance text-lg text-muted-foreground">
                                        From static websites to custom web applications, I deliver high-quality, responsive websites tailored to your business needs at competitive prices.
                                    </p>
                                </AnimatedGroup>

                                <AnimatedGroup
                                    variants={{
                                        container: {
                                            visible: {
                                                transition: {
                                                    staggerChildren: 0.05,
                                                    delayChildren: 0.75,
                                                },
                                            },
                                        },
                                        ...transitionVariants,
                                    }}
                                    className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row">
                                    <div
                                        key={1}
                                        className="bg-foreground/10 rounded-[14px] border p-0.5">
                                        <Button
                                            onClick={() => {
                                                const calculatorSection = document.getElementById('calculator');
                                                if (calculatorSection) {
                                                    calculatorSection.scrollIntoView({ behavior: 'smooth' });
                                                }
                                            }}
                                            size="lg"
                                            className="rounded-xl px-5 text-base">
                                            <span className="text-nowrap">Get Started</span>
                                        </Button>
                                    </div>
                                    <Button
                                        key={2}
                                        onClick={() => {
                                            const portfolioSection = document.getElementById('portfolio');
                                            if (portfolioSection) {
                                                portfolioSection.scrollIntoView({ behavior: 'smooth' });
                                            }
                                        }}
                                        size="lg"
                                        variant="ghost"
                                        className="h-10.5 rounded-xl px-5">
                                        <span className="text-nowrap">View Portfolio</span>
                                    </Button>
                                </AnimatedGroup>
                            </div>
                        </div>

                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.05,
                                            delayChildren: 0.75,
                                        },
                                    },
                                },
                                ...transitionVariants,
                            }}>
                            <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
                                <div
                                    aria-hidden
                                    className="bg-gradient-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
                                />
                                <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
                                    <img
                                        className="bg-background aspect-[15/8] relative hidden rounded-2xl dark:block"
                                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2426&q=80"
                                        alt="Modern web development workspace"
                                        width="2700"
                                        height="1440"
                                    />
                                    <img
                                        className="z-2 border-border/25 aspect-[15/8] relative rounded-2xl border dark:hidden"
                                        src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2426&q=80"
                                        alt="Professional web development"
                                        width="2700"
                                        height="1440"
                                    />
                                </div>
                            </div>
                        </AnimatedGroup>
                    </div>
                </section>
                <section className="bg-background pb-16 pt-16 md:pb-32">
                    <div className="group relative m-auto max-w-5xl px-6">
                        <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
                            <div className="block text-sm duration-150 hover:opacity-75">
                                <span>Trusted by Growing Businesses</span>
                                <ChevronRight className="ml-1 inline-block size-3" />
                            </div>
                        </div>
                        <div className="group-hover:blur-xs mx-auto mt-12 grid max-w-2xl grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-8 transition-all duration-500 group-hover:opacity-50 sm:gap-x-16 sm:gap-y-14">
                            <div className="flex">
                                <div className="mx-auto h-12 w-24 bg-muted rounded-lg flex items-center justify-center">
                                    <span className="text-xs font-semibold text-muted-foreground">Client 1</span>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="mx-auto h-12 w-24 bg-muted rounded-lg flex items-center justify-center">
                                    <span className="text-xs font-semibold text-muted-foreground">Client 2</span>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="mx-auto h-12 w-24 bg-muted rounded-lg flex items-center justify-center">
                                    <span className="text-xs font-semibold text-muted-foreground">Client 3</span>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="mx-auto h-12 w-24 bg-muted rounded-lg flex items-center justify-center">
                                    <span className="text-xs font-semibold text-muted-foreground">Client 4</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

const menuItems = [
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Pricing', href: '#calculator' },
    { name: 'Contact', href: '#contact' },
]

const HeroHeader = () => {
    const [menuState, setMenuState] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
            isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
        )}>
            <nav className="mx-auto max-w-7xl px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <div className="text-xl font-bold">WebDev Pro</div>
                    </div>
                    
                    <div className="hidden md:flex flex-1 justify-center">
                        <ul className="flex items-center gap-8">
                            {menuItems.map((item, idx) => (
                                <li key={idx}>
                                    <a
                                        href={item.href}
                                        className="text-sm font-medium hover:text-primary transition-colors"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            const element = document.querySelector(item.href)
                                            if (element) {
                                                element.scrollIntoView({ behavior: 'smooth' })
                                            }
                                        }}
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="flex-1 flex justify-end">
                        <div className="hidden md:flex items-center gap-3">
                            <Button variant="ghost" size="sm">
                                Sign In
                            </Button>
                            <Button size="sm">
                                Get Quote
                            </Button>
                        </div>
                        
                        <button
                            className="md:hidden p-2"
                            onClick={() => setMenuState(!menuState)}
                        >
                            {menuState ? <X className="size-5" /> : <Menu className="size-5" />}
                        </button>
                    </div>
                </div>
                
                {/* Mobile Menu */}
                {menuState && (
                    <div className="md:hidden mt-4 pb-4 border-t">
                        <ul className="flex flex-col gap-4 pt-4">
                            {menuItems.map((item, idx) => (
                                <li key={idx}>
                                    <a
                                        href={item.href}
                                        className="block text-sm font-medium hover:text-primary transition-colors"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setMenuState(false)
                                            const element = document.querySelector(item.href)
                                            if (element) {
                                                element.scrollIntoView({ behavior: 'smooth' })
                                            }
                                        }}
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-col gap-2 mt-4">
                            <Button variant="ghost" size="sm">
                                Sign In
                            </Button>
                            <Button size="sm">
                                Get Quote
                            </Button>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}