import express from 'express';
const router = express.Router();
import fs from 'fs';
const products=[];

router.get('/',(req,res)=>{
    if (fs.existsSync('productos.json')) {
        fs.readFile('productos.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                console.log('Error al leer archivo');
            } else {
                try {
                    let products = JSON.parse(data);
                    res.render('home',{products})
                } catch (parseErr) {
                    console.log('Error al parsear el archivo:');
                }
            }
        });
    } else {
        console.log("No hay datos");
    }
})

router.get('/realtimeproducts',(req,res)=>{
    if (fs.existsSync('productos.json')) {
        fs.readFile('productos.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                console.log('Error al leer archivo');
            } else {
                try {
                    let products = JSON.parse(data);
                    res.render('realTimeProducts',{products})
                } catch (parseErr) {
                    console.log('Error al parsear el archivo:');
                }
            }
        });
    } else {
        console.log("No hay datos");
    }
})

export default router;

/*

function validaTipoString(valor) {
    return typeof valor === 'string' && valor.trim() !== '';
}


function validaTipoNumero(valor) {
    return !isNaN(parseFloat(valor)) && isFinite(valor);
}


router.get("/api/products", (req, res) => {
    let limit = parseInt(req.query.limit)
    if (fs.existsSync('productos.json')) {
        fs.readFile('productos.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error servidor interno' });
            } else {
                try {
                    let products = JSON.parse(data);
                    if (!isNaN(limit) && limit > 0) {
                     const listarProducto = products.slice(0,limit);  
                     res.json(listarProducto); 
                    }else{res.json(products);}
                } catch (parseErr) {
                    console.error('Error al parsear el archivo:', parseErr);
                    res.status(500).json({ error: 'Error al parsear el archivo' });
                }
            }
        });
    } else {
        res.status(204).json({ error: 'No hay datos' });
    }
});
router.get("/api/products/:pid", (req, res) => {
    const idProducto = parseInt(req.params.pid);
    if (!fs.existsSync('productos.json')) {
        return res.status(204).json({ error: 'No existen datos' });
    }
    fs.readFile('productos.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return res.status(500).json({ error: 'Error servidor interno' });
        } else {
           let products = JSON.parse(data);
            const productoMostrar = products.filter(product => product.id == idProducto);
            if (productoMostrar.length === 0) {
                return res.status(404).json({ message: `Producto con ID ${idProducto} no existe` });
            }
            res.json(productoMostrar);
        }
    });
});

router.delete("/api/products/:id", (req, res) => {
    const idProducto = parseInt(req.params.id);
    if (!fs.existsSync('productos.json')) {
        return res.status(204).json({ error: 'No existen datos' });
    }
    fs.readFile('productos.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return res.status(500).json({ error: 'Error servidor interno' });
        } else {
           let products = JSON.parse(data);
            const productIndex = products.findIndex(product => product.id == idProducto);
            if (productIndex === -1) {
                return res.status(404).json({ message: `Producto con ID ${idProducto} no existe` });
            }
            products.splice(productIndex, 1);

            fs.writeFile('productos.json', JSON.stringify(products, null, 2), err => {
                if (err) {
                    console.error('Error al escribir el archivo:', err);
                    return res.status(500).json({ error: 'Error servidor interno' });
                }
                res.json({ message: `Producto con ID ${idProducto} eliminado` });
            });
        }
    });
});

router.post("/api/products",(req,res)=>{
    const {title, description, code, price, status, stock, category }= req.body;
    if (status !== true && status !== false) {
        return res.status(400).json({ error: 'El campo status debe ser true o false' });
    }
    if (!validaTipoString(title) || !validaTipoString(description) || !validaTipoString(code) || !validaTipoString(category)) {
        return res.status(400).json({ error: 'Los campo title, code, description y category deben ser de tipo string' });
    }
    if (!validaTipoNumero(price)||!validaTipoNumero(stock)){
        return res.status(400).json({ error: 'Los campo price y stock deben ser de tipo numerico' });
    }
    if (fs.existsSync('productos.json') )
    {
        fs.readFile('productos.json','utf8',(err,data)=>{
            if(err)
            {
                console.error(err);
                return res.status(500).json({error:'Error servidor interno'});
            }else
            {
                const contenidoJson = JSON.parse(data);
                const newId = contenidoJson.length > 0 ? Math.max(...(contenidoJson.map(p => p.id))) + 1 : 1;
                console.log(newId)
                products.push({ id:newId, title, description, code, price, status, stock, category });
                fs.writeFile('productos.json', JSON.stringify(products,null,2),err =>{
                if(err){
                  console.error(err);
                  return res.status(500).json({error: 'Error Interno'});
                }  
                res.json(products);
                });
            }
            
        })
    }else
    {
        products.push({ id:1, title, description, code,  price, status, stock, category });
        fs.writeFile('productos.json', JSON.stringify(products,null,2),err =>{
            if(err){
                  console.error(err);
                  return res.status(500).json({error: 'Error Interno'});
            }  
            res.json(products);
          });
    }
})

router.put("/api/products/:pid", (req, res) => {
    const idProducto = parseInt(req.params.pid);
    const { title, description, code, price, status, stock, category } = req.body;

    if (status !== true && status !== false) {
        return res.status(400).json({ error: 'El campo status debe ser true o false' });
    }
    if (!validaTipoString(title) || !validaTipoString(description) || !validaTipoString(code) || !validaTipoString(category)) {
        return res.status(400).json({ error: 'Los campo title, code, description y category deben ser de tipo string' });
    }
    if (!validaTipoNumero(price)||!validaTipoNumero(stock)){
        return res.status(400).json({ error: 'Los campo price y stock deben ser de tipo numerico' });
    }

    if (fs.existsSync('productos.json')) {
        fs.readFile('productos.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error servidor interno' });
            } else {
                let products = JSON.parse(data);
                const index = products.findIndex(producto => producto.id === idProducto);
                if (index !== -1) {
                    // Actualizar el producto encontrado
                    products[index] = { id: idProducto, title, description, code, price, status, stock, category };

                    // Guardar los productos actualizados en el archivo JSON
                    fs.writeFile('productos.json', JSON.stringify(products, null, 2), err => {
                        if (err) {
                            console.error(err);
                            return res.status(500).json({ error: 'Error interno al actualizar el producto' });
                        }
                        res.json(products);
                    });
                } else {
                    return res.status(404).json({ message: 'Producto no encontrado' });
                }
            }
        });
    } else {
        return res.status(404).json({ message: 'Archivo de productos no encontrado' });
    }
});
export default router;
*/