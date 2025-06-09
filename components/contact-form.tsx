"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { Send } from "lucide-react"

interface ContactFormProps {
  darkMode: boolean
}

export default function ContactForm({ darkMode }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [focused, setFocused] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={`p-8 rounded-xl ${
        darkMode ? "bg-slate-800/50 border border-green-500/30" : "bg-white/50 border border-purple-200"
      }`}
    >
      <div className="space-y-6">
        {/* Name Field */}
        <div className="relative">
          <motion.label
            animate={{
              y: focused === "name" || formData.name ? -25 : 0,
              scale: focused === "name" || formData.name ? 0.85 : 1,
              color: focused === "name" ? (darkMode ? "#4ADE80" : "#8B5CF6") : darkMode ? "#9CA3AF" : "#6B7280",
            }}
            transition={{ duration: 0.2 }}
            className="absolute left-3 top-3 pointer-events-none origin-left"
          >
            Nome
          </motion.label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onFocus={() => setFocused("name")}
            onBlur={() => setFocused(null)}
            className={`w-full p-3 rounded-lg border-2 bg-transparent transition-all duration-300 ${
              focused === "name"
                ? darkMode
                  ? "border-green-400 shadow-lg shadow-green-400/25"
                  : "border-purple-500 shadow-lg shadow-purple-500/25"
                : darkMode
                  ? "border-slate-600"
                  : "border-gray-300"
            } ${darkMode ? "text-white" : "text-slate-800"}`}
          />
          {/* Animated border gradient */}
          {focused === "name" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`absolute inset-0 rounded-lg border-2 ${
                darkMode
                  ? "border-gradient-to-r from-green-400 to-blue-400"
                  : "border-gradient-to-r from-purple-500 to-blue-500"
              } pointer-events-none`}
            />
          )}
        </div>

        {/* Email Field */}
        <div className="relative">
          <motion.label
            animate={{
              y: focused === "email" || formData.email ? -25 : 0,
              scale: focused === "email" || formData.email ? 0.85 : 1,
              color: focused === "email" ? (darkMode ? "#4ADE80" : "#8B5CF6") : darkMode ? "#9CA3AF" : "#6B7280",
            }}
            transition={{ duration: 0.2 }}
            className="absolute left-3 top-3 pointer-events-none origin-left"
          >
            Email
          </motion.label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused(null)}
            className={`w-full p-3 rounded-lg border-2 bg-transparent transition-all duration-300 ${
              focused === "email"
                ? darkMode
                  ? "border-green-400 shadow-lg shadow-green-400/25"
                  : "border-purple-500 shadow-lg shadow-purple-500/25"
                : darkMode
                  ? "border-slate-600"
                  : "border-gray-300"
            } ${darkMode ? "text-white" : "text-slate-800"}`}
          />
        </div>

        {/* Message Field */}
        <div className="relative">
          <motion.label
            animate={{
              y: focused === "message" || formData.message ? -25 : 0,
              scale: focused === "message" || formData.message ? 0.85 : 1,
              color: focused === "message" ? (darkMode ? "#4ADE80" : "#8B5CF6") : darkMode ? "#9CA3AF" : "#6B7280",
            }}
            transition={{ duration: 0.2 }}
            className="absolute left-3 top-3 pointer-events-none origin-left"
          >
            Mensagem
          </motion.label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => setFocused("message")}
            onBlur={() => setFocused(null)}
            rows={4}
            className={`w-full p-3 rounded-lg border-2 bg-transparent transition-all duration-300 resize-none ${
              focused === "message"
                ? darkMode
                  ? "border-green-400 shadow-lg shadow-green-400/25"
                  : "border-purple-500 shadow-lg shadow-purple-500/25"
                : darkMode
                  ? "border-slate-600"
                  : "border-gray-300"
            } ${darkMode ? "text-white" : "text-slate-800"}`}
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full p-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
            darkMode
              ? "bg-gradient-to-r from-green-500 to-blue-500 text-white hover:shadow-lg hover:shadow-green-500/25"
              : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:shadow-purple-500/25"
          }`}
        >
          <span>Enviar Mensagem</span>
          <Send size={20} />
        </motion.button>
      </div>
    </motion.form>
  )
}
