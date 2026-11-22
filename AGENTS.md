# Repository Guidelines

## Finalidade

Este site apresenta o perfil profissional, as tecnologias e os projetos do autor, além de oferecer caminhos para contato. A página permite buscar e filtrar projetos e alternar entre temas claro e escuro. Os dados dos projetos ficam em `lib/projects.ts`.

## Estrutura do projeto

O projeto usa Next.js 16, React 19, TypeScript e Tailwind CSS. `app/` contém a página, o layout e estilos globais; `components/` contém componentes, incluindo a interface reutilizável em `components/ui/`. Hooks ficam em `hooks/`, utilitários em `lib/` e imagens em `public/images/projetos/`. Há também estilos em `styles/`.

## Desenvolvimento e build

- `npm ci`: instala as versões do lockfile do npm.
- `npm run dev`: inicia o servidor de desenvolvimento do Next.js.
- `npm run build`: gera a versão de produção.
- `npm start`: executa a versão de produção após o build.
- `npx tsc --noEmit`: verifica tipos sem gerar arquivos JavaScript.

Há também um `pnpm-lock.yaml`; mantenha o lockfile do gerenciador usado consistente. O build verifica TypeScript; o projeto não tem lint configurado.

## Estilo e nomes

Siga o arquivo editado: indentação geralmente de dois espaços, componentes em PascalCase e arquivos em kebab-case, como `project-card.tsx`. Prefira TypeScript, componentes existentes, importações com `@/` e classes Tailwind. Não há formatador configurado.

## Verificação

Há uma verificação pontual dos filtros em `tests/projects.test.mjs`, sem suíte ou meta de cobertura definida. Para mudanças de interface, confira manualmente a página, os links e os temas em tamanhos de tela relevantes. Registre as verificações na descrição da alteração.

## Commits e pull requests

O histórico usa mensagens curtas, como `Update page.tsx`, sem padrão formal consistente. Em pull requests, informe o objetivo, as verificações e limitações; vincule a issue pertinente e inclua capturas de tela para mudanças visuais.

## Configuração

Arquivos `.env*` são ignorados pelo Git. Não inclua segredos ou credenciais no código, em capturas de tela ou em commits.

## Contexto para agentes

Consulte o card `projects/portfolio-proj.md` no dev-Brain e o grafo em `graph/portfolio/`. Se o grafo ainda não existir, use o `graphify` disponível para mapear o código localmente no dev-Brain, sem instalar ferramentas. Preserve mapas existentes e registre as limitações da extração.

Quando uma tarefa exigir análise especializada ou crítica, avalie os agentes descritos em `D:/Usuarios/KzAryan/Documents/programar/dev-Brain/agents/` e o roteamento em `automation/keyword-routing.md`. Escolha conforme o assunto e a necessidade; para TypeScript/Next.js, consulte `dev-next.md`. As notas são especificações e podem apontar para agentes de outra plataforma: verifique disponibilidade e permissões antes de delegar. Se não estiverem disponíveis, use as orientações pertinentes como contexto e prossiga.
