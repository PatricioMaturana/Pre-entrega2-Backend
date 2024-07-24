import express from 'express';
import persistenciaDatos from '../../utils/persistenciaDatos.js';
import { io } from '../../app.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        await persistenciaDatos.cargarProductos();
        const products = persistenciaDatos.getProductos();
        res.render('home', { products });
    } catch (error) {
        res.status(500).send('Error al cargar los datos');
    }
});

router.get('/realtimeproducts', async (req, res) => {
    try {
        await persistenciaDatos.cargarProductos();
        const products = persistenciaDatos.getProductos();
        res.render('realTimeProducts', { products });
    } catch (error) {
        res.status(500).send('Error al cargar los datos');
    }
});

// API Routes
router.post('/api/products', async (req, res) => {
    let { title, description, code, price, stock, category, imagen } = req.body;

    // Convertir price y stock a valores numéricos
    price = parseFloat(price);
    stock = parseInt(stock);

    // Validación de datos
    if (isNaN(price) || isNaN(stock)) {
        return res.status(400).json({ error: 'Los campos price y stock deben ser valores numéricos' });
    }
    const newId = persistenciaDatos.getProductos().length + 1;
    const newProduct = { id: newId, title, description, code, price, stock, category, imagen };
    try {
        await persistenciaDatos.crearProducto(newProduct);
        io.emit('newProduct', newProduct);  
        res.json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar el producto' });
    }
});

router.delete('/api/products/:id', async (req, res) => {
    const idProducto = parseInt(req.params.id);
    try {
        await persistenciaDatos.eliminarProducto(idProducto);
        io.emit('deleteProduct', idProducto);
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});

export default router;