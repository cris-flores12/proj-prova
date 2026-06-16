/**
 * ================================================
 * SISTEMA DE CONTROLE DE RESTAURANTE
 * Churrascaria Querência
 * ================================================
 * 
 * Sistema completo em JavaScript puro (Vanilla JS)
 * Funcionalidades: Produtos, Mesas, Pedidos, Fechamento, Relatórios
 * Persistência: LocalStorage
 * 
 */

// ================================================
// 1. ESTRUTURA DE DADOS GLOBAL
// ================================================

const app = {
    produtos: [],
    mesas: [],
    pedidos: [],
    vendas: [],
    pedidoAtual: null,
    nextIdProduto: 1,
    nextIdMesa: 1,
    nextIdPedido: 1,
    nextIdVenda: 1
};

// ================================================
// 2. FUNÇÃO AUXILIAR - GERAR IDs ÚNICOS
// ================================================

function gerarIdProduto() {
    const id = app.nextIdProduto;
    app.nextIdProduto++;
    salvarDados();
    return id;
}

function gerarIdMesa() {
    const id = app.nextIdMesa;
    app.nextIdMesa++;
    salvarDados();
    return id;
}

function gerarIdPedido() {
    const id = app.nextIdPedido;
    app.nextIdPedido++;
    salvarDados();
    return id;
}

function gerarIdVenda() {
    const id = app.nextIdVenda;
    app.nextIdVenda++;
    salvarDados();
    return id;
}

// ================================================
// 3. LOCAL STORAGE - SALVAR E CARREGAR DADOS
// ================================================

/**
 * Salva todos os dados no LocalStorage
 */
function salvarDados() {
    const dados = {
        produtos: app.produtos,
        mesas: app.mesas,
        pedidos: app.pedidos,
        vendas: app.vendas,
        nextIdProduto: app.nextIdProduto,
        nextIdMesa: app.nextIdMesa,
        nextIdPedido: app.nextIdPedido,
        nextIdVenda: app.nextIdVenda
    };
    localStorage.setItem('sistemaChurcascaria', JSON.stringify(dados));
}

/**
 * Carrega dados do LocalStorage
 */
function carregarDados() {
    const dadosSalvos = localStorage.getItem('sistemaChurcascaria');

    if (dadosSalvos) {
        const dados = JSON.parse(dadosSalvos);
        app.produtos = dados.produtos || [];
        app.mesas = dados.mesas || [];
        app.pedidos = dados.pedidos || [];
        app.vendas = dados.vendas || [];
        app.nextIdProduto = dados.nextIdProduto || 1;
        app.nextIdMesa = dados.nextIdMesa || 1;
        app.nextIdPedido = dados.nextIdPedido || 1;
        app.nextIdVenda = dados.nextIdVenda || 1;
    } else {
        inicializarDadosPadrao();
    }
}

/**
 * Inicializa dados padrão para demonstração
 */
function inicializarDadosPadrao() {
    // Produtos padrão
    app.produtos = [
        { id: 1, nome: 'Churrasco Misto', categoria: 'Churrasco', preco: 89.90, descricao: 'Seleção premium de carnes' },
        { id: 2, nome: 'Costela Assada', categoria: 'Churrasco', preco: 79.90, descricao: 'Costela macia e suculenta' },
        { id: 3, nome: 'Picanha', categoria: 'Churrasco', preco: 99.90, descricao: 'Picanha grelhada na brasa' },
        { id: 4, nome: 'Refrigerante', categoria: 'Bebida', preco: 8.90, descricao: 'Refrigerante 2L' },
        { id: 5, nome: 'Cerveja Premium', categoria: 'Bebida', preco: 12.90, descricao: 'Cerveja gelada 600ml' },
        { id: 6, nome: 'Mandioca Frita', categoria: 'Acompanhamento', preco: 15.90, descricao: 'Batida a mão' }
    ];
    app.nextIdProduto = 7;

    // Mesas padrão
    app.mesas = [
        { id: 1, numero: 1, lugares: 4, status: 'Livre' },
        { id: 2, numero: 2, lugares: 4, status: 'Livre' },
        { id: 3, numero: 3, lugares: 6, status: 'Livre' },
        { id: 4, numero: 4, lugares: 8, status: 'Livre' },
        { id: 5, numero: 5, lugares: 4, status: 'Livre' },
        { id: 6, numero: 6, lugares: 6, status: 'Livre' }
    ];
    app.nextIdMesa = 7;

    salvarDados();
}

