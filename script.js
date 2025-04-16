function adicionarTarefa() {
    const input = document.getElementById("nova-tarefa");
    const texto = input.ariaValueMax.trim();
    if (texto === "") return;
    const li = document.createElement("li");
    li.textContent = texto;
    document.getElementById("lista-tarefas").appendChild(li);
    input.value = "";  
}