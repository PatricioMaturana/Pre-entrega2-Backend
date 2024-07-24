import fs from 'fs';
import path from 'path';

class PersistenciaDatos {
    constructor() {
        this.dataFilePath = path.resolve('productos.json');
        this.products = [];
        this.cargarProductos();
    }

    cargarProductos() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.dataFilePath, 'utf8', (err, data) => {
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

    crearProducto(product) {
        this.products.push(product);
        return this.guardarProductos();
    }

    eliminarProducto(id) {
        this.products = this.products.filter(product => product.id !== id);
        return this.guardarProductos();
    }

    guardarProductos() {
        return new Promise((resolve, reject) => {
            fs.writeFile(this.dataFilePath, JSON.stringify(this.products, null, 2), (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

export default new PersistenciaDatos();