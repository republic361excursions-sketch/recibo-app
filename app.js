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

/**
 * TIEMPO DE EXPIRACIÓN DEL QR (en horas)
 * Cambia este valor según necesites
 * @constant {number}
 */
const QR_EXPIRATION_HOURS = 24;

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
        admin, tipoRecogida, lugarRecogida, timestamp
    } = req.query;

    // ====== VALIDACIÓN DE PARÁMETROS OBLIGATORIOS ======
    if (!cliente || !excursion) {
        return res.status(400).send('Error: Los campos Cliente y Excursión son obligatorios.');
    }

    // ====== VALIDACIÓN DE EXPIRACIÓN DEL QR ======
    // Solo validar expiración si NO es admin
    const esAdmin = admin === ADMIN_KEY;
    
    if (timestamp && !esAdmin) {
        const fechaGeneracion = parseInt(timestamp);
        const fechaActual = Date.now();
        const horasTranscurridas = (fechaActual - fechaGeneracion) / (1000 * 60 * 60);
        
        if (horasTranscurridas > QR_EXPIRATION_HOURS) {
            return res.status(410).send(`
                <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta name="theme-color" content="#1a2a4a">
                    <title>Recibo Expirado - Republic Excursions</title>
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
                    <style>
                        * { margin: 0; padding: 0; box-sizing: border-box; }
                        body {
                            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                            background: #f0f2f5;
                            min-height: 100vh;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            padding: 20px;
                        }
                        .container {
                            background: #ffffff;
                            max-width: 520px;
                            width: 100%;
                            padding: 45px 50px;
                            border-radius: 16px;
                            box-shadow: 0 8px 40px rgba(0, 0, 0, 0.08);
                            border: 1px solid #e8eaed;
                            text-align: center;
                        }
                        .icono {
                            font-size: 72px;
                            margin-bottom: 20px;
                        }
                        h1 {
                            color: #c62828;
                            font-size: 26px;
                            font-weight: 700;
                            margin-bottom: 12px;
                            letter-spacing: 0.5px;
                        }
                        .subtitulo-error {
                            color: #6b7a8f;
                            font-size: 15px;
                            line-height: 1.6;
                            margin-bottom: 8px;
                        }
                        .btn {
                            display: inline-block;
                            padding: 14px 36px;
                            background: #1a2a4a;
                            color: #ffffff;
                            border: none;
                            border-radius: 10px;
                            font-size: 14px;
                            font-weight: 600;
                            cursor: pointer;
                            text-decoration: none;
                            transition: all 0.3s ease;
                            font-family: 'Inter', sans-serif;
                            letter-spacing: 0.5px;
                            margin-top: 8px;
                        }
                        .btn:hover {
                            background: #2c3e6e;
                            transform: translateY(-2px);
                            box-shadow: 0 6px 20px rgba(26, 42, 74, 0.25);
                        }
                        .detalles {
                            margin-top: 20px;
                            padding: 16px 20px;
                            background: #f8f9fa;
                            border-radius: 10px;
                            font-size: 13px;
                            color: #8e9aaf;
                            text-align: left;
                            border: 1px solid #e8eaed;
                        }
                        .detalles .fila {
                            display: flex;
                            justify-content: space-between;
                            padding: 4px 0;
                            border-bottom: 1px solid #f0f0f0;
                        }
                        .detalles .fila:last-child {
                            border-bottom: none;
                        }
                        .detalles .label {
                            font-weight: 500;
                            color: #6b7a8f;
                        }
                        .detalles .valor {
                            font-weight: 600;
                            color: #1a2a4a;
                        }
                        .footer-error {
                            margin-top: 20px;
                            font-size: 12px;
                            color: #b0bec5;
                            letter-spacing: 0.5px;
                        }
                        @media (max-width: 640px) {
                            .container {
                                padding: 30px 25px;
                            }
                            .icono {
                                font-size: 56px;
                            }
                            h1 {
                                font-size: 22px;
                            }
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="icono">⏰</div>
                        <h1>Recibo Expirado</h1>
                        <p class="subtitulo-error">El enlace de este recibo ha expirado.</p>
                        <p class="subtitulo-error">Por favor, contacta al proveedor para obtener una nueva copia.</p>
                        <a href="/" class="btn">Volver al inicio</a>
                        <div class="detalles">
                            <div class="fila">
                                <span class="label">Recibo</span>
                                <span class="valor">${recibo || id || 'N/A'}</span>
                            </div>
                            <div class="fila">
                                <span class="label">Cliente</span>
                                <span class="valor">${cliente || 'N/A'}</span>
                            </div>
                            <div class="fila">
                                <span class="label">Generado</span>
                                <span class="valor">${new Date(fechaGeneracion).toLocaleString('es-ES')}</span>
                            </div>
                            <div class="fila">
                                <span class="label">Expiró hace</span>
                                <span class="valor" style="color: #c62828;">${Math.floor(horasTranscurridas)} horas</span>
                            </div>
                        </div>
                        <p class="footer-error">Republic Excursions - Sistema de Recibos</p>
                    </div>
                </body>
                </html>
            `);
        }
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

    const estadoConfig = {
        completo: { texto: 'PAGADO COMPLETO', color: '#28a745' },
        deposito: { texto: 'DEPÓSITO PAGADO (25%)', color: '#ffc107' },
        pendiente: { texto: 'PENDIENTE DE PAGO', color: '#dc3545' }
    };
    
    const estadoInfo = estadoConfig[estadoReal] || { texto: 'ESTADO DESCONOCIDO', color: '#6c757d' };

    // ====== INFORMACIÓN DE EXPIRACIÓN ======
    const fechaGeneracion = timestamp ? parseInt(timestamp) : null;
    const fechaExpiracion = fechaGeneracion ? new Date(fechaGeneracion + (QR_EXPIRATION_HOURS * 60 * 60 * 1000)) : null;
    const reciboValido = !fechaGeneracion || (Date.now() - fechaGeneracion) / (1000 * 60 * 60) <= QR_EXPIRATION_HOURS;

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
        mostrarBotones: esAdmin,
        fechaGeneracion: fechaGeneracion,
        fechaExpiracion: fechaExpiracion,
        horasExpiracion: QR_EXPIRATION_HOURS,
        reciboValido: reciboValido
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
    console.log(`  Expiración QR: ${QR_EXPIRATION_HOURS} horas`);
    console.log('  Estado: Servidor corriendo correctamente');
    console.log('========================================');
});
