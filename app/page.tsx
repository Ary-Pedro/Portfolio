"use client"

import { useState, useEffect } from "react"
import { m as motion, AnimatePresence, MotionConfig, LazyMotion, domAnimation } from "framer-motion"
import dynamic from "next/dynamic"
import {
  Moon,
  Sun,
  Github,
  Linkedin,
  Mail,
  Code,
  Palette,
  Terminal,
  Users,
  Filter,
  Search,
  ExternalLink,
  Award,
  Coffee,
} from "lucide-react"
import ProjectCard from "@/components/project-card"
import TechStack from "@/components/tech-stack"
import CounterStat from "@/components/counter-stat"
import { filterProjects, projectGroups, projects } from "@/lib/projects"
import { translate, type Language } from "@/lib/i18n"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"

const ParticleBackground = dynamic(() => import("@/components/particle-background"), { ssr: false })

export default function Portfolio() {
  const [language, setLanguage] = useState<Language>("pt-BR")
  const t = (text: string) => translate(language, text)
  const [darkMode, setDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage === "en" || savedLanguage === "es" || savedLanguage === "zh-CN") setLanguage(savedLanguage)
    const saved = localStorage.getItem("darkMode")
    if (saved) {
      setDarkMode(saved === "true")
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("darkMode", JSON.stringify(darkMode))
      document.documentElement.classList.toggle("dark", darkMode)
    }
  }, [darkMode, mounted])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("language", language)
      document.documentElement.lang = language
    }
  }, [language, mounted])

  const translatedProjects = projects.map((project) => ({ ...project, title: t(project.title), description: t(project.description) }))
  const filteredProjects = filterProjects(translatedProjects, searchTerm, selectedFilter)

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })
    }
  }

  // Opções de filtro CORRIGIDAS
  const filters = [
    { value: "all", label: "Todos" },
    { value: "featured", label: "Destaque" },
    { value: "profissional", label: "Profissional" },
    { value: "autonomo", label: "Autônomo" },
    { value: "pessoal", label: "Pessoal e prático" },
    { value: "academico", label: "Acadêmico" },
    { value: "IA", label: "IA" },
    { value: "Unity", label: "Unity" },
    { value: "Hackathon", label: "Hackathon" },
    { value: "Prática", label: "Prática" },
    { value: "API", label: "APIs" },
    { value: "Automação", label: "Automação" },
    { value: "individual", label: "Individual" },
    { value: "equipe", label: "Equipe" },
    { value: "Comercial", label: "Comercial" },
    { value: "Competição", label: "Competição" },
    { value: "completed", label: "Concluídos" },
    { value: "in_progress", label: "Em Andamento" },
  ]

  return (
    <LazyMotion features={domAnimation} strict>
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen relative overflow-x-clip">
      {/* CAMADA 1: Background Base - TRANSPARENTE para mostrar partículas */}
      <div
        className={`fixed inset-0 transition-all duration-1000 ${darkMode
          ? "bg-gradient-to-br from-slate-950/80 via-slate-900/60 to-slate-950/80"
          : "bg-gradient-to-br from-blue-50/80 via-sky-50/60 to-blue-100/80"
          }`}
      />

      {/* CAMADA 2: Partículas */}
      <div className="fixed inset-0 z-10">
        <ParticleBackground darkMode={darkMode} />
      </div>

      {/* CAMADA 3: Blur Effect */}
      <div className={`fixed inset-0 z-20 ${darkMode ? "bg-slate-900/10" : "bg-white/10"}`} />

      {/* CAMADA 4: Header com cor sólida */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 w-full z-50 ${darkMode ? "bg-slate-900/95 border-b border-slate-700/50" : "bg-white/95 border-b border-gray-200/50"
          } backdrop-blur-md`}
      >
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`text-lg sm:text-2xl font-bold whitespace-nowrap ${darkMode ? "text-green-300" : "text-purple-800"}`}
          >
            Pedro Cézar S. S.
          </motion.div>

          <div className="flex items-center gap-3 md:gap-8">
            <DropdownMenu>
              <DropdownMenuTrigger aria-label={t("Escolher idioma")} className="flex items-center rounded-md p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-500">
                <Image src={`/flags/${language}.svg`} alt="" width={30} height={20} className="rounded-sm" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {([ ["pt-BR", "Português (Brasil)"], ["en", "English"], ["es", "Español"], ["zh-CN", "简体中文"] ] as const).map(([code, name]) => (
                  <DropdownMenuItem key={code} onSelect={() => setLanguage(code)} lang={code} aria-current={language === code ? "true" : undefined}>
                    <Image src={`/flags/${code}.svg`} alt="" width={24} height={16} className="mr-2 rounded-sm" />{name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="hidden md:flex space-x-6">
              {[
                { name: "Sobre", id: "sobre" },
                { name: "Stack", id: "stack" },
                { name: "Projetos", id: "projetos" },
                { name: "Contato", id: "contato" },
              ].map((item, index) => (
                <motion.button
                  key={t(item.name)}
                  onClick={() => scrollToSection(item.id)}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className={`transition-colors cursor-pointer ${darkMode ? "text-gray-300 hover:text-green-300" : "text-gray-700 hover:text-purple-600"
                    }`}
                >
                  {t(item.name)}
                </motion.button>
              ))}
            </div>

            {/* Theme toggle with smooth, single entrance animation and no re-trigger */}
            <motion.button
              onClick={toggleTheme}
              aria-label={t(darkMode ? "Ativar tema claro" : "Ativar tema escuro")}
              whileHover={{ rotate: darkMode ? -15 : 15, transition: { duration: 0.18, type: "tween" } }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 rounded-full transition-all duration-300 ${darkMode
                ? "bg-green-500/20 text-green-300 shadow-lg shadow-green-500/25 border border-green-500/30"
                : "bg-purple-500/20 text-purple-600 shadow-lg shadow-purple-500/25 border border-purple-500/30"
                }`}
              initial={false}
              animate={false}
            >
              {/* Only animate on mount, not on every toggle */}
              <AnimatePresence mode="wait" initial={false}>
                {darkMode ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.25, type: "tween" }}
                  >
                    <Sun size={20} className="text-yellow-300" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.25, type: "tween" }}
                  >
                    <Moon size={20} className="text-blue-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* CAMADA 5: Conteúdo Principal */}
      <div className="relative z-30">
        {/* Theme Transition Overlay */}
        <AnimatePresence>
          {darkMode && (
            <motion.div
              initial={{ clipPath: "circle(0% at 95% 5%)" }}
              animate={{ clipPath: "circle(150% at 95% 5%)" }}
              exit={{ clipPath: "circle(0% at 95% 5%)" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="fixed inset-0 bg-gradient-to-br from-slate-950/60 via-slate-900/40 to-slate-950/60 z-25 pointer-events-none"
            />
          )}
        </AnimatePresence>

        <main>
        {/* about me Section */}
        <section className="min-h-screen flex items-center justify-center pt-20">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={false}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1
                className={`text-6xl md:text-8xl font-bold mb-6 ${darkMode ? "text-white" : "text-slate-800"}`}
                whileHover={{ scale: 1.05 }}
              >
                Pedro{" "}
                <span
                  className={`${darkMode
                    ? "bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
                    : "bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
                    }`}
                >
                  Cézar
                </span>

              </motion.h1>

              <motion.p
                initial={false}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className={`text-xl md:text-2xl mb-8 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                {t("Engenheiro de Software")}
              </motion.p>

              <motion.div
                initial={false}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex justify-center space-x-6"
              >
                {[
                  { icon: Github, href: "https://github.com/ary-pedro", label: "GitHub" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/pedro-cézar-s-de-souza", label: "LinkedIn" },
                  { icon: Mail, href: "#contato", label: "Contato" },

                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={t(social.label)}
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-4 rounded-full transition-all duration-300 backdrop-blur-sm border ${darkMode
                      ? "bg-green-500/20 text-green-300 hover:bg-green-500/30 shadow-lg shadow-green-500/25 border-green-500/30"
                      : "bg-purple-500/20 text-purple-600 hover:bg-purple-500/30 shadow-lg shadow-purple-500/25 border-purple-500/30"
                      }`}

                  >
                    <social.icon size={24} />
                  </motion.a>
                ))}

              </motion.div>

              <br /><br />

              {/* Stats Section */}
              <section className="py-12 relative z-10">
                <div className="container mx-auto px-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

                    {(() => {
                      const startYear = 2023
                      const currentYear = new Date().getFullYear()
                      const years = Math.max(1, currentYear - startYear)

                      // Cálculo do total de cafés com progressão
                      const startCoffeeYear = 2009
                      const currentYearcoffe = new Date().getFullYear()
                      const yearsDrinking = currentYearcoffe - startCoffeeYear + 1

                      const fibSeq: number[] = []
                      let a = 1, b = 1
                      while (fibSeq.length < Math.ceil(yearsDrinking / 2)) {
                        fibSeq.push(Math.min(a, 5))
                        const next = a + b
                        a = b
                        b = next
                      }

                      let totalCoffees = 0
                      for (let i = 0; i < yearsDrinking; i++) {
                        const daily = fibSeq[Math.floor(i / 3)]
                        totalCoffees += daily * 365
                      }

                      return [
                        { icon: Award, value: projects.length, label: "Projetos", suffix: "+" },
                        { icon: Users, value: 6, label: "Clientes", suffix: "+" },
                        { icon: Coffee, value: totalCoffees, label: "Cafés", suffix: "+" },
                        { icon: Code, value: years, label: "Anos", suffix: "+" },
                      ].map((stat, index) => (
                        <CounterStat key={index} stat={{ ...stat, label: t(stat.label) }} index={index} darkMode={darkMode} />
                      ))
                    })()}
                  </div>
                </div>
              </section>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="sobre" className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? "text-white" : "text-slate-800"}`}>
                {t("Sobre Mim")}
              </h2>
              <div
                className={`w-24 h-1 mx-auto rounded-full ${darkMode
                  ? "bg-gradient-to-r from-green-400 to-blue-400"
                  : "bg-gradient-to-r from-purple-600 to-blue-600"
                  }`}
              />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className={`p-8 rounded-xl backdrop-blur-sm border ${darkMode ? "bg-slate-800/30 border-green-500/30" : "bg-white/30 border-purple-200/50"
                  }`}
              >
                <p className={`text-lg leading-relaxed mb-6 text-justify ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                  {t("Olá! sou um DEV, para mim programar é abraçar desafios.")}
                </p>
                <p className={`text-lg leading-relaxed mb-6 text-justify ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                  {t("Aprecio trabalhar com back-end, arquitetar bancos de dados, criar APIs robustas e explorar soluções de inteligência artificial e automação, sei me virar no front-end quando preciso, pois entendi desde o início que, para começar na programação, é preciso ser versátil.")} <br />
                  {t("Aqui você vai encontrar exemplos de aplicações que envolvem desde a lógica de negócio no back-end até implementações para o front-end. Tudo isso com foco em deixar o código legível, escalável e prático.")}
                </p>
                <p className={`text-lg leading-relaxed mb-6 text-justify ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                  {t("Se quiser ver mais sobre ou trocar uma ideia sobre tecnologia")}
                  <span className={`font-bold text-1xl transition-colors duration-300 ${darkMode
                    ? "bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
                    : "bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
                    }`}>
                    <br />{t("VAMOS CONECTAR!")}
                  </span>
                </p>
              </motion.div>

              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-6"
              >
                {[
                  { icon: Code, title: "Clean Code", desc: "Código limpo e eficiente" },
                  { icon: Users, title: "Colaboração", desc: "Experiência com equipes" },
                  { icon: Terminal, title: "Back-end", desc: "Lógica, arquitetura e performance" },
                  { icon: Filter, title: "Big O", desc: "Pensando em algoritmos eficientes" },
                  { icon: Palette, title: "UI/UX Design", desc: "Interfaces intuitivas" },
                  { icon: Award, title: "UML & Arquitetura", desc: "Modelagem de sistemas" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -10, scale: 1.05 }}
                    className={`p-6 rounded-xl transition-all duration-300 backdrop-blur-sm border ${darkMode
                      ? "bg-slate-800/30 border-green-500/30 hover:shadow-lg hover:shadow-green-500/25"
                      : "bg-white/30 border-purple-200/50 hover:shadow-lg hover:shadow-purple-500/25"
                      }`}
                  >
                    <item.icon className={`w-8 h-8 mb-3 ${darkMode ? "text-green-400" : "text-purple-600"}`} />
                    <h3 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-slate-800"}`}>{t(item.title)}</h3>
                    <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{t(item.desc)}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
        <br />

        {/* Tech Stack Section */}
        <section id="stack" className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? "text-white" : "text-slate-800"}`}>
                {t("Stack Tecnológica")}
              </h2>
              <div
                className={`w-24 h-1 mx-auto rounded-full ${darkMode
                  ? "bg-gradient-to-r from-green-400 to-blue-400"
                  : "bg-gradient-to-r from-purple-600 to-blue-600"
                  }`}
              />
            </motion.div>

            <TechStack darkMode={darkMode} language={language} />
          </div>
        </section>

        {/* Projects Section */}
        <section id="projetos" className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2
                className={`text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r ${darkMode ? "from-green-400 to-blue-400" : "from-purple-600 to-blue-600"
                  } bg-clip-text text-transparent`}
              >
                {t("Projetos")}
              </h2>
              <div
                className={`w-24 h-1 mx-auto rounded-full ${darkMode
                  ? "bg-gradient-to-r from-green-400 to-blue-400"
                  : "bg-gradient-to-r from-purple-600 to-blue-600"
                  }`}
              />
            </motion.div>

            {/* Filters and Search */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              {/* Search Bar */}
              <div className="relative mb-6 max-w-md mx-auto">
                <Search
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                />
                <input
                  type="text"
                  placeholder={t("Buscar projetos...")}
                  aria-label={t("Buscar projetos")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 backdrop-blur-sm transition-all duration-300 ${darkMode
                    ? "border-slate-600 bg-slate-800/30 text-white placeholder-gray-400 focus:border-green-400"
                    : "border-gray-300 bg-white/30 text-slate-800 placeholder-gray-500 focus:border-purple-500"
                    }`}
                />
              </div>

              {/* Filter Buttons */}
              <p className={`md:hidden mb-2 text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                {t("Deslize para ver mais filtros")}
              </p>
              <div className="flex flex-nowrap md:flex-wrap md:justify-center gap-3 overflow-x-auto pb-2">
                {filters.map((filter) => (
                  <motion.button
                    key={filter.value}
                    onClick={() => setSelectedFilter(filter.value)}
                    aria-pressed={selectedFilter === filter.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`shrink-0 px-4 py-2 rounded-full transition-all duration-300 flex items-center space-x-2 backdrop-blur-sm border ${selectedFilter === filter.value
                      ? darkMode
                        ? "bg-green-500/30 text-green-300 border-green-500/50"
                        : "bg-purple-500/30 text-purple-600 border-purple-500/50"
                      : darkMode
                        ? "bg-slate-800/30 text-gray-300 border-slate-600 hover:bg-slate-700/30"
                        : "bg-white/30 text-gray-600 border-gray-300 hover:bg-white/50"
                      }`}
                  >
                    <Filter className="w-3 h-3" />
                    <span>{t(filter.label)}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Projects Grid */}
            <p className={`mb-8 text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              {t("Projetos organizados por área e pelas datas disponíveis.")}
            </p>
            <AnimatePresence>
              {filteredProjects.length > 0 ? (
                <div className="space-y-16">
                  {projectGroups.map((group) => {
                    const groupProjects = filteredProjects.filter((project) => project.group === group.id).sort((a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)))
                    if (!groupProjects.length) return null
                    return (
                      <section key={group.id} aria-labelledby={`group-${group.id}`}>
                        <h3 id={`group-${group.id}`} className={`text-2xl font-bold mb-6 ${darkMode ? "text-green-300" : "text-purple-800"}`}>
                          {t(group.title)}
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {groupProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} darkMode={darkMode} language={language} />
                          ))}
                        </div>
                      </section>
                    )
                  })}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12"
                >
                  <div className={`text-6xl mb-4 ${darkMode ? "text-gray-600" : "text-gray-400"}`}>🔍</div>
                  <h3 className={`text-xl font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {t("Nenhum projeto encontrado")}
                  </h3>
                  <p className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {t("Tente ajustar os filtros ou termo de busca")}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contato" className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? "text-white" : "text-slate-800"}`}>
                {t("Contato")}
              </h2>
              <div
                className={`w-24 h-1 mx-auto rounded-full ${darkMode
                  ? "bg-gradient-to-r from-green-400 to-blue-400"
                  : "bg-gradient-to-r from-purple-600 to-blue-600"
                  }`}
              />
            </motion.div>

            <div className="max-w-md mx-auto">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: "pedrocssolza@gmail.com",
                    href: "mailto:pedrocssolza@gmail.com",
                  },
                  {
                    icon: Github,
                    label: "GitHub",
                    value: "@Ary-pedro",
                    href: "https://github.com/Ary-pedro",
                  },
                  {
                    icon: Linkedin,
                    label: "LinkedIn",
                    value: "Pedro Cezar",
                    href: "https://linkedin.com/in/pedrocezar",
                  },
                ].map((contact, index) => {
                  return (
                    <motion.a
                      key={index}
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02, x: 10 }}
                      className={`flex items-center space-x-4 p-6 rounded-xl transition-all duration-300 backdrop-blur-sm border ${darkMode
                        ? "bg-slate-800/30 border-green-500/30 hover:shadow-lg hover:shadow-green-500/25"
                        : "bg-white/30 border-purple-200/50 hover:shadow-lg hover:shadow-purple-500/25"
                        }`}
                    >
                      <div
                        className={`p-3 rounded-full ${darkMode ? "bg-green-500/20 text-green-300" : "bg-purple-500/20 text-purple-600"
                          }`}
                      >
                        <contact.icon size={24} />
                      </div>
                      <div>
                        <h3 className={`font-semibold ${darkMode ? "text-white" : "text-slate-800"}`}>{contact.label}</h3>
                        <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>{contact.value}</p>
                      </div>
                      <ExternalLink className={`w-5 h-5 ml-auto ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                    </motion.a>
                  )
                })}
              </motion.div>
            </div>
          </div>
        </section>

        </main>
        {/* Footer */}
        <footer
          className={`py-8 border-t backdrop-blur-sm ${darkMode ? "border-green-500/20 bg-slate-900/30" : "border-t-[2px] border-[#a78bfa]/40 bg-white/30"
            }`}
        >
          <div className="container mx-auto px-6 text-center">
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              © {new Date().getFullYear()} Pedro Cezar. {t("Todos os direitos reservados.")}
            </p>
          </div>
        </footer>
      </div>
    </div>
    </MotionConfig>
    </LazyMotion>
  )
}
