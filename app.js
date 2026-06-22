const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

/**
 * CLAVE SECRETA PARA ADMINISTRADOR
 * Cambia esta clave por una que solo tú conozcas
 * @constant {string}
 */
const ADMIN_KEY = 'admin2026';

// Configuración del motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Ruta principal - Generador de recibos
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/**
 * Ruta para visualizar el recibo
 * @param {Object} req - Petición HTTP
 * @param {Object} res - Respuesta HTTP
 */
app.get('/ver-recibo', (req, res) => {
    const { 
        id, recibo, cliente, excursion, 
        adultos, ninos, precioAdulto, precioNino,
        subtotal, descuento, total, deposito, estado, metodoPago,
        whatsapp, correo, hotel, habitacion, horaRecogida, transporte, notas, fechaExcursion,
        tipoExcursion, grupo, capacidadMaxima,
        admin, tipoRecogida, lugarRecogida
    } = req.query;

    // ====== VALIDACIÓN DE PARÁMETROS OBLIGATORIOS ======
    if (!cliente || !excursion) {
        return res.status(400).send('Error: Los campos Cliente y Excursión son obligatorios.');
    }

    // ====== GENERACIÓN DE IDENTIFICADORES ======
    const idFinal = id || `REC-${Date.now()}`;
    const reciboFinal = recibo || idFinal;

    // ====== CÁLCULO DE VALORES NUMÉRICOS ======
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
    
    // ====== CÁLCULO DEL BALANCE PENDIENTE ======
    let balancePendiente = totalCalculado - depositoNum;
    
    if (estado === 'completo' || balancePendiente <= 0.009) {
        balancePendiente = 0;
    }

    // ====== PROCESAMIENTO DE LA RECOGIDA ======
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

    // ====== DETERMINACIÓN DEL ESTADO REAL ======
    let estadoReal = estado || 'pendiente';
    
    if (balancePendiente <= 0.009) {
        estadoReal = 'completo';
    }
    
    if (estadoReal === 'deposito' && depositoNum === 0) {
        estadoReal = 'pendiente';
    }

    // ====== TEXTO Y COLOR DEL ESTADO ======
    const estadoConfig = {
        completo: { texto: 'PAGADO COMPLETO', color: '#28a745' },
        deposito: { texto: 'DEPÓSITO PAGADO (25%)', color: '#ffc107' },
        pendiente: { texto: 'PENDIENTE DE PAGO', color: '#dc3545' }
    };
    
    const estadoInfo = estadoConfig[estadoReal] || { texto: 'ESTADO DESCONOCIDO', color: '#6c757d' };

    // ====== VERIFICACIÓN DE ADMINISTRADOR ======
    const esAdmin = admin === ADMIN_KEY;

    // ====== CONSTRUCCIÓN DE DATOS PARA LA VISTA ======
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
        estadoTexto: estadoInfo.texto,
        estadoColor: estadoInfo.color,
        tipoExcursion: tipoExcursion || 'compartido',
        grupo: grupo || '',
        capacidadMaxima: capacidadMaxima || '',
        mostrarBotones: esAdmin
    };

    res.render('recibo', datos);
});

/**
 * Iniciar el servidor
 */
app.listen(PORT, () => {
    console.log('========================================');
    console.log('  REPUBLIC EXCURSIONS - SISTEMA DE RECIBOS');
    console.log('========================================');
    console.log(`  Servidor: http://localhost:${PORT}`);
    console.log(`  Clave Admin: ${ADMIN_KEY}`);
    console.log('  Estado: Servidor corriendo correctamente');
    console.log('========================================');
});
