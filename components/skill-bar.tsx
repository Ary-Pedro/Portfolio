"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface SkillBarProps {
  skill: { name: string; level: number }
  index: number
  darkMode: boolean
}

export default function SkillBar({ skill, index, darkMode }: SkillBarProps) {
  const [inView, setInView] = useState(false)

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      onViewportEnter={() => setInView(true)}
      className="mb-6"
    >
      <div className="flex justify-between mb-2">
        <span className={`font-semibold ${darkMode ? "text-white" : "text-slate-800"}`}>{skill.name}</span>
        <span className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>{skill.level}%</span>
      </div>

      <div className={`h-3 rounded-full overflow-hidden ${darkMode ? "bg-slate-700" : "bg-gray-200"}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{
            duration: 1.5,
            delay: index * 0.2,
            ease: "easeOut",
          }}
          className={`h-full rounded-full relative overflow-hidden ${
            darkMode ? "bg-gradient-to-r from-green-400 to-blue-400" : "bg-gradient-to-r from-purple-600 to-blue-600"
          }`}
        >
          {/* Liquid wave effect */}
          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            style={{ width: "50%" }}
          />

          {/* Glow effect for dark mode */}
          {darkMode && (
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-green-400/20 blur-sm"
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
