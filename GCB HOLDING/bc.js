document.addEventListener("DOMContentLoaded", loadInventory);

function logout() {
    localStorage.removeItem("loggedUser");
    window.location.href = "/cliente.html";
}

function toggleInventory() {
    const inventoryList = document.getElementById("inventory-list");
    inventoryList.classList.toggle("hidden");
}

function addProduct() {
    const name = document.getElementById("product-name").value.trim();
    const quantity = parseInt(document.getElementById("product-quantity").value);
    const category = document.getElementById("product-category").value;
    const location = document.getElementById("product-location").value.trim();

    if (!name || isNaN(quantity) || quantity <= 0 || !category || !location) {
        alert("Por favor, insira todos os campos corretamente.");
        return;
    }

    let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
    inventory.push({ name, quantity, category, location });
    localStorage.setItem("inventory", JSON.stringify(inventory));

    document.getElementById("product-name").value = "";
    document.getElementById("product-quantity").value = "";
    document.getElementById("product-location").value = "";

    loadInventory();
}

function sellProduct(index) {
    let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
    let item = inventory[index];

    const quantityToSell = parseInt(prompt(`Quantos ${item.name} você deseja vender? (Quantidade disponível: ${item.quantity})`));

    if (isNaN(quantityToSell) || quantityToSell <= 0) {
        alert("Por favor, insira uma quantidade válida para a venda.");
        return;
    }

    if (quantityToSell > item.quantity) {
        alert("Quantidade solicitada excede o estoque disponível!");
    } else {
        item.quantity -= quantityToSell;

       

        localStorage.setItem("inventory", JSON.stringify(inventory));
        loadInventory();
        alert(`${quantityToSell} unidades de ${item.name} foram vendidas!`);
    }
}

function loadInventory() {
    const inventoryList = document.getElementById("inventory-list");
    const emptyMessage = document.getElementById("empty-message");
    inventoryList.innerHTML = "";
    let inventory = JSON.parse(localStorage.getItem("inventory")) || [];

    if (inventory.length === 0) {
        emptyMessage.classList.remove("hidden");
    } else {
        emptyMessage.classList.add("hidden");
    }

    inventory.forEach((item, index) => {
        let li = document.createElement("li");
        li.textContent = `${item.name} - ${item.quantity} | Categoria: ${item.category} | Local: ${item.location}`;

        let sellBtn = document.createElement("button");
        sellBtn.textContent = "Vender";
        sellBtn.onclick = () => sellProduct(index);

        let removeBtn = document.createElement("button");
        removeBtn.textContent = "Remover";
        removeBtn.onclick = () => removeProduct(index);

        li.appendChild(sellBtn);
        li.appendChild(removeBtn);
        inventoryList.appendChild(li);
    });
}

function removeProduct(index) {
    let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
    inventory.splice(index, 1);
    localStorage.setItem("inventory", JSON.stringify(inventory));
    loadInventory();
}
