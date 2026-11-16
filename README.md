O **MusicVerse** é uma aplicação web de descoberta musical desenvolvida como atividade acadêmica de **consumo de API pública com React e Next.js**.

O sistema permite pesquisar músicas, álbuns e artistas, consultar informações por identificadores únicos e reproduzir prévias de áudio disponibilizadas pelo iTunes.

## Objetivo da atividade

Demonstrar o consumo de uma API pública por meio de requisições HTTP, a apresentação de dados JSON na interface e a **consulta de registros específicos por ID**, utilizando rotas dinâmicas do Next.js.

## Tecnologias utilizadas

- **Next.js 16** — Framework React e roteamento pelo App Router.
- **React 19** — Componentes e gerenciamento de estado.
- **JavaScript** — Lógica da aplicação.
- **Tailwind CSS 4** — Estilização e responsividade.
- **Axios** — Requisições HTTP.
- **Lucide React** — Ícones da interface.

## API pública utilizada

A aplicação consome a **iTunes Search API**, disponibilizada pela Apple.

- **Documentação:** https://performance-partners.apple.com/search-api
- **URL base:** `https://itunes.apple.com`
- **Formato das respostas:** JSON
- **Método HTTP utilizado:** GET

| Endpoint | Finalidade |
|---|---|
| `/search` | Pesquisar músicas, álbuns e artistas por texto. |
| `/lookup` | Consultar um álbum ou artista pelo ID e recuperar informações relacionadas. |

### Exemplos de requisições

**Buscar músicas pelo nome:**

```http
GET https://itunes.apple.com/search?term=Bruno%20Mars&media=music&entity=song&country=BR&limit=15
```

**Buscar álbuns:**

```http
GET https://itunes.apple.com/search?term=Coldplay&media=music&entity=album&country=BR&limit=15
```

**Buscar artistas:**

```http
GET https://itunes.apple.com/search?term=Adele&media=music&entity=musicArtist&country=BR&limit=10
```

**Consultar um álbum por ID e obter suas faixas:**

```http
GET https://itunes.apple.com/lookup?id=ID_DO_ALBUM&entity=song&country=BR
```

**Consultar os álbuns de um artista por ID:**

```http
GET https://itunes.apple.com/lookup?id=ID_DO_ARTISTA&entity=album&country=BR&limit=50
```

Os valores `ID_DO_ALBUM` e `ID_DO_ARTISTA` são substituídos pelos identificadores retornados pela API.

## Funcionalidades implementadas

### 1. Página inicial — `/`

- Exibe uma seleção de músicas, álbuns e artistas obtidos da API.
- Apresenta um banner de destaque e cards de gêneros musicais.
- Permite selecionar músicas para ouvir suas prévias no player lateral.
- Permite abrir páginas de detalhes de álbuns e artistas.

> **Observação:** o título "Músicas mais ouvidas" é um título visual. Os dados vêm de pesquisas por termos musicais e não representam um ranking oficial de popularidade.

### 2. Busca — `/buscar`

- Pesquisa por músicas, álbuns e artistas usando a barra da Navbar.
- Aceita a pesquisa pelo Enter ou pelo botão de lupa.
- Recebe o termo na URL, por exemplo: `/buscar?q=Coldplay`.
- Organiza os resultados por categoria.
- Permite reproduzir prévias ou abrir páginas de detalhes.
- Apresenta mensagens de carregamento, erro e ausência de resultados.

### 3. Listagem de artistas — `/artista`

- Apresenta uma seleção de artistas pesquisados na API.
- Utiliza capas de álbuns como imagens ilustrativas dos cards, quando disponíveis.
- Permite acessar a página individual de cada artista.

### 4. Detalhes do artista — `/artista/[id]`

- Consulta um artista pelo identificador `artistId`.
- Exibe nome, gênero musical e ID do artista.
- Lista os álbuns encontrados na consulta à API.
- Permite clicar em um álbum para acessar seus detalhes.

