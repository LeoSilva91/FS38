document.addEventListener('DOMContentLoaded', function () {
    let id = 1; // gerar IDs únicos para novos produtos
    let availableIds = [];

    const colName = [
        "product_id",
        "product_name",
        "product_brand",
        "product_stock",
        "product_price_cost",
        "product_price",
    ];

    const productsListTable = document.getElementById("products-list");
    const tableBody = document.createElement("tbody");

// JSON.parse converte uma string JSON em um objeto JavaScript;localStora armazenamento do navegador; getItem("products") tenta recuperar um item armazenado;|| [] será inicializada como um array vazio ([]).
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let productIndexToDelete = null; // Para guardar o índice do produto a ser deletado -> botão "Deletar"
    let productIndexToEdit = null; // Para guardar o índice do produto a ser editado -> clica em "Editar"

    // Função para listar produtos na tabela
    // forEach() executa uma função fornecida uma vez para cada elemento do array, em ordem.
    function listProducts() {
        tableBody.innerHTML = ""; // Limpa a tabela antes de listar novamente
        products.forEach((produto, index) => { 
            const row = document.createElement("tr");

            colName.forEach((col) => {
                const td = document.createElement("td");  
                td.innerText = produto[col] || ""; // Usa valor vazio se não tiver o dado
                row.appendChild(td);
            });

            // Adiciona os botões de ação (Ver, Editar, Deletar)
            const actionsTd = document.createElement("td"); // Cria uma célula de tabela
            actionsTd.className = "d-flex justify-content-end gap-3";
            
            const viewButton = document.createElement("button");
            viewButton.className = "btn btn-info";
            viewButton.innerText = "Ver";
            viewButton.onclick = function() { viewProduct(index); };
            
            const editButton = document.createElement("button");
            editButton.className = "btn btn-primary";
            editButton.innerText = "Editar";
            editButton.onclick = function() { editProduct(index); };
            
            const deleteButton = document.createElement("button");
            deleteButton.className = "btn btn-danger";
            deleteButton.innerText = "Deletar";
            deleteButton.onclick = function() {
                productIndexToDelete = index; // Guarda o índice do produto a ser deletado
                const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
                deleteModal.show(); // chama o modal de confirmação
            };
            
            actionsTd.appendChild(viewButton);
            actionsTd.appendChild(editButton);
            actionsTd.appendChild(deleteButton);
            row.appendChild(actionsTd);

            tableBody.appendChild(row);
        });

        productsListTable.appendChild(tableBody);
    }

    // Função para adicionar um novo produto ou atualizar
    function addProduct() {
        const formAddProduct = document.getElementById("formAddProduct");
        const formData = new FormData(formAddProduct);

        if (productIndexToEdit !== null) {
            // Se estamos no modo de edição
            const produto = products[productIndexToEdit];
            formData.set("product_id", produto.product_id);
            const productData = Object.fromEntries(formData);
            products[productIndexToEdit] = productData; // Atualiza o produto existente
            productIndexToEdit = null; // Reseta o índice após editar
        } else {
            // Se estamos adicionando um novo produto
            let newId;
            if (availableIds.length > 0) {
                newId = availableIds.shift(); // Pega e remove o primeiro ID disponível
            } else {
                newId = id++;
            }
            formData.set("product_id", newId);
            const productData = Object.fromEntries(formData);
            products.push(productData);
        }

        localStorage.setItem("products", JSON.stringify(products));
        listProducts();
        formAddProduct.reset(); // Limpa o formulário após adicionar ou editar

        // Fechar o modal após salvar
        const addModal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
        addModal.hide();
    }

    // Expondo a função `addProduct` ao escopo global
    window.addProduct = addProduct;

    // Função para visualizar um produto
    function viewProduct(index) {
        const produto = products[index];
        const details = `
            <strong>Produto:</strong> ${produto.product_name}<br>
            <strong>Marca:</strong> ${produto.product_brand}<br>
            <strong>Estoque:</strong> ${produto.product_stock}<br>
            <strong>Preço Custo:</strong> R$ ${produto.product_price_cost}<br>
            <strong>Preço Venda:</strong> R$ ${produto.product_price}
        `;

        // Define os detalhes no parágrafo do modal
        document.getElementById('productDetails').innerHTML = details;

        // Exibe o modal de visualização
        const viewModal = new bootstrap.Modal(document.getElementById('viewProductModal'));
        viewModal.show();
    }

    // Função para editar um produto
    function editProduct(index) {
        const produto = products[index];
        const formAddProduct = document.getElementById("formAddProduct");

        // Preenche o formulário com os dados do produto
        formAddProduct.elements["product_name"].value = produto.product_name;
        formAddProduct.elements["product_brand"].value = produto.product_brand;
        formAddProduct.elements["product_stock"].value = produto.product_stock;
        formAddProduct.elements["product_price_cost"].value = produto.product_price_cost;
        formAddProduct.elements["product_price"].value = produto.product_price;

        productIndexToEdit = index; // Guarda o índice do produto a ser editado

        // Abre o modal de cadastro para edição
        const addModal = new bootstrap.Modal(document.getElementById('exampleModal'));
        addModal.show();
    }

    // Função para deletar um produto
    function deleteProduct() {
        if (productIndexToDelete !== null) {
            const deletedProduct = products.splice(productIndexToDelete, 1)[0];
            availableIds.push(deletedProduct.product_id); // Adiciona o ID deletado à lista de IDs disponíveis
            localStorage.setItem("products", JSON.stringify(products));
            listProducts();
            productIndexToDelete = null; // Reseta o índice após a exclusão
            
            // Fecha o modal e mostra mensagem de sucesso
            const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
            deleteModal.hide(); // Fecha o modal de exclusão
            alert("Item excluído com sucesso!"); // Mensagem de sucesso
        }
    }

    // Atribui a função deleteProduct ao botão de confirmação do modal
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.onclick = deleteProduct;
    } else {
        console.error("Botão de confirmação de exclusão não encontrado!");
    }

    // Inicializa a tabela de produtos
    productsListTable.appendChild(tableBody);
    listProducts();
});


