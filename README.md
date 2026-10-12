# 💰 Finance OS

> **Status do Projeto:** 🚧 Em Desenvolvimento

O **Finance OS** é uma aplicação web de gestão financeira completa, moderna e altamente escalável, projetada para o controlo inteligente de receitas e despesas, acompanhamento em tempo real através de WebSockets, automações de tarefas em background e relatórios analíticos auxiliados por IA.

---

## 🛠️ Tecnologias e Arquitetura

* **Framework:** Next.js (App Router - Server & Client Components)
* **Linguagem:** TypeScript
* **Estilização:** Tailwind CSS
* **Banco de Dados & ORM:** PostgreSQL com Prisma ORM
* **Validação:** Zod
* **Gráficos:** Recharts (Donut Charts e Progress Bars)
* **Background Jobs & Realtime:** Trigger.dev e Pusher / SWR

---

## 🗄️ Esquema da Base de Dados (Prisma Schema)

Abaixo encontra-se a tabela detalhada com todas as entidades, campos, tipos e restrições fiéis ao schema implementado:

| Tabela / Modelo | Campo | Tipo / Restrições | Descrição e Relacionamentos |
| :--- | :--- | :--- | :--- |
| **`User`** *(users)* | `id` | String (`@id`, cuid) | Identificador único do utilizador. |
| | `name` | String (`@db.VarChar(50)`) | Nome do utilizador. |
| | `email` | String (`@unique`) | E-mail único no sistema. |
| | `passwordHash` | String (`@map("password_hash")`) | Hash seguro da senha. |
| | `createdAt` | DateTime | Data de criação do registo. |
| | *Relações* | - | Liga-se a `Category`, `Transaction`, `Budget`, `FinancialScore`, `UserDashCard`, `AiInsight` e `Notification`. |
| **`Category`** *(categories)* | `id` | Int (`@id`, autoincrement) | Identificador único da categoria. |
| | `userId` | String (`@map("user_id")`) | Chave estrangeira para o utilizador dono. |
| | `name` | String (`@db.VarChar(18)`) | Nome da categoria. |
| | `type` | `TransactionType` (Enum) | Tipo da categoria (`INCOME` ou `OUTCOME`). |
| | `icon` | String (`@db.VarChar(30)`) | Nome do ícone referenciado no objeto. |
| | `isCustom` | Boolean (Padrão: `false`) | Define se é personalizada pelo utilizador. |
| | *Índices* | `@@index([userId, type])` | Otimiza buscas por utilizador e tipo. |
| **`Transaction`** *(transactions)* | `id` | String (`@id`, cuid) | Identificador único da transação. |
| | `userId` / `categoryId` | String, Int | Chaves estrangeiras de utilizador e categoria. |
| | `name` | String (`@db.VarChar(100)`) | Descrição/Nome da transação. |
| | `amount` | Decimal (`@db.Decimal(12, 2)`) | Valor monetário exato. |
| | `type` | `TransactionType` (Enum) | Tipo de transação (`INCOME` ou `OUTCOME`). |
| | `status` | `TransactionStatus` (Enum) | Status (`PAID`, `PENDING`, `SCHEDULED`, `SCHEDULED_PAID`, `PLANNED`). |
| | `date` / `dueDate` | DateTime? (`@db.Date`) | Data da transação e data de vencimento opcional. |
| | `recurrence` | `RecurrenceOption` (Enum) | Repetição (`NONE`, `MONTHLY`, `YEARLY`). |
| | `parentId` | String? (`@map("parent_id")`) | Auto-relacionamento para transações recorrentes. |
| | *Índices* | `@@index([userId, date, type])`<br>`@@index([userId, status, dueDate])` | Otimiza listagens de dashboard e contas a vencer/agendadas. |
| **`Budget`** *(budgets)* | `id` | String (`@id`, cuid) | Identificador único do orçamento. |
| | `userId` / `categoryId` | String, Int | Utilizador e categoria associados. |
| | `amountAllocated` | Decimal (`@db.Decimal(12, 2)`) | Valor alocado para o teto de gastos. |
| | `monthYear` | String (`@map("month_year")`) | Mês e ano de referência. |
| | *Restrições* | `@@unique([userId, categoryId, monthYear])` | Evita duplicados para a mesma categoria no mesmo mês. |
| **`FinancialScore`** *(financial_scores)* | `id` | String (`@id`, cuid) | Identificador único do score. |
| | `userId` | String | Utilizador avaliado. |
| | `totalScore` | Int | Pontuação geral (0 a 100). |
| | Sub-notas | `incomeVsOutcomeScore`, `planningAdherenceScore`, `investmentScore`, `historyConsistencyScore` | Sub-métricas detalhadas de saúde financeira (padrão `0`). |
| | `monthYear` | String | Mês e ano de referência (ex: `'08-2026'`). |
| | *Restrições* | `@@unique([userId, monthYear])` | Garante apenas um score por utilizador por mês. |
| **`UserDashCard`** *(user_dash_cards)* | `id` | String (`@id`, cuid) | Identificador único do card. |
| | `userId` | String | Utilizador dono do card personalizado. |
| | `title` / `cardType` | String, String | Título e tipo do card no dashboard. |
| | `targetAmount?` | Decimal? (`@db.Decimal(12, 2)`) | Valor de meta opcional. |
| | `filterCategoryId?` | Int? | Categoria associada opcional. |
| | `positionIndex` | Int | Posição de ordenação na grelha. |
| **`AiInsight`** *(ai_insights)* | `id` | String (`@id`, cuid) | Identificador único do relatório de IA. |
| | `userId` / `monthYear` | String, String | Utilizador e período da análise. |
| | `insightType` / `title` | String, String | Tipo e título do insight gerado. |
| | `content` | String (`@db.Text`) | Conteúdo descritivo detalhado gerado por IA. |
| **`Notification`** *(notifications)* | `id` | String (`@id`, cuid) | Identificador único da notificação. |
| | `userId` | String | Destinatário da notificação. |
| | `title` / `type` | String, `NotificationType` (Enum) | Título e tipo (`ALERT`, `AI`, `BILLING`, `GOAL`). |
| | `read` / `expiresAt` | Boolean, DateTime? | Estado de leitura e data de expiração. |
| | *Índices* | `@@index([userId, expiresAt])`<br>`@@index([userId, read])` | Otimiza limpeza automática por background jobs e contagem de não lidas. |
---