// ================================================
// 4. CRUD PRODUTOS
// ================================================

/**
 * Adiciona um novo produto
 * @param {Object} dadosProduto - { nome, categoria, preco, descricao }
 */
function adicionarProduto(dadosProduto) {
    // Validação
    if (!dadosProduto.nome || !dadosProduto.categoria || !dadosProduto.preco) {
        console.warn('Dados incompletos para adicionar produto');
        return false;
    }

    const novoProduto = {
        id: gerarIdProduto(),
        nome: dadosProduto.nome,
        categoria: dadosProduto.categoria,
        preco: parseFloat(dadosProduto.preco),
        descricao: dadosProduto.descricao || ''
    };

    app.produtos.push(novoProduto);
    salvarDados();
    return novoProduto;
}

/**
 * Edita um produto existente
 * @param {Number} id - ID do produto
 * @param {Object} novosDados - Dados atualizados
 */
function editarProduto(id, novosDados) {
    const produto = app.produtos.find(p => p.id === id);

    if (!produto) {
        console.warn('Produto não encontrado');
        return false;
    }

    if (novosDados.nome) produto.nome = novosDados.nome;
    if (novosDados.categoria) produto.categoria = novosDados.categoria;
    if (novosDados.preco) produto.preco = parseFloat(novosDados.preco);
    if (novosDados.descricao) produto.descricao = novosDados.descricao;

    salvarDados();
    return produto;
}

/**
 * Remove um produto
 * @param {Number} id - ID do produto
 */
function removerProduto(id) {
    const index = app.produtos.findIndex(p => p.id === id);

    if (index === -1) {
        console.warn('Produto não encontrado');
        return false;
    }

    app.produtos.splice(index, 1);
    salvarDados();
    return true;
}

/**
 * Pesquisa produtos por nome ou categoria
 * @param {String} termo - Termo de busca
 */
function pesquisarProduto(termo) {
    const termoLower = termo.toLowerCase();
    return app.produtos.filter(p =>
        p.nome.toLowerCase().includes(termoLower) ||
        p.categoria.toLowerCase().includes(termoLower)
    );
}

/**
 * Obtém todos os produtos
 */
function listarProdutos() {
    return app.produtos;
}

// ================================================
// 5. CRUD MESAS
// ================================================

/**
 * Adiciona uma nova mesa
 * @param {Object} dadosMesa - { numero, lugares, status }
 */
function adicionarMesa(dadosMesa) {
    if (!dadosMesa.numero || !dadosMesa.lugares) {
        console.warn('Dados incompletos para adicionar mesa');
        return false;
    }

    const novaMesa = {
        id: gerarIdMesa(),
        numero: parseInt(dadosMesa.numero),
        lugares: parseInt(dadosMesa.lugares),
        status: dadosMesa.status ? dadosMesa.status : 'Livre'
    };

    app.mesas.push(novaMesa);
    salvarDados();
    return novaMesa;
}

/**
 * Edita uma mesa existente
 * @param {Number} id - ID da mesa
 * @param {Object} novosDados - Dados atualizados
 */
function editarMesa(id, novosDados) {
    const mesa = app.mesas.find(m => m.id === id);

    if (!mesa) {
        console.warn('Mesa não encontrada');
        return false;
    }

    if (novosDados.numero) mesa.numero = parseInt(novosDados.numero);
    if (novosDados.lugares) mesa.lugares = parseInt(novosDados.lugares);
    if (novosDados.status) mesa.status = novosDados.status;

    salvarDados();
    return mesa;
}

