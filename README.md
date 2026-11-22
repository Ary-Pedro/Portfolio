# Portfólio de Pedro Cezar

Portfólio profissional com projetos, tecnologias e contato. A página permite pesquisar e filtrar projetos e alternar entre os temas claro e escuro.

## Executar localmente

Com Node.js, npm e as dependências já instaladas, abra o terminal na pasta do projeto, onde está o `package.json`. 


Para iniciar em **desenvolvimento**:

```powershell
npm run dev
```

Para iniciar em **produção**, gere o build uma vez após alterar o código e, em seguida, inicie o servidor:

```powershell
npm run build
npm start
```

Acesse `http://localhost:3000`. Para encerrar o servidor, pressione `Ctrl+C` no terminal.

O build verifica TypeScript; o projeto não possui lint configurado. A verificação específica dos filtros pode ser executada com `node --test tests/projects.test.mjs` em uma versão do Node.js que suporte importação direta de TypeScript.

## Conteúdo

- `lib/projects.ts` contém o catálogo tipado, os links opcionais, status, grupos e filtros. Os grupos seguem a ordem profissional, autônomo, pessoal e acadêmico; dentro deles, as datas conhecidas vêm primeiro. O campo `recent` identifica um projeto informado como mais recente sem inventar sua data. Antes de publicar, confira descrição, período, status, autorização de divulgação e links.
- `app/page.tsx` contém a página e sua interação; `components/` contém os componentes reutilizados.
- `public/images/projetos/v2/` contém imagens WebP. Para imagens por tema, o campo `image` recebe o caminho base sem `-light.webp` ou `-dark.webp`; para uma imagem igual nos dois temas, recebe o caminho completo com `.webp`.
- `app/layout.tsx`, `app/robots.ts` e `app/sitemap.ts` definem metadados e indexação. Ao mudar o endereço de produção, atualize-o nesses três arquivos.

## Imagens e cache

As imagens do catálogo são servidas diretamente como arquivos estáticos, com carregamento adiado e dimensões reservadas. Não sobrescreva arquivos nas pastas versionadas: seus caminhos têm cache público de um ano com `immutable`. Para alterar uma imagem, use uma nova pasta de versão, atualize o caminho no catálogo e adicione a regra de cache correspondente em `next.config.mjs`. A versão anterior é mantida para preservar seus endereços.

O HTML e os demais recursos usam as políticas padrão do Next.js e da hospedagem. Não há cache manual nem consulta ao GitHub para a contagem de projetos: o número exibido corresponde ao catálogo local. Após publicar, confira os cabeçalhos efetivos da hospedagem, pois podem diferir do servidor local.
