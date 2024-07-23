import fs from 'fs';

class persistenciaDatos {
    constructor() {
        this.products = [];
        this.cargarProductos();
    }

    cargarProductos() {
        return new Promise((resolve, reject) => {
            fs.readFile('productos.json', 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    this.products = JSON.parse(data);
                    resolve(this.products);
                }
            });
        });
    }

    getProductos() {
        return this.products;
    }

    crearProductos(product) {
        this.products.push(product);
        return this.saveProducts();
    }

    guardarProductos() {
        return new Promise((resolve, reject) => {
            fs.writeFile('products.json', JSON.stringify(this.products, null, 2), (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

export default new persistenciaDatos();
