export const projectGroups = [
  { id: "profissional", title: "Experiência profissional" },
  { id: "autonomo", title: "Projetos autônomos e colaborativos" },
  { id: "pessoal", title: "Projetos pessoais e práticos" },
  { id: "academico", title: "Acadêmicos e hackathons" },
] as const

export type ProjectGroup = (typeof projectGroups)[number]["id"]

export interface Project {
  id: number
  title: string
  description: string
  image: string
  imageStyle?: "logo"
  technologies: string[]
  category: "individual" | "equipe" | "Comercial" | "competicao" | "unknown"
  status: "completed" | "in_progress" | "unknown"
  featured: boolean
  group: ProjectGroup
  tags?: string[]
  period?: string
  year?: number
  month?: number
  recent?: boolean
  pinned?: boolean
  afterId?: number
  label?: "Acadêmico" | "Comercial" | "Competição"
  demoLink?: string
  codeLink?: string
}

export function filterProjects(projects: Project[], search: string, filter: string): Project[] {
  const term = search.trim().toLowerCase()
  return projects.filter((project) => {
    const matchesFilter = filter === "all" ||
      (filter === "featured" ? project.featured :
        project.status === filter || project.category === filter || project.label === filter ||
        project.group === filter || project.tags?.includes(filter))
    return matchesFilter && (!term || [project.title, project.description, ...project.technologies, ...(project.tags ?? [])]
      .some((value) => value.toLowerCase().includes(term)))
  })
}

export function sortProjects<T extends Pick<Project, "group" | "year" | "month" | "recent"> & Partial<Pick<Project, "id" | "afterId">>>(items: T[]): T[] {
  const sorted = [...items].sort((a, b) =>
    projectGroups.findIndex((group) => group.id === a.group) - projectGroups.findIndex((group) => group.id === b.group) ||
    Number(Boolean(b.recent)) - Number(Boolean(a.recent)) || (b.year ?? 0) - (a.year ?? 0) ||
    (b.month ?? 0) - (a.month ?? 0))
  for (const item of items) {
    if (item.afterId == null) continue
    const anchor = sorted.find((project) => project.id === item.afterId && project.group === item.group)
    if (!anchor || anchor === item) continue
    sorted.splice(sorted.indexOf(item), 1)
    sorted.splice(sorted.indexOf(anchor) + 1, 0, item)
  }
  return sorted
}

