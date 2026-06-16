let historicoVendas = [];

window.onload = function() {
    const dadosSalvos = localStorage.getItem('historicoVendas');
    
    if (dadosSalvos) {
        historicoVendas = JSON.parse(dadosSalvos);
    } else {
        // Dados iniciais baseados em consumos reais de churrascaria para o teste
        historicoVendas = [
            { id: 169001, mesaNome: "Mesa 08 (Familiar)", formaPagamento: "Pix", valorTotal: 489.50 },
            { id: 169002, mesaNome: "Mesa 03", formaPagamento: "Cartão de Crédito", valorTotal: 198.00 },
            { id: 169003, mesaNome: "Mesa 12", formaPagamento: "Dinheiro", valorTotal: 312.40 }
        ];
        localStorage.setItem('historicoVendas', JSON.stringify(historicoVendas));
    }

    renderizarRelatorio(historicoVendas);
};

// Exibição e Cálculo de Métricas (Read do CRUD)
function renderizarRelatorio(dadosParaExibir) {
    const corpoTabela = document.getElementById('corpo-tabela-historico');
    corpoTabela.innerHTML = '';

    let faturamentoTotal = 0;
    let totalContas = dadosParaExibir.length;

    dadosParaExibir.forEach(venda => {
        faturamentoTotal += venda.valorTotal;

        let linha = document.createElement('tr');
        linha.innerHTML = `
            <td><strong>${venda.mesaNome}</strong></td>
            <td>${venda.formaPagamento}</td>
            <td>R$ ${venda.valorTotal.toFixed(2)}</td>
            <td>
                <button class="btn-danger" onclick="deletarFechamento(${venda.id})">
                    <i class="fa-solid fa-rotate-left"></i> Estornar
                </button>
            </td>
        `;
        corpoTabela.appendChild(linha);
    });

    // Estrutura condicional para cálculo seguro do Ticket Médio da Churrascaria
    let ticketMedio = totalContas > 0 ? faturamentoTotal / totalContas : 0;

    // Atualização do DOM
    document.getElementById('metric-faturamento').textContent = `R$ ${faturamentoTotal.toFixed(2)}`;
    document.getElementById('metric-quantidade').textContent = totalContas;
    document.getElementById('metric-ticket').textContent = `R$ ${ticketMedio.toFixed(2)}`;
}

// Filtro / Pesquisa (Search do CRUD)
function filtrarHistorico() {
    const termoBusca = document.getElementById('search-input').value.toLowerCase();
    
    const dadosFiltrados = historicoVendas.filter(venda => {
        return venda.mesaNome.toLowerCase().includes(termoBusca) || 
               venda.formaPagamento.toLowerCase().includes(termoBusca);
    });

    renderizarRelatorio(dadosFiltrados);
}

// Remoção (Delete do CRUD) com atualização do LocalStorage
function deletarFechamento(idVenda) {
    if (confirm("Deseja estornar esta conta da Churrascaria Querência? O registro será deletado permanentemente.")) {
        historicoVendas = historicoVendas.filter(venda => venda.id !== idVenda);
        localStorage.setItem('historicoVendas', JSON.stringify(historicoVendas));
        renderizarRelatorio(historicoVendas);
    }
}