/**
 * Remove uma mesa
 * @param {Number} id - ID da mesa
 */
function removerMesa(id) {
    const index = app.mesas.findIndex(m => m.id === id);

    if (index === -1) {
        console.warn('Mesa não encontrada');
        return false;
    }

    app.mesas.splice(index, 1);
    salvarDados();
    return true;
}

/**
 * Altera o status de uma mesa
 * @param {Number} id - ID da mesa
 * @param {String} novoStatus - Novo status (Livre, Ocupada, Reservada)
 */
function alterarStatusMesa(id, novoStatus) {
    const mesa = app.mesas.find(m => m.id === id);

    if (!mesa) {
        console.warn('Mesa não encontrada');
        return false;
    }

    const statusValidos = ['Livre', 'Ocupada', 'Reservada'];
    if (!statusValidos.includes(novoStatus)) {
        console.warn('Status inválido');
        return false;
    }

    mesa.status = novoStatus;
    salvarDados();
    return mesa;
}

/**
 * Pesquisa mesas por número ou status
 * @param {String} termo - Termo de busca
 */
function pesquisarMesa(termo) {
    const termoLower = termo.toLowerCase();
    return app.mesas.filter(m =>
        m.numero.toString().includes(termo) ||
        m.status.toLowerCase().includes(termoLower)
    );
}

/**
 * Obtém todas as mesas
 */
function listarMesas() {
    return app.mesas;
}

// ================================================
// 6. SISTEMA DE PEDIDOS
// ================================================

/**
 * Cria um novo pedido para uma mesa
 * @param {Number} mesaId - ID da mesa
 */
function criarPedido(mesaId) {
    const mesa = app.mesas.find(m => m.id === mesaId);

    if (!mesa) {
        console.warn('Mesa não encontrada');
        return false;
    }

    const novoPedido = {
        id: gerarIdPedido(),
        mesaId: mesaId,
        itens: [],
        total: 0,
        data: new Date().toLocaleString('pt-BR')
    };

    // Altera status da mesa para Ocupada
    alterarStatusMesa(mesaId, 'Ocupada');

    app.pedidoAtual = novoPedido;
    app.pedidos.push(novoPedido);
    salvarDados();
    return novoPedido;
}

/**
 * Adiciona um item ao pedido atual
 * @param {Number} produtoId - ID do produto
 * @param {Number} quantidade - Quantidade
 */
function adicionarItemPedido(produtoId, quantidade = 1) {
    if (!app.pedidoAtual) {
        console.warn('Nenhum pedido aberto');
        return false;
    }

    const produto = app.produtos.find(p => p.id === produtoId);

    if (!produto) {
        console.warn('Produto não encontrado');
        return false;
    }

    // Verifica se o item já existe no pedido
    const itemExistente = app.pedidoAtual.itens.find(i => i.produtoId === produtoId);

    if (itemExistente) {
        // Se existe, aumenta a quantidade
        itemExistente.quantidade += parseInt(quantidade);
    } else {
        // Se não existe, adiciona novo item
        app.pedidoAtual.itens.push({
            produtoId: produtoId,
            nome: produto.nome,
            quantidade: parseInt(quantidade),
            preco: produto.preco
        });
    }

    recalcularTotalPedido();
    salvarDados();
    return app.pedidoAtual;
}

/**
 * Remove um item do pedido atual
 * @param {Number} produtoId - ID do produto
 */
function removerItemPedido(produtoId) {
    if (!app.pedidoAtual) {
        console.warn('Nenhum pedido aberto');
        return false;
    }

    const index = app.pedidoAtual.itens.findIndex(i => i.produtoId === produtoId);

    if (index === -1) {
        console.warn('Item não encontrado no pedido');
        return false;
    }

    app.pedidoAtual.itens.splice(index, 1);
    recalcularTotalPedido();
    salvarDados();
    return true;
}

/**
 * Altera a quantidade de um item no pedido
 * @param {Number} produtoId - ID do produto
 * @param {Number} novaQuantidade - Nova quantidade
 */
