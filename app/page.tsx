"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
  MessageCircle,
  Award,
  Coffee,
} from "lucide-react"
import ParticleBackground from "@/components/particle-background"
import ProjectCard from "@/components/project-card"
import TechStack from "@/components/tech-stack"
import CounterStat from "@/components/counter-stat"

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  const [projects, setProjects] = useState([
  
    {
      id: 15,
      title: "Workflow, Bots e Agentes",
      description:
     "Criei assistentes pessoais que cuidam da minha rotina: organizam agenda, gerenciam e-mails do meu domínio e automatizam tarefas repetitivas!", 
      image: darkMode ? "/images/projetos/workflow-dark.svg" : "/images/projetos/workflow-light.svg",
      technologies: ["Python", "Bots","Eu2Make","appsmith", "N8N","Groq","Zoho"],
      category: "individual",
      status: "in_progress",
      featured: true,
      demoLink: "https://github.com/Ary-Pedro?tab=repositories",
      codeLink: "https://github.com/Ary-Pedro?tab=repositories",
    },
    {
      id: 17,
      title: "Raspagem de dados",
      description:
        "Desenvolvi  um servidor Selenium para executar raspagens simultâneas em múltiplos sites, com processamento eficiente dos dados coletados usando Pandas.",
      image: darkMode ? "/images/projetos/web-scraping-dark.svg" : "/images/projetos/web-scraping-light.svg",
      technologies: ["Python", "Selenium", "Pandas","Web Scraping"],
      category: "individual",
      status: "in_progress",
      featured: false,	
      demoLink: "https://github.com/Ary-Pedro?tab=repositories",
      codeLink: "https://github.com/Ary-Pedro?tab=repositories",
    },
    {
      id: 18,
      title: "Testes em Java (Prática)",
      description:
         "Implementações em Java: estruturas de dados (árvores, pilhas, filas), algoritmos de busca binária e projetos de POO, com análise de complexidade Big O para otimização de performance.",
      image: darkMode ? "/images/projetos/java-dark.svg" : "/images/projetos/java-light.svg",
      technologies: ["Java","WindowBuilder","POO", "estruturas de Dados","busca binária"],
      category: "individual",
      status: "completed",
      featured: "Acadêmico",
      demoLink: "https://replit.com/@PedroCezar2",
      codeLink: "https://github.com/Ary-Pedro?tab=repositories",
    },
      {
      id: 21,
      title: "roleta de filmes",
      description:
      "Catálogo pessoal de filmes: controle o que já assistiu, adicione novos títulos e receba sugestões automáticas integradas a APIs de cinema.",
      image: darkMode ? "/images/projetos/spin-dark.svg" : "/images/projetos/spin-light.svg",
      technologies: ["JavaScript", "react", "postgreSQL", "API"],
      category: "equipe",
      status: "in_progress",
      featured: false,
      demoLink: "https://github.com/Ary-Pedro?tab=repositories",
      codeLink: "https://github.com/Ary-Pedro?tab=repositories",
    },
    {
      id: 20,
      title: "Biblioteca",
      description:
"Sistema de biblioteca com API: gerencia acervo de livros, marca leituras concluídas e aplica algoritmo de ranqueamento para sugerir novas obras com base em avaliações, gêneros preferidos e histórico.",
      image: darkMode ? "/images/projetos/lib-rank-dark.svg" : "/images/projetos/lib-rank-light.svg",
      technologies: ["JavaScript", "React", "postgreSQL", "API"],
      category: "equipe",
      status: "in_progress",
      featured: false,
      demoLink: "https://github.com/Ary-Pedro?tab=repositories",
      codeLink: "https://github.com/Ary-Pedro?tab=repositories",
    },
    {
      id: 16,
      title: "Exame DtLabs API",
      description:
        "Desenvolvi um backend IoT com FastAPI para gerenciar dados, implementando autenticação JWT, usando PostgreSQL e monitoramento de servidores em containers Docker. Como primeira experiência com a framework, foi incrivelmente gratificante ver toda a arquitetura funcionando na prática!",
      image: darkMode ? "/images/projetos/fastAPI-dark.svg" : "/images/projetos/fastAPI-light.svg",
      technologies: ["FastAPI", "Python","JWT","Docker","PostgreSQL"],
      category: "individual",
      status: "completed",
      featured: "Competicão",
      demoLink: "https://github.com/Ary-Pedro/exame-backend-dtlabs-2025",
      codeLink: "https://github.com/Ary-Pedro/exame-backend-dtlabs-2025",
    },
    {
      id: 11,
      title: "Cariocars",
      description:
        "Desenvolvido em equipe uma plataforma de aluguel de veículos, criando o design do zero e implementando com Django. O sistema permite atualização dinâmica de imagens e textos pelos administradores.",
      image: darkMode ? "/images/projetos/cariocars-dark.svg" : "/images/projetos/cariocars-light.svg",
      technologies: ["Python", "Django","HTML", "CSS", "JavaScript"],
      category: "Comercial",
      status: "in_progress",
      featured: true,
      demoLink: "https://github.com/Ary-Pedro?tab=repositories",
      codeLink: "https://github.com/Ary-Pedro?tab=repositories",
    },
    {
      id: 10,
      title: "API Omie",
      description:
        "Para integrar o sistema de gestão de projetos, foi implementada uma conexão com a API do Omie. Isso permite consultar dados dos projetos, atualizar status, criar e gerenciar atividades, além de editar informações de forma automatizada.", 
      image: darkMode ? "/images/projetos/api-omie-dark.svg" : "/images/projetos/api-omie-light.svg",
      technologies: ["Python", "Django","HTML", "CSS", "JavaScript","requests", "API"],
      category: "equipe",
      status: "completed",
      featured: "Comercial",
      demoLink: "https://developer.omie.com.br/",
      codeLink: "https://github.com/Ary-Pedro?tab=repositories",
    },
    {
      id: 9,
      title: "API BLING",
      description:
        "Para integrar o sistema de gestão de projetos, foi implementada uma conexão com a API da Bling. Isso permite consultar dados de pedidos, atualizar status de vendas, gerenciar contatos, registrar ocorrências e sincronizar estoque de forma automatizada.",
      image: darkMode ? "/images/projetos/api-bling-dark.svg" : "/images/projetos/api-bling-light.svg",
      technologies: ["Python", "Django","HTML", "CSS", "JavaScript","requests", "API"],
      category: "equipe",
      status: "completed",
      featured: "Comercial",
      demoLink: "https://developer.bling.com.br/referencia",
      codeLink: "https://github.com/Ary-Pedro?tab=repositories",
    },
    {
      id: 19,
      title: "Arduino",
      description:
        "Projetos experimentais utilizando Arduino,  protótipos baseados em Arduino no laboratório da UniLaSalle, com destaque para o desenvolvimento de uma máquina CNC.",
      image: darkMode ? "/images/projetos/arduino-dark.svg" : "/images/projetos/arduino-light.svg",
      technologies: ["Arduino", "C++"],
      category: "equipe",
      status: "completed",
      featured: false,
      demoLink: "https://github.com/Ary-Pedro?tab=repositories",
      codeLink: "https://github.com/Ary-Pedro?tab=repositories",
    },
    {
      id: 13,
      title: "Adams Back-End",
      description:
    "API do chatbot finalista na NASA Space Apps Challenge 2024. Integra Qdrant Vector Database com a NASA Exoplanet Archive API para processamento de dados astronômicos. Utiliza embeddings vetoriais para consultas precisas sobre exoplanetas, com autenticação JWT e Socket.IO para comunicação em tempo real.",
      image: darkMode ? "/images/projetos/adams42-dark.svg" : "/images/projetos/adams42-light.svg",
      technologies: ["langChain", "Python", "Dockfile","Groq","Qdrant"],
      category: "equipe",
      status: "completed",
      featured: "Competicão",
      demoLink: "https://adams42-65lztb96t-arypedros-projects.vercel.app/",
      codeLink: "https://github.com/Ary-Pedro/adams42-withServer",
    },
    {
      id: 12,
      title: "Adams Front-End",
      description:
    "Interface finalista na NASA Space Apps Challenge 2024 para exploração de exoplanetas. Consome dados astronômicos em tempo real via Socket.IO, com visualização de constelações e sistema de busca contextual. Desenvolvido com componentes modulares e design responsivo para experiência educativa imersiva.",
      image: darkMode ? "/images/projetos/adams42-dark.svg" : "/images/projetos/adams42-light.svg",
      technologies: ["React", "Vercel"],
      category: "equipe",
      status: "completed",
      featured: "Competicão",
      demoLink: "https://adams42-65lztb96t-arypedros-projects.vercel.app/",
      codeLink: "https://github.com/Ary-Pedro/Adams42-front",
    },
    {
      id: 8,
      title: "DeAaZ Tur",
      description:
      "Solução local para empresas de apoio à documentação de turismo com: controle de perfis (vendedor, administrador e executivo), cadastro de clientes, processamento de vendas, análise de desempenho com rankeamento, monitoramento financeiro via página de relatórios mensais e mapeamento de rotas para visitas a parceiros.", 
      image: darkMode ? "/images/projetos/deaaztur-dark.svg" : "/images/projetos/deaaztur-light.svg",
      technologies: ["Python", "Django","HTML", "CSS", "JavaScript","Pandas"],
      category: "equipe",
      status: "completed",
      featured: "Comercial",
      demoLink: "https://github.com/Ary-Pedro/setup_DeAaZTour",
      codeLink: "https://github.com/Ary-Pedro/setup_DeAaZTour",
    },
    {
      id: 7,
      title: "(ONG) ABAP-RJ Back",
      description:
        "Backend do sistema ABAP-RJ desenvolvido com Django, responsável pela gestão de dados de beneficiários, voluntários, funcionários e gerentes. Implementa lógica de negócio completa, API para integração com frontend e painéis administrativos, utilizando PostgreSQL para armazenamento e Docker para conteinerização.",
      image: darkMode ? "/images/projetos/abap-rj-dark.svg" : "/images/projetos/abap-rj-light.svg",
      technologies: ["Python", "Django","HTML", "CSS", "JavaScript","PostgreSQL","Docker"],
      category: "equipe",
      status: "in_progress",
      featured: true,
      demoLink: "https://github.com/Ary-Pedro/Projeto-AbapRJ",
      codeLink: "https://github.com/Ary-Pedro/Projeto-AbapRJ",
    },
    {
      id: 6,
      title: "(ONG) ABAP-RJ Front",
      description:
      "Frontend para o sistema ABAP-RJ com duas versões: protótipo inicial em React para validação de conceito e versão final em WordPress para blog institucional. Oferece interface de cadastro de eventos.",
      image: darkMode ? "/images/projetos/abap-rj-dark.svg" : "/images/projetos/abap-rj-light.svg",
      technologies: ["React", "Wordpress"],
      category: "equipe",
      status: "completed",
      featured: true,
      demoLink: "https://classy-marigold-091c1c.netlify.app/",
      codeLink: "https://github.com/Ary-Pedro/Projeto-AbapRJ",
    },
    {
      id: 5,
      title: "Unity Labs",
      description:
      "Atuei por dois anos em projetos desenvolvidos com Unity (2D, 3D e VR), assumindo gradualmente os papéis de Líder de Equipe e Monitor. Destaque para o desenvolvimento do simulador terapêutico Aerofobia, realizado em parceria com o núcleo de psicologia. Responsabilidades técnicas: implementação de mecânicas, otimização de performance e participação ativa no game design. Responsabilidades de liderança: gestão de pipelines utilizando métodos ágeis e mentoria de desenvolvedores da equipe.",
      image: darkMode ? "/images/projetos/unity-labs-dark.svg" : "/images/projetos/unity-labs-light.svg",
      technologies: ["Unity", "C#","3D","VR","Blender"],
      category: "equipe",
      status: "completed",
      featured: "Acadêmico",
      demoLink: "https://github.com/Ary-Pedro?tab=repositories",
      codeLink: "https://github.com/Ary-Pedro?tab=repositories",
    },
    {
      id: 14,
      title: "Mapeamento da Flora Marítima",
      description:
      "Projeto de Mapeamento e Visualização de Dados da Flora Marítima: Aplicação web desenvolvida para a NASA Space Apps Challenge 2023 – primeiro hackathon espacial em Niterói, sediado na Unilasalle. Oferece visualização interativa de dados biogeográficos de espécies marinhas, integrando camadas cartográficas e bancos de dados oceanográficos para análise espacial",
      image: darkMode ? "/images/projetos/flora-maritima-dark.svg" : "/images/projetos/flora-maritima-light.svg",
      technologies: ["Python", "HTML", "CSS", "JavaScript"],
      category: "equipe",
      status: "completed",
      featured: "Competicão",
      demoLink: "https://replit.com/@LucasSilva191/AchingThinRadius#index.html",
      codeLink: "https://replit.com/@LucasSilva191/AchingThinRadius#index.html",
    },
    {
      id: 4,
      title: "Testes em Python (Prática)",
      description:
      "Implementações em Python: Desenvolvimento Web com ênfase na aplicação de princípios de usabilidade, acessibilidade e experiência do usuário, utilizando práticas alinhadas ao Design Thinking, arquitetura da informação e organização semântica de páginas, bem como o uso estratégico da teoria das cores, tipografia, psicologia das formas e escolha de elementos visuais, garantindo interfaces digitais coerentes, intuitivas e eficazes, em consonância com boas práticas de desenvolvimento e padrões modernos da web.",
      image: darkMode ? "/images/projetos/python-dark.svg" : "/images/projetos/python-light.svg",
      technologies: ["Python","CustomTkinter", "POO","Desenvolvimento Web","UI/UX", "Vanilla"],
      category: "individual",
      status: "completed",
      featured: "Acadêmico",
      demoLink: "https://replit.com/@PedroCezar2",
      codeLink: "https://github.com/Ary-Pedro?tab=repositories",
    },
    {
      id: 3,
      title: "Testes em C (Prática)",
      description:
        "Coletânea de exercícios práticos em linguagem C, explorando fundamentos da programação estruturada com foco em manipulação de dados, uso eficiente de ponteiros, definição de funções, controle de fluxo, alocação dinâmica de memória, recursividade e princípios fundamentais de entrada e saída, estruturando uma base sólida para o desenvolvimento de algoritmos robustos e eficientes.",
      image: darkMode ? "/images/projetos/c-dark.svg" : "/images/projetos/c-light.svg",
      technologies:  ["Structs", "Arrays e Matrizes","Funções", "Ponteiros", "Ponteiros para Funções", "Alocação Dinâmica (malloc, free)", "Recursividade"],
      category: "individual",
      status: "completed",
      featured: "Acadêmico",
      demoLink: "https://docs.google.com/document/d/1G8QCeIEsISvphW_SqOeAX5cp7LR7RzKbfANNlHFAh3Y/edit?usp=sharing",
      codeLink: "https://replit.com/@PedroCezar2",
    },
    {
      id: 2,
      title: "Sistema de Academia",
      description:
        "Sistema de gerenciamento de academia desenvolvido em C, com funcionalidades de cadastro, consulta e manipulação de dados.",
      image: darkMode ? "/images/projetos/gym-dark.svg" : "/images/projetos/gym-light.svg",
      technologies: ["C", "CRUD", "bin"],
      category: "equipe",
      status: "completed",
      featured: "Acadêmico",
      demoLink: "https://replit.com/@PedroCezar2/Trabalho",
      codeLink: "https://github.com/Ary-Pedro/Sistema-academia",
    },
    {
      id: 1,
      title: "Manipulador de Imagens",
      description:
        "Meu primeiro grande projeto em programação, feito enquanto aprendia vetores e matrizes. Desenvolvi um manipulador de imagens do zero, usando apenas um template e muita lógica. Foi uma experiência intensa e marcante, com minhas primeiras madrugadas vendo código.",
      image: darkMode ? "/images/projetos/lena-dark.svg" : "/images/projetos/lena-light.svg",
      technologies: ["C", "imghelpers.h", "libbmp.h"],
      category: "individual",
      status: "completed",
      featured: "Acadêmico",
      demoLink: "https://replit.com/@PedroCezar2/aula",
      codeLink: "https://github.com/Ary-Pedro/Manipulador-de-Imagem",
    },
  ])

  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [githubRepos, setGithubRepos] = useState<number>(0)
  useEffect(() => {
    fetch("https://api.github.com/users/ary-pedro")
      .then((res) => res.json())
      .then((data) => setGithubRepos(typeof data.public_repos === "number" ? data.public_repos : 0))
      .catch(() => setGithubRepos(0))
  }, [])
  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("darkMode")
    if (saved) {
      setDarkMode(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("darkMode", JSON.stringify(darkMode))
      document.documentElement.classList.toggle("dark", darkMode)
    }
  }, [darkMode, mounted])

  // Função principal de filtragem CORRIGIDA
  useEffect(() => {
    let filtered = projects

    if (selectedFilter !== "all") {
      if (selectedFilter === "featured") {
        // Só exibe se for booleano true
        filtered = filtered.filter((project) => project.featured === true)
      } else if (selectedFilter === "completed") {
        filtered = filtered.filter((project) => project.status === "completed")
      } else if (selectedFilter === "in_progress") {
        filtered = filtered.filter((project) => project.status === "in_progress")
      } else {
        // Filtro por categoria OU string usada no featured
        filtered = filtered.filter(
          (project) =>
            project.category === selectedFilter ||
            (typeof project.featured === "string" && project.featured === selectedFilter)
        )
      }
    }

    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    setFilteredProjects(filtered)
  }, [projects, searchTerm, selectedFilter])

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Opções de filtro CORRIGIDAS
  const filters = [
    { value: "all", label: "Todos" },
    { value: "featured", label: "Destaque" },
    { value: "Acadêmico", label: "Acadêmico" },
    { value: "individual", label: "Individual" },
    { value: "equipe", label: "Equipe" },
    { value: "Comercial", label: "Comercial" },
    { value: "Competicão", label: "Competição" },
    { value: "completed", label: "Concluídos" },
    { value: "in_progress", label: "Em Andamento" },
  ]

  if (!mounted) return null

  return (
    <div className="min-h-screen relative">
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
      <div className={`fixed inset-0 z-20 backdrop-blur-[1px] ${darkMode ? "bg-slate-900/10" : "bg-white/10"}`} />

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
            className={`text-2xl font-bold ${darkMode ? "text-green-300" : "text-purple-800"}`}
          >
            Pedro Cézar S. S.
          </motion.div>

          <div className="flex items-center space-x-8">
            <div className="hidden md:flex space-x-6">
              {[
                { name: "Sobre", id: "sobre" },
                { name: "Stack", id: "stack" },
                { name: "Projetos", id: "projetos" },
                { name: "Contato", id: "contato" },
              ].map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className={`transition-colors cursor-pointer ${darkMode ? "text-gray-300 hover:text-green-300" : "text-gray-700 hover:text-purple-600"
                    }`}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>

            {/* Theme toggle with smooth, single entrance animation and no re-trigger */}
            <motion.button
              onClick={() => {
                toggleTheme()
                // Troca todas as imagens dos projetos para o modo correto
                setProjects((prev) =>
                  prev.map((project) => {
                    // Regex para pegar o nome base da imagem
                    const match = project.image.match(/\/images\/projetos\/(.+?)-(dark|light)\.svg$/)
                    if (!match) return project
                    const [_, base, oldMode] = match
                    const newMode = !darkMode ? "dark" : "light"
                    // Se já está no modo certo, não muda
                    if (oldMode === newMode) return project
                    return {
                      ...project,
                      image: `/images/projetos/${base}-${newMode}.svg`,
                    }
                  })
                )
              }}
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

        {/* about me Section */}
        <section className="min-h-screen flex items-center justify-center pt-20">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
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
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className={`text-xl md:text-2xl mb-8 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                Desenvolvedor Full Stack & Designer UI/UX
              </motion.p>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex justify-center space-x-6"
              >
                {[
                  { icon: Github, href: "https://github.com/ary-pedro" },
                  { icon: Linkedin, href: "www.linkedin.com/in/pedro-cézar-s-de-souza" },
                  { icon: Mail, href: "#contato" },

                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
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
                        { icon: Award, value: githubRepos ? githubRepos : 0, label: "Projetos", suffix: "+" },
                        { icon: Users, value: 4, label: "Clientes", suffix: "+" },
                        { icon: Coffee, value: totalCoffees, label: "Cafés", suffix: "+" },
                        { icon: Code, value: years, label: "Anos", suffix: "+" },
                      ].map((stat, index) => (
                        <CounterStat key={index} stat={stat} index={index} darkMode={darkMode} />
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
                Sobre Mim
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
                  Olá! sou um DEV, para mim programar é abraçar desafios.
                </p>
                <p className={`text-lg leading-relaxed mb-6 text-justify ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                  Aprecio trabalhar com back-end, arquitetar  bancos de dados, criar APIs robustas e explorar soluções de inteligência artificial e automação,
                  sei me virar no front-end quando preciso, pois entendi desde o início que, para começar na programação, é preciso ser versátil.  <br />
                  Aqui você vai encontrar exemplos de aplicações que envolvem desde a lógica de negócio no back-end até implementações para o front-end. Tudo isso com foco em deixar o código legível, escalável e prático.
                </p>
                <p className={`text-lg leading-relaxed mb-6 text-justify ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                  Se quiser ver mais sobre ou trocar uma ideia sobre tecnologia
                  <span className={`font-bold text-1xl transition-colors duration-300 ${darkMode
                    ? "bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
                    : "bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
                    }`}>
                    <br />VAMOS CONECTAR!
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
                    <h3 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-slate-800"}`}>{item.title}</h3>
                    <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{item.desc}</p>
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
                Stack Tecnológica
              </h2>
              <div
                className={`w-24 h-1 mx-auto rounded-full ${darkMode
                  ? "bg-gradient-to-r from-green-400 to-blue-400"
                  : "bg-gradient-to-r from-purple-600 to-blue-600"
                  }`}
              />
            </motion.div>

            <TechStack darkMode={darkMode} />
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
                Projetos
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
                  placeholder="Buscar projetos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 backdrop-blur-sm transition-all duration-300 ${darkMode
                    ? "border-slate-600 bg-slate-800/30 text-white placeholder-gray-400 focus:border-green-400"
                    : "border-gray-300 bg-white/30 text-slate-800 placeholder-gray-500 focus:border-purple-500"
                    }`}
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-3">
                {filters.map((filter) => (
                  <motion.button
                    key={filter.value}
                    onClick={() => setSelectedFilter(filter.value)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center space-x-2 backdrop-blur-sm border ${selectedFilter === filter.value
                      ? darkMode
                        ? "bg-green-500/30 text-green-300 border-green-500/50"
                        : "bg-purple-500/30 text-purple-600 border-purple-500/50"
                      : darkMode
                        ? "bg-slate-800/30 text-gray-300 border-slate-600 hover:bg-slate-700/30"
                        : "bg-white/30 text-gray-600 border-gray-300 hover:bg-white/50"
                      }`}
                  >
                    <Filter className="w-3 h-3" />
                    <span>{filter.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Projects Grid */}
            <AnimatePresence>
              {filteredProjects.length > 0 ? (
                <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} darkMode={darkMode} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12"
                >
                  <div className={`text-6xl mb-4 ${darkMode ? "text-gray-600" : "text-gray-400"}`}>🔍</div>
                  <h3 className={`text-xl font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    Nenhum projeto encontrado
                  </h3>
                  <p className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    Tente ajustar os filtros ou termo de busca
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
                Contato
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
                    copy: true,
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
                  {
                    icon: MessageCircle,
                    label: "WhatsApp",
                    value: "BOT Coming Soon",
                    //value: "+55 (99) 99999-9999",
                    href: "https://wa.me/5599999999999",
                  },
                ].map((contact, index) => {
                  const handleEmailClick = (e: React.MouseEvent) => {
                    if (contact.copy) {
                      e.preventDefault()
                      navigator.clipboard.writeText(contact.value)
                      window.open(contact.href, "_blank")
                      // Opcional: feedback visual
                      alert("E-mail copiado para a área de transferência!")
                    }
                  }

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
                      onClick={contact.copy ? handleEmailClick : undefined}
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

        {/* Footer */}
        <footer
          className={`py-8 border-t backdrop-blur-sm ${darkMode ? "border-green-500/20 bg-slate-900/30" : "border-t-[2px] border-[#a78bfa]/40 bg-white/30"
            }`}
        >
          <div className="container mx-auto px-6 text-center">
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              © 2025 Pedro Cezar. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
