"use client"

import { m as motion, useInView, useReducedMotion } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import type { LucideIcon } from "lucide-react"

interface CounterStatProps {
  stat: {
    icon: LucideIcon
    value: number
    label: string
    suffix: string
  }
  index: number
  darkMode: boolean
}

export default function CounterStat({ stat, index, darkMode }: CounterStatProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const reducedMotion = useReducedMotion()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (reducedMotion) {
      setCount(stat.value)
      return
    }
    if (isInView) {
      let counter: ReturnType<typeof setInterval> | undefined
      const timer = setTimeout(() => {
        const duration = 1200
        const steps = 30
        const increment = stat.value / steps
        let current = 0

        counter = setInterval(() => {
          current += increment
          if (current >= stat.value) {
            setCount(stat.value)
            clearInterval(counter)

          } else {
            setCount(Math.floor(current))
          }
        }, duration / steps)

      }, index * 200)

      return () => { clearTimeout(timer); clearInterval(counter) }
    }
  }, [isInView, stat.value, index, reducedMotion])

  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className={`text-center p-6 rounded-xl transition-all duration-300 ${
        darkMode
          ? "bg-slate-800/50 border border-green-500/30 hover:shadow-lg hover:shadow-green-500/25"
          : "bg-white/50 border border-purple-200 hover:shadow-lg hover:shadow-purple-500/25"
      }`}
    >
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
        className={`inline-flex p-4 rounded-full mb-4 ${
          darkMode
            ? "bg-gradient-to-r from-green-500/20 to-blue-500/20"
            : "bg-gradient-to-r from-purple-500/20 to-blue-500/20"
        }`}
      >
        <stat.icon className={`w-8 h-8 ${darkMode ? "text-green-400" : "text-purple-600"}`} />
      </motion.div>

      <motion.div className={`text-3xl font-bold mb-2 ${darkMode ? "text-white" : "text-slate-800"}`}>
        {count}
        {stat.suffix}
      </motion.div>

      <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{stat.label}</div>
    </motion.div>
  )
}
