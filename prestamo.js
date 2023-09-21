// Referencias a elementos del DOM

const inputDNI = document.getElementById('dni');
const inputMonto = document.getElementById('monto');
const inputCuotas = document.getElementById('cuotas');
const spanResultado = document.getElementById('resultado');

const botonCalcular = document.getElementById('botonCalcular');
const botonEliminarGuardados = document.getElementById('botonEliminarGuardados');


// Utilizacion de local storage

function obtenerPrestamosGuardados() {
  const prestamosGuardados = localStorage.getItem('prestamos');

  if (prestamosGuardados === null) {
    return [];
  }

  return JSON.parse(prestamosGuardados);
}

function guardarPrestamo(prestamo) {

  prestamos.push(prestamo);

  localStorage.setItem('prestamos', JSON.stringify(prestamos));
}

const prestamos = obtenerPrestamosGuardados();

function actualizarPrestamos() {
  let prestamosExistentes = '';

  for (const prestamo of prestamos) {
    const texto = `El cliente con DNI ${prestamo.dni} tiene que pagar ${prestamo.total} en ${prestamo.cuotas} cuotas.\n`;
    prestamosExistentes += texto;
  }

  spanResultado.innerText = prestamosExistentes;
}


// Calculo de prestamo

function calcularPrestamo(monto, cuotas) {
  if (monto < 0 || cuotas < 0) {
    return 0;
  }
  if (cuotas == 1) {
    return monto;
  }
  if (cuotas == 3) {
    return monto * 1.3;
  }
  if (cuotas == 6) {
    return monto * 1.6;
  }
  if (cuotas == 9) {
    return monto * 1.9;
  }
  if (cuotas == 12) {
    return monto * 2.2;
  }
  return monto * 2.5;
}

function enCalcular() {
  const dni = parseInt(inputDNI.value);
  const monto = parseInt(inputMonto.value);
  const cuotas = parseInt(inputCuotas.value);
  if (!dni || !monto || !cuotas) {
    return;
  }

  const total = calcularPrestamo(monto, cuotas);
  const prestamo = {
    dni,
    monto,
    cuotas,
    total,
  };
  guardarPrestamo(prestamo);
  actualizarPrestamos();
}

botonCalcular.addEventListener('click', enCalcular);


// Eliminacion de prestamos guardados

function eliminarPrestamosGuardados() {
  localStorage.removeItem('prestamos');
  prestamos.length = 0;
  spanResultado.innerText = '';
}

botonEliminarGuardados.addEventListener('click', eliminarPrestamosGuardados);


// Inicializacion con prestamos guardados

actualizarPrestamos();
