# Churrascaria Querência - Sistema de Controle de Restaurante

Um sistema completo de gerenciamento de restaurante desenvolvido em **JavaScript Vanilla** (sem frameworks ou bibliotecas externas).

## 📌 Características Principais

✅ **CRUD de Produtos** - Adicionar, editar, remover, pesquisar  
✅ **CRUD de Mesas** - Gerenciar mesas com status  
✅ **Sistema de Pedidos** - Criar, editar, finalizar pedidos  
✅ **Fechamento de Contas** - Calcular troco, registrar vendas  
✅ **Relatórios** - Faturamento, produtos vendidos, análises  
✅ **LocalStorage** - Persistência de dados  
✅ **Interface Premium** - Dark theme com cores quentes  
✅ **Responsivo** - Funciona em desktop e mobile  

---

## 🎯 O que o Sistema Faz

### 📦 Gerenciamento de Produtos
- Cadastrar novo produto (nome, categoria, preço, descrição)
- Editar produtos existentes
- Apagar produtos do catálogo
- Visualizar lista completa de produtos

### 🪑 Gerenciamento de Mesas
- Cadastrar novas mesas com número, quantidade de lugares e status
- Editar informações da mesa
- Apagar mesas do sistema
- Controlar status das mesas (Livre, Ocupada, Reservada)
- Visualizar todas as mesas em tabela com status visual

### 📋 Sistema de Pedidos
- Selecionar mesa e abrir novo pedido
- Escolher produtos e adicionar ao pedido com quantidade
- Remover itens do pedido
- Visualizar resumo em tempo real com cálculo automático do total
- Atualizar status da mesa conforme o pedido está aberto ou fechado
- Finalizar venda com múltiplas formas de pagamento (Dinheiro, Pix, Cartão)
- Calcular troco automaticamente
- Registrar todas as vendas realizadas

### 📊 Relatórios e Análises
- Visualizar total de produtos, mesas e vendas
- Acompanhar status de todas as mesas
- Ver produto mais vendido
- Analisar formas de pagamento utilizadas
- Calcular faturamento total e ticket médio

### 💾 Armazenamento de Dados
- Salvar automaticamente todos os dados no navegador
- Carregar dados ao abrir o sistema
- Exportar dados para backup em JSON
- Limpar todos os dados quando necessário

---

## 🏗️ Como o Sistema Funciona

### 👤 Experiência do Usuário
- **Simples e Intuitiva**: Botões claros, mensagens em português
- **Feedback Imediato**: Alertas confirmam cada ação
- **Visual Limpo**: Dark theme sofisticado, fácil para os olhos
- **Sem Complicações**: Interface organizada, formulários objetivos

### ⚡ Desempenho
- **Totalmente Offline**: Funciona 100% no navegador, sem dependência de servidor
- **Rápido**: Operações instantâneas no LocalStorage
- **Leve**: Sem frameworks pesados, apenas JavaScript puro

### 🔒 Dados e Confiabilidade
- **Persistente**: Dados salvos automaticamente após cada operação
- **Seguro**: Armazenado no navegador do usuário, dados nunca saem do computador
- **Validado**: Campos obrigatórios são checados antes de salvar
- **Recuperável**: Pode exportar dados em qualquer momento

### 🌍 Compatibilidade
- **Funciona em**: Chrome, Firefox, Safari, Edge.
- **Desktop e Mobile**: Responsivo, adapta-se a qualquer tela.
- **Padrão Web**: Usa apenas HTML5, CSS3 e JavaScript.

### 📱 Características Técnicas
- **LocalStorage**: ~5-10MB de espaço para dados
- **Sem Login**: Acesso direto, sem autenticação
- **Sem Banco de Dados**: Tudo funciona no navegador
- **Linguagem**: 100% em JavaScript Vanilla

---

## 📂 Estrutura do Projeto

```
proj-prova-1/
├── index.html                         # Página inicial/Dashboard
├── mainpage/
│   ├── js/
│   │   └── script.js                 # Lógica principal do sistema
│   └── css/
│       └── style.css                 # Estilos premium
│
├── produtos/
│   ├── index.html                    # Página de gerenciamento de produtos
│   ├── js/
│   │   └── script.js                 # Lógica de produtos
│   └── css/
│       └── style.css                 # Estilos de produtos
│
├── mesas/
│   ├── index.html                    # Página de gerenciamento de mesas
│   ├── js/
│   │   └── script.js                 # Lógica de mesas
│   └── css/
│       └── style.css                 # Estilos de mesas
│
├── pedidos/
│   ├── index.html                    # Página de controle de pedidos
│   ├── js/
│   │   └── script.js                 # Lógica de pedidos
│   └── css/
│       └── style.css                 # Estilos de pedidos
│
├── src/
│   └── logo.jpeg                     # Logo da Churrascaria
│
├── SCRIPT_DOCUMENTACAO.md             # Documentação das funções
├── EXEMPLOS_PRATICOS.js              # Exemplos de uso
└── README.md                         # Este arquivo
```

