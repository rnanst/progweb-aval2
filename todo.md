---
criação: 2026-11-20
links:
  - https://www.npmjs.com/package/better-sqlite3
  - https://pokeapi.co/docs/v2
obsidianUIMode: preview
---
## Contratos e infraestrutura

- [x] Confirmar `strict: true` no `tsconfig.json`.
- [x] Definir os formatos JSON de sucesso para Pokémon, tipos e membros da equipe; manter os tipos da API externa separados dos tipos da aplicação.
- [x] Definir parâmetros da listagem: página, tamanho máximo de 20 itens e tipo opcional; documentar esses nomes no README.
- [x] Criar um helper de resposta de erro no formato `{ "error": "..." }` e usar mensagens em português.
- [x] Instalar `better-sqlite3` e os tipos necessários; configurar o projeto para executar os handlers que usam SQLite no runtime Node.js.
- [ ] Adicionar scripts de verificação necessários, incluindo checagem de tipos, sem substituir os scripts existentes.

## Cliente da PokéAPI

- [ ] Implementar um cliente compartilhado para `https://pokeapi.co/api/v2`, com timeout e validação de `response.ok`.
- [ ] Configurar cache/revalidação das consultas externas conforme a recomendação da PokéAPI.
- [ ] Distinguir Pokémon ou tipo inexistente (`404`) de indisponibilidade/erro da PokéAPI (`502`).
- [ ] Converter respostas externas para os contratos próprios da aplicação; não retornar objetos inteiros da PokéAPI.

## Consulta de Pokémon e tipos

- [x] Substituir a implementação temporária de `GET /api/pokemon` em `src/app/api/pokemon/route.ts` pela consulta real à PokéAPI.
- [ ] Validar query strings: página inteira positiva, tipo não vazio e tamanho não superior a 20; responder `400` para valores inválidos.
- [x] Sem filtro, usar a listagem paginada da PokéAPI; com filtro, consultar o recurso de tipo e paginar os Pokémon daquele tipo.
- [ ] Enriquecer todos os resultados da página com número, URL da imagem e tipos, buscando detalhes concorrentemente com `Promise.all`.
- [x] Responder `200` com metadados de paginação e lista vazia quando não houver resultados.
- [ ] Implementar `GET /api/types` em `src/app/api/types/route.ts`, retornando somente os dados necessários para escolher um filtro.
- [ ] Finalizar `GET /api/pokemon/[idOrName]`: validar identificador/nome e verificar a resposta da PokéAPI antes de ler o JSON.
- [x] No detalhe, combinar dados do Pokémon, da espécie e da cadeia evolutiva; retornar atributos, tipos e cadeia como nomes em ordem evolutiva.
- [ ] Tratar corretamente respostas inválidas e falhas em qualquer etapa do detalhe, sem transformar Pokémon inexistente em erro `500`.

## Banco SQLite e dados iniciais

- [ ] Criar `src/lib/db.ts` para abrir/criar `data/app.db`, criando o diretório se necessário.
- [ ] Criar a tabela `team` com `id`, `pokemon_id`, `name`, `image_url`, `nickname` e `created_at`; tornar `pokemon_id` único.
- [ ] Manter o journal SQLite em `DELETE`; não habilitar WAL.
- [ ] Usar apenas prepared statements para todas as operações SQL.
- [ ] Definir em um único local de código de 3 a 10 membros iniciais com IDs válidos da PokéAPI e variação de apelido preenchido/vazio.
- [ ] Inserir os dados iniciais somente na criação do banco; confirmar que reiniciar o servidor não duplica registros.
- [ ] Ignorar `data/app.db` e arquivos auxiliares de banco no `.gitignore`.

## CRUD da equipe

- [ ] Implementar `GET /api/team` para listar os campos da equipe, ordenados de forma previsível.
- [ ] Implementar `POST /api/team`: validar `pokemon_id`, consultar a PokéAPI e gravar `pokemon_id`, `name`, `image_url`, `nickname` e `created_at`.
- [ ] Retornar `201` na criação; rejeitar Pokémon repetido com `409` e equipe com seis membros com `409`.
- [ ] Fazer checagem de limite e inserção em uma transação para evitar exceder seis membros.
- [ ] Implementar `PATCH /api/team/[id]`: usar o `id` local, aceitar somente `nickname`, permitir valor vazio e limitar a 30 caracteres.
- [ ] Responder `400` para corpo inválido, campos extras ou apelido acima do limite; responder `404` quando o ID local não existir.
- [ ] Implementar `DELETE /api/team/[id]`: responder `204` ao remover e `404` quando o registro não existir.

## Integração e critérios de conclusão

- [ ] Garantir que os handlers retornem apenas JSON, exceto a remoção bem-sucedida (`204` sem corpo).
- [ ] Revisar os status HTTP: `200`, `201`, `204`, `400`, `404`, `409`, `502` e `500` conforme cada cenário.
- [ ] Testar listagem paginada, filtro por tipo, detalhe e cadeia evolutiva, incluindo Pokémon inexistente e falha externa.
- [ ] Testar CRUD da equipe, duplicidade, limite de seis, validação do apelido e IDs locais inexistentes.
- [ ] Remover o arquivo do banco em um teste e confirmar criação automática, 3–10 registros iniciais, ausência de duplicatas após reinício e journal `DELETE`.
- [ ] Executar lint, checagem TypeScript e build; corrigir erros sem introduzir `any` injustificado.
- [ ] Documentar no `README.md` os endpoints, parâmetros, exemplos de resposta, schema, localização do banco e conteúdo dos registros iniciais.
