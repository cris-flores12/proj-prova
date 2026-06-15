 let editandoId = null;

    function carregarTabela() {
      const produtos = listarProdutos();
      const tabelaDiv = document.getElementById('tabelaProdutos');

      if (produtos.length === 0) {
        tabelaDiv.innerHTML = `
          <div class="empty-state">
            <i class="fas fa-inbox"></i>
            <p>Nenhum produto cadastrado ainda</p>
          </div>
        `;
        return;
      }

      let html = `
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
      `;

      produtos.forEach(produto => {
        html += `
          <tr>
            <td>${produto.nome}</td>
            <td>${produto.categoria}</td>
            <td class="price-display">${formatarMoeda(produto.preco)}</td>
            <td>${produto.descricao}</td>
            <td>
              <div class="action-buttons">
                <button class="btn-small btn-edit" onclick="editarProdutoUI(${produto.id})">
                  <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn-small btn-delete" onclick="apagarProduto(${produto.id})">
                  <i class="fas fa-trash"></i> Apagar
                </button>
              </div>
            </td>
          </tr>
        `;
      });

      html += `
          </tbody>
        </table>
      `;

      tabelaDiv.innerHTML = html;
    }

    document.getElementById('formProduto').addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = document.getElementById('nomeProduto').value;
      const categoria = document.getElementById('categoriaProduto').value;
      const preco = parseFloat(document.getElementById('precoProduto').value);
      const descricao = document.getElementById('descricaoProduto').value;

      if (editandoId) {
        editarProduto(editandoId, { nome, categoria, preco, descricao });
        alert('✅ Produto atualizado com sucesso!');
        editandoId = null;
      } else {
        adicionarProduto({ nome, categoria, preco, descricao });
        alert('✅ Produto adicionado com sucesso!');
      }

      document.getElementById('formProduto').reset();
      document.querySelector('.form-container h2').innerHTML = '<i class="fas fa-plus-circle"></i> Novo Produto';
      carregarTabela();
    });

    function editarProdutoUI(id) {
      const produtos = listarProdutos();
      const produto = produtos.find(p => p.id === id);

      if (produto) {
        document.getElementById('nomeProduto').value = produto.nome;
        document.getElementById('categoriaProduto').value = produto.categoria;
        document.getElementById('precoProduto').value = produto.preco;
        document.getElementById('descricaoProduto').value = produto.descricao;

        editandoId = id;
        document.querySelector('.form-container h2').innerHTML = `<i class="fas fa-edit"></i> Editar Produto`;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    function apagarProduto(id) {
      if (confirm('Tem certeza que deseja apagar este produto?')) {
        removerProduto(id);
        alert('✅ Produto apagado com sucesso!');
        carregarTabela();
      }
    }

    carregarTabela();