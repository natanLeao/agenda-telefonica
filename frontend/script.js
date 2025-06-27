const API_URL = "http://localhost:3000/api/contatos";

document.addEventListener('DOMContentLoaded', loadContacts);

async function loadContacts() {
    try {
        const response = await fetch(`${API_URL}`);
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
                <td>${contato.sobrenome}</td>
                <td>${contato.telefone}</td>
                <td>${contato.cep || '-'}</td>
                <td>${contato.endereco || '-'}</td>
                <td>${contato.complemento}</td>
                <td>${contato.bairro || '-'}</td>
                <td>${contato.cidade || '-'}</td>
                <td>${contato.estado || '-'}</td>
                <td>
                    <button onclick='editContact(${contato.id})'>🖊️ Editar</button>
                    <button onclick='deleteContact(${contato.id})'>✖️ Excluir</button>
                </td>
            `;
            contactList.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao carregar contatos:', error);
    }
}

async function buscarCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (cep.length !== 8) return alert("CEP inválido!");

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

async function addContact() {
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const telefone = document.getElementById('telefone').value;
    const cep = document.getElementById('cep').value;
    const endereco = document.getElementById('endereco').value;
    const complemento = document.getElementById('complemento').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;

    if (nome && telefone) {
        try {
            const response = await fetch(`${API_URL}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, sobrenome, telefone, cep, endereco, complemento, bairro, cidade, estado })
            });

            if (response.ok) {
                alert('Contato cadastrado com sucesso!');
                document.getElementById('contact-list').reset();
                loadContacts();
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

async function editContact(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error('Erro ao buscar contato');

        const contato = await response.json();

        document.getElementById('contact-id').value = contato.id;
        document.getElementById('nome').value = contato.nome;
        document.getElementById('sobrenome').value = contato.sobrenome;
        document.getElementById('telefone').value = contato.telefone;
        document.getElementById('cep').value = contato.cep || '';
        document.getElementById('endereco').value = contato.endereco || '';
        document.getElementById('complemento').value = contato.complemento;
        document.getElementById('bairro').value = contato.bairro || '';
        document.getElementById('cidade').value = contato.cidade || '';
        document.getElementById('estado').value = contato.estado || '';
    } catch (error) {
        alert('Erro ao carregar contato.');
    }
}

async function deleteContact(id) {
    if (!confirm('Tem certeza que deseja excluir este contato?')) return;

    try {
        const response = await fetch(`${API_URL}/${id}/`, { method: 'DELETE' });
        if (response.ok) {
            mostrarMensagem("Contato deletado com sucesso!");
            loadContacts();
        }
    } catch (error) {
        alert('Erro ao deletar contato.');
    }
}

document.getElementById("contact-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const id = document.getElementById("contact-id").value;
    const nome = document.getElementById("nome").value;
    const sobrenome = document.getElementById("sobrenome").value;
    const telefone = document.getElementById("telefone").value;
    const cep = document.getElementById("cep").value;
    const endereco = document.getElementById("endereco").value;
    const complemento = document.getElementById("complemento").value;
    const bairro = document.getElementById("bairro").value;
    const cidade = document.getElementById("cidade").value;
    const estado = document.getElementById("estado").value;

    if (!nome || !telefone) {
        alert("Preencha pelo menos o nome e o telefone!");
        return;
    }

    const contato = { nome, sobrenome, telefone, cep, endereco, complemento, bairro, cidade, estado };
    const method = id ? "PUT" : "POST";
    const url = id ? `${API_URL}/${id}` : API_URL;

    try {
        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contato)
        });

        if (response.ok) {
            mostrarMensagem("Contato salvo com sucesso!");
            document.getElementById("contact-form").reset();
            document.getElementById("contact-id").value = "";
            loadContacts();
        } else {
            alert("Erro ao salvar contato!");
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro ao conectar ao servidor!");
    }
});

function mostrarMensagem(texto) {
    const msg = document.getElementById("mensagem");
    msg.textContent = texto;
    msg.style.display = "block";

    setTimeout(() => {
        msg.style.display = "none";
    }, 3000);
}
