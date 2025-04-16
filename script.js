window.onload = function () {
    const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas")) || [];
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

    li.appendChild(botaoExcluir);

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