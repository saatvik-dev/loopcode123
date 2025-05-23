import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedGroupProps {
  children: React.ReactNode
  variants?: any
  className?: string
  delay?: number
}

export function AnimatedGroup({ 
  children, 
  variants,
  className,
  delay = 0
}: AnimatedGroupProps) {
  const defaultVariants = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: delay,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: 'spring',
          bounce: 0.3,
          duration: 0.6,
        },
      },
    },
  }

  const finalVariants = variants || defaultVariants

  return (
    <motion.div
      className={cn(className)}
      variants={finalVariants.container}
      initial="hidden"
      animate="visible"
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div key={index} variants={finalVariants.item}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={finalVariants.item}>
          {children}
        </motion.div>
      )}
    </motion.div>
  )
}