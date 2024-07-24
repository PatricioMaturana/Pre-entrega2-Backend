const socket = io();

document.getElementById('btnAgregar').addEventListener('click', () => 
    {
        const code = document.getElementById('code').value;
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const price = parseFloat(document.getElementById('precio').value);
        const stock = parseInt(document.getElementById('stock').value);
        const category = document.getElementById('category').value;
        const imagen = document.getElementById('imagenURL').value;

        // Valido que price y stock sean numéricos
        if (isNaN(price) || isNaN(stock)) {
            alert('Los campos precio y stock deben ser valores numéricos.');
            return;
        }

        const newProduct = { code, title, description, price, stock, category, imagen };

        fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
        .then(response => response.json())
        .then(product => {
            socket.emit('newProduct', product);  
        });
    });

socket.on('newProduct', (product) => {
    const cardGroup = document.getElementById('card-group');
    const productCard = document.createElement('div');
    productCard.classList.add('row', 'g-0');
    productCard.id = `product-${product.id}`;
    productCard.innerHTML = `
        <div class="col-md-4">
            <img src="${product.imagen}" class="img-fluid rounded-start" width="80px" alt="${product.title}">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">Género: ${product.category}</p>   
                <p class="card-text">Precio: ${product.price}</p>  
                <p class="card-text">Code: ${product.code}</p>    
                <p class="card-text">Stock: ${product.stock}</p>
                <p class="card-text">Descripción: ${product.description}</p>                                    
                <button type="button" id="${product.id}" class="boton btn-eliminar">Eliminar</button>
            </div>
        </div>
    `;
    cardGroup.appendChild(productCard);
});

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-eliminar')) {
        const id = event.target.id;
        fetch(`/api/products/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(() => {
            const productCard = document.getElementById(`product-${id}`);
            productCard.remove();
        });
    }
});
