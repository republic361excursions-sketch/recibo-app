const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos (CSS, JS, HTML)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal: muestra el formulario
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para ver el recibo
app.get('/ver-recibo', (req, res) => {
    const { 
        id, recibo, cliente, excursion, 
        adultos, ninos, precioAdulto, 
        subtotal, deposito, estado, metodoPago,
        whatsapp, correo, hotel
    } = req.query;

    if (!id || !recibo) {
        return res.status(400).send('❌ Faltan parámetros obligatorios: id y recibo');
    }

    const numAdultos = parseInt(adultos) || 1;
    const numNinos = parseInt(ninos) || 0;
    const precioAdultoNum = parseFloat(precioAdulto) || 75;
    const subtotalNum = parseFloat(subtotal) || (numAdultos * precioAdultoNum);
    const depositoNum = parseFloat(deposito) || 0;
    const totalPendiente = subtotalNum - depositoNum;

    const datos = {
        idFactura: id,
        numeroRecibo: recibo,
        cliente: cliente || 'Cliente no especificado',
        excursion: excursion || 'Excursión no especificada',
        adultos: numAdultos,
        ninos: numNinos,
        precioAdulto: precioAdultoNum,
        subtotal: subtotalNum,
        depositoPagado: depositoNum,
        totalPendiente: totalPendiente,
        metodoPago: metodoPago || 'Efectivo',
        whatsapp: whatsapp || '',
        correo: correo || '',
        hotel: hotel || '',
        fecha: new Date().toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        estado: estado || 'pendiente'
    };

    let estadoTexto = '';
    let estadoColor = '';
    let estadoReal = datos.estado;

    if (totalPendiente <= 0) {
        estadoReal = 'completo';
    }

    switch(estadoReal) {
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
