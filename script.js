window.onload = function () {
    const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas"));
    tarefasSalvas.forEach(tarefa => criarElementoTarefa(tarefa.texto, tarefa.riscada));
};

function adicionarTarefa() {
    const input = document.getElementById("nova-tarefa");
    const texto = input.value.trim();

    if (texto === "") return;

    criarElementoTarefa(texto, false);
    input.value = "";
    salvarTarefas();
}

function criarElementoTarefa(texto, riscada) {
    const li = document.createElement("li");
    li.textContent = texto;

    if (riscada) {
        li.classList.add("riscada");
    }

    // Clicar para riscar.
    li.addEventListener("click", function () {
        li.classList.toggle("riscada");
        salvarTarefas(); 
    });

    // Botão de excluir.
    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "X";
    botaoExcluir.className = "excluir";

    botaoExcluir.addEventListener("click", function (event) {
        event.stopPropagation();
        li.remove();
        salvarTarefas();
    });

    // Botão editar tarefa
    const botaoEditar = document.createElement("button");
    botaoEditar.textContent = "✏️";
    botaoEditar.className = "editar";

    botaoEditar.addEventListener("click", function (event) {
        event.stopPropagation();
        const novoTexto = prompt("Editar tarefa:", texto);
        if (novoTexto !== null && novoTexto.trim() !== "") {
        li.firstChild.textContent = novoTexto.trim();
        salvarTarefas ();
        }
    });

    li.appendChild(botaoExcluir);
    li.appendChild(botaoEditar);

    document.getElementById("lista-tarefas").appendChild(li);
    input.value = "";  
}
function salvarTarefas() {
    const tarefas = [];
    const itens = document.querySelectorAll("#lista-tarefas li");
    itens.forEach(li => {
        tarefas.push({
            texto: li.firstChild.textContent.trim(),
            riscada: li.classList.contains("riscada")
        });
    });
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}
function limparTudo() {
    if (confirm("Tem certeza que deseja remover todas as tarefas?")){
        document.getElementById("lista-tarefas").innerHTML = "";
        localStorage.removeItem("tarefas");
    }
}