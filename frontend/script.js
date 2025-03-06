const API_URL = `http://localhost:3000/contatos`;

// Carrega contatos ao iniciar a página
document.addEventListener('DOMContentLoaded', loadContacts);

// Função para carregar e exibir contatos na tabela
async function loadContacts() {
    try {
        const response = await fetch(`http://localhost:3000/contatos`);
        if (!response.ok) {
            throw new Error('Erro ao buscar contatos');
        }

        const contatos = await response.json();

        const contactList = document.getElementById('contact-list');
        contactList.innerHTML = '';

        contatos.forEach(contato => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${contato.id}</td>
                <td>${contato.nome}</td>
                <td>${contato.telefone}</td>
                <td>${contato.cep || '-'}</td>
                <td>${contato.endereco || '-'}</td>
                <td>${contato.bairro || '-'}</td>
                <td>${contato.cidade || '-'}</td>
                <td>${contato.estado || '-'}</td>
                <td>
                    <button onclick='editContact(${contato.id})'>✏️ Editar</button>
                    <button onclick='deleteContact(${contato.id})'>🗑️ Deletar</button>
                </td>
            `;
            contactList.appendChild(row);
        });

    } catch (error) {
        console.error('Erro ao carregar contatos:', error);
    }
}

// Busca endereço pelo CEP
async function buscarCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cep.length !== 8) return;

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (!data.erro) {
            document.getElementById('endereco').value = data.logradouro || '';
            document.getElementById('bairro').value = data.bairro || '';
            document.getElementById('cidade').value = data.localidade || '';
            document.getElementById('estado').value = data.uf || '';
        } else {
            alert('CEP não encontrado!');
        }
    } catch (error) {
        alert('Erro ao buscar CEP.');
    }
}

// Adiciona ou atualiza um contato
async function addContact() {
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const cep = document.getElementById('cep').value;
    const endereco = document.getElementById('endereco').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;

    if (nome && telefone) {
        try {
            const response = await fetch(`http://localhost:3000/contatos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, telefone, cep, endereco, bairro, cidade, estado })
            });

            if (response.ok) {
                alert('Contato cadastrado com sucesso!');
                document.getElementById('contact-list').reset();
                loadContacts(); // Recarrega a lista após adicionar
            } else {
                alert('Erro ao cadastrar contato.');
            }
        } catch (error) {
            alert('Erro de conexão com o servidor.');
        }
    } else {
        alert('Preencha pelo menos nome e telefone!');
    }
}

// Preenche formulário para edição de contato
async function editContact(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error('Erro ao buscar contato');

        const contato = await response.json();

        document.getElementById('contact-id').value = contato.id;
        document.getElementById('nome').value = contato.nome;
        document.getElementById('telefone').value = contato.telefone;
        document.getElementById('cep').value = contato.cep || '';
        document.getElementById('endereco').value = contato.endereco || '';
        document.getElementById('bairro').value = contato.bairro || '';
        document.getElementById('cidade').value = contato.cidade || '';
        document.getElementById('estado').value = contato.estado || '';
    } catch (error) {
        alert('Erro ao carregar contato.');
    }
}

// Deleta um contato
async function deleteContact(id) {
    if (!confirm('Tem certeza que deseja excluir este contato?')) return;

    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        loadContacts(); // Atualiza a lista de contatos
    } catch (error) {
        alert('Erro ao deletar contato.');
    }
}
