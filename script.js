// Recupera as tarefas salvas no localStorage
let tarefas = JSON.parse(localStorage.getItem('tarefas'));

// Função para mostrar apenas a aba clicada
function mostrarAba(id) {
    const abas = document.querySelectorAll('.conteudo-aba');
    const botoes = document.querySelectorAll('.aba');

    abas.forEach(aba => aba.classList.remove('ativo'));
    botoes.forEach(botao => botao.classList.remove('ativa'));

    document.getElementsById(id).classList.add('ativo');
    document.querySelector(`.aba[onclick="mostrarAba('${id}')"]`).classList.add('ativa');
}

// Função para adicionar nova tarefa
function adicionarTarefa() {
    const input = document.getElementById("nova-tarefa");
    const texto = input.value.trim();

    if (texto !== '') {
        tarefas.push(texto);
        salvarTarefas();
        exibirTarefas();
        input.value = '';   
    }
}

// Função para salvar as tarefas no navegador
function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// Função para exibir todas as tarefas na tela
function exibirTarefas() {
    const lista = document.getElementById('lista-tarefas');
    lista.innerHTML = '';

    tarefas.forEach((tarefa, index) => {
        const item = document.createElement('li');
        item.innerHTML = `
            <span>${tarefa}</span>
            <button onclick="editarTarefa(${index})">Editar</button>
            <button onclick="removerTarefa(${index})">Remover</button>
        `;
        lista.appendChild(item);
    });
}

// Função para remover uma tarefa
function removerTarefa(index) {
    tarefas.splice(index, 1);
    salvarTarefas();
    exibirTarefas();
}

// Função para limpar todas a tarefas
function limparTudo() {
    tarefas = [];
    salvarTarefas();
    exibirTarefas();
}

//Função para editar um tarefa
function editarTarefas(index) {
    const novaTarefa = prompt("Editar tarefa:", tarefas[index]);

    if (novaTarefa !== null && novaTarefa.trim() !== '') {
        tarefas[index] = novaTarefa.trim();
        salvarTarefas();
        exibirTarefas();
    }
}

//Exibe as tarefas salvas assim que a pagina carrega
exibirTarefas();