## ⚙️ Funções Utilitárias e Regras de Negócio (`/utils`)

* **`calculateFinancialSummary`**:
  * Processa o array de transações filtrando de acordo com o modo ativo (`CURRENT` para efetivadas via `PAID`/`SCHEDULED_PAID` ou `SCHEDULED` para previsões).
  * Retorna o saldo livre (`Total de Entradas - Total de Saídas`), bem como os somatórios e contadores individuais de receitas e despesas.
* **`calculateCategoryExpenses`**:
  * Agrupa e soma os gastos por categoria de saída (`OUTCOME`), calculando as respetivas percentagens.
  * Integra um algoritmo de cores consistentes (`getConsistentColor`) para distinguir tanto as categorias padrão do sistema quanto as personalizadas pelo utilizador.

---

## 🚀 Arquitetura de Rotas e Componentes

* **`/` (Landing Page):** Página de apresentação institucional do sistema.
* **`/home` (Dashboard Principal):**
  * **Layout & Navegação:** Composto por uma `<Sidebar />` responsiva com overlay mobile e um `<Header />` dinâmico sincronizado com a API de datas.
  * **Sistema de Notificações em Tempo Real:** Sincronizado via SWR com revalidação a cada 10s e rotinas automatizadas no Trigger.dev para limpeza de alertas expirados.
  * **Abas Dinâmicas (`HomeTabContent`):** Contexto global para alternância fluida entre as seções de Dashboard, Transações e Insights de IA sem refresh total da página (`router.push` com parâmetros de URL).
  * **Linha 1 (Financial Summary):** Exibição do saldo livre em destaque ao lado dos totais de entradas e saídas.
  * **Linha 2 (Analytics & Gráficos):** Integração do `<CategoryCardDashboard />` contendo o gráfico de rosca interativo (`CategoryDonutChart`) construído com Recharts e listas de barras de progresso (`CategoryProgressBarList`).
  * **Linha 3 (Transaction Cards & Modais):** Cartões modulares de entradas e saídas acoplados a modais de criação (`CardCreateHome`, `TransactionForm`, `CategoryForm`, `ValueInput` monetário e `IconPicker`).


