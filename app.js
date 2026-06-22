const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// ====== CLAVE SECRETA PARA ADMIN ======
// Cambia esta clave por una que solo tú conozcas
const ADMIN_KEY = 'admin2026';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/ver-recibo', (req, res) => {
    const { 
        id, recibo, cliente, excursion, 
        adultos, ninos, precioAdulto, precioNino,
        subtotal, descuento, total, deposito, estado, metodoPago,
        whatsapp, correo, hotel, habitacion, horaRecogida, transporte, notas, fechaExcursion,
        tipoExcursion, grupo, capacidadMaxima,
        admin, tipoRecogida, lugarRecogida
    } = req.query;

    // ====== VALIDAR PARÁMETROS OBLIGATORIOS ======
    if (!cliente || !excursion) {
        return res.status(400).send('Faltan parámetros obligatorios: cliente y excursion');
    }

    // ====== GENERAR ID Y RECIBO SI NO VIENEN ======
    const idFinal = id || 'REC-' + Date.now();
    const reciboFinal = recibo || idFinal;

    // ====== CALCULAR VALORES NUMÉRICOS ======
    const numAdultos = parseInt(adultos) || 1;
    const numNinos = parseInt(ninos) || 0;
    const precioAdultoNum = parseFloat(precioAdulto) || 0;
    const precioNinoNum = parseFloat(precioNino) || 0;
    
    let subtotalCalculado = parseFloat(subtotal) || 0;
    if (subtotalCalculado === 0) {
        if (tipoExcursion === 'privado') {
            subtotalCalculado = precioAdultoNum;
        } else {
            subtotalCalculado = (numAdultos * precioAdultoNum) + (numNinos * precioNinoNum);
        }
    }
    
    const descuentoNum = parseFloat(descuento) || 0;
    const totalCalculado = parseFloat(total) || (subtotalCalculado - descuentoNum);
    const depositoNum = parseFloat(deposito) || 0;
    
    // ====== CALCULAR BALANCE PENDIENTE ======
    let balancePendiente = totalCalculado - depositoNum;
    
    if (estado === 'completo' || balancePendiente <= 0.009) {
        balancePendiente = 0;
    }

    // ====== PROCESAR RECOGIDA ======
    const esSinRecogida = tipoRecogida === 'Sin Recogida';
    
    let recogidaMostrar = '';
    let lugarMostrar = '';
    
    if (esSinRecogida) {
        recogidaMostrar = 'Lugar de la Excursión';
        lugarMostrar = lugarRecogida || hotel || '';
    } else {
        recogidaMostrar = tipoRecogida || 'Hotel';
        lugarMostrar = lugarRecogida || hotel || '';
    }

    let habitacionMostrar = habitacion || '';
    if (esSinRecogida) {
        habitacionMostrar = '---';
    }

    let horaMostrar = horaRecogida || '';
    let labelHora = esSinRecogida ? 'Hora de la Excursión' : 'Hora de Recogida';

    // ====== DETERMINAR ESTADO REAL ======
    let estadoReal = estado || 'pendiente';
    
    if (balancePendiente <= 0.009) {
        estadoReal = 'completo';
    }
    
    if (estadoReal === 'deposito' && depositoNum === 0) {
        estadoReal = 'pendiente';
    }

    // ====== TEXTO Y COLOR DEL ESTADO ======
    let estadoTexto = '';
    let estadoColor = '';

    switch(estadoReal) {
        case 'completo':
            estadoTexto = 'PAGADO COMPLETO';
            estadoColor = '#28a745';
            break;
        case 'deposito':
            estadoTexto = 'DEPÓSITO PAGADO (25%)';
            estadoColor = '#ffc107';
            break;
        case 'pendiente':
            estadoTexto = 'PENDIENTE DE PAGO';
            estadoColor = '#dc3545';
            break;
        default:
            estadoTexto = 'ESTADO DESCONOCIDO';
            estadoColor = '#6c757d';
    }

    // ====== VERIFICAR SI ES ADMIN ======
    // Solo mostrar botones si admin coincide con la clave secreta
    const esAdmin = admin === ADMIN_KEY;

    // ====== DATOS PARA LA VISTA ======
    const datos = {
        idFactura: idFinal,
        numeroRecibo: reciboFinal,
        cliente: cliente || 'Cliente no especificado',
        excursion: excursion || 'Excursión no especificada',
        adultos: numAdultos,
        ninos: numNinos,
        precioAdulto: precioAdultoNum,
        precioNino: precioNinoNum,
        subtotal: subtotalCalculado,
        descuento: descuentoNum,
        total: totalCalculado,
        depositoPagado: depositoNum,
        totalPendiente: balancePendiente,
        metodoPago: metodoPago || 'Efectivo',
        whatsapp: whatsapp || '',
        correo: correo || '',
        tipoRecogida: recogidaMostrar,
        lugarRecogida: lugarMostrar,
        habitacion: habitacionMostrar,
        horaRecogida: horaMostrar,
        labelHora: labelHora,
        esSinRecogida: esSinRecogida,
        transporte: transporte || 'Sí',
        notas: notas || 'Sin notas adicionales',
        fechaExcursion: fechaExcursion || new Date().toLocaleDateString('es-ES'),
        fecha: new Date().toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        estado: estadoReal,
        estadoTexto: estadoTexto,
        estadoColor: estadoColor,
        tipoExcursion: tipoExcursion || 'compartido',
        grupo: grupo || '',
        capacidadMaxima: capacidadMaxima || '',
        mostrarBotones: esAdmin
    };

    res.render('recibo', datos);
});

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
    console.log(`Clave admin: ${ADMIN_KEY}`);
});