export const projects: Project[] = sortProjects([
  {
    id: 26, group: "autonomo", recent: true, tags: ["Web"],
    title: "Auto Mais",
    description: "Site institucional para uma recuperadora de veículos em Niterói. Apresenta os serviços da oficina, informações de contato e opções para solicitar orçamento, com navegação adaptada a celulares.",
    image: "/images/projetos/v3/auto-mais-logo.svg", imageStyle: "logo",
    technologies: ["HTML", "CSS", "JavaScript"], category: "individual", status: "completed", featured: true,
    demoLink: "https://automais-mocha.vercel.app/",
  },
  {
    id: 27, group: "profissional", year: 2026, period: "Experiência: jun/2025 – nov/2026", tags: ["Web", "Automação"],
    title: "MailerWeb — Painel v1",
    description: "Atuei na manutenção e correção do painel de campanhas, herdado com implementações de terceiros e falhas no dashboard e nas regras de negócio. Trabalhei nos fluxos de envio, contatos, integrações e processamento de retornos, com APIs que ajudavam a distribuir serviços e aliviar gargalos.",
    image: "/images/projetos/v3/mailerweb",
    technologies: ["Python", "Django", "Celery", "MySQL", "MongoDB", "Redis"], category: "equipe", status: "unknown", featured: true,
  },
  {
    id: 28, group: "profissional", year: 2026, period: "Experiência: jun/2025 – nov/2026", tags: ["Web"],
    title: "MailerWeb — Portal v2",
    description: "Portal público da MailerWeb com catálogo dinâmico de produtos e planos, desenvolvido com Django, HTML, CSS e JavaScript. Apresenta os serviços da empresa e reúne cadastro, contratação, blog e central de ajuda.",
    image: "/images/projetos/v3/mailerweb",
    technologies: ["Python", "Django", "Django CMS", "HTML", "CSS", "JavaScript", "MySQL"], category: "equipe", status: "unknown", featured: true,
    demoLink: "https://www.mailerweb.com.br/",
  },
  {
    id: 29, group: "profissional", year: 2026, period: "Experiência: jun/2025 – nov/2026", tags: ["API"],
    title: "MailerWeb — API de contatos",
    description: "API responsável pelo cadastro e consulta de contatos, organização em listas e importação de arquivos. Oferece buscas paginadas e disponibiliza esses dados às campanhas e integrações da plataforma.",
    image: "/images/projetos/v3/mailerweb-logo.webp", imageStyle: "logo",
    technologies: ["Python", "FastAPI", "MongoDB", "MySQL"], category: "equipe", status: "unknown", featured: false,
  },
  {
    id: 30, group: "profissional", year: 2026, period: "Experiência: jun/2025 – nov/2026", tags: ["API"],
    title: "MailerWeb — API de pagamentos",
    description: "API que integra a plataforma a provedores de pagamento, processa cobranças e recebe confirmações por webhook. Dá suporte à gestão de faturas e assinaturas do produto.",
    image: "/images/projetos/v3/mailerweb-logo.webp", imageStyle: "logo",
    technologies: ["Python", "FastAPI", "Stripe", "Docker"], category: "equipe", status: "unknown", featured: false,
  },
  {
    id: 31, group: "profissional", year: 2026, period: "Experiência: jun/2025 – nov/2026", tags: ["API"],
    title: "MailerWeb — API transacional",
    description: "API que recebe solicitações da plataforma e encaminha mensagens transacionais por e-mail, SMS e WhatsApp, integrando os serviços internos aos provedores de comunicação.",
    image: "/images/projetos/v3/mailerweb-logo.webp", imageStyle: "logo",
    technologies: ["Python", "FastAPI", "Docker"], category: "equipe", status: "unknown", featured: false,
  },
  {
    id: 32, group: "profissional", year: 2026, recent: true, period: "Experiência: jun/2025 – nov/2026", tags: ["IA", "Automação", "Web"],
    title: "MailerWeb — Painel v2",
    description: "Painel multi-tenant de atendimento e marketing que reúne campanhas, contatos, automações, IA e CRM com kanban. Desenvolvido em Django com arquitetura hexagonal e serviços de responsabilidades isoladas, integra o backend a uma interface React e ao processamento de tarefas em segundo plano.",
    image: "/images/projetos/v3/mailerweb",
    technologies: ["Python", "Django", "Django REST Framework", "Django Channels", "JavaScript", "React", "Vite", "HTML", "CSS", "Tailwind CSS", "Celery", "MySQL", "Redis", "Docker"], category: "equipe", status: "in_progress", featured: true,
    demoLink: "https://app.mailerweb.com.br/",
  },
  {
    id: 33, group: "profissional", year: 2024, month: 11, period: "jan/2022 – nov/2024", tags: ["Web"],
    title: "BitWave",
    description: "Software house criada com colaboradores para desenvolver soluções digitais para pessoas e empresas. O trabalho abrangia levantamento de necessidades, análise e modelagem de sistemas, planejamento e criação de interfaces e aplicações.",
    image: "/images/projetos/v3/bitwave",
    technologies: ["UML", "UX/UI", "Análise de Sistemas"], category: "equipe", status: "unknown", featured: false,
  },
  {
    id: 35, group: "autonomo", afterId: 11, tags: ["Desktop"],
    title: "Acion Desktop",
    description: "Agente desktop para conectar ERPs locais ao sistema Acion. Lê e valida dados, mantém uma fila local e os envia à API; a primeira etapa utiliza um ERP simulado.",
    image: "/images/projetos/v3/acion-logo.png", imageStyle: "logo",
    technologies: ["Python", "Flet", "SQLite", "Pydantic", "HTTPX"], category: "equipe", status: "unknown", featured: false,
  },
  {
    id: 38, group: "academico", pinned: true, recent: true, tags: ["Pesquisa"],
    title: "TCC — Segurança e qualidade de software",
    description: "Pesquisa que propõe o U-SQUARE para integrar segurança, qualidade de software e experiência do usuário no levantamento de requisitos. A Régua Viva apoia a análise de projetos, organizando requisitos, conflitos, evidências e medições de forma rastreável.",
    image: "/images/projetos/v3/u-square",
    technologies: ["U-SQUARE", "Python", "HTML", "CSS", "JavaScript", "Docker", "Segurança", "Qualidade de software", "UX"], category: "equipe", status: "in_progress", featured: false,
  },
  {
    id: 41, group: "academico", afterId: 38, year: 2025, month: 12, tags: ["Hackathon", "Mobile"],
    title: "Prato Certo — Aplicativo mobile",
    description: "Aplicativo do Prato Certo que conecta doadores e beneficiários de alimentos. Permite consultar cestas, acompanhar estoque, acessar sugestões de receitas e enviar fotos para identificar alimentos.",
    image: "/images/projetos/v3/prato-certo-app",
    technologies: ["Flutter", "Dart", "Dio", "GetX", "Firebase Storage"],
    category: "equipe", status: "unknown", featured: false, label: "Competição",
    demoLink: "https://prato-certo-2c716.web.app/",
    codeLink: "https://github.com/DEVS-DE-IMPACTO-RJ/prato_certo_app",
  },
  {
    id: 42, group: "academico", afterId: 41, year: 2025, month: 12, tags: ["Hackathon", "API", "IA"],
    title: "Prato Certo — API de colaboradores",
    description: "API do Prato Certo para perfis de colaboradores, estoque e publicações de doação. Usa IA para identificar alimentos em fotos e estimar quantidades, além de sugerir sacolas e valores nutricionais com base no estoque.",
    image: "/images/projetos/v3/prato-certo-colaboradores",
    technologies: ["JavaScript", "Node.js", "Express", "Zod", "Groq"],
    category: "equipe", status: "unknown", featured: false, label: "Competição",
    codeLink: "https://github.com/DEVS-DE-IMPACTO-RJ/backEnd-Collaborators",
  },
  {
    id: 43, group: "academico", afterId: 42, year: 2025, month: 12, tags: ["Hackathon", "API", "IA"],
    title: "Prato Certo — API de beneficiários",
    description: "API do Prato Certo para consultar doações, registrar interesse e agendar coletas. Também oferece sugestões de receitas conforme restrições alimentares, usando integração com Groq e respostas simuladas no protótipo.",
    image: "/images/projetos/v3/prato-certo-beneficiarios",
    technologies: ["JavaScript", "Node.js", "Supabase", "Groq"],
    category: "equipe", status: "unknown", featured: false, label: "Competição",
    codeLink: "https://github.com/DEVS-DE-IMPACTO-RJ/backEnd-beneficiary",
  },
  {
    id: 37, group: "academico", afterId: 43, tags: ["Web"],
    title: "Laboratório virtual para a UFF",
    description: "Microscópio virtual para apoiar o ensino de histologia na UFF. Permite explorar lâminas digitais de tecidos e sistemas do corpo humano, ampliar imagens e observar estruturas microscópicas diretamente no navegador.",
    image: "/images/projetos/v3/laboratorio-microscopio",
    technologies: ["Web"], category: "unknown", status: "completed", featured: false,
    demoLink: "https://a-naty.vercel.app/",
  },
  {
    id: 13,
    group: "academico", afterId: 37, period: "2024", year: 2024, tags: ["Hackathon", "IA", "API"],
    title: "Adams Back-End",
    description: "API do chatbot finalista da NASA Space Apps Challenge 2024. Combina dados da NASA Exoplanet Archive com busca vetorial no Qdrant para responder a consultas sobre exoplanetas, usando autenticação JWT e comunicação em tempo real por Socket.IO.",
    image: "/images/projetos/v2/adams42",
    technologies: ["LangChain", "Python", "Docker", "Groq", "Qdrant"],
    category: "equipe",
    status: "completed",
    featured: false,
    label: "Competição",
    demoLink: "https://adams42-65lztb96t-arypedros-projects.vercel.app/",
    codeLink: "https://github.com/Ary-Pedro/adams42-withServer",
  },
  {
    id: 12,
    group: "academico", afterId: 13, period: "2024", year: 2024, tags: ["Hackathon", "IA", "Web"],
    title: "Adams Front-End",
    description: "Interface do projeto finalista da NASA Space Apps Challenge 2024 para explorar exoplanetas. Exibe dados astronômicos e constelações e oferece busca contextual, com comunicação em tempo real via Socket.IO.",
    image: "/images/projetos/v2/adams42",
    technologies: ["React", "Vercel"],
    category: "equipe",
    status: "completed",
    featured: false,
    label: "Competição",
    demoLink: "https://adams42-65lztb96t-arypedros-projects.vercel.app/",
    codeLink: "https://github.com/Ary-Pedro/Adams42-front",
  },
  {
    id: 14,
    group: "academico", afterId: 12, period: "2023", year: 2023, tags: ["Hackathon", "Web"],
    title: "Mapeamento da Flora Marítima",
    description: "Aplicação web criada para a NASA Space Apps Challenge 2023, em Niterói. Apresenta dados biogeográficos de espécies marinhas em uma visualização interativa, combinando mapas e dados oceanográficos para apoiar a análise espacial.",
    image: "/images/projetos/v2/flora-maritima",
    technologies: ["Python", "HTML", "CSS", "JavaScript"],
    category: "equipe",
    status: "completed",
    featured: false,
    label: "Competição",
    demoLink: "https://replit.com/@LucasSilva191/AchingThinRadius#index.html",
  },
  {
    id: 39, group: "academico", afterId: 14, year: 2024, month: 10, period: "set/2023 – out/2024", tags: ["Unity"],
    title: "Aerofobia VR",
    description: "Simulador em realidade virtual desenvolvido no Unity Labs em parceria com a área de psicologia. Usa um ambiente imersivo para apoiar o trabalho terapêutico relacionado ao medo de voar.",
    image: "/images/projetos/v2/unity-labs",
    technologies: ["Unity", "C#", "Realidade Virtual"], category: "equipe", status: "completed", featured: false,
  },
  {
    id: 5,
    group: "academico", afterId: 39, period: "set/2023 – out/2024", year: 2024, month: 10, tags: ["Unity"],
    title: "Unity Labs",
    description: "Atuei no Unity Labs em projetos 2D, 3D e de realidade virtual, como desenvolvedor, monitor e líder de equipe. Desenvolvi mecânicas, trabalhei na otimização e no game design e participei do Aerofobia VR em parceria com a área de psicologia. Também organizei atividades e apoiei outros desenvolvedores.",
    image: "/images/projetos/v2/unity-labs",
    technologies: ["Unity", "C#", "3D", "VR", "Blender"],
    category: "equipe",
    status: "completed",
    featured: false,
    label: "Acadêmico",
  },
  {
    id: 18,
    group: "academico", afterId: 5, tags: ["Prática"],
    title: "Testes em Java (Prática)",
    description: "Exercícios em Java para praticar programação orientada a objetos, análise de complexidade e algoritmos, incluindo árvores, pilhas, filas e busca binária.",
    image: "/images/projetos/v2/java",
    technologies: ["Java", "WindowBuilder"],
    category: "individual",
    status: "completed",
    featured: false,
    label: "Acadêmico",
  },
  {
    id: 4,
    group: "academico", afterId: 18, tags: ["Prática"],
    title: "Testes em Python (Prática)",
    description: "Projetos e exercícios em Python para praticar orientação a objetos e construção de interfaces, com experiências em CustomTkinter e conceitos de usabilidade.",
    image: "/images/projetos/v2/python",
    technologies: ["Python", "CustomTkinter"],
    category: "individual",
    status: "completed",
    featured: false,
    label: "Acadêmico",
  },
  {
    id: 19,
    group: "academico", afterId: 4, tags: ["Prática"],
    title: "Arduino",
    description: "Protótipos desenvolvidos no laboratório da UniLaSalle para explorar eletrônica e programação com Arduino, incluindo o desenvolvimento de uma máquina CNC.",
    image: "/images/projetos/v2/arduino",
    technologies: ["Arduino", "C++"],
    category: "equipe",
    status: "completed",
    featured: false,
  },
  {
    id: 3,
    group: "academico", afterId: 19, tags: ["Prática"],
    title: "Testes em C (Prática)",
    description: "Exercícios em C sobre programação estruturada, funções, vetores, matrizes, ponteiros, alocação dinâmica e recursividade.",
    image: "/images/projetos/v2/c",
    technologies: ["C"],
    category: "individual",
    status: "completed",
    featured: false,
    label: "Acadêmico",
  },
  {
    id: 2,
    group: "academico", afterId: 3, tags: ["Prática"],
    title: "Sistema de Academia",
    description: "Sistema de gerenciamento de academia em C, com cadastro, consulta e manipulação de dados. Projeto acadêmico voltado à prática de lógica e programação estruturada.",
    image: "/images/projetos/v2/gym",
    technologies: ["C"],
    category: "equipe",
    status: "completed",
    featured: false,
    label: "Acadêmico",
    demoLink: "https://replit.com/@PedroCezar2/Trabalho",
    codeLink: "https://github.com/Ary-Pedro/Sistema-academia",
  },
  {
    id: 1,
    group: "academico", afterId: 2, tags: ["Prática"],
    title: "Manipulador de Imagens",
    description: "Um dos meus primeiros projetos de programação: manipulador de imagens em C criado para praticar vetores, matrizes e lógica de processamento de imagens.",
    image: "/images/projetos/v2/lena",
    technologies: ["C", "imghelpers.h", "libbmp.h"],
    category: "individual",
    status: "completed",
    featured: false,
    label: "Acadêmico",
    demoLink: "https://replit.com/@PedroCezar2/aula",
    codeLink: "https://github.com/Ary-Pedro/Manipulador-de-Imagem",
  },

  {
    id: 22,
    group: "pessoal", tags: ["IA", "Automação"],
    title: "MegaBrain",
    description: "Estúdio audiovisual com apoio de IA para transformar ideias e referências em projetos criativos. Organiza histórias e universos e apoia a escrita e revisão de roteiros, com evolução planejada para montagem e validação de vídeos.",
    image: "/images/projetos/v3/megabrain",
    technologies: ["Python", "Next.js", "TypeScript", "PostgreSQL", "Docker", "FFmpeg"],
    category: "individual",
    status: "in_progress",
    featured: true,
  },
  {
    id: 23,
    group: "pessoal", tags: ["IA", "API"],
    title: "MegaBrain Collector",
    description: "API de pesquisa e coleta autorizada que reúne referências de diferentes fontes, registra a origem e mantém versões para consulta por sistemas como o MegaBrain. Organiza evidências e conhecimento para reutilização ao longo do tempo.",
    image: "/images/projetos/v3/megabrain-collector",
    technologies: ["Python", "FastAPI", "PostgreSQL", "SearXNG", "Docker"],
    category: "individual",
    status: "in_progress",
    featured: true,
  },
  {
    id: 24,
    group: "pessoal", tags: ["IA", "Automação"],
    title: "dev-Brain",
    description: "Base de conhecimento que organiza meus projetos, tarefas, decisões e aprendizados em notas conectadas. Usa mapas de código e scripts para recuperar contexto e apoiar o desenvolvimento entre sessões.",
    image: "/images/projetos/v3/dev-brain",
    technologies: ["Obsidian", "Markdown", "Python", "Graphify"],
    category: "individual",
    status: "in_progress",
    featured: true,
  },
  {
    id: 25,
    group: "pessoal", tags: ["Web"],
    title: "Meu Dinheiro na Mão",
    description: "Aplicação de gestão financeira para organizar contas, despesas, transações e investimentos, além de simular projetos e ideias. A evolução planejada inclui Open Finance e gráficos para visualizar o fluxo da renda.",
    image: "/images/projetos/v3/meu-dinheiro",
    technologies: ["TypeScript", "Next.js", "React", "Prisma", "PostgreSQL", "Zod", "Tailwind CSS", "Docker"],
    category: "individual",
    status: "in_progress",
    featured: true,
  },


  {
    id: 15,
    group: "pessoal", tags: ["IA", "Automação"],
    title: "Workflow, Bots e Agentes",
    description: "Automações e assistentes pessoais para organizar a agenda, lidar com e-mails do meu domínio e reduzir tarefas repetitivas da rotina.",
    image: "/images/projetos/v2/workflow",
    technologies: ["Python", "n8n", "Appsmith", "Groq", "Zoho", "Eu2Make"],
    category: "individual",
    status: "in_progress",
    featured: true,
  },
  {
    id: 17,
    group: "pessoal", tags: ["Prática", "Automação"],
    title: "Raspagem de dados",
    description: "Servidor de raspagem com Selenium para coletar dados de diferentes sites. Os resultados são organizados e processados com Pandas para facilitar a análise.",
    image: "/images/projetos/v2/web-scraping",
    technologies: ["Python", "Selenium", "Pandas"],
    category: "individual",
    status: "in_progress",
    featured: false,
  },
  {
    id: 21,
    group: "pessoal", tags: ["Prática", "Web"],
    title: "roleta de filmes",
    description: "Catálogo pessoal de filmes para registrar títulos, acompanhar o que já foi assistido e receber sugestões com apoio de APIs de cinema.",
    image: "/images/projetos/v2/spin",
    technologies: ["JavaScript", "React", "PostgreSQL"],
    category: "equipe",
    status: "in_progress",
    featured: false,
  },
  {
    id: 20,
    group: "pessoal", tags: ["Prática", "API"],
    title: "Biblioteca",
    description: "Aplicativo de biblioteca pessoal para organizar coleções, registrar avaliações e receber sugestões de leitura. Combina um app em React Native, API REST em Java e armazenamento em PostgreSQL.",
    image: "/images/projetos/v2/lib-rank",
      technologies: ["Java", "Jersey", "React Native", "Expo", "TypeScript", "PostgreSQL"],
    category: "equipe",
    status: "in_progress",
    featured: false,
      codeLink: "https://github.com/Ary-Pedro/my-library",
  },
  {
    id: 11,
    group: "autonomo", period: "set/2025 – jan/2026", year: 2026, month: 1, tags: ["API"],
    title: "Motores de Cena",
    description: "Site dinâmico e API para apresentar e gerenciar veículos para aluguel. Inclui cadastro de colaboradores, clientes e administradores, gestão de veículos e pagamentos com Asaas.",
    image: "/images/projetos/v3/motores-logo.svg", imageStyle: "logo",
    technologies: ["Python", "FastAPI", "SQLAlchemy", "Pandas"],
    category: "Comercial",
    status: "completed",
    featured: true,
    demoLink: "https://motoresdecena.com.br/",
  },
  {
    id: 10,
    group: "autonomo", period: "out/2024 – jan/2025", year: 2025, month: 1, tags: ["API", "Automação"],
    title: "Acion — Integração Omie",
    description: "Integração da Acion com o ERP Omie para conectar dados à gestão de projetos. Automatiza consultas e atualizações de projetos, alterações de status e gerenciamento de atividades.",
    image: "/images/projetos/v2/api-omie",
    technologies: ["Python", "Django", "HTML", "CSS", "JavaScript", "requests", "API"],
    category: "equipe",
    status: "completed",
    featured: false,
    label: "Comercial",
  },
  {
    id: 9,
    group: "autonomo", period: "out/2024 – jan/2025", year: 2025, month: 1, tags: ["API", "Automação"],
    title: "Acion — Integração Bling",
    description: "Integração da Acion com o ERP Bling para conectar dados comerciais à gestão de projetos. Abrange pedidos, status de vendas, contatos, registro de ocorrências e sincronização de estoque.",
    image: "/images/projetos/v2/api-bling",
    technologies: ["Python", "Django", "HTML", "CSS", "JavaScript", "requests", "API"],
    category: "equipe",
    status: "completed",
    featured: false,
    label: "Comercial",
  },
  {
    id: 8,
    group: "autonomo", period: "jan/2024 – out/2024", year: 2024, month: 10, tags: ["Web", "Automação"],
    title: "DeAaZ Tur",
    description: "Sistema local para empresas que apoiam a documentação de turismo. Reúne perfis de acesso, cadastro de clientes, vendas, ranking de desempenho, relatórios financeiros e mapeamento de rotas para visitas a parceiros.",
    image: "/images/projetos/v2/deaaztur",
    technologies: ["Python", "Django", "HTML", "CSS", "JavaScript", "Pandas"],
    category: "equipe",
    status: "completed",
    featured: false,
    label: "Comercial",
    codeLink: "https://github.com/Ary-Pedro/setup_DeAaZTour",
  },
  {
    id: 7,
    group: "autonomo", period: "jan/2024 – dez/2024", year: 2024, month: 12, tags: ["Web", "API"],
    title: "(ONG) ABAP-RJ Back",
    description: "Backend do sistema da ONG ABAP-RJ, desenvolvido em Django para gerenciar beneficiários, voluntários, funcionários e gerentes. Disponibiliza regras de negócio, API de integração e painéis administrativos.",
    image: "/images/projetos/v2/abap-rj",
    technologies: ["Python", "Django", "HTML", "CSS", "JavaScript", "PostgreSQL", "Docker"],
    category: "equipe",
    status: "completed",
    featured: true,
    codeLink: "https://github.com/Ary-Pedro/Projeto-AbapRJ",
  },
  {
    id: 6,
    group: "autonomo", period: "jan/2024 – dez/2024", year: 2024, month: 12, tags: ["Web"],
    title: "(ONG) ABAP-RJ Front",
    description: "Frontend do sistema da ONG ABAP-RJ, com protótipo em React e versão em WordPress para o blog institucional. Inclui interface para cadastro de eventos.",
    image: "/images/projetos/v2/abap-rj",
    technologies: ["React", "WordPress"],
    category: "equipe",
    status: "completed",
    featured: true,
    demoLink: "https://classy-marigold-091c1c.netlify.app/",
    codeLink: "https://github.com/Ary-Pedro/Projeto-AbapRJ",
  },
])
