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
    // Tomar todos los datos de la URL
    const { 
        id, recibo, cliente, excursion, 
        adultos, ninos, precioAdulto, 
        subtotal, deposito, balance, estado 
    } = req.query;

    // Validar parámetros obligatorios
    if (!id || !recibo) {
        return res.status(400).send('❌ Faltan parámetros obligatorios: id y recibo');
    }

    // Construir los datos con valores por defecto si faltan
    const datos = {
        idFactura: id,
        numeroRecibo: recibo,
        cliente: cliente || 'Cliente no especificado',
        excursion: excursion || 'Excursión no especificada',
        adultos: parseInt(adultos) || 1,
        ninos: parseInt(ninos) || 0,
        precioAdulto: parseFloat(precioAdulto) || 75,
        subtotal: parseFloat(subtotal) || 375,
        depositoPagado: parseFloat(deposito) || 0,
        totalPendiente: parseFloat(balance) || 375,
        metodoPago: 'Efectivo',
        fecha: new Date().toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        estado: estado || 'pendiente'
    };

    // Determinar estado visual
    let estadoTexto = '';
    let estadoColor = '';
    
    switch(datos.estado) {
        case 'completo':
            estadoTexto = '✅ PAGADO COMPLETO';
            estadoColor = '#28a745';
            break;
        case 'deposito':
            estadoTexto = '💳 DEPÓSITO PAGADO (25%)';
            estadoColor = '#ffc107';
            break;
        case 'pendiente':
            estadoTexto = '⏳ PENDIENTE DE PAGO';
            estadoColor = '#dc3545';
            break;
        default:
            estadoTexto = '❓ ESTADO DESCONOCIDO';
            estadoColor = '#6c757d';
    }

    res.render('recibo', {
        ...datos,
        estadoTexto,
        estadoColor
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor en http://localhost:${PORT}`);
});
