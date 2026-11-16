# Pokédex

Aplicação web acadêmica para consultar Pokémon pela PokéAPI, explorar seus detalhes e montar uma equipe local de até seis integrantes. O projeto é desenvolvido como parte da disciplina Programação Web da Universidade Estadual do Piauí (UESPI).

## Integrantes

- Renan Albuquerque Santos
- [Nome do segundo integrante, se houver]

## Funcionalidades

- Listagem paginada de Pokémon, com até 20 resultados por página.
- Filtro da listagem por tipo.
- Consulta dos atributos, tipos e cadeia evolutiva de cada Pokémon.
- Navegação entre os Pokémon da cadeia evolutiva.
- Montagem de uma equipe com até seis Pokémon.
- Edição do apelido de um Pokémon da equipe e remoção de membros.
- Persistência da equipe em um banco de dados SQLite local.

## API externa

A aplicação utiliza a [PokéAPI](https://pokeapi.co/), versão 2, cuja base é `https://pokeapi.co/api/v2`. A documentação está disponível em [pokeapi.co/docs/v2](https://pokeapi.co/docs/v2).

As chamadas à PokéAPI são feitas exclusivamente pelo backend. A listagem enriquece os resultados com número, imagem e tipos; os detalhes combinam dados do Pokémon, da espécie e da cadeia evolutiva. As requisições de enriquecimento da listagem são realizadas concorrentemente, e as respostas externas são configuradas para revalidação em cache.

## Endpoints do backend

O frontend obtém os dados por requisições HTTP aos endpoints internos da aplicação. Os parâmetros `page` e `type` são usados na listagem; `page` começa em `1` e `type` é opcional.

| Método | Rota | Finalidade |
|---|---|---|
| `GET` | `/api/pokemon?page=1&type=fire` | Listar Pokémon paginados e, opcionalmente, filtrados por tipo |
| `GET` | `/api/pokemon/[idOrName]` | Consultar detalhes de um Pokémon e sua cadeia evolutiva |
| `GET` | `/api/types` | Listar os tipos disponíveis |
| `GET` | `/api/team` | Listar os membros da equipe |
| `POST` | `/api/team` | Adicionar um Pokémon à equipe |
| `PATCH` | `/api/team/[id]` | Atualizar o apelido de um membro, usando o ID local do registro |
| `DELETE` | `/api/team/[id]` | Remover um membro, usando o ID local do registro |

O endpoint de listagem limita cada página a 20 itens. A equipe não aceita Pokémon duplicados nem mais de seis membros. O apelido é opcional e pode ter até 30 caracteres. Erros são retornados em JSON no formato `{ "error": "Mensagem descritiva em português" }`.

## Banco de dados

O banco SQLite é criado automaticamente pelo backend no arquivo `data/pokedex.db`. Ele armazena apenas os dados necessários para representar a equipe criada pelo usuário; os dados completos da PokéAPI não são copiados para o banco. O arquivo local do banco não deve ser versionado.

A tabela `team` contém:

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | `INTEGER` | Identificador local do registro |
| `pokemon_id` | `INTEGER` | Número do Pokémon na PokéAPI; não pode se repetir |
| `name` | `TEXT` | Nome do Pokémon |
| `image_url` | `TEXT` | URL da imagem do Pokémon |
| `nickname` | `TEXT` | Apelido opcional de até 30 caracteres |
| `created_at` | `TEXT` | Data de inclusão, preenchida pelo backend |

Na criação inicial do banco são cadastrados três Pokémon válidos da PokéAPI: Bulbasaur (#1), Charmander (#4) e Squirtle (#7). Os registros incluem apelidos preenchidos e vazios para demonstrar os dois casos. O banco usa o modo de journal padrão do SQLite (`DELETE`), sem WAL. Para restaurar os dados iniciais, remova `data/pokedex.db` e reinicie a aplicação.

## Tecnologias

- Next.js com App Router e Route Handlers.
- React e TypeScript em modo estrito.
- CSS.
- SQLite com `better-sqlite3`.
- `fetch` para requisições HTTP.

## Requisitos

- Node.js 22.23.1.
- npm.

## Como executar

Instale as dependências e inicie o servidor de desenvolvimento:

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador. Na primeira execução, o backend cria o banco e os registros iniciais automaticamente.