function alterarQuantidadeItem(produtoId, novaQuantidade) {
    if (!app.pedidoAtual) {
        console.warn('Nenhum pedido aberto');
        return false;
    }

    const item = app.pedidoAtual.itens.find(i => i.produtoId === produtoId);

    if (!item) {
        console.warn('Item não encontrado no pedido');
        return false;
    }

    novaQuantidade = parseInt(novaQuantidade);

    if (novaQuantidade <= 0) {
        removerItemPedido(produtoId);
        return true;
    }

    item.quantidade = novaQuantidade;
    recalcularTotalPedido();
    salvarDados();
    return item;
}

/**
 * Recalcula o total do pedido atual
 */
function recalcularTotalPedido() {
    if (!app.pedidoAtual) {
        return 0;
    }

    app.pedidoAtual.total = app.pedidoAtual.itens.reduce((total, item) => {
        return total + (item.preco * item.quantidade);
    }, 0);

    return app.pedidoAtual.total;
}

/**
 * Obtém o pedido atual
 */
function obterPedidoAtual() {
    return app.pedidoAtual;
}

/**
 * Obtém todos os pedidos
 */
function listarPedidos() {
    return app.pedidos;
}

/**
 * Obtém pedido por ID
 * @param {Number} id - ID do pedido
 */
function obterPedidoPorId(id) {
    return app.pedidos.find(p => p.id === id);
}

// ================================================
// 7. FECHAMENTO DE CONTA
// ================================================

/**
 * Fecha a conta e registra a venda
 * @param {Object} dadosFechamento - { formaPagamento, valorRecebido }
 */
function fecharConta(dadosFechamento) {
    if (!app.pedidoAtual) {
        console.warn('Nenhum pedido aberto para fechar');
        return false;
    }

    if (app.pedidoAtual.itens.length === 0) {
        console.warn('Pedido vazio');
        return false;
    }

    const { formaPagamento, valorRecebido } = dadosFechamento;
    const formasValidas = ['Dinheiro', 'Pix', 'Cartão'];

    if (!formasValidas.includes(formaPagamento)) {
        console.warn('Forma de pagamento inválida');
        return false;
    }

    // Registra a venda
    const novaVenda = {
        id: gerarIdVenda(),
        pedidoId: app.pedidoAtual.id,
        mesaId: app.pedidoAtual.mesaId,
        itens: app.pedidoAtual.itens,
        total: app.pedidoAtual.total,
        formaPagamento: formaPagamento,
        valorRecebido: formaPagamento === 'Dinheiro' ? parseFloat(valorRecebido) : app.pedidoAtual.total,
        troco: formaPagamento === 'Dinheiro' ? parseFloat(valorRecebido) - app.pedidoAtual.total : 0,
        data: new Date().toLocaleString('pt-BR')
    };

    app.vendas.push(novaVenda);

    // Libera a mesa
    alterarStatusMesa(app.pedidoAtual.mesaId, 'Livre');

    // Remove o pedido da lista de pedidos abertos
    const indexPedido = app.pedidos.findIndex(p => p.id === app.pedidoAtual.id);
    if (indexPedido !== -1) {
        app.pedidos.splice(indexPedido, 1);
    }

    // Limpa o pedido atual
    app.pedidoAtual = null;

    salvarDados();
    return novaVenda;
}

/**
 * Calcula o troco
 * @param {Number} total - Total da conta
 * @param {Number} valorRecebido - Valor recebido
 */
function calcularTroco(total, valorRecebido) {
    return parseFloat(valorRecebido) - parseFloat(total);
}

/**
 * Obtém todas as vendas
 */
function listarVendas() {
    return app.vendas;
}

// ================================================
// 8. RELATÓRIOS E ESTATÍSTICAS
// ================================================

/**
 * Gera relatório com todas as estatísticas
 */
