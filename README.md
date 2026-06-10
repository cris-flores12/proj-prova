# 🍖 Churrascaria Querência - Sistema de Controle de Restaurante

Um sistema completo de gerenciamento de restaurante desenvolvido em **JavaScript Vanilla** (sem frameworks ou bibliotecas externas).

## 📌 Características

✅ **CRUD de Produtos** - Adicionar, editar, remover, pesquisar  
✅ **CRUD de Mesas** - Gerenciar mesas com status  
✅ **Sistema de Pedidos** - Criar, editar, finalizar pedidos  
✅ **Fechamento de Contas** - Calcular troco, registrar vendas  
✅ **Relatórios** - Faturamento, produtos vendidos, análises  
✅ **LocalStorage** - Persistência de dados  
✅ **Interface Premium** - Dark theme com cores quentes  
✅ **Responsivo** - Funciona em desktop e mobile  

## 📂 Estrutura do Projeto

```
proj-prova-1/
├── index.html                    # Página inicial/Dashboard
├── script.js                     # 🔥 Lógica principal do sistema
├── SCRIPT_DOCUMENTACAO.md        # Documentação das funções
├── EXEMPLOS_PRATICOS.js          # Exemplos de uso
├── README.md                     # Este arquivo
│
├── css/
│   └── style.css                # Estilos premium
│
├── produtos/
│   ├── index.html               # Página de produtos (a implementar)
│   └── style.css                # Estilos específicos
│
├── mesas/
│   ├── index.html               # Página de mesas (a implementar)
│   └── style.css                # Estilos específicos
│
└── pedidos/
    └── index.html               # Página de pedidos (a implementar)
```

## 🚀 Como Começar

### 1. Abrir o Projeto
```bash
# Simplesmente abra o arquivo index.html no navegador
# Ou execute um servidor local:
# Python 3:
python -m http.server 8000

# Acesse:
http://localhost:8000
```

### 2. Testar o Sistema
Abra o Console (F12) e execute:
```javascript
testarSistema();
```

### 3. Ver Relatórios
```javascript
exibirRelatorios();
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

// 2. Adicionar items
adicionarItemPedido(1, 2);
adicionarItemPedido(4, 1);

// 3. Fechar conta
fecharConta({ formaPagamento: 'Pix' });
```

## ⚙️ Requisitos Técnicos

- ✅ **JavaScript Vanilla** (sem frameworks)
- ✅ **HTML5**
- ✅ **CSS3** (com suporte a Grid e Flexbox)
- ✅ **LocalStorage API**
- ✅ **Font Awesome 6.4.0** (CDN)
- ✅ **Google Fonts** (CDN)
- ✅ **Navegador moderno** (Chrome, Firefox, Safari, Edge)

## 📝 Arquivos Principais

| Arquivo | Descrição |
|---------|-----------|
| `index.html` | Página inicial com dashboard |
| `script.js` | 🔥 **Arquivo principal com toda a lógica** |
| `CSS/style.css` | Estilos premium do sistema |
| `SCRIPT_DOCUMENTACAO.md` | Documentação completa das funções |
| `EXEMPLOS_PRATICOS.js` | 12 exemplos de uso |
| `README.md` | Este arquivo |

## 👨‍💻 Desenvolvido por

**Cristian & João** - Projeto Acadêmico 2026

---

**🍖 Sistema de Controle de Restaurante - Churrascaria Querência**