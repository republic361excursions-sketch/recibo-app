const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.send('✅ Servidor funcionando correctamente');
});

app.get('/ver-recibo', (req, res) => {
    const { id, recibo } = req.query;
    
    if (!id || !recibo) {
        return res.status(400).send('❌ Faltan parámetros: id y recibo son obligatorios');
    }
    
    res.render('recibo', {
        idFactura: id,
        numeroRecibo: recibo,
        fecha: new Date().toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        hora: new Date().toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        })
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor en http://localhost:${PORT}`);
});
