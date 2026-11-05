/* ============================================================
   Álgebra desde cero — lógica interactiva
   Este archivo hace tres cosas:
     1. Actualiza la expresión 2x + 3 al mover el deslizador.
     2. Muestra u oculta los pasos de la ecuación.
     3. Genera el cuestionario y lleva la puntuación.
   ============================================================ */

/* ------------------------------------------------------------
   1. DESLIZADOR: evalúa 2x + 3
   ------------------------------------------------------------ */
const inputX = document.getElementById("x-valor");
const salidaX = document.getElementById("x-mostrado");
const xRepetido = document.getElementById("x-repetido");
const resultado = document.getElementById("resultado");

function actualizarExpresion() {
  // .value siempre llega como texto, así que lo convertimos a número
  const x = Number(inputX.value);

  salidaX.textContent = x;
  xRepetido.textContent = x;

  // El resultado se escribe directamente en el HTML
  resultado.textContent = 2 * x + 3;
}

// "input" se dispara cada vez que el usuario mueve el control
inputX.addEventListener("input", actualizarExpresion);
actualizarExpresion(); // ejecutamos una vez al cargar

/* ------------------------------------------------------------
   2. BOTONES "Ver los pasos"
   Usamos una función para no repetir el mismo código en cada lección.
   ------------------------------------------------------------ */
function configurarPasos(idBoton, idLista) {
  const boton = document.getElementById(idBoton);
  const lista = document.getElementById(idLista);

  // Si la página no tiene ese botón, salimos sin romper nada
  if (!boton || !lista) return;

  boton.addEventListener("click", () => {
    // hidden es un atributo booleano: true = oculto
    const estaOculto = lista.hidden;
    lista.hidden = !estaOculto;
    boton.textContent = estaOculto ? "Ocultar los pasos" : "Ver los pasos";
  });
}

configurarPasos("btn-pasos", "pasos"); // Lección 3
configurarPasos("btn-pasos-4", "pasos-4"); // Lección 4
configurarPasos("btn-pasos-5", "pasos-5"); // Lección 5

/* ------------------------------------------------------------
   3. CALCULADORA DE ECUACIONES CUADRÁTICAS (Lección 5)
   ------------------------------------------------------------ */
const coefA = document.getElementById("coef-a");
const coefB = document.getElementById("coef-b");
const coefC = document.getElementById("coef-c");
const salidaDisc = document.getElementById("discriminante");
const salidaRaiz1 = document.getElementById("raiz-1");
const salidaRaiz2 = document.getElementById("raiz-2");
const mensajeCuadratica = document.getElementById("mensaje-cuadratica");

// Redondea a 3 decimales y elimina ceros sobrantes: 2.5000001 → "2.5"
function formatearNumero(valor) {
  return Number(valor.toFixed(3)).toString();
}

function calcularCuadratica() {
  const a = Number(coefA.value);
  const b = Number(coefB.value);
  const c = Number(coefC.value);

  // Sin "a" no hay término cuadrático
  if (a === 0) {
    salidaDisc.textContent = "—";
    salidaRaiz1.textContent = "—";
    salidaRaiz2.textContent = "—";
    mensajeCuadratica.textContent = "Si a = 0 no es una ecuación cuadrática.";
    return;
  }

  const discriminante = b * b - 4 * a * c;
  salidaDisc.textContent = formatearNumero(discriminante);

  // Δ < 0: la raíz cuadrada no existe en los números reales
  if (discriminante < 0) {
    salidaRaiz1.textContent = "—";
    salidaRaiz2.textContent = "—";
    mensajeCuadratica.textContent = "Discriminante negativo: no hay soluciones reales.";
    return;
  }

  const raiz = Math.sqrt(discriminante);
  const x1 = (-b + raiz) / (2 * a);
  const x2 = (-b - raiz) / (2 * a);

  salidaRaiz1.textContent = formatearNumero(x1);
  salidaRaiz2.textContent = formatearNumero(x2);

  mensajeCuadratica.textContent =
    discriminante === 0
      ? "Discriminante cero: una única solución (doble)."
      : "Discriminante positivo: dos soluciones reales.";
}

// Escuchamos los tres campos y calculamos también al cargar la página
[coefA, coefB, coefC].forEach((campo) => {
  campo.addEventListener("input", calcularCuadratica);
});
calcularCuadratica();

/* ------------------------------------------------------------
   4. CUESTIONARIO
   ------------------------------------------------------------ */
