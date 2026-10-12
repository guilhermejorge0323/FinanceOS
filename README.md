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

Abaixo encontra-se a tabela detalhada com todas as entidades, campos, restrições e relacionamentos modelados no Prisma:

| Tabela / Modelo | Campo | Tipo / Restrições | Descrição e Relacionamentos |
| :--- | :--- | :--- | :--- |
| **`USER`** | `name` | String (limite 50 caracteres) | Nome do utilizador. |
| | `email` | String (Único) | E-mail de autenticação único no sistema. |
| | `passwordHash` | String (Mapeado para `password_hash`) | Hash seguro da senha. |
| | *Relacionamentos* | - | Um utilizador possui múltiplas categorias, transações, budgets, scores, cartões de dashboard, insights de IA e notificações. |
| **`CATEGORY`** | `id` | Int (Auto-incremento) | Identificador único da categoria. |
| | `userId` | ID Relacionado | Utilizador dono da categoria (1 para 1). |
| | `name` | String (limite 18 caracteres) | Nome da categoria. |
| | `type` | ENUM (`INCOME`, `OUTCOME`) | Tipo da categoria (Entrada ou Saída). |
| | `icon` | String | Nome do ícone referenciado no objeto de ícones do sistema. |
| | `isCustom` | Boolean (Padrão: `false`) | Define se foi criada pelo utilizador ou se é padrão do sistema. |
| | *Índices* | `@@index([userId, type])` | Otimiza buscas filtrando por utilizador e tipo simultaneamente. |
| **`TRANSACTION`** | `userId` | ID Relacionado | Utilizador dono da transação. |
| | `categoryId` | ID Relacionado | Categoria associada à transação. |
| | `description` | String (limite 100 caracteres) | Descrição da movimentação financeira. |
| | `amount` | Decimal (`db.Decimal(12,2)`) | Valor monetário exato (até 12 dígitos, 2 decimais). |
| | `type` | ENUM (`INCOME`, `OUTCOME`) | Tipo da transação. |
| | `status` | ENUM (`PAID`, `PENDING`, `SCHEDULED`, `SCHEDULED_PAID`, `PLANNED`) | Status atual (Padrão: `PAID`). |
| | `date` | DateTime | Data de criação/registo da transação. |
| | `dueDate` | DateTime (Opcional) | Data de vencimento para contas agendadas. |
| | `recurrence` | ENUM (`NONE`, `MONTHLY`, `YEARLY`) | Padrão de repetição (Padrão: `NONE`). |
| | `parentId` | ID Relacionado (Opcional) | Auto-relacionamento para transações recorrentes/filhas. |
| | *Índices* | `@@index([userId, date, type])`<br>`@@index([userId, status, dueDate])` | Otimiza listagens de dashboards por período e consultas de contas agendadas/a vencer. |
| **`BUDGET`** | `userId` / `categoryId` | IDs Relacionados | Dono e categoria do orçamento planeado. |
| | `amountAllocated` | Decimal | Valor financeiro alocado para o teto de gastos. |
| | `monthYear` | String (`mm-yyyy`) | Mês de referência do orçamento. |
| | *Restrições* | `@@unique([userId, categoryId, monthYear])` | Impede duplicação de budgets para a mesma categoria no mesmo mês. |
| **`FINANCIAL_SCORE`**| `userId` | ID Relacionado | Utilizador avaliado. |
| | `totalScore` | Int (0 a 100) | Pontuação geral da saúde financeira mensal. |
| | Sub-notas | `incomeVsOutcomeScore`, `planningAdherenceScore`, `investmentScore`, `historyConsistencyScore` | Métricas detalhadas de entradas vs saídas, aderência a planos, investimentos e consistência. |
| | `monthYear` | String | Mês e ano de referência do cálculo. |
| | *Restrições* | `@@unique([userId, monthYear])` | Garante apenas um score por utilizador por mês. |
| **`USER_DASHCARD`**| `userId` | ID Relacionado | Dono do card personalizado (Máximo 5 por utilizador). |
| | `title` / `cardType` | String, ENUM (`Summary`, `CATEGORY_PROGRESS`, `Meta`) | Configuração visual e tipo do card no dashboard. |
| | `targetAmount?` / `filterCategoryId?` | Campos Opcionales | Metas de valores ou filtros por categoria específica. |
| | `positionIndex` | Int | Ordem de exibição na grelha do dashboard. |
| **`AI_INSIGHT`** | `userId` | ID Relacionado | Utilizador associado ao relatório. |
| | `monthYear` / `insightType` | String, ENUM | Período e classificação da análise gerada por IA. |
| | `title` / `content` | String, Text | Título e conteúdo explicativo da inteligência artificial. |
| **`NOTIFICATION`**| `userId` | ID Relacionado | Destinatário da notificação. |
| | `title` / `type` | String, ENUM (`ALERT`, `AI`, `BILLING`, `GOAL`) | Detalhes do alerta do sistema. |
| | `read` / `expiresAt` | Boolean, DateTime | Estado de leitura e data limite para exclusão automática. |
| | *Índices* | `@@index([userId, expiresAt])`<br>`@@index([userId, read])` | Otimiza a limpeza por background jobs e contagem de mensagens não lidas. |

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


