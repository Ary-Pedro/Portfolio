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
    description: "Site institucional para uma recuperadora de veículos em Niterói. Apresenta os serviços da oficina, informações de contato e caminhos para solicitar um orçamento, com navegação adaptada ao celular.",
    image: "/images/projetos/v3/auto-mais-logo.svg", imageStyle: "logo",
    technologies: ["HTML", "CSS", "JavaScript"], category: "individual", status: "completed", featured: true,
    demoLink: "https://automais-mocha.vercel.app/",
  },
  {
    id: 27, group: "profissional", year: 2026, period: "Experiência: jun/2025 – nov/2026", tags: ["Web", "Automação"],
    title: "MailerWeb — Painel v1",
    description: "Painel legado para gestão de campanhas de comunicação. Minha atuação envolveu fluxos de envio, importação de contatos, integrações e processamento de retornos, em um sistema que também coordena filas e cobrança.",
    image: "/images/projetos/v3/mailerweb",
    technologies: ["Python", "Django", "Celery", "MySQL", "MongoDB", "Redis"], category: "equipe", status: "unknown", featured: true,
  },
  {
    id: 28, group: "profissional", year: 2026, period: "Experiência: jun/2025 – nov/2026", tags: ["Web"],
    title: "MailerWeb — Portal v2",
    description: "Portal público da MailerWeb para apresentar produtos e planos, publicar conteúdo e orientar clientes. Reúne páginas de marketing, blog, central de ajuda e fluxos de cadastro e contratação.",
    image: "/images/projetos/v3/mailerweb",
    technologies: ["Python", "Django", "Django CMS", "MySQL"], category: "equipe", status: "unknown", featured: true,
    demoLink: "https://www.mailerweb.com.br/",
  },
  {
    id: 29, group: "profissional", year: 2026, period: "Experiência: jun/2025 – nov/2026", tags: ["API"],
    title: "MailerWeb — API de contatos",
    description: "API de contatos e listas que apoia campanhas e integrações da plataforma. Oferece cadastro e consulta de contatos, organização em listas, importação de arquivos e buscas paginadas.",
    image: "/images/projetos/v3/mailerweb-logo.webp", imageStyle: "logo",
    technologies: ["Python", "FastAPI", "MongoDB", "MySQL"], category: "equipe", status: "unknown", featured: false,
  },
  {
    id: 30, group: "profissional", year: 2026, period: "Experiência: jun/2025 – nov/2026", tags: ["API"],
    title: "MailerWeb — API de pagamentos",
    description: "Serviço de pagamentos da plataforma: organiza a comunicação com provedores, processa cobranças e recebe confirmações por webhook, apoiando os fluxos de faturas e assinaturas.",
    image: "/images/projetos/v3/mailerweb-logo.webp", imageStyle: "logo",
    technologies: ["Python", "FastAPI", "Stripe", "Docker"], category: "equipe", status: "unknown", featured: false,
  },
  {
    id: 31, group: "profissional", year: 2026, period: "Experiência: jun/2025 – nov/2026", tags: ["API"],
    title: "MailerWeb — API transacional",
    description: "API para envio de mensagens transacionais por e-mail, SMS e WhatsApp. Integra os serviços da plataforma e provedores de comunicação para encaminhar solicitações de envio.",
    image: "/images/projetos/v3/mailerweb-logo.webp", imageStyle: "logo",
    technologies: ["Python", "FastAPI", "Docker"], category: "equipe", status: "unknown", featured: false,
  },
  {
    id: 32, group: "profissional", year: 2026, recent: true, period: "Experiência: jun/2025 – nov/2026", tags: ["IA", "Automação", "Web"],
    title: "MailerWeb — Painel v2",
    description: "Nova geração do painel de atendimento e marketing da MailerWeb, em desenvolvimento. O monolito multi-tenant reúne serviços antes separados e prevê recursos de IA, automação, campanhas e kanban.",
    image: "/images/projetos/v3/mailerweb",
    technologies: ["Python", "Django", "Django REST Framework", "React", "Celery", "MySQL", "Redis"], category: "equipe", status: "in_progress", featured: true,
    demoLink: "https://app.mailerweb.com.br/",
  },
  {
    id: 33, group: "profissional", year: 2024, month: 11, period: "jan/2022 – nov/2024", tags: ["Web"],
    title: "BitWave",
    description: "Projeto criado com colaboradores para desenvolver soluções tecnológicas para pessoas e empresas, desde a compreensão das necessidades e o planejamento até a construção de sistemas e interfaces.",
    image: "/images/projetos/v3/bitwave",
    technologies: ["UML", "UX/UI", "Análise de Sistemas"], category: "equipe", status: "unknown", featured: false,
  },
  {
    id: 35, group: "autonomo", afterId: 11, tags: ["Desktop"],
    title: "Acion Desktop",
    description: "Agente de conexão para levar dados de ERPs locais ao sistema Acion. Com o objetivo de facilitar a integração de dados, o agente realiza a leitura, validação e envio à API com fila local; a primeira etapa utiliza um ERP simulado.",
    image: "/images/projetos/v3/acion-logo.png", imageStyle: "logo",
    technologies: ["Python", "Flet", "SQLite", "Pydantic", "HTTPX"], category: "equipe", status: "unknown", featured: false,
  },
  {
    id: 41, group: "academico", year: 2025, month: 12, tags: ["Hackathon", "Mobile"],
    title: "Prato Certo — Aplicativo mobile",
    description: "Aplicativo para conectar doadores e beneficiários de alimentos. Reúne telas para consultar cestas, acessar sugestões de receitas e gerenciar estoque, incluindo o envio de fotos para identificação de alimentos.",
    image: "/images/projetos/v3/prato-certo-app",
    technologies: ["Flutter", "Dart", "Dio", "GetX", "Firebase Storage"],
    category: "equipe", status: "unknown", featured: false, label: "Competição",
    demoLink: "https://prato-certo-2c716.web.app/",
    codeLink: "https://github.com/DEVS-DE-IMPACTO-RJ/prato_certo_app",
  },
  {
    id: 42, group: "academico", year: 2025, month: 12, tags: ["Hackathon", "API", "IA"],
    title: "Prato Certo — API de colaboradores",
    description: "API para perfis, estoque e publicações de doação. Usa IA para identificar alimentos em fotos e estimar quantidades; também sugere sacolas e valores nutricionais estimados com base no estoque disponível.",
    image: "/images/projetos/v3/prato-certo-colaboradores",
    technologies: ["JavaScript", "Node.js", "Express", "Zod", "Groq"],
    category: "equipe", status: "unknown", featured: false, label: "Competição",
    codeLink: "https://github.com/DEVS-DE-IMPACTO-RJ/backEnd-Collaborators",
  },
  {
    id: 43, group: "academico", year: 2025, month: 12, tags: ["Hackathon", "API", "IA"],
    title: "Prato Certo — API de beneficiários",
    description: "API para consultar doações, registrar interesse e agendar coletas. Inclui sugestões de receitas que consideram restrições alimentares, com integração à Groq e respostas simuladas para o protótipo.",
    image: "/images/projetos/v3/prato-certo-beneficiarios",
    technologies: ["JavaScript", "Node.js", "Supabase", "Groq"],
    category: "equipe", status: "unknown", featured: false, label: "Competição",
    codeLink: "https://github.com/DEVS-DE-IMPACTO-RJ/backEnd-beneficiary",
  },
  {
    id: 37, group: "academico", tags: ["Web"],
    title: "Laboratório virtual para a UFF",
    description: "Laboratório virtual voltado ao estudo de lâminas, com visualização digital e opções de ampliação para apoiar a observação em atividades acadêmicas.",
    image: "/images/projetos/v3/laboratorio-microscopio",
    technologies: ["Web"], category: "unknown", status: "completed", featured: false,
    demoLink: "https://a-naty.vercel.app/",
  },
  {
    id: 38, group: "academico", pinned: true, tags: ["Pesquisa"],
    title: "TCC — Segurança e qualidade de software",
    description: "TCC em desenvolvimento que propõe o U-SQUARE e a criação de um algoritmo para analisar projetos de software. A abordagem considera requisitos e conflitos entre segurança, qualidade e experiência do usuário, com demonstração em um cenário simulado.",
    image: "/images/projetos/v3/u-square",
    technologies: ["U-SQUARE", "Segurança", "Qualidade de software", "UX"], category: "equipe", status: "in_progress", featured: false,
  },
  {
    id: 39, group: "academico", year: 2024, month: 10, period: "set/2023 – out/2024", tags: ["Unity"],
    title: "Aerofobia VR",
    description: "Simulador de realidade virtual criado no Unity Labs em parceria com a área de psicologia. O projeto explora um ambiente imersivo para apoiar o trabalho relacionado ao medo de voar.",
    image: "/images/projetos/v2/unity-labs",
    technologies: ["Unity", "C#", "Realidade Virtual"], category: "equipe", status: "completed", featured: false,
  },

  {
    id: 22,
    group: "pessoal", tags: ["IA", "Automação"],
    title: "MegaBrain",
    description: "Estúdio audiovisual com apoio de IA para transformar ideias e referências em projetos criativos. Organiza histórias e universos, apoia a elaboração e revisão humana de roteiros e evolui para integrar mídia, montagem e validação de vídeos.",
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
    description: "API de pesquisa e coleta autorizada que reúne referências de diferentes fontes, registra sua origem e mantém versões para consulta por sistemas como o MegaBrain. O projeto também desenvolve a organização de evidências e conhecimento ao longo do tempo.",
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
    description: "Base de conhecimento para apoiar meu trabalho de desenvolvimento. Organiza projetos, tarefas, decisões e aprendizados em notas conectadas, com mapas de código e scripts que ajudam a recuperar contexto entre sessões.",
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
    description: "Aplicação de gestão financeira para organizar contas, despesas fixas, transações e investimentos, além de simular projetos e ideias. A evolução prevê integração com Open Finance para reunir dados e gráficos, como Sankey, para visualizar o fluxo da renda e apoiar decisões individuais ou com amigos.",
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
    description:
      "Conjunto de automações e assistentes pessoais para organizar a agenda, lidar com e-mails do meu domínio e reduzir tarefas repetitivas da rotina.",
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
    description:
      "Servidor de raspagem com Selenium para executar coletas em vários sites. Os dados obtidos são organizados e processados com Pandas para facilitar sua análise.",
    image: "/images/projetos/v2/web-scraping",
    technologies: ["Python", "Selenium", "Pandas"],
    category: "individual",
    status: "in_progress",
    featured: false,
  },
  {
    id: 18,
    group: "academico", tags: ["Prática"],
    title: "Testes em Java (Prática)",
    description:
      "Exercícios de programação orientada a objetos e algoritmos em Java, incluindo árvores, pilhas, filas e busca binária. Os estudos também exploram análise de complexidade.",
    image: "/images/projetos/v2/java",
    technologies: ["Java", "WindowBuilder"],
    category: "individual",
    status: "completed",
    featured: false,
    label: "Acadêmico",
  },
  {
    id: 21,
    group: "pessoal", tags: ["Prática", "Web"],
    title: "roleta de filmes",
    description:
      "Catálogo pessoal de filmes para registrar títulos, acompanhar o que já foi assistido e receber sugestões com apoio de APIs de cinema.",
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
    description:
"Aplicativo de biblioteca pessoal para organizar coleções, registrar avaliações e receber sugestões de próximas leituras. Combina um aplicativo móvel em React Native com uma API REST em Java e armazenamento em PostgreSQL.",
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
    description:
      "Site dinâmico e API para apresentação e gestão de veículos para aluguel. O backend contempla cadastro de colaboradores, clientes e administradores, gestão de veículos e pagamentos usaando Asaas.",
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
    description:
      "Integração da Acion com a API do ERP Omie para conectar dados à gestão de projetos. Permite consultar e atualizar projetos, alterar status e criar ou gerenciar atividades de forma automatizada.",
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
    description:
      "Integração da Acion com a API do ERP Bling para conectar dados comerciais à gestão de projetos. Abrange consultas de pedidos, atualização de status de vendas, gestão de contatos, registro de ocorrências e sincronização de estoque.",
    image: "/images/projetos/v2/api-bling",
    technologies: ["Python", "Django", "HTML", "CSS", "JavaScript", "requests", "API"],
    category: "equipe",
    status: "completed",
    featured: false,
    label: "Comercial",
  },
  {
    id: 19,
    group: "academico", tags: ["Prática"],
    title: "Arduino",
    description:
      "Protótipos desenvolvidos no laboratório da UniLaSalle para experimentar eletrônica e programação com Arduino, incluindo o desenvolvimento de uma máquina CNC.",
    image: "/images/projetos/v2/arduino",
    technologies: ["Arduino", "C++"],
    category: "equipe",
    status: "completed",
    featured: false,
  },
  {
    id: 13,
    group: "academico", period: "2024", year: 2024, tags: ["Hackathon", "IA", "API"],
    title: "Adams Back-End",
    description:
      "API do chatbot finalista na NASA Space Apps Challenge 2024. Integra Qdrant Vector Database com a NASA Exoplanet Archive API para processamento de dados astronômicos. Utiliza embeddings vetoriais para consultas precisas sobre exoplanetas, com autenticação JWT e Socket.IO para comunicação em tempo real.",
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
    group: "academico", period: "2024", year: 2024, tags: ["Hackathon", "IA", "Web"],
    title: "Adams Front-End",
    description:
      "Interface finalista na NASA Space Apps Challenge 2024 para exploração de exoplanetas. Consome dados astronômicos em tempo real via Socket.IO, com visualização de constelações e sistema de busca contextual. Desenvolvido com componentes modulares e design responsivo para experiência educativa imersiva.",
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
    id: 8,
    group: "autonomo", period: "jan/2024 – out/2024", year: 2024, month: 10, tags: ["Web", "Automação"],
    title: "DeAaZ Tur",
    description:
      "Solução local para empresas de apoio à documentação de turismo com: controle de perfis (vendedor, administrador e executivo), cadastro de clientes, processamento de vendas, análise de desempenho com rankeamento, monitoramento financeiro via página de relatórios mensais e mapeamento de rotas para visitas a parceiros.",
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
    description:
      "Backend do sistema ABAP-RJ desenvolvido com Django, responsável pela gestão de dados de beneficiários, voluntários, funcionários e gerentes. Implementa lógica de negócio completa, API para integração com frontend e painéis administrativos, utilizando PostgreSQL para armazenamento e Docker para conteinerização.",
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
    description:
      "Frontend para o sistema ABAP-RJ com duas versões: protótipo inicial em React para validação de conceito e versão final em WordPress para blog institucional. Oferece interface de cadastro de eventos.",
    image: "/images/projetos/v2/abap-rj",
    technologies: ["React", "WordPress"],
    category: "equipe",
    status: "completed",
    featured: true,
    demoLink: "https://classy-marigold-091c1c.netlify.app/",
    codeLink: "https://github.com/Ary-Pedro/Projeto-AbapRJ",
  },
  {
    id: 5,
    group: "academico", period: "set/2023 – out/2024", year: 2024, month: 10, tags: ["Unity"],
    title: "Unity Labs",
    description:
      "Atuei por dois anos em projetos desenvolvidos com Unity (2D, 3D e VR), assumindo gradualmente os papéis de Líder de Equipe e Monitor. Destaque para o desenvolvimento do simulador terapêutico Aerofobia, realizado em parceria com o núcleo de psicologia. Responsabilidades técnicas: implementação de mecânicas, otimização de performance e participação ativa no game design. Responsabilidades de liderança: gestão de pipelines utilizando métodos ágeis e mentoria de desenvolvedores da equipe.",
    image: "/images/projetos/v2/unity-labs",
    technologies: ["Unity", "C#", "3D", "VR", "Blender"],
    category: "equipe",
    status: "completed",
    featured: false,
    label: "Acadêmico",
  },
  {
    id: 14,
    group: "academico", period: "2023", year: 2023, tags: ["Hackathon", "Web"],
    title: "Mapeamento da Flora Marítima",
    description:
      "Projeto de Mapeamento e Visualização de Dados da Flora Marítima: Aplicação web desenvolvida para a NASA Space Apps Challenge 2023 – primeiro hackathon espacial em Niterói, sediado na Unilasalle. Oferece visualização interativa de dados biogeográficos de espécies marinhas, integrando camadas cartográficas e bancos de dados oceanográficos para análise espacial",
    image: "/images/projetos/v2/flora-maritima",
    technologies: ["Python", "HTML", "CSS", "JavaScript"],
    category: "equipe",
    status: "completed",
    featured: false,
    label: "Competição",
    demoLink: "https://replit.com/@LucasSilva191/AchingThinRadius#index.html",
  },
  {
    id: 4,
    group: "academico", tags: ["Prática"],
    title: "Testes em Python (Prática)",
    description:
      "Projetos e exercícios em Python para praticar programação orientada a objetos e construção de interfaces, incluindo experiências com CustomTkinter e conceitos de usabilidade.",
    image: "/images/projetos/v2/python",
    technologies: ["Python", "CustomTkinter"],
    category: "individual",
    status: "completed",
    featured: false,
    label: "Acadêmico",
  },
  {
    id: 3,
    group: "academico", tags: ["Prática"],
    title: "Testes em C (Prática)",
    description:
      "Coletânea de exercícios em C para praticar programação estruturada, funções, vetores e matrizes, ponteiros, alocação dinâmica e recursividade.",
    image: "/images/projetos/v2/c",
    technologies: ["C"],
    category: "individual",
    status: "completed",
    featured: false,
    label: "Acadêmico",
  },
  {
    id: 2,
    group: "academico", tags: ["Prática"],
    title: "Sistema de Academia",
    description:
      "Sistema de gerenciamento de academia em C, com operações de cadastro, consulta e manipulação de dados. Projeto acadêmico para praticar lógica e programação estruturada.",
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
    group: "academico", tags: ["Prática"],
    title: "Manipulador de Imagens",
    description:
      "Um dos meus primeiros projetos em programação: um manipulador de imagens em C criado para praticar vetores, matrizes e lógica de processamento de imagens.",
    image: "/images/projetos/v2/lena",
    technologies: ["C", "imghelpers.h", "libbmp.h"],
    category: "individual",
    status: "completed",
    featured: false,
    label: "Acadêmico",
    demoLink: "https://replit.com/@PedroCezar2/aula",
    codeLink: "https://github.com/Ary-Pedro/Manipulador-de-Imagem",
  },
])
