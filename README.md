# Site de Evento de Aniversário com Tema Halloween

Este projeto é um site para um evento de aniversário com tema Halloween, permitindo que os convidados confirmem presença e vejam quem mais confirmou participação.

## technology stack

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

All shadcn/ui components have been downloaded under `@/components/ui`.

## File Structure

- `index.html` - HTML entry point
- `vite.config.ts` - Vite configuration file
- `tailwind.config.js` - Tailwind CSS configuration file
- `package.json` - NPM dependencies and scripts
- `src/app.tsx` - Root component of the project
- `src/main.tsx` - Project entry point
- `src/index.css` - Existing CSS configuration
- `src/pages/Index.tsx` - Home page logic

## Components

- All shadcn/ui components are pre-downloaded and available at `@/components/ui`

## Styling

- Add global styles to `src/index.css` or create new CSS files as needed
- Use Tailwind classes for styling components

## Development

- Import components from `@/components/ui` in your React components
- Customize the UI by modifying the Tailwind configuration

## Note

- The `@/` path alias points to the `src/` directory
- In your typescript code, don't re-export types that you're already importing

# Comandos

**Instalar Dependências**

```shell
pnpm i
```

**Adicionar Dependências**

```shell
pnpm add some_new_dependency
```

**Iniciar Servidor de Desenvolvimento**

```shell
pnpm run dev
```

**Construir para Produção**

```shell
pnpm run build
```

# Configuração do Baserow para Lista de Convidados Compartilhada

Este projeto utiliza o Baserow como backend para compartilhar a lista de convidados entre todos os usuários. Siga estas etapas para configurar:

1. **Crie uma conta no Baserow**
   - Acesse [baserow.io](https://baserow.io/) e crie uma conta gratuita

2. **Crie uma nova base de dados**
   - Após fazer login, crie uma nova base de dados

3. **Crie uma tabela para os convidados**
   - Crie uma tabela chamada "Convidados" com as seguintes colunas:
     - `name` (texto)
     - `socialLink` (texto)
     - `platform` (texto)
     - `profileImage` (texto)

4. **Obtenha um token de API**
   - Vá para as configurações da sua conta
   - Crie um novo token de API com permissões para ler e escrever na sua base de dados

5. **Obtenha o ID da tabela**
   - O ID da tabela pode ser encontrado na URL quando você está visualizando a tabela
   - Exemplo: `https://baserow.io/database/123/table/456` (456 é o ID da tabela)

6. **Configure as variáveis de ambiente**
   - Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`
   - Preencha as variáveis com seus dados do Baserow:
     ```
     VITE_BASEROW_API_URL=https://api.baserow.io
     VITE_BASEROW_API_TOKEN=seu_token_aqui
     VITE_BASEROW_TABLE_ID=seu_id_de_tabela_aqui
     ```

7. **Reinicie o servidor de desenvolvimento**
   - Após configurar as variáveis de ambiente, reinicie o servidor para aplicar as mudanças

Com essa configuração, a lista de convidados será automaticamente sincronizada entre todos os usuários do site.