function gerarRelatorios() {
    const relatorio = {
        // Totais básicos
        totalProdutos: app.produtos.length,
        totalMesas: app.mesas.length,

        // Mesas
        mesasOcupadas: app.mesas.filter(m => m.status === 'Ocupada').length,
        mesasLivres: app.mesas.filter(m => m.status === 'Livre').length,
        mesasReservadas: app.mesas.filter(m => m.status === 'Reservada').length,

        // Pedidos
        pedidosAbertos: app.pedidos.length,
        totalVendas: app.vendas.length,

        // Faturamento
        faturamentoTotal: calcularFaturamentoTotal(),
        ticketMedio: calcularTicketMedio(),

        // Produtos
        produtoMaisVendido: obterProdutoMaisVendido(),

        // Pagamentos
        formasPagamento: analisarFormasPagamento(),

        // Data da última venda
        ultimaVenda: app.vendas.length > 0 ? app.vendas[app.vendas.length - 1] : null
    };

    return relatorio;
}

/**
 * Calcula o faturamento total
 */
function calcularFaturamentoTotal() {
    return app.vendas.reduce((total, venda) => total + venda.total, 0);
}

/**
 * Calcula o ticket médio
 */
function calcularTicketMedio() {
    if (app.vendas.length === 0) return 0;
    return calcularFaturamentoTotal() / app.vendas.length;
}

/**
 * Obtém o produto mais vendido
 */
function obterProdutoMaisVendido() {
    if (app.vendas.length === 0) return null;

    const contagem = {};

    app.vendas.forEach(venda => {
        venda.itens.forEach(item => {
            contagem[item.produtoId] = (contagem[item.produtoId] || 0) + item.quantidade;
        });
    });

    let produtoMais = null;
    let maiorQuantidade = 0;

    for (const [produtoId, quantidade] of Object.entries(contagem)) {
        if (quantidade > maiorQuantidade) {
            maiorQuantidade = quantidade;
            const produto = app.produtos.find(p => p.id === parseInt(produtoId));
            produtoMais = { ...produto, quantidade };
        }
    }

    return produtoMais;
}

/**
 * Analisa formas de pagamento utilizadas
 */
function analisarFormasPagamento() {
    const formas = { Dinheiro: 0, Pix: 0, Cartão: 0 };

    app.vendas.forEach(venda => {
        formas[venda.formaPagamento]++;
    });

    return formas;
}

/**
 * Obtém a venda mais cara
 */
function obterVendaMaisCara() {
    if (app.vendas.length === 0) return null;

    return app.vendas.reduce((maisAlta, venda) =>
        venda.total > maisAlta.total ? venda : maisAlta
    );
}

// ================================================
// 9. UTILITÁRIOS E FUNÇÕES AUXILIARES
// ================================================

/**
 * Formata valor em moeda brasileira
 * @param {Number} valor - Valor a formatar
 */
function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

/**
 * Limpa todos os dados (para desenvolvimento/testes)
 */
function limparTodosDados() {
    if (confirm('Tem certeza que deseja limpar todos os dados? Esta ação não pode ser desfeita!')) {
        app.produtos = [];
        app.mesas = [];
        app.pedidos = [];
        app.vendas = [];
        app.pedidoAtual = null;
        app.nextIdProduto = 1;
        app.nextIdMesa = 1;
        app.nextIdPedido = 1;
        app.nextIdVenda = 1;
        salvarDados();
        console.log('Todos os dados foram limpos');
        location.reload();
    }
}

/**
 * Exporta dados para JSON (para backup)
 */
