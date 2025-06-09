"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

interface ProjectCardProps {
  project: {
    id: number
    title: string
    description: string
    image: string
    technologies: string[]
    category: string
    status: string
    featured: boolean
    demoLink: string
    codeLink: string
  }
  index: number
  darkMode: boolean
}

export default function ProjectCard({ project, index, darkMode }: ProjectCardProps) {
  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      individual: "Individual",
      equipe: "Equipe",
      Comercial: "Comercial",
      competicao: "Competição",
    }
    return labels[category] || category
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      individual: darkMode
        ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
        : "bg-blue-500/20 text-blue-600 border-blue-200",
      equipe: darkMode
        ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
        : "bg-purple-500/20 text-purple-600 border-purple-200",
      Comercial: darkMode
        ? "bg-green-500/20 text-green-300 border-green-500/30"
        : "bg-green-500/20 text-green-600 border-green-200",
      competicao: darkMode
        ? "bg-orange-500/20 text-orange-300 border-orange-500/30"
        : "bg-orange-500/20 text-orange-600 border-orange-200",
    }
    return (
      colors[category] ||
      (darkMode ? "bg-gray-500/20 text-gray-300 border-gray-500/30" : "bg-gray-500/20 text-gray-600 border-gray-200")
    )
  }

  return (
    <motion.div
      layout
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className={`relative overflow-hidden rounded-xl transition-all duration-300 group backdrop-blur-sm border ${
        darkMode
          ? "bg-slate-800/30 border-green-500/30 hover:shadow-xl hover:shadow-green-500/25"
          : "bg-white/30 border-purple-200/50 hover:shadow-xl hover:shadow-purple-500/25"
      }`}
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 left-4 z-10">
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full backdrop-blur-sm border ${
              darkMode
                ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                : "bg-yellow-500/20 text-yellow-600 border-yellow-200"
            }`}
          >
            {typeof project.featured === "string" ? project.featured : "Destaque"}
          </span>
        </div>
      )}

      {/* Category Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full border backdrop-blur-sm ${getCategoryColor(project.category)}`}
        >
          {getCategoryLabel(project.category)}
        </span>
      </div>

      <div className="relative overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Hover overlay with links */}
        <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors border border-white/30"
            title="Ver Demo"
          >
            <ExternalLink size={20} />
          </motion.a>
          <motion.a
            href={project.codeLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors border border-white/30"
            title="Ver Código"
          >
            <Github size={20} />
          </motion.a>
        </div>
      </div>

      <div className="p-6">
        <h3 className={`text-xl font-bold mb-3 ${darkMode ? "text-green-300" : "text-purple-800"}`}>{project.title}</h3>

        <p className={`mb-4 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 5).map((tech, techIndex) => (
            <span
              key={techIndex}
              className={`px-3 py-1 text-sm rounded-full backdrop-blur-sm border ${
                darkMode
                  ? "bg-slate-700/30 text-gray-300 border-slate-600/50"
                  : "bg-gray-100/50 text-gray-600 border-gray-200/50"
              }`}
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className={`px-3 py-1 text-sm rounded-full ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              +{project.technologies.length - 5}
            </span>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-3">
            <motion.a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors backdrop-blur-sm border ${
                darkMode
                  ? "bg-green-500/20 text-green-300 hover:bg-green-500/30 border-green-500/30"
                  : "bg-purple-500/20 text-purple-600 hover:bg-purple-500/30 border-purple-500/30"
              }`}
            >
              Demo
            </motion.a>
            <motion.a
              href={project.codeLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors backdrop-blur-sm border ${
                darkMode
                  ? "bg-slate-700/30 text-gray-300 hover:bg-slate-600/30 border-slate-600/50"
                  : "bg-gray-200/50 text-gray-600 hover:bg-gray-300/50 border-gray-300/50"
              }`}
            >
              Código
            </motion.a>
          </div>

          <div
            className={`text-xs px-2 py-1 rounded-full backdrop-blur-sm border ${
              project.status === "completed"
                ? darkMode
                  ? "bg-green-500/20 text-green-300 border-green-500/30"
                  : "bg-green-500/20 text-green-600 border-green-500/30"
                : darkMode
                  ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                  : "bg-yellow-500/20 text-yellow-600 border-yellow-500/30"
            }`}
          >
            {project.status === "completed" ? "Concluído" : "Em Andamento"}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
