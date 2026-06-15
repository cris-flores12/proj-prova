let pedidoAtivo = null;

// Carregar mesas no select
function carregarMesas() {
    const mesas = listarMesas();
    const select = document.getElementById('mesaPedido');

    mesas.forEach(mesa => {
        const option = document.createElement('option');
        option.value = mesa.id;
        option.textContent = `Mesa ${mesa.numero} (${mesa.lugares} lugares) - ${mesa.status}`;
        select.appendChild(option);
    });
}

// Carregar produtos no select
function carregarProdutos() {
    const produtos = listarProdutos();
    const select = document.getElementById('produtoPedido');

    produtos.forEach(produto => {
        const option = document.createElement('option');
        option.value = produto.id;
        option.textContent = `${produto.nome} - ${formatarMoeda(produto.preco)}`;
        option.dataset.preco = produto.preco;
        select.appendChild(option);
    });
}

// Atualizar preço quando produto é selecionado
document.getElementById('produtoPedido').addEventListener('change', (e) => {
    const option = e.target.options[e.target.selectedIndex];
    const preco = option.dataset.preco || 0;
    document.getElementById('precoProduto').value = formatarMoeda(preco);
});

// Criar pedido
document.getElementById('btnCriarPedido').addEventListener('click', () => {
    const mesaId = parseInt(document.getElementById('mesaPedido').value);

    if (!mesaId) {
        alert('⚠️ Selecione uma mesa!');
        return;
    }

    criarPedido(mesaId);
    pedidoAtivo = mesaId;

    const mesa = listarMesas().find(m => m.id === mesaId);
    document.getElementById('mesaPedidoInfo').textContent = `Mesa ${mesa.numero}`;
    document.getElementById('infoPedido').style.display = 'block';
    document.getElementById('totalSection').style.display = 'flex';

    alert('✅ Pedido aberto!');
    atualizarResumo();
});

// Adicionar item
document.getElementById('btnAdicionarItem').addEventListener('click', () => {
    if (!pedidoAtivo) {
        alert('⚠️ Abra um pedido primeiro!');
        return;
    }

    const produtoId = parseInt(document.getElementById('produtoPedido').value);
    const quantidade = parseInt(document.getElementById('quantidadePedido').value);

    if (!produtoId || quantidade < 1) {
        alert('⚠️ Selecione um produto e uma quantidade válida!');
        return;
    }

    adicionarItemPedido(produtoId, quantidade);
    alert('✅ Item adicionado!');

    document.getElementById('produtoPedido').value = '';
    document.getElementById('quantidadePedido').value = 1;
    document.getElementById('precoProduto').value = '';

    atualizarResumo();
});

// Atualizar resumo
function atualizarResumo() {
    const pedido = obterPedidoAtual();
    const resumoDiv = document.getElementById('pedidoResumo');

    if (!pedido || pedido.itens.length === 0) {
        resumoDiv.innerHTML = '<div class="info-box"><i class="fas fa-info-circle"></i> Nenhum item adicionado</div>';
        document.getElementById('totalSection').style.display = 'flex';
        document.getElementById('totalPedido').textContent = formatarMoeda(0);
        return;
    }

    let html = '<table style="width: 100%;"><tbody>';
    pedido.itens.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        html += `
          <tr>
            <td>${item.nome}</td>
            <td style="text-align: center;">${item.quantidade}x</td>
            <td style="text-align: right; color: var(--gold);">${formatarMoeda(subtotal)}</td>
            <td style="text-align: center;">
              <button class="btn-small btn-remove" onclick="removerItem(${item.produtoId})">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        `;
    });
    html += '</tbody></table>';

    resumoDiv.innerHTML = html;
    document.getElementById('totalPedido').textContent = formatarMoeda(pedido.total);
}

// Remover item
function removerItem(produtoId) {
    removerItemPedido(produtoId);
    alert('✅ Item removido!');
    atualizarResumo();
}

// Finalizar venda
document.getElementById('btnFinalizarVenda').addEventListener('click', () => {
    const pedido = obterPedidoAtual();

    if (!pedido || pedido.itens.length === 0) {
        alert('⚠️ Adicione itens ao pedido!');
        return;
    }

    const forma = prompt('Forma de pagamento:\n1 = Dinheiro\n2 = Pix\n3 = Cartão\n\nDigite 1, 2 ou 3:');
    const formas = ['Dinheiro', 'Pix', 'Cartão'];

    if (forma === '1' || forma === '2' || forma === '3') {
        const formaPagamento = formas[parseInt(forma) - 1];

        let valorRecebido = pedido.total;
        if (formaPagamento === 'Dinheiro') {
            valorRecebido = parseFloat(prompt(`Total: ${formatarMoeda(pedido.total)}\n\nValor recebido:`));
        }

        if (isNaN(valorRecebido) || valorRecebido < pedido.total) {
            alert('⚠️ Valor inválido!');
            return;
        }

        const venda = fecharConta({ formaPagamento, valorRecebido });
        alert(`✅ Venda finalizada!\n${formatarMoeda(venda.total)}`);

        pedidoAtivo = null;
        document.getElementById('infoPedido').style.display = 'none';
        document.getElementById('totalSection').style.display = 'none';
        document.getElementById('pedidoResumo').innerHTML = '<div class="info-box"><i class="fas fa-info-circle"></i> Abra um pedido para começar</div>';
        carregarTabelaPedidos();
    }
});

// Novo pedido
document.getElementById('btnLimparPedido').addEventListener('click', () => {
    pedidoAtivo = null;
    document.getElementById('infoPedido').style.display = 'none';
    document.getElementById('totalSection').style.display = 'none';
    document.getElementById('pedidoResumo').innerHTML = '<div class="info-box"><i class="fas fa-info-circle"></i> Abra um pedido para começar</div>';
});

// Tabela de pedidos
function carregarTabelaPedidos() {
    const pedidos = listarPedidos();
    const tabelaDiv = document.getElementById('tabelaPedidos');

    if (pedidos.length === 0) {
        tabelaDiv.innerHTML = `
          <div class="empty-state">
            <i class="fas fa-inbox"></i>
            <p>Nenhum pedido aberto</p>
          </div>
        `;
        return;
    }

    let html = `
        <table>
          <thead>
            <tr>
              <th>Mesa</th>
              <th>Itens</th>
              <th>Total</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
      `;

    pedidos.forEach(pedido => {
        const mesa = listarMesas().find(m => m.id === pedido.mesaId);
        html += `
          <tr>
            <td>#${mesa?.numero || '?'}</td>
            <td>${pedido.itens.length} item(ns)</td>
            <td class="price-display">${formatarMoeda(pedido.total)}</td>
            <td>${pedido.data}</td>
          </tr>
        `;
    });

    html += `
          </tbody>
        </table>
      `;

    tabelaDiv.innerHTML = html;
}

// Inicializar
carregarDados();
carregarMesas();
carregarProdutos();
carregarTabelaPedidos();