// Cada pregunta guarda el texto, las opciones y el índice de la correcta (empieza en 0)
const preguntas = [
  {
    texto: "Si x = 5, ¿cuánto vale 2x + 3?",
    opciones: ["10", "13", "16"],
    correcta: 1,
    explicacion: "2 · 5 + 3 = 10 + 3 = 13",
  },
  {
    texto: "¿Cuál de estas es una ecuación?",
    opciones: ["3x − 1", "3x − 1 = 8", "3(x − 1)"],
    correcta: 1,
    explicacion: "Una ecuación necesita un signo igual.",
  },
  {
    texto: "Resuelve: x + 7 = 12",
    opciones: ["x = 3", "x = 5", "x = 19"],
    correcta: 1,
    explicacion: "Restamos 7 en los dos lados: x = 12 − 7 = 5.",
  },
  {
    texto: "Si 3x = 21, ¿cuánto vale x?",
    opciones: ["x = 7", "x = 18", "x = 24"],
    correcta: 0,
    explicacion: "Dividimos entre 3: x = 21 / 3 = 7.",
  },
  {
    texto: "Simplifica: a + a + a",
    opciones: ["a³", "3a", "3 + a"],
    correcta: 1,
    explicacion: "Sumar la misma variable tres veces equivale a multiplicarla por 3.",
  },
  {
    texto: "Factoriza: 6x² + 9x",
    opciones: ["3x(2x + 3)", "3(2x² + 3x)", "x(6x + 9)"],
    correcta: 0,
    explicacion: "El factor común es 3x: 6x² ÷ 3x = 2x y 9x ÷ 3x = 3.",
  },
  {
    texto: "Factoriza: x² − 25",
    opciones: ["(x − 5)²", "(x − 5)(x + 5)", "(x + 5)²"],
    correcta: 1,
    explicacion: "Es una diferencia de cuadrados: a² − b² = (a − b)(a + b).",
  },
  {
    texto: "Factoriza: x² + 7x + 12",
    opciones: ["(x + 3)(x + 4)", "(x + 2)(x + 6)", "(x + 12)(x + 1)"],
    correcta: 0,
    explicacion: "3 + 4 = 7 y 3 · 4 = 12, así que los factores son (x + 3)(x + 4).",
  },
  {
    texto: "Resuelve: x² − 5x + 6 = 0",
    opciones: ["x = 2 y x = 3", "x = −2 y x = −3", "x = 1 y x = 6"],
    correcta: 0,
    explicacion: "Se factoriza como (x − 2)(x − 3) = 0, así que x = 2 o x = 3.",
  },
  {
    texto: "En x² + 4x + 4 = 0, ¿cuántas soluciones reales hay?",
    opciones: ["Dos", "Una (doble)", "Ninguna"],
    correcta: 1,
    explicacion: "Δ = 4² − 4 · 1 · 4 = 0, así que hay una solución doble: x = −2.",
  },
];

const contenedorQuiz = document.getElementById("quiz");
const textoProgreso = document.getElementById("progreso-texto");
const barraProgreso = document.getElementById("progreso-fill");
const mensajeFinal = document.getElementById("mensaje-final");
const btnReiniciar = document.getElementById("btn-reiniciar");

// Guardamos el estado del intento actual
let acertadas = 0;
let respondidas = 0;

function actualizarMarcador() {
  textoProgreso.textContent = `Aciertos: ${acertadas} de ${preguntas.length}`;

  // La barra crece según las preguntas respondidas
  const porcentaje = (respondidas / preguntas.length) * 100;
  barraProgreso.style.width = `${porcentaje}%`;

  // Cuando ya respondió todo, mostramos un mensaje según la nota
  if (respondidas === preguntas.length) {
    mensajeFinal.hidden = false;
    if (acertadas === preguntas.length) {
      mensajeFinal.textContent = "¡Perfecto! Dominas lo básico. 🎉";
    } else if (acertadas / preguntas.length >= 0.6) {
      mensajeFinal.textContent = `Buen trabajo: ${acertadas} de ${preguntas.length}. Repasa las que fallaste.`;
    } else {
      mensajeFinal.textContent = "Vamos por buen camino. Vuelve a las lecciones y reinténtalo.";
    }
  } else {
    mensajeFinal.hidden = true;
  }
}

function crearPregunta(pregunta, indice) {
  // Creamos el bloque de la pregunta
  const articulo = document.createElement("article");
  articulo.className = "question";

  const titulo = document.createElement("h3");
  titulo.textContent = `${indice + 1}. ${pregunta.texto}`;
  articulo.appendChild(titulo);

  const lista = document.createElement("div");
  lista.className = "options";

  const feedback = document.createElement("p");
  feedback.className = "feedback";

  // Creamos un botón por cada opción
  pregunta.opciones.forEach((textoOpcion, posicion) => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "option";
    boton.textContent = textoOpcion;

    boton.addEventListener("click", () => {
      // Evitamos que una misma pregunta cuente dos veces
      if (articulo.dataset.respondida === "si") return;
      articulo.dataset.respondida = "si";

      // Marcamos la opción correcta siempre, para que se vea cuál era
      const botones = lista.querySelectorAll(".option");
      botones.forEach((b) => (b.disabled = true));
      botones[pregunta.correcta].classList.add("correcta");

      const esCorrecta = posicion === pregunta.correcta;

      if (esCorrecta) {
        acertadas += 1;
        feedback.textContent = `¡Correcto! ${pregunta.explicacion}`;
        feedback.classList.add("ok");
      } else {
        boton.classList.add("incorrecta");
        feedback.textContent = `Casi. ${pregunta.explicacion}`;
        feedback.classList.add("ko");
      }

      respondidas += 1;
      actualizarMarcador();
    });

    lista.appendChild(boton);
  });

  articulo.appendChild(lista);
  articulo.appendChild(feedback);
  return articulo;
}

function dibujarQuiz() {
  contenedorQuiz.innerHTML = ""; // limpiamos antes de volver a pintar
  acertadas = 0;
  respondidas = 0;
  mensajeFinal.hidden = true;

  preguntas.forEach((pregunta, indice) => {
    contenedorQuiz.appendChild(crearPregunta(pregunta, indice));
  });

  actualizarMarcador();
}

btnReiniciar.addEventListener("click", dibujarQuiz);

// El total de preguntas se calcula solo a partir del array
document.getElementById("total-preguntas").textContent = preguntas.length;

dibujarQuiz(); // arrancamos el cuestionario al cargar la página
