# 💰 Finance OS

> **Status do Projeto:** 🚧 Em Desenvolvimento

O **Finance OS** é uma aplicação web de gestão financeira completa e moderna, projetada para o controlo inteligente de receitas e despesas, acompanhamento em tempo real, automações de tarefas em background e relatórios analíticos auxiliados por IA.

---

## 🛠️ Tecnologias e Arquitetura

* **Framework:** Next.js (App Router)
* **Linguagem:** TypeScript
* **Estilização:** Tailwind CSS
* **Banco de Dados & ORM:** PostgreSQL com Prisma ORM
* **Validação:** Zod
* **Gráficos:** Recharts
* **Background Jobs & Realtime:** Trigger.dev e Pusher / SWR

---

## 🗄️ Modelagem do Banco de Dados (Prisma Schema)

O sistema foi arquitetado com uma base de dados relacional robusta, otimizada através de índices de performance para consultas rápidas de dashboard e gestão de contas.

* **`USER`**: Armazena as informações principais do utilizador (nome limitado a 50 caracteres, e-mail único e hash de senha). Relaciona-se com categorias, transações, orçamentos, scores financeiros, cards do dashboard, insights de IA e notificações.
* **`CATEGORY`**: Define as categorias de receitas e despesas (suporta 10 padrões do sistema e até 5 personalizadas por utilizador). Possui índice de performance `@@index([userId, type])`.
* **`TRANSACTION`**: Regista as movimentações financeiras com precisão decimal (`db.decimal(12,2)`), suportando múltiplos status (`PAID`, `PENDING`, `SCHEDULED`, `SCHEDULED_PAID`, `PLANNED`), recorrências (mensal, anual) e auto-relacionamento (`parentId`) para parcelas e repetições. Conta com índices compostos para otimização de dashboards e listagens de contas agendadas.
* **`BUDGET`**: Mapeia os limites de gastos orçados por categoria por mês/ano (`mm-yyyy`), garantindo restrição única por utilizador/categoria/mês.
* **`FINANCIAL_SCORE`**: Regista a pontuação de saúde financeira mensal do utilizador (de 0 a 100), dividida em sub-notas (receitas x despesas, aderência ao orçamento, investimentos e consistência de registos).
* **`USER_DASHCARD`**: Guarda a configuração dos cards personalizados do dashboard criados pelo utilizador (limite de 5 cards por utilizador, suportando tipos como `Summary`, `CATEGORY_PROGRESS` e `Meta`).
* **`AI_INSIGHT`**: Armazena relatórios de análise financeira e textos explicativos gerados por IA por período.
* **`NOTIFICATION`**: Sistema de alertas do utilizador (`ALERT`, `AI`, `BILLING`, `GOAL`) com suporte a limpeza automática baseada em data de expiração (`expiresAt`) e índices para contagem de não lidas.

---

## ⚙️ Regras de Negócio e Funções Utilitárias (`/utils`)

* **`calculateFinancialSummary`**:
  * Processa transações e calcula o total de entradas, total de saídas, contadores de registos e o balanço livre (`Entradas - Saídas`).
  * Suporta múltiplos modos (`CURRENT` para transações efetivadas e `SCHEDULED` para previsões e planeamentos).
* **`calculateCategoryExpenses`**:
  * Agrupa, soma e formata os gastos por categoria para alimentar o gráfico de Donut (`Recharts`) e as barras de progresso.
  * Inclui um algoritmo de geração de cores consistentes para categorias personalizadas.

---

## 🚀 Funcionalidades Implementadas

* **Dashboard Interativo (Modo Atual vs. Previsto):**
  * Alternância dinâmica de dados via parâmetros na URL (`tab`), sem necessidade de refresh completo da página.
  * Linha 1: Resumo financeiro com saldo livre e totais.
  * Linha 2: Analytics com gráficos de rosca por categoria e barras de progresso de gastos.
  * Linha 3: Cartões modulares de Entradas e Saídas com listagem detalhada.
* **Modais e Formulários Dinâmicos:**
  * Componentes modais sobrepostos com fundo em blur (`BackdropModal`) para criação rápida de transações e categorias.
  * Validação robusta de dados em tempo real utilizando schemas do **Zod**.
  * Input monetário customizado (`ValueInput`) com formatação automática de moeda (BRL).
  * Seletor de ícones dinâmico (`IconPicker`) para personalização de novas categorias.
* **Sistema de Notificações em Tempo Real:**
  * Sincronização e requisições automatizadas utilizando SWR e background jobs com Trigger.dev para limpeza de alertas expirados.
