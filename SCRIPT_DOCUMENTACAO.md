# Sistema de Controle de Restaurante - Documentação do Script.js

## 📋 Visão Geral

Este arquivo `script.js` contém toda a lógica de um sistema completo de gerenciamento de restaurante desenvolvido em **JavaScript Vanilla** (sem frameworks).

### ✅ Funcionalidades Implementadas

- ✓ CRUD de Produtos (Adicionar, Editar, Remover, Pesquisar)
- ✓ CRUD de Mesas (Adicionar, Editar, Remover, Alterar Status)
- ✓ Sistema de Pedidos (Criar, Adicionar Itens, Remover, Editar Quantidade)
- ✓ Fechamento de Contas (Calcular Troco, Registrar Vendas)
- ✓ Relatórios (Faturamento, Produtos Mais Vendidos, etc)
- ✓ LocalStorage (Persistência de Dados)

---

## 🚀 Como Usar

### 1. Incluir o Script no HTML

```html
<script src="script.js"></script>
```

O script carrega automaticamente ao abrir a página através do evento `DOMContentLoaded`.

---

## 📦 Estrutura de Dados

### Produto
```javascript
{
  id: Number,           // ID único (gerado automaticamente)
  nome: String,         // Nome do produto
  categoria: String,    // Ex: "Churrasco", "Bebida"
  preco: Number,        // Preço em reais
  descricao: String     // Descrição opcional
}
```

### Mesa
```javascript
{
  id: Number,           // ID único (gerado automaticamente)
  numero: Number,       // Número da mesa
  lugares: Number,      // Quantidade de lugares
  status: String        // "Livre", "Ocupada" ou "Reservada"
}
```

### Pedido
```javascript
{
  id: Number,           // ID único (gerado automaticamente)
  mesaId: Number,       // ID da mesa
  itens: [              // Lista de itens
    {
      produtoId: Number,
      nome: String,
      quantidade: Number,
      preco: Number
    }
  ],
  total: Number,        // Total calculado automaticamente
  data: String          // Data e hora da criação
}
```

### Venda (Fechamento)
```javascript
{
  id: Number,           // ID único (gerado automaticamente)
  pedidoId: Number,     // ID do pedido
  mesaId: Number,       // ID da mesa
  itens: Array,         // Items vendidos
  total: Number,        // Total da venda
  formaPagamento: String, // "Dinheiro", "Pix" ou "Cartão"
  valorRecebido: Number,  // Valor recebido (apenas para dinheiro)
  troco: Number,        // Troco calculado
  data: String          // Data e hora da venda
}
```

---

## 🛠️ Funções Principais

### PRODUTOS

#### Adicionar Produto
```javascript
adicionarProduto({
  nome: 'Churrasco Misto',
  categoria: 'Churrasco',
  preco: 89.90,
  descricao: 'Seleção premium de carnes'
});
```

#### Editar Produto
```javascript
editarProduto(1, {
  nome: 'Churrasco Premium',
  preco: 99.90
});
```

#### Remover Produto
```javascript
removerProduto(1);
```

#### Pesquisar Produto
```javascript
pesquisarProduto('Churrasco');
```

#### Listar Todos os Produtos
```javascript
listarProdutos();
```

---

### MESAS

#### Adicionar Mesa
```javascript
adicionarMesa({
  numero: 7,
  lugares: 4
});
```

#### Editar Mesa
```javascript
editarMesa(1, {
  numero: 10,
  lugares: 6
});
```

#### Remover Mesa
```javascript
removerMesa(1);
```

#### Alterar Status da Mesa
```javascript
alterarStatusMesa(1, 'Ocupada'); // Livre, Ocupada, Reservada
```

#### Pesquisar Mesa
```javascript
pesquisarMesa('1'); // Por número
pesquisarMesa('Livre'); // Por status
```

#### Listar Todas as Mesas
```javascript
listarMesas();
```

---

### PEDIDOS

#### Criar Novo Pedido
```javascript
criarPedido(1); // ID da mesa
```

#### Adicionar Item ao Pedido
```javascript
adicionarItemPedido(1, 2); // (ID do produto, quantidade)
```

#### Remover Item do Pedido
```javascript
removerItemPedido(1); // ID do produto
```

#### Alterar Quantidade de Item
```javascript
alterarQuantidadeItem(1, 3); // (ID do produto, nova quantidade)
```

#### Obter Pedido Atual
```javascript
obterPedidoAtual();
```

#### Listar Todos os Pedidos
```javascript
listarPedidos();
```

---

### FECHAMENTO DE CONTA

#### Fechar Conta
```javascript
fecharConta({
  formaPagamento: 'Cartão'
});
```

Para pagamento em dinheiro com cálculo de troco:
```javascript
fecharConta({
  formaPagamento: 'Dinheiro',
  valorRecebido: 150.00
});
```

#### Calcular Troco
```javascript
calcularTroco(89.90, 100.00); // Retorna: 10.10
```

#### Listar Todas as Vendas
```javascript
listarVendas();
```

---

### RELATÓRIOS

#### Gerar Relatório Completo
```javascript
const relatorio = gerarRelatorios();

// Retorna objeto com:
// - totalProdutos
// - totalMesas
// - mesasOcupadas, mesasLivres, mesasReservadas
// - pedidosAbertos
// - totalVendas
// - faturamentoTotal
// - ticketMedio
// - produtoMaisVendido
// - formasPagamento
// - ultimaVenda
```

#### Calcular Faturamento Total
```javascript
calcularFaturamentoTotal();
```

#### Calcular Ticket Médio
```javascript
calcularTicketMedio();
```