## 🚀 Como Começar

### 1️⃣ Abrir o Projeto
**Acesse por esse link!**
https://cris-flores12.github.io/proj-prova/

### 2️⃣ Navegar no Sistema
- **Início**: Dashboard com visão geral
- **Produtos**: Gerenciar cardápio
- **Mesas**: Controlar mesas do restaurante
- **Pedidos**: Registrar vendas
- **Relatórios**: Ver faturamento e análises

### 3️⃣ Testar Funcionalidades (Opcional)

Abra o Console do navegador (F12) e execute:

```javascript
// Rodar testes automáticos
testarSistema();

// Ver relatórios no console
exibirRelatorios();

// Exportar dados (faz download de arquivo JSON)
exportarDados();
```

## 📖 Documentação Completa

Consulte **SCRIPT_DOCUMENTACAO.md** para documentação detalhada de todas as funções.

## 💾 Como os Dados São Salvos

Todos os dados são salvos automaticamente no **LocalStorage** do navegador:

- **Navegador**: Chrome, Firefox, Safari, Edge
- **Tipo de Armazenamento**: LocalStorage
- **Chave**: `sistemaChurcascaria`
- **Limite**: ~5-10MB
- **Duração**: Permanente (até limpar dados do navegador)

```javascript
// Dados salvos automaticamente após cada operação
salvarDados();

// Carregar dados ao iniciar
carregarDados();

// Exportar dados (backup)
exportarDados();
```

## 🎨 Design e Interface

### Paleta de Cores
- **Preto Principal**: `#0A0A0A`
- **Preto Secundário**: `#151515`
- **Dourado**: `#C89B3C`
- **Vermelho Fogo**: `#D63B1E`
- **Texto Principal**: `#F5F1E8`

### Tipografia
- **Títulos**: Playfair Display, Cinzel
- **Textos**: Inter, Montserrat
- **Ícones**: Font Awesome 6.4.0

## 🧪 Exemplos de Uso

Consulte **EXEMPLOS_PRATICOS.js** para 12 exemplos práticos completos.

### Exemplo Rápido: Venda Completa
```javascript
// 1. Criar pedido
criarPedido(1);

// 2. Adicionar itens
adicionarItemPedido(1, 2);
adicionarItemPedido(4, 1);

// 3. Fechar conta
fecharConta({ formaPagamento: 'Pix' });
```

## 💻 Stack Tecnológico

- **Frontend**: HTML5, CSS3 (Grid/Flexbox), JavaScript Vanilla
- **Armazenamento**: LocalStorage API
- **Ícones**: Font Awesome 6.4.0 (CDN)
- **Fontes**: Google Fonts (Playfair Display, Cinzel, Inter, Montserrat)
- **Navegadores**: Chrome, Firefox, Safari, Edge e compatíveis

## 📝 Arquivos Principais

| Arquivo | Descrição |
|---------|-----------|
| `index.html` | Página inicial com dashboard |
| `script.js` | 🔥 **Arquivo principal com toda a lógica** |
| `CSS/style.css` | Estilos premium do sistema |
| `SCRIPT_DOCUMENTACAO.md` | Documentação completa das funções |
| `EXEMPLOS_PRATICOS.js` | 12 exemplos de uso |
| `README.md` | Este arquivo |

## � Correções e Melhorias Recentes

✅ **Navegação Corrigida**: Links da navbar agora redirecionam corretamente  
✅ **Caminhos de Recursos**: CSS, JS e logo carregam do caminho correto  
✅ **Funções de Mesas**: Editar e apagar mesas implementados e funcionando  
✅ **Carregamento de Dados**: LocalStorage carregado antes de renderizar páginas  
✅ **Status de Mesas**: Agora persiste corretamente entre recarregamentos  

## 📞 Próximas Melhorias Planejadas

- 📄 Página de relatórios HTML dedicada (em vez de console)
- 🖨️ Impressão de comandas
- 📱 App mobile nativo (React Native)
- 🔐 Autenticação de usuários
- 📊 Gráficos interativos
- 🌐 Integração com backend (opcional)

---

## �👨‍💻 Desenvolvido por

**Cristian & João** - Trabalho Pratico WEB I 2026

---

<div align="center">

### Sistema de Controle de Restaurante - Churrascaria Querência


</div>
