let editandoId = null;
carregarDados();

    function carregarTabela() {
      const mesas = listarMesas();
      const tabelaDiv = document.getElementById('tabelaMesas');

      if (mesas.length === 0) {
        tabelaDiv.innerHTML = `
          <div class="empty-state">
            <i class="fas fa-inbox"></i>
            <p>Nenhuma mesa cadastrada ainda</p>
          </div>
        `;
        return;
      }

      let html = `
        <table>
          <thead>
            <tr>
              <th>Mesa</th>
              <th>Lugares</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
      `;

      mesas.forEach(mesa => {
        const badgeClass = `status-${mesa.status.toLowerCase()}`;
        html += `
          <tr>
            <td>#${mesa.numero}</td>
            <td>${mesa.lugares}</td>
            <td><span class="status-badge ${badgeClass}">${mesa.status}</span></td>
            <td>
              <div class="action-buttons">
                <button class="btn-small btn-edit" onclick="editarMesaUI(${mesa.id})">
                  <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn-small btn-delete" onclick="apagarMesa(${mesa.id})">
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

    document.getElementById('formMesa').addEventListener('submit', (e) => {
      e.preventDefault();

      const numero = parseInt(document.getElementById('numeroMesa').value);
      const lugares = parseInt(document.getElementById('lugaresMesa').value);
      const status = document.getElementById('statusMesa').value;

      if (editandoId) {
        editarMesa(editandoId, { numero, lugares, status });
        alert('✅ Mesa atualizada com sucesso!');
        editandoId = null;
      } else {
        // PASSO CORRETO: Envia o status já na criação
        adicionarMesa({ numero, lugares, status });
        alert('✅ Mesa adicionada com sucesso!');
      }

      document.getElementById('formMesa').reset();
      document.querySelector('.form-container h2').innerHTML = '<i class="fas fa-plus-circle"></i> Nova Mesa';
      carregarTabela(); // Recarrega a visualização
    });

    function editarMesaUI(id) {
      const mesa = listarMesas().find(m => m.id === id);
      if (!mesa) return;

      document.getElementById('numeroMesa').value = mesa.numero;
      document.getElementById('lugaresMesa').value = mesa.lugares;
      document.getElementById('statusMesa').value = mesa.status;
      editandoId = id;
      document.querySelector('.form-container h2').innerHTML = '<i class="fas fa-edit"></i> Editar Mesa';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function apagarMesa(id) {
      if (!confirm('Tem certeza que deseja apagar esta mesa?')) return;
      removerMesa(id);
      alert('✅ Mesa apagada com sucesso!');
      carregarTabela();
    }

    carregarTabela();