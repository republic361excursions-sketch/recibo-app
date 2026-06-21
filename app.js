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
        subtotal, deposito, estado 
    } = req.query;

    // Validar parámetros obligatorios
    if (!id || !recibo) {
        return res.status(400).send('❌ Faltan parámetros obligatorios: id y recibo');
    }

    // Convertir valores numéricos
    const numAdultos = parseInt(adultos) || 1;
    const numNinos = parseInt(ninos) || 0;
    const precioAdultoNum = parseFloat(precioAdulto) || 75;
    const subtotalNum = parseFloat(subtotal) || (numAdultos * precioAdultoNum);
    const depositoNum = parseFloat(deposito) || 0;

    // ✅ CÁLCULO AUTOMÁTICO DEL BALANCE PENDIENTE
    const totalPendiente = subtotalNum - depositoNum;

    // Construir los datos
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
        totalPendiente: totalPendiente, // ✅ AHORA ES UN CÁLCULO
        metodoPago: 'Efectivo',
        fecha: new Date().toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        estado: estado || 'pendiente'
    };

    // Determinar estado visual basado en el balance REAL
    let estadoTexto = '';
    let estadoColor = '';
    let estadoReal = datos.estado;

    // 🔥 CORRECCIÓN: Forzar estado 'completo' si el balance es 0
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
