"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface TechStackProps {
  darkMode: boolean
}

interface Technology {
  name: string
  level: number
  proficiency: "Básico" | "Intermediário" | "Avançado"
}

interface TechCategory {
  id: string
  label: string
  technologies: Technology[]
}

export default function TechStack({ darkMode }: TechStackProps) {
  const [activeTab, setActiveTab] = useState("linguagens")

  const techCategories: TechCategory[] = [
    {
      id: "linguagens",
      label: "Linguagens",
      technologies: [
        { name: "Python", level: 100, proficiency: "Avançado" },
        { name: "SQL", level: 95, proficiency: "Avançado" },
        { name: "JavaScript", level: 85, proficiency: "Avançado" },
        { name: "Java", level: 80, proficiency: "Intermediário" },
        { name: "C", level: 80, proficiency: "Intermediário" },
        { name: "C#", level: 30, proficiency: "Básico" },
        { name: "PHP", level: 15, proficiency: "Básico" },

        
      ],
    },
    {
      id: "frameworks",
      label: "Frameworks",
      technologies: [
        { name: "Django", level: 85, proficiency: "Avançado" },
        { name: "LangChain", level: 75, proficiency: "Intermediário" },
        { name: "FastAPI", level: 75, proficiency: "Intermediário" },
        { name: "React", level: 60, proficiency: "Intermediário" },
        { name: "bootstrap", level: 60, proficiency: "Intermediário" },
        { name: "tailwindcss", level: 60, proficiency: "Intermediário" },
        
        { name: "WordPress ", level: 30, proficiency: "Básico" },
        { name: "Node.js", level: 30, proficiency: "Básico" },
        { name: "Express", level: 15, proficiency: "Básico" },
        { name: "Vue.js", level: 15, proficiency: "Básico" },
        { name: "Next.js", level: 15, proficiency: "Básico" },
      ],
    },
    {
      id: "databases",
      label: "Bancos de Dados & Cloud",
      technologies: [
        { name: "MySQL", level: 85, proficiency: "Avançado" },
        { name: "PostgreSQL", level: 85, proficiency: "Avançado" },
        { name: "Oracle", level: 85, proficiency: "Avançado" },

        { name: "GitHub Pages", level: 75, proficiency: "Intermediário" },
        { name: "Vercel", level: 70, proficiency: "Intermediário" },
        { name: "Netlify", level: 70, proficiency: "Intermediário" },
        { name: "Render", level: 65, proficiency: "Intermediário" },
        { name: "PythonAnyWhere", level: 65, proficiency: "Intermediário" },
        { name: "InfinityFree", level: 65, proficiency: "Intermediário" },
        { name: "MongoDB", level: 60, proficiency: "Intermediário" },
        { name: "Qdrant", level: 60, proficiency: "Intermediário" },
        { name: "Docker", level: 60, proficiency: "Intermediário" },
        { name: "AWS", level: 25, proficiency: "Básico" },
        { name: "Azure", level: 25, proficiency: "Básico" },

      ],
    },
    {
      id: "ferramentas",
      label: "Ferramentas",
      technologies: [
        { name: "VS Code", level: 100, proficiency: "Avançado" },
        { name: "Jet Brains", level: 100, proficiency: "Avançado" },
        { name: "Pacote office", level: 100, proficiency: "Avançado" },
        { name: "Obsidian", level: 95, proficiency: "Avançado" },
        { name: "Power BI", level: 90, proficiency: "Avançado" },
        { name: "Git", level: 90, proficiency: "Avançado" },
        { name: "GitHub DesckTop", level: 90, proficiency: "Avançado" },
        { name: "GitLens", level: 90, proficiency: "Avançado" },
        { name: "Figma", level: 90, proficiency: "Avançado" },
        { name: "Canva", level: 90, proficiency: "Avançado" },
        { name: "Eclipse", level: 80, proficiency: "Avançado" },
        { name: "Postman", level: 60, proficiency: "Avançado" },
        { name: "flutterflow", level: 60, proficiency: "Avançado" },
        { name: "Unity", level: 50, proficiency: "Básico" },
        { name: "Arduino", level: 20, proficiency: "Básico" },



        
        
      ],
    },
    {
      id: "Extra",
      label: "FOR YOU ❤️",
      technologies: [
        { name: "FreeCodeCamp", level: 100, proficiency: "📖CURSO" },
        { name: "Microsoft Learm", level: 100, proficiency: "📖CURSO" },
        { name: "Cloud Skills Boost", level: 100, proficiency: "📖CURSO" },
        { name: "W3Scholls", level: 80, proficiency: "📖CURSO" },
        { name: "EV.G ENAP", level: 90, proficiency: "📖CURSO" },
        { name: "edX", level: 80, proficiency: "📖CURSO" },
        { name: "Coursera", level: 80, proficiency: "📖CURSO💸" },
        { name: "DIO", level: 80, proficiency: "📖CURSO💸" },
        { name: "Udemy", level: 70, proficiency: "📖CURSO" },
        { name: "Alura", level: 50, proficiency: "💸CURSO" },
        { name: "Cuso em Vídeo", level: 100, proficiency: "▶YouTube" },
        { name: "DevDojo", level: 100, proficiency: "▶YouTube" },
        { name: "Hashtag Programação", level: 100, proficiency: "▶YouTube" },
        { name: "TreinaWeb", level: 100, proficiency: "▶YouTube" },
        { name: "Pythonando", level: 100, proficiency: "▶YouTube" },
        { name: "CodeChef.com", level: 100, proficiency: "🎮Prática" },
        { name: "CodeWas.com", level: 100, proficiency: "🎮Prática" },
        { name: "CodeCombat.com", level: 90, proficiency: "🎮Prática" },
        { name: "CheckiO.org", level: 100, proficiency: "🎮Prática" },
        { name: "CSS Diner", level: 100, proficiency: "🎮Prática" },
        { name: "Ohmygit.org", level: 100, proficiency: "🎮Prática" },
        { name: "Codingame.com", level: 100, proficiency: "🎮Prática" },
        { name: "Codedex.io", level: 80, proficiency: "🎮Prática" },
        { name: "Mystery.knightlab.com", level: 70, proficiency: "🎮Prática" },
        { name: "frontEndMentor.io", level: 70, proficiency: "🎮Prática" },
        { name: "Lightbot.com", level: 50, proficiency: "🎮Prática" },
        { name: "LeetCode.com", level: 50, proficiency: "🎮Prática" },
        { name: "Education GitHub", level: 100, proficiency: "📦Developer Pack " },      
        { name: "Lovable.dev", level: 100, proficiency: "🤖IA" },
        { name: "V0.dev", level: 100, proficiency: "🤖IA" },
        { name: "Base44.com", level: 100, proficiency: "🤖IA" },
        { name: "Bolt.new", level: 100, proficiency: "🤖IA" },
        { name: "Claude.ia", level: 70, proficiency: "🤖IA" },
        { name: "Uxcanvas.ai", level: 70, proficiency: "🤖IA" },
        { name: "Theresanaiforthat", level: 100, proficiency: "🤖IA" },
      ],
    },
  ]

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case "Avançado":
        return darkMode ? "text-green-300" : "text-green-600"
      case "Intermediário":
        return darkMode ? "text-yellow-300" : "text-yellow-600"
      case "Básico":
        return darkMode ? "text-blue-300" : "text-blue-600"
      default:
        return darkMode ? "text-gray-300" : "text-gray-600"
    }
  }

  const currentCategory = techCategories.find((cat) => cat.id === activeTab)

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-2 mb-12"
      >
        {techCategories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => setActiveTab(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-full transition-all duration-300 font-medium backdrop-blur-sm border ${
              activeTab === category.id
                ? darkMode
                  ? "bg-green-500/30 text-green-300 border-green-500/50 shadow-lg shadow-green-500/25"
                  : "bg-purple-500/30 text-purple-600 border-purple-500/50 shadow-lg shadow-purple-500/25"
                : darkMode
                  ? "bg-slate-800/30 text-gray-300 border-slate-600/50 hover:bg-slate-700/30"
                  : "bg-white/30 text-gray-600 border-gray-300/50 hover:bg-white/50"
            }`}
          >
            {category.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Tech Grid */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid md:grid-cols-2 gap-6"
      >
        {currentCategory?.technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`p-6 rounded-xl transition-all duration-300 backdrop-blur-sm border ${
              darkMode
                ? "bg-slate-800/30 border-green-500/30 hover:shadow-lg hover:shadow-green-500/25"
                : "bg-white/30 border-purple-200/50 hover:shadow-lg hover:shadow-purple-500/25"
            }`}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-slate-800"}`}>{tech.name}</h3>
              <div className="flex items-center space-x-3">
                <span className={`text-sm font-medium ${getProficiencyColor(tech.proficiency)}`}>
                  {tech.proficiency}
                </span>
                <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{tech.level}%</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className={`h-3 rounded-full overflow-hidden ${darkMode ? "bg-slate-700/50" : "bg-gray-200/50"}`}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${tech.level}%` }}
                transition={{
                  duration: 1.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className={`h-full rounded-full relative overflow-hidden ${
                  darkMode
                    ? "bg-gradient-to-r from-green-400 to-blue-400"
                    : "bg-gradient-to-r from-purple-600 to-blue-600"
                }`}
              >
                {/* Animated shine effect */}
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
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
