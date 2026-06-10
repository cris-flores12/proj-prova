/**
 * EXEMPLOS PRÁTICOS DE USO - Script.js
 * 
 * Este arquivo contém exemplos reais de como usar o sistema
 * Abra o console (F12) e copie/cole os exemplos abaixo
 */

// ================================================
// EXEMPLO 1: TESTAR TODO O SISTEMA
// ================================================

// Abra o console e execute:
testarSistema();

// Você verá um relatório completo de todos os testes executados


// ================================================
// EXEMPLO 2: VISUALIZAR RELATÓRIO COMPLETO
// ================================================

exibirRelatorios();

// Exibe um relatório bonito formatado no console


// ================================================
// EXEMPLO 3: CRIAR UMA VENDA DO INÍCIO AO FIM
// ================================================

// Passo 1: Criar pedido para mesa 1
criarPedido(1);
console.log('Pedido criado para a mesa 1');

// Passo 2: Adicionar 2 Churrascos Mistos (ID 1)
adicionarItemPedido(1, 2);
console.log('Adicionado 2x Churrasco Misto');

// Passo 3: Adicionar 1 Refrigerante (ID 4)
adicionarItemPedido(4, 1);
console.log('Adicionado 1x Refrigerante');

// Passo 4: Ver o pedido atual
console.log('Pedido Atual:', obterPedidoAtual());

// Passo 5: Fechar a conta
const venda = fecharConta({ formaPagamento: 'Pix' });
console.log('Venda realizada:', venda);
console.log(`Total: ${formatarMoeda(venda.total)}`);


// ================================================
// EXEMPLO 4: CRIAR VENDA COM PAGAMENTO EM DINHEIRO
// ================================================

// Criar pedido
criarPedido(2);

// Adicionar itens
adicionarItemPedido(3, 1); // 1x Picanha
adicionarItemPedido(5, 2); // 2x Cerveja

// Ver total antes de fechar
const pedidoAtual = obterPedidoAtual();
console.log(`Total da conta: ${formatarMoeda(pedidoAtual.total)}`);

// Fechar conta em dinheiro
const vendaDinheiro = fecharConta({
  formaPagamento: 'Dinheiro',
  valorRecebido: 250.00
});

console.log(`Total: ${formatarMoeda(vendaDinheiro.total)}`);
console.log(`Valor recebido: ${formatarMoeda(vendaDinheiro.valorRecebido)}`);
console.log(`Troco: ${formatarMoeda(vendaDinheiro.troco)}`);


// ================================================
// EXEMPLO 5: GERENCIAR PRODUTOS
// ================================================

// Listar todos os produtos
const todosProdutos = listarProdutos();
console.log('Todos os produtos:', todosProdutos);

// Pesquisar produtos
const bebidas = pesquisarProduto('Bebida');
console.log('Bebidas:', bebidas);

// Adicionar novo produto
const novoProduto = adicionarProduto({
  nome: 'Água com Gás',
  categoria: 'Bebida',
  preco: 6.90,
  descricao: 'Água mineral com gás 500ml'
});
console.log('Novo produto:', novoProduto);

// Editar produto
editarProduto(1, {
  preco: 94.90,
  descricao: 'Churrasco Premium - Seleção especial'
});
console.log('Produto editado com sucesso');

// Remover produto
removerProduto(7);
console.log('Produto removido');


// ================================================
// EXEMPLO 6: GERENCIAR MESAS
// ================================================

// Listar todas as mesas
const todasMesas = listarMesas();
console.log('Todas as mesas:', todasMesas);

// Pesquisar mesas livres
const mesasLivres = pesquisarMesa('Livre');
console.log('Mesas livres:', mesasLivres);

// Adicionar nova mesa
const novaMesa = adicionarMesa({
  numero: 10,
  lugares: 8
});
console.log('Nova mesa:', novaMesa);

// Alterar status de mesa
alterarStatusMesa(3, 'Reservada');
console.log('Mesa 3 reservada');

// Editar mesa
editarMesa(5, { lugares: 5 });
console.log('Mesa 5 editada');


// ================================================
// EXEMPLO 7: ANÁLISE DE VENDAS
// ================================================

// Gerar relatório completo
const relatorio = gerarRelatorios();

// Exibir principais informações
console.log('=== ANÁLISE DE VENDAS ===');
console.log(`Total de vendas: ${relatorio.totalVendas}`);
console.log(`Faturamento total: ${formatarMoeda(relatorio.faturamentoTotal)}`);
console.log(`Ticket médio: ${formatarMoeda(relatorio.ticketMedio)}`);
console.log(`Produto mais vendido: ${relatorio.produtoMaisVendido?.nome}`);
console.log(`Venda mais cara: ${formatarMoeda(obterVendaMaisCara()?.total)}`);

// Analisar formas de pagamento
const formas = analisarFormasPagamento();
console.log('Formas de pagamento:');
console.log(`- Dinheiro: ${formas.Dinheiro} vendas`);
console.log(`- Pix: ${formas.Pix} vendas`);
console.log(`- Cartão: ${formas.Cartão} vendas`);

