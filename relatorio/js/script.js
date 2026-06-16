let historicoVendas = [];

function carregarDadosDoRelatorio() {
    carregarDados();
    historicoVendas = listarVendas();
    renderizarRelatorio(historicoVendas);
}

function formatarMoedaBRL(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor || 0);
}

function obterNomeMesa(mesaId) {
    const mesa = listarMesas().find(item => item.id === mesaId);
    return mesa ? `Mesa ${mesa.numero}` : `Mesa ${mesaId}`;
}

function renderizarRelatorio(dadosParaExibir) {
    const corpoTabela = document.getElementById('corpo-tabela-historico');
    if (!corpoTabela) return;

    corpoTabela.innerHTML = '';

    let faturamentoTotal = 0;
    const totalContas = dadosParaExibir.length;

    dadosParaExibir.forEach(venda => {
        faturamentoTotal += Number(venda.total || 0);

        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td><strong>${obterNomeMesa(venda.mesaId)}</strong></td>
            <td>${venda.formaPagamento || 'Não informado'}</td>
            <td>${formatarMoedaBRL(Number(venda.total || 0))}</td>
            <td>${venda.data || '-'}</td>
            <td>
                <button class="btn-danger" onclick="deletarFechamento(${venda.id})">
                    <i class="fa-solid fa-rotate-left"></i> Estornar
                </button>
            </td>
        `;
        corpoTabela.appendChild(linha);
    });

    const ticketMedio = totalContas > 0 ? faturamentoTotal / totalContas : 0;

    document.getElementById('metric-faturamento').textContent = formatarMoedaBRL(faturamentoTotal);
    document.getElementById('metric-quantidade').textContent = totalContas;
    document.getElementById('metric-ticket').textContent = formatarMoedaBRL(ticketMedio);
}

function filtrarHistorico() {
    const termoBusca = document.getElementById('search-input').value.trim().toLowerCase();

    const dadosFiltrados = historicoVendas.filter(venda => {
        const nomeMesa = obterNomeMesa(venda.mesaId).toLowerCase();
        const forma = (venda.formaPagamento || '').toLowerCase();
        return nomeMesa.includes(termoBusca) || forma.includes(termoBusca);
    });

    renderizarRelatorio(dadosFiltrados);
}

function deletarFechamento(idVenda) {
    if (!confirm('Deseja estornar esta conta da Churrascaria Querência?')) {
        return;
    }

    const venda = app.vendas.find(item => item.id === idVenda);
    if (venda) {
        app.vendas = app.vendas.filter(item => item.id !== idVenda);
        salvarDados();
    }

    historicoVendas = listarVendas();
    renderizarRelatorio(historicoVendas);
}

document.addEventListener('DOMContentLoaded', carregarDadosDoRelatorio);