#### Obter Produto Mais Vendido
```javascript
obterProdutoMaisVendido();
```

#### Analisar Formas de Pagamento
```javascript
analisarFormasPagamento();
// Retorna: { Dinheiro: 5, Pix: 3, Cartão: 2 }
```

#### Obter Venda Mais Cara
```javascript
obterVendaMaisCara();
```

---

### LOCAL STORAGE

#### Salvar Dados
```javascript
salvarDados(); // Automaticamente chamado após cada operação
```

#### Carregar Dados
```javascript
carregarDados(); // Automaticamente chamado ao inicializar
```

#### Exportar Dados (Backup)
```javascript
exportarDados(); // Baixa arquivo JSON com backup
```

#### Limpar Todos os Dados
```javascript
limparTodosDados(); // ⚠️ Cuidado: irreversível!
```

---

### UTILITÁRIOS

#### Formatar Valor em Moeda
```javascript
formatarMoeda(89.90); // Retorna: "R$ 89,90"
```

---

## 📊 Fluxo Básico de Uso

1. **Inicializar Sistema**
   ```javascript
   // Automático ao carregar a página
   ```

2. **Adicionar Produtos (Primeira Vez)**
   ```javascript
   adicionarProduto({...});
   ```

3. **Cadastrar Mesas (Primeira Vez)**
   ```javascript
   adicionarMesa({...});
   ```

4. **Criar Pedido para uma Mesa**
   ```javascript
   criarPedido(1); // Mesa 1
   ```

5. **Adicionar Itens ao Pedido**
   ```javascript
   adicionarItemPedido(1, 2);
   adicionarItemPedido(2, 1);
   ```

6. **Fechar Conta**
   ```javascript
   fecharConta({ formaPagamento: 'Cartão' });
   ```

7. **Consultar Relatórios**
   ```javascript
   gerarRelatorios();
   ```

---

## 🧪 Testar o Sistema

Para testar todas as funcionalidades, abra o console (F12) e execute:

```javascript
testarSistema();
```

Isso irá:
- ✓ Adicionar um novo produto
- ✓ Listar produtos
- ✓ Adicionar uma mesa
- ✓ Criar um pedido
- ✓ Adicionar itens ao pedido
- ✓ Fechar a conta
- ✓ Gerar relatórios

---

## 💾 Como os Dados Perseguem

Os dados são salvos automaticamente no `localStorage` do navegador:

- **Chave**: `sistemaChurcascaria`
- **Valor**: JSON com todos os dados

Isso significa que:
- ✅ Os dados permanem mesmo após fechar o navegador
- ✅ Cada usuário tem seus próprios dados no navegador
- ✅ Os dados não são sincronizados entre dispositivos
- ✅ Para importar/exportar, use a função `exportarDados()`

---

## 📋 Boas Práticas de Código

O script segue as seguintes boas práticas:

✓ **Comentários explicativos** em cada função
✓ **Validação de dados** em operações críticas
✓ **Separação de responsabilidades** (CRUD, Relatórios, LocalStorage)
✓ **Funções reutilizáveis** para evitar repetição
✓ **Tratamento de erros** com mensagens descritivas
✓ **Nomes descritivos** de variáveis e funções
✓ **Organização modular** do código

---

## 🔧 Exemplos Práticos

### Exemplo 1: Criar uma Venda Completa
```javascript
// 1. Criar pedido
criarPedido(1);

// 2. Adicionar produtos
adicionarItemPedido(1, 2);
adicionarItemPedido(3, 1);

// 3. Fechar conta
const venda = fecharConta({ formaPagamento: 'Pix' });

// 4. Exibir resultado
console.log(`Venda de ${formatarMoeda(venda.total)} realizada!`);
```

### Exemplo 2: Gerar Relatório Diário
```javascript
const relatorio = gerarRelatorios();

console.log(`Total de Vendas: ${relatorio.totalVendas}`);
console.log(`Faturamento: ${formatarMoeda(relatorio.faturamentoTotal)}`);
console.log(`Ticket Médio: ${formatarMoeda(relatorio.ticketMedio)}`);
console.log(`Mesas Ocupadas: ${relatorio.mesasOcupadas}/${relatorio.totalMesas}`);
```

### Exemplo 3: Buscar Produto e Criar Pedido
```javascript
// 1. Buscar produtos de churrasco
const churrascos = pesquisarProduto('Churrasco');

// 2. Listar mesas livres
const mesasLivres = listarMesas().filter(m => m.status === 'Livre');

// 3. Criar pedido na primeira mesa livre
if (mesasLivres.length > 0) {
  criarPedido(mesasLivres[0].id);
  
  // 4. Adicionar primeiro churrasco
  if (churrascos.length > 0) {
    adicionarItemPedido(churrascos[0].id, 1);
  }
}
```

---

## ⚠️ Observações Importantes

1. **IDs são únicos**: Nunca crie IDs manualmente, use as funções de geração
2. **Datas são automáticas**: Não precisa informar data/hora em pedidos e vendas
3. **Total é calculado**: Não calcule manualmente, use `recalcularTotalPedido()`
4. **Status da mesa é atualizado**: Ao criar/fechar pedido, status muda automaticamente
5. **LocalStorage tem limite**: Se tiver muitos dados, considere exportar/limpar periodicamente

---

## 📞 Suporte e Dúvidas

Para dúvidas sobre as funções, consulte os comentários no código ou use:

```javascript
console.log(app); // Vê toda a estrutura de dados
testarSistema(); // Testa todas as funcionalidades
```

---

**Desenvolvido com ❤️ para a Churrascaria Querência** 🍖
