function adicionarTarefa() {
    const input = document.getElementById("nova-tarefa");
    const texto = input.value.trim();

    if (texto === "") return;

    const li = document.createElement("li");
    li.textContent = texto;

    // Clicar para riscar.
    li.addEventListener("click", function () {
        li.classList.toggle("riscada");
    });

    // Botão de excluir.
    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "X";
    botaoExcluir.className = "excluir";

    botaoExcluir.addEventListener("click", function (event) {
        event.stopPropagation();
        li.remove();
    });

    li.appendChild(botaoExcluir);

    document.getElementById("lista-tarefas").appendChild(li);
    input.value = "";  
}