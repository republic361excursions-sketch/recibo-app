<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recibo <%= numeroRecibo %></title>
    <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: #f5f5f0;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 30px;
        }
        .recibo {
            background: #ffffff;
            max-width: 700px;
            width: 100%;
            padding: 45px 50px;
            border-radius: 12px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.06);
            border: 1px solid #edebe6;
            margin-bottom: 30px;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #1a2a4a;
            padding-bottom: 22px;
            margin-bottom: 28px;
        }
        .header .logo {
            font-size: 20px;
            font-weight: 700;
            color: #1a2a4a;
            letter-spacing: 3px;
            text-transform: uppercase;
        }
        .header .logo span { color: #c9a84c; }
        .header .titulo {
            font-size: 24px;
            font-weight: 300;
            color: #2c3e50;
            margin-top: 4px;
            letter-spacing: 1px;
        }
        .header .recibo-numero {
            font-size: 13px;
            color: #8e9aaf;
            margin-top: 4px;
            font-weight: 400;
            letter-spacing: 0.5px;
        }
        .info-cliente {
            margin-bottom: 28px;
            padding: 16px 22px;
            background: #f8f7f4;
            border-radius: 8px;
            border-left: 4px solid #c9a84c;
        }
        .info-cliente .titulo {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: #8e9aaf;
            font-weight: 600;
            margin-bottom: 10px;
            border-bottom: 1px solid #eae8e3;
            padding-bottom: 6px;
        }
        .info-cliente .fila {
            display: flex;
            justify-content: space-between;
            padding: 4px 0;
            font-size: 14px;
            color: #2c3e50;
            border-bottom: 1px solid #f0efeb;
        }
        .info-cliente .fila:last-child { border-bottom: none; }
        .info-cliente .label { font-weight: 500; color: #6b7a8f; }
        .info-cliente .valor { font-weight: 400; text-align: right; color: #1a2a4a; }
        .tabla {
            width: 100%;
            border-collapse: collapse;
            margin: 24px 0;
            font-size: 14px;
            border-bottom: 2px solid #1a2a4a;
        }
        .tabla th {
            text-align: left;
            padding: 10px 0;
            border-bottom: 2px solid #1a2a4a;
            color: #1a2a4a;
            font-weight: 600;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.8px;
        }
        .tabla td {
            padding: 8px 0;
            border-bottom: 1px solid #eeede8;
            color: #2c3e50;
        }
        .tabla .monto { text-align: right; font-weight: 500; }
        .tabla .total { font-weight: 600; font-size: 15px; }
        .estado-unico {
            text-align: center;
            padding: 16px 20px;
            border-radius: 8px;
            margin: 24px 0;
            font-size: 22px;
            font-weight: 600;
            letter-spacing: 0.3px;
        }
        .estado-unico.pagado {
            background: #eafaf1;
            border: 2px solid #27ae60;
            color: #1e8449;
        }
        .estado-unico.falta {
            background: #fef9e7;
            border: 2px solid #f1c40f;
            color: #7d6608;
        }
        .estado-unico.pendiente {
            background: #fdedec;
            border: 2px solid #e74c3c;
            color: #922b21;
        }
        .estado-unico .monto { font-size: 26px; }
        .resumen-pago {
            background: #f8f7f4;
            padding: 16px 24px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .resumen-pago .fila {
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
            border-bottom: 1px solid #eae8e3;
            font-size: 14px;
        }
        .resumen-pago .fila:last-child { border-bottom: none; }
        .resumen-pago .label { font-weight: 500; color: #6b7a8f; }
        .resumen-pago .value { font-weight: 600; color: #1a2a4a; }
        .resumen-pago .value.pendiente { color: #e74c3c; }
        .resumen-pago .value.pagado { color: #27ae60; }
        .resumen-pago .fila.total {
            border-top: 2px solid #1a2a4a;
            padding-top: 8px;
            margin-top: 4px;
            font-size: 15px;
        }
        .footer {
            text-align: center;
            margin-top: 28px;
            padding-top: 18px;
            border-top: 1px solid #eae8e3;
            color: #aab3c5;
            font-size: 12px;
            letter-spacing: 0.5px;
        }
        .footer .empresa {
            color: #1a2a4a;
            font-weight: 600;
            font-size: 13px;
            letter-spacing: 1.5px;
        }
        .footer .direccion {
            margin-top: 4px;
            font-size: 11px;
            color: #c5cdd8;
        }
        .footer .codigo {
            margin-top: 6px;
            font-size: 10px;
            color: #c5cdd8;
            letter-spacing: 0.5px;
        }
        .qr-info {
            text-align: center;
            margin: 14px 0;
            padding: 10px;
            background: #f8f7f4;
            border-radius: 8px;
            font-size: 12px;
            color: #8e9aaf;
        }
        .qr-info span { font-weight: 600; color: #1a2a4a; }
        .acciones-recibo {
            display: none;
            flex-wrap: wrap;
            gap: 12px;
            justify-content: center;
            max-width: 700px;
            width: 100%;
            margin-top: 10px;
        }
        .acciones-recibo.visible { display: flex; }
        .btn-accion {
            padding: 12px 28px;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            font-family: 'Inter', sans-serif;
            transition: background 0.3s;
            text-decoration: none;
            display: inline-block;
            text-align: center;
            background: #1a2a4a;
            color: white;
        }
        .btn-accion:hover { background: #2c3e6e; }
        .btn-accion.whatsapp { background: #25D366; }
        .btn-accion.whatsapp:hover { background: #1da851; }
        .btn-accion.imagen { background: #c9a84c; }
        .btn-accion.imagen:hover { background: #b8973a; }
        .btn-accion.volver { background: #8e9aaf; }
        .btn-accion.volver:hover { background: #6b7a8f; }
        @media print {
            body { background: white; padding: 0; }
            .recibo { box-shadow: none; border: 1px solid #ddd; padding: 30px; }
            .acciones-recibo { display: none !important; }
        }
        @media (max-width: 600px) {
            .recibo { padding: 25px 20px; }
            .info-cliente .fila { flex-direction: column; align-items: flex-start; }
            .info-cliente .valor { text-align: left; width: 100%; }
            .tabla { font-size: 13px; }
            .estado-unico { font-size: 18px; padding: 12px; }
            .estado-unico .monto { font-size: 20px; }
            .acciones-recibo { flex-direction: column; align-items: center; }
            .btn-accion { width: 100%; text-align: center; }
        }
    </style>
</head>
<body>
    <div id="reciboContainer" class="recibo">
        <div class="header">
            <div class="logo">Republic <span>Excursions</span></div>
            <div class="titulo">Recibo de Pago</div>
            <div class="recibo-numero">Recibo # <%= numeroRecibo %></div>
        </div>

        <div class="info-cliente">
            <div class="titulo">Información de la Reserva</div>
            <div class="fila">
                <span class="label">Factura / Reserva</span>
                <span class="valor"><%= idFactura %></span>
            </div>
            <div class="fila">
                <span class="label">Cliente</span>
                <span class="valor"><%= cliente %></span>
            </div>
            <div class="fila">
                <span class="label">Tipo de Excursión</span>
                <span class="valor"><%= tipoExcursion === 'privado' ? 'Privado' : 'Compartido' %></span>
            </div>
            <% if (grupo) { %>
            <div class="fila">
                <span class="label">Grupo / Empresa</span>
                <span class="valor"><%= grupo %></span>
            </div>
            <% } %>
            <% if (whatsapp) { %>
            <div class="fila">
                <span class="label">WhatsApp</span>
                <span class="valor"><%= whatsapp %></span>
            </div>
            <% } %>
            <% if (correo) { %>
            <div class="fila">
                <span class="label">Correo Electrónico</span>
                <span class="valor"><%= correo %></span>
            </div>
            <% } %>
            <div class="fila">
                <span class="label">Recogida</span>
                <span class="valor"><%= hotel %></span>
            </div>
            <div class="fila">
                <span class="label">Habitación</span>
                <span class="valor"><%= habitacion %></span>
            </div>
            <% if (horaRecogida) { %>
            <div class="fila">
                <span class="label">Hora de Recogida</span>
                <span class="valor"><%= horaRecogida %></span>
            </div>
            <% } %>
            <div class="fila">
                <span class="label">Transporte</span>
                <span class="valor"><%= transporte %></span>
            </div>
            <% if (transporte === 'No' && puntoSalida) { %>
            <div class="fila">
                <span class="label">Punto de Salida</span>
                <span class="valor"><%= puntoSalida %></span>
            </div>
            <% } %>
            <div class="fila">
                <span class="label">Excursión</span>
                <span class="valor"><%= excursion %></span>
            </div>
            <div class="fila">
                <span class="label">Fecha</span>
                <span class="valor"><%= fechaExcursion %></span>
            </div>
            <div class="fila">
                <span class="label">Personas</span>
                <span class="valor"><%= adultos %> Adultos, <%= ninos %> Niños</span>
            </div>
            <% if (capacidadMaxima) { %>
            <div class="fila">
                <span class="label">Capacidad Máxima</span>
                <span class="valor"><%= capacidadMaxima %></span>
            </div>
            <% } %>
            <div class="fila">
                <span class="label">Método de Pago</span>
                <span class="valor"><%= metodoPago %></span>
            </div>
            <% if (notas && notas !== 'Sin notas adicionales') { %>
            <div class="fila">
                <span class="label">Notas</span>
                <span class="valor"><%= notas %></span>
            </div>
            <% } %>
        </div>

        <table class="tabla">
            <thead>
                <tr>
                    <th>Concepto</th>
                    <th class="monto">Monto (USD)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong><%= excursion %></strong></td>
                    <td class="monto"></td>
                </tr>
                <tr>
                    <td><%= tipoExcursion === 'privado' ? 'Privado' : 'Compartido' %> - Adultos: <%= adultos %> × $<%= precioAdulto.toFixed(2) %></td>
                    <td class="monto">$<%= (adultos * precioAdulto).toFixed(2) %></td>
                </tr>
                <% if (ninos > 0) { %>
                <tr>
                    <td>Niños: <%= ninos %> × $<%= precioNino.toFixed(2) %></td>
                    <td class="monto">$<%= (ninos * precioNino).toFixed(2) %></td>
                </tr>
                <% } %>
                <tr>
                    <td><strong>Subtotal</strong></td>
                    <td class="monto total">$<%= subtotal.toFixed(2) %></td>
                </tr>
                <% if (descuento > 0) { %>
                <tr>
                    <td style="color:#27ae60;"><strong>Descuento</strong></td>
                    <td class="monto">-$<%= descuento.toFixed(2) %></td>
                </tr>
                <tr>
                    <td><strong>Total</strong></td>
                    <td class="monto total">$<%= total.toFixed(2) %></td>
                </tr>
                <% } %>
                <% if (depositoPagado > 0 && totalPendiente > 0) { %>
                <tr>
                    <td>Depósito Pagado (25%)</td>
                    <td class="monto">$<%= depositoPagado.toFixed(2) %></td>
                </tr>
                <% } %>
            </tbody>
        </table>

        <%
            let estadoClase = '';
            let estadoTexto = '';
            if (totalPendiente <= 0) {
                estadoClase = 'pagado';
                estadoTexto = 'Pagado Completo';
            } else if (estado === 'deposito') {
                estadoClase = 'falta';
                estadoTexto = 'Falta Pagar: $' + totalPendiente.toFixed(2);
            } else {
                estadoClase = 'pendiente';
                estadoTexto = 'Pendiente de Pago: $' + totalPendiente.toFixed(2);
            }
        %>
        <div class="estado-unico <%= estadoClase %>">
            <%= estadoTexto %>
        </div>

        <div class="resumen-pago">
            <div class="fila">
                <span class="label">Subtotal</span>
                <span class="value">$<%= subtotal.toFixed(2) %></span>
            </div>
            <% if (descuento > 0) { %>
            <div class="fila">
                <span class="label">Descuento</span>
                <span class="value" style="color:#27ae60;">-$<%= descuento.toFixed(2) %></span>
            </div>
            <div class="fila">
                <span class="label">Total</span>
                <span class="value">$<%= total.toFixed(2) %></span>
            </div>
            <% } %>
            <% if (depositoPagado > 0 && totalPendiente > 0) { %>
            <div class="fila">
                <span class="label">Depósito Pagado</span>
                <span class="value">$<%= depositoPagado.toFixed(2) %></span>
            </div>
            <% } %>
            <div class="fila total">
                <span class="label">Balance Pendiente</span>
                <span class="value pendiente <%= totalPendiente === 0 ? 'pagado' : '' %>">
                    $<%= totalPendiente.toFixed(2) %>
                </span>
            </div>
        </div>

        <div class="qr-info">
            <span>Documento de verificación</span> &mdash; Código <%= numeroRecibo %>
        </div>

        <div class="footer">
            <p class="empresa">Republic Excursions</p>
            <p class="direccion">Punta Cana, República Dominicana</p>
            <p><%= fecha %></p>
            <p class="codigo">Este documento es un comprobante de pago válido</p>
        </div>
    </div>

    <% if (mostrarBotones) { %>
    <div class="acciones-recibo visible">
        <button class="btn-accion imagen" onclick="descargarImagen()">Descargar Imagen</button>
        <a href="#" class="btn-accion whatsapp" id="whatsappBtn">Enviar por WhatsApp</a>
        <a href="/" class="btn-accion volver">Volver al inicio</a>
    </div>
    <% } %>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const cliente = '<%= cliente %>';
            const excursion = '<%= excursion %>';
            const enlace = window.location.href;
            const mensaje = `Hola ${cliente}, tu recibo de ${excursion} está listo. Puedes verlo aquí: ${enlace}`;
            const whatsappBtn = document.getElementById('whatsappBtn');
            if (whatsappBtn) {
                whatsappBtn.href = `https://wa.me/1?text=${encodeURIComponent(mensaje)}`;
            }
        });

        function descargarImagen() {
            const elemento = document.getElementById('reciboContainer');
            const btn = document.querySelector('.btn-accion.imagen');
            const textoOriginal = btn.innerHTML;
            btn.innerHTML = 'Generando...';
            btn.disabled = true;

            html2canvas(elemento, {
                scale: 2,
                backgroundColor: '#ffffff',
                useCORS: true,
                allowTaint: true,
                logging: false
            }).then(canvas => {
                const link = document.createElement('a');
                const reciboNum = document.querySelector('.recibo-numero').textContent.trim().replace(/\s/g, '');
                link.download = `recibo-${reciboNum}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
                btn.innerHTML = textoOriginal;
                btn.disabled = false;
            }).catch(error => {
                console.error('Error al generar la imagen:', error);
                btn.innerHTML = 'Error';
                btn.disabled = false;
                setTimeout(() => { btn.innerHTML = textoOriginal; }, 3000);
            });
        }
    </script>
</body>
</html>