function exportarDados() {
    const dados = {
        produtos: app.produtos,
        mesas: app.mesas,
        pedidos: app.pedidos,
        vendas: app.vendas
    };

    const json = JSON.stringify(dados, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `backup_${new Date().getTime()}.json`;
    link.click();
    URL.revokeObjectURL(url);
}

// ================================================
// 10. INICIALIZAÇÃO DO SISTEMA
// ================================================

/**
 * Inicializa o sistema ao carregar a página
 */
function inicializarSistema() {
    console.log('🍖 Inicializando Sistema de Controle de Restaurante...');

    // Carrega dados do LocalStorage
    carregarDados();

    // Configura eventos de navegação
    configurarNavegacao();

    // Configura eventos dos cards
    configurarEventosCards();

    console.log('✅ Sistema inicializado com sucesso!');
    console.log('📊 Dados carregados:', {
        produtos: app.produtos.length,
        mesas: app.mesas.length,
        pedidos: app.pedidos.length,
        vendas: app.vendas.length
    });
}

/**
 * Configura navegação entre abas
 */
function configurarNavegacao() {
    const links = Array.from(document.querySelectorAll('.navbar a'));
    const sections = links
        .map(link => link.getAttribute('href'))
        .filter(href => href && href.startsWith('#'))
        .map(href => document.querySelector(href))
        .filter(Boolean);

    function atualizarAtivoPorScroll() {
        const offset = 120;
        const scrollPosition = window.scrollY + offset;
        let currentSection = sections[0];

        sections.forEach(section => {
            if (section.offsetTop <= scrollPosition) {
                currentSection = section;
            }
        });

        links.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentSection.id}`);
        });
    }

    links.forEach(link => {
        link.addEventListener('click', (event) => {
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    const offset = 90;
                    const topPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top: topPosition, behavior: 'smooth' });
                    event.preventDefault();
                }
            }
        });
    });

    window.addEventListener('scroll', atualizarAtivoPorScroll);
    atualizarAtivoPorScroll();
}

/**
 * Configura eventos dos cards da página inicial
 */
function configurarEventosCards() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const destino = card.dataset.target;
            const titulo = card.querySelector('h3')?.textContent?.trim() || 'Card';
            console.log(`Acessando: ${titulo}`);

            if (destino) {
                if (destino.startsWith('#')) {
                    const target = document.querySelector(destino);
                    if (target) {
                        const offset = 90;
                        const topPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                        window.scrollTo({ top: topPosition, behavior: 'smooth' });
                    }
                } else {
                    window.location.href = destino;
                }
                return;
            }

            switch (titulo.toLowerCase()) {
                case 'produtos':
                    window.location.href = 'produtos/index.html';
                    break;
                case 'mesas':
                    window.location.href = 'mesas/index.html';
                    break;
                case 'pedidos':
                    window.location.href = 'pedidos/index.html';
                    break;
                case 'relatórios':
                case 'relatorios':
                    exibirRelatorios();
                    break;
                default:
                    console.warn(`Navegação desconhecida para o card: ${titulo}`);
            }
        });

        card.style.cursor = 'pointer';
    });
}

/**
 * Exibe os relatórios no console (você pode criar uma página HTML para isso)
 */
function exibirRelatorios() {
    const relatorio = gerarRelatorios();
    console.clear();
    console.log('%c📊 RELATÓRIO GERAL DO SISTEMA', 'color: #C89B3C; font-size: 18px; font-weight: bold;');
    console.log('');
    console.log('%c=== TOTAIS BÁSICOS ===', 'color: #D63B1E; font-weight: bold;');
    console.log(`Total de Produtos: ${relatorio.totalProdutos}`);
    console.log(`Total de Mesas: ${relatorio.totalMesas}`);
    console.log('');
    console.log('%c=== STATUS DAS MESAS ===', 'color: #D63B1E; font-weight: bold;');
    console.log(`Mesas Livres: ${relatorio.mesasLivres}`);
    console.log(`Mesas Ocupadas: ${relatorio.mesasOcupadas}`);
    console.log(`Mesas Reservadas: ${relatorio.mesasReservadas}`);
    console.log('');
    console.log('%c=== PEDIDOS E VENDAS ===', 'color: #D63B1E; font-weight: bold;');
    console.log(`Pedidos Abertos: ${relatorio.pedidosAbertos}`);
    console.log(`Total de Vendas: ${relatorio.totalVendas}`);
    console.log('');
    console.log('%c=== FATURAMENTO ===', 'color: #D63B1E; font-weight: bold;');
    console.log(`Faturamento Total: ${formatarMoeda(relatorio.faturamentoTotal)}`);
    console.log(`Ticket Médio: ${formatarMoeda(relatorio.ticketMedio)}`);
    console.log('');
    console.log('%c=== FORMAS DE PAGAMENTO ===', 'color: #D63B1E; font-weight: bold;');
    console.log(`Dinheiro: ${relatorio.formasPagamento.Dinheiro} vendas`);
    console.log(`Pix: ${relatorio.formasPagamento.Pix} vendas`);
    console.log(`Cartão: ${relatorio.formasPagamento.Cartão} vendas`);
    console.log('');
    console.log('%c=== PRODUTOS ===', 'color: #D63B1E; font-weight: bold;');
    if (relatorio.produtoMaisVendido) {
        console.log(`Produto Mais Vendido: ${relatorio.produtoMaisVendido.nome} (${relatorio.produtoMaisVendido.quantidade} unidades)`);
    }
    console.log('');
    if (relatorio.ultimaVenda) {
        console.log('%c=== ÚLTIMA VENDA ===', 'color: #D63B1E; font-weight: bold;');
        console.log(`Data: ${relatorio.ultimaVenda.data}`);
        console.log(`Total: ${formatarMoeda(relatorio.ultimaVenda.total)}`);
        console.log(`Forma de Pagamento: ${relatorio.ultimaVenda.formaPagamento}`);
    }
    console.log('');
    console.log('%c=== DADOS COMPLETOS ===', 'color: #C89B3C; font-weight: bold;');
    console.table(relatorio);
}

// ================================================
// 11. EXEMPLOS DE USO (Para testes)
// ================================================

/**
 * Função para testar o sistema (descomente para usar)
 */
function testarSistema() {
    console.log('%c🧪 INICIANDO TESTES...', 'color: #C89B3C; font-weight: bold; font-size: 14px;');

    // Teste 1: Adicionar Produto
    console.log('%c✓ Teste 1: Adicionando Produto', 'color: #D63B1E;');
    const produto = adicionarProduto({
        nome: 'Chopp Artesanal',
        categoria: 'Bebida',
        preco: 18.90,
        descricao: 'Chopp gelado premium'
    });
    console.log('Produto adicionado:', produto);

    // Teste 2: Listar Produtos
    console.log('%c✓ Teste 2: Listando Produtos', 'color: #D63B1E;');
    console.log('Total de produtos:', listarProdutos().length);

    // Teste 3: Adicionar Mesa
    console.log('%c✓ Teste 3: Adicionando Mesa', 'color: #D63B1E;');
    const mesa = adicionarMesa({ numero: 7, lugares: 4 });
    console.log('Mesa adicionada:', mesa);

    // Teste 4: Criar Pedido
    console.log('%c✓ Teste 4: Criando Pedido', 'color: #D63B1E;');
    criarPedido(1);
    console.log('Pedido criado para mesa 1');

    // Teste 5: Adicionar Item ao Pedido
    console.log('%c✓ Teste 5: Adicionando Items ao Pedido', 'color: #D63B1E;');
    adicionarItemPedido(1, 2);
    adicionarItemPedido(2, 1);
    console.log('Pedido atual:', obterPedidoAtual());

    // Teste 6: Fechar Conta
    console.log('%c✓ Teste 6: Fechando Conta', 'color: #D63B1E;');
    const venda = fecharConta({
        formaPagamento: 'Cartão'
    });
    console.log('Venda registrada:', venda);

    // Teste 7: Gerar Relatórios
    console.log('%c✓ Teste 7: Gerando Relatórios', 'color: #D63B1E;');
    const relatorio = gerarRelatorios();
    console.log('Relatório:', relatorio);

    console.log('%c✅ TESTES CONCLUÍDOS!', 'color: #C89B3C; font-weight: bold; font-size: 14px;');
}

// ================================================
// 12. EVENT LISTENER - EXECUTA AO CARREGAR A PÁGINA
// ================================================

document.addEventListener('DOMContentLoaded', inicializarSistema);

// ================================================
// FIM DO SCRIPT
// ================================================