### 5. Detalhes do álbum — `/album/[id]`

- Consulta um álbum pelo identificador `collectionId`.
- Exibe capa, nome, artista, gênero, data de lançamento e ID.
- Apresenta a quantidade de faixas e a lista de músicas retornadas pela API.
- Permite reproduzir prévias das faixas disponíveis.

### 6. Player de áudio

- Reproduz prévias de músicas retornadas pela API, quando disponíveis.
- Possui reprodução, pausa, controle de progresso, repetição e botão para fechar.
- Não reproduz músicas completas: o áudio depende das prévias disponibilizadas pelo iTunes.

## Funcionalidades não implementadas

Alguns elementos fazem parte da interface, mas ainda não possuem funcionalidade completa:

- **Favoritos:** o coração do player muda visualmente, mas não salva músicas permanentemente. A seção Favoritos da Sidebar não possui página implementada.
- **Playlists:** as opções e os nomes de playlists aparecem na Sidebar, mas suas páginas não estão implementadas.
- **Filtros e cards de gêneros:** são elementos visuais e não filtram os resultados ao clicar.
- **Notificações:** botão visual sem ação implementada.
- **Controles de aleatório, anterior e próxima música:** exibidos no player, porém desabilitados.

Essas funcionalidades não são necessárias para o objetivo principal da atividade, que é o consumo da API pública e a consulta por ID.

## Estrutura do projeto

```text
atv2-consumo-api-react-next-main/
├── README.md
└── musicverse/
    ├── package.json
    ├── package-lock.json
    ├── next.config.mjs
    ├── eslint.config.mjs
    ├── jsconfig.json
    ├── README.md
    └── src/
        ├── app/
        │   ├── page.js
        │   ├── layout.js
        │   ├── globals.css
        │   ├── favicon.ico
        │   ├── buscar/
        │   │   └── page.js
        │   ├── artista/
        │   │   ├── page.js
        │   │   └── [id]/
        │   │       └── page.js
        │   └── album/
        │       └── [id]/
        │           └── page.js
        ├── components/
        │   ├── Banner.jsx
        │   ├── CardAlbum.jsx
        │   ├── CardArtista.jsx
        │   ├── CardGenero.jsx
        │   ├── CardMusicaHome.jsx
        │   ├── FiltroGenero.jsx
        │   ├── ItemSidebar.jsx
        │   ├── Navbar.jsx
        │   ├── Player.jsx
        │   └── Sidebar.jsx
        ├── services/
        │   └── itunes.js
        └── assets/
            ├── bruno.png
            ├── hiphop.svg
            ├── pop.png
            ├── pop.svg
            ├── rock.svg
            ├── sertanejo.png
            └── sertanejo.svg
```

O arquivo `src/services/itunes.js` centraliza as requisições à API.

Os componentes reutilizáveis ficam em `src/components`, enquanto as páginas e rotas dinâmicas ficam em `src/app`.

## Como executar o projeto

### Pré-requisitos

- Node.js 20.9 ou superior.
- npm.
- Conexão com a internet para consultar a API do iTunes.

### 1. Acessar a pasta da aplicação

```bash
cd musicverse
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

### 4. Abrir no navegador

Acesse:

http://localhost:3000

### Verificar a compilação

```bash
npm run build
```

Para iniciar a versão de produção após a compilação:

```bash
npm run start
```

## Considerações finais

O MusicVerse demonstra o consumo de uma API pública em uma aplicação desenvolvida com React e Next.js, incluindo requisições GET, tratamento de respostas JSON, pesquisa textual e **consultas por identificadores únicos (`collectionId` e `artistId`)**.

A aplicação utiliza diretamente a iTunes Search API, sem backend próprio ou banco de dados.

O projeto atende ao objetivo acadêmico de demonstrar o consumo de API pública e a consulta de registros por ID.