// Status das mesas
console.log('Status das mesas:');
console.log(`- Livres: ${relatorio.mesasLivres}`);
console.log(`- Ocupadas: ${relatorio.mesasOcupadas}`);
console.log(`- Reservadas: ${relatorio.mesasReservadas}`);


// ================================================
// EXEMPLO 8: CÁLCULOS ÚTEIS
// ================================================

// Calcular troco
const troco = calcularTroco(89.90, 100);
console.log(`Troco: ${formatarMoeda(troco)}`);

// Faturamento total
const faturamento = calcularFaturamentoTotal();
console.log(`Faturamento total: ${formatarMoeda(faturamento)}`);

// Ticket médio
const ticketMedio = calcularTicketMedio();
console.log(`Ticket médio: ${formatarMoeda(ticketMedio)}`);


// ================================================
// EXEMPLO 9: VERIFICAR STATUS DA MESA E PEDIDO
// ================================================

// Ver status de uma mesa
const mesa = listarMesas().find(m => m.numero === 1);
console.log(`Mesa ${mesa.numero}: ${mesa.status}`);

// Ver todos os pedidos abertos
const pedidosAbertos = listarPedidos();
console.log('Pedidos abertos:', pedidosAbertos.length);

// Ver todas as vendas
const todasVendas = listarVendas();
console.log('Total de vendas:', todasVendas.length);
if (todasVendas.length > 0) {
  const ultimaVenda = todasVendas[todasVendas.length - 1];
  console.log('Última venda:', ultimaVenda);
}


// ================================================
// EXEMPLO 10: FLUXO DE ATENDIMENTO COMPLETO
// ================================================

// CENÁRIO: Um cliente chega e senta na mesa 3

// 1. Verificar se mesa está livre
const mesaDisponivel = listarMesas().find(m => m.numero === 3);
if (mesaDisponivel.status === 'Livre') {
  console.log('Mesa 3 disponível! 👍');
  
  // 2. Criar pedido
  criarPedido(mesaDisponivel.id);
  console.log('Pedido aberto para mesa 3');
  
  // 3. Cliente pede 2 picahnhas e 1 refrigerante
  adicionarItemPedido(3, 2); // Picanha
  adicionarItemPedido(4, 1); // Refrigerante
  console.log('Items adicionados');
  
  // 4. Cliente quer mais 1 cerveja (adicionar depois)
  adicionarItemPedido(5, 1); // Cerveja
  console.log('Mais 1 cerveja adicionada');
  
  // 5. Cliente arrependeu e não quer mais refrigerante
  removerItemPedido(4);
  console.log('Refrigerante removido');
  
  // 6. Verificar pedido
  const pedido = obterPedidoAtual();
  console.log('Pedido final:', pedido);
  console.log(`Total: ${formatarMoeda(pedido.total)}`);
  
  // 7. Cliente paga com cartão
  const vendaFinal = fecharConta({ formaPagamento: 'Cartão' });
  console.log('Pagamento realizado! 💳');
  console.log(`Vendedor: ${formatarMoeda(vendaFinal.total)}`);
}


// ================================================
// EXEMPLO 11: SIMULAR MÚLTIPLAS VENDAS
// ================================================

// Simular 5 vendas em sequência
for (let i = 1; i <= 5; i++) {
  const mesa = listarMesas().find(m => m.status === 'Livre');
  
  if (mesa) {
    // Criar pedido
    criarPedido(mesa.id);
    
    // Adicionar items aleatórios
    const produtosAleatorios = [1, 2, 3, 4, 5];
    produtosAleatorios.forEach(pId => {
      if (Math.random() > 0.5) {
        adicionarItemPedido(pId, Math.ceil(Math.random() * 3));
      }
    });
    
    // Fechar conta com forma de pagamento aleatória
    const formas = ['Dinheiro', 'Pix', 'Cartão'];
    const forma = formas[Math.floor(Math.random() * formas.length)];
    
    fecharConta({ formaPagamento: forma });
    console.log(`Venda ${i} registrada - ${forma}`);
  }
}

// Ver relatório final
setTimeout(() => {
  exibirRelatorios();
}, 1000);


// ================================================
// EXEMPLO 12: BACKUP E EXPORTAÇÃO
// ================================================

// Exportar dados (baixa arquivo JSON)
exportarDados();

// Ver dados salvos no localStorage
console.log('Dados no localStorage:');
const dadosSalvos = JSON.parse(localStorage.getItem('sistemaChurcascaria'));
console.log(dadosSalvos);


// ================================================
// DICAS ÚTEIS
// ================================================

/*
1. Para ver toda a estrutura de dados:
   console.table(app)

2. Para ver um tipo específico de dados:
   console.table(app.produtos)
   console.table(app.mesas)
   console.table(app.pedidos)
   console.table(app.vendas)

3. Para limpar o console:
   console.clear()

4. Para abrir o DevTools (Console):
   - Chrome: Ctrl + Shift + J (Windows) ou Cmd + Option + J (Mac)
   - Firefox: Ctrl + Shift + K (Windows) ou Cmd + Option + K (Mac)

5. Para recarregar a página (sem limpar dados):
   location.reload()

6. Para limpar todos os dados (CUIDADO!):
   limparTodosDados()
*/
