// ejecutes once all the html is loaded
document.addEventListener("DOMContentLoaded", function () {
  const email = {
    email: "",
    asunto: "",
    mensaje: "",
  };

  //select elements
  const inputEmail = document.querySelector("#email");
  const inputAsunto = document.querySelector("#asunto");
  const inputMensaje = document.querySelector("#mensaje");
  const inputCc = document.querySelector("#cc");
  const formulario = document.querySelector("#formulario");
  const btnSubmit = document.querySelector("#submit-btn");
  const btnReset = document.querySelector("#reset-btn");
  const spinner = document.querySelector("#spinner");

  inputEmail.addEventListener("input", validar);
  inputAsunto.addEventListener("input", validar);
  inputMensaje.addEventListener("input", validar);
  inputCc.addEventListener("input", validarCc);

  formulario.addEventListener("submit", enviarEmail);

  btnReset.addEventListener("click", (e) => {
    e.preventDefault();

    //reinicia el objeto
    resetDeFormulario();

    limpiarAlertas();
  });

  function enviarEmail(e) {
    e.preventDefault();
    spinner.classList.add("flex");
    spinner.classList.remove("hidden");

    setTimeout(() => {
      spinner.classList.remove("flex");
      spinner.classList.add("hidden");

      // reinicia el objeto
      resetDeFormulario();

      // Crear alerta
      const alertaExito = document.createElement("P");
      alertaExito.classList.add(
        "bg-green-500",
        "text-white",
        "p-2",
        "text-center",
        "rounded-lg",
        "mt-10",
        "font-bold",
        "text-sm",
        "uppercase"
      );
      alertaExito.textContent = "Mensaje enviado correctamente";
      formulario.appendChild(alertaExito);

      setTimeout(() => alertaExito.remove(), 3000);
    }, 3000);
  }

  function validar(e) {
    if (e.target.value.trim() === "") {
      mostratAlerta(
        `El campo "${e.target.name.toUpperCase()}" es obligatorio`,
        e.target.parentElement
      );
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }

    if (e.target.name === "email" && !validarEmail(e.target.value)) {
      mostratAlerta(
        `El "${e.target.name.toUpperCase()}" no es valido`,
        e.target.parentElement
      );
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }

    limpiarAlerta(e.target.parentElement);

    // asigna valor a objeto email

    email[e.target.name] = e.target.value.trim().toLowerCase();

    // comprobar objeto email

    comprobarEmail();
  }

  function validarCc(e) {
    console.log(e.target.value);
    if (e.target.value == "") {
      limpiarAlerta(e.target.parentElement);
    }

    if (e.target.name === "cc" && !validarEmail(e.target.value)) {
      mostratAlerta(
        `El "${e.target.name.toUpperCase()}" no es valido`,
        e.target.parentElement
      );
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }
    limpiarAlerta(e.target.parentElement);
    email[e.target.name] = e.target.value.trim().toLowerCase();
  }

  function mostratAlerta(mensaje, referencia) {
    const alerta = referencia.querySelector(".bg-red-600");
    if (alerta) {
      alerta.remove();
    }

    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add("bg-red-600", "text-white", "p-2", "text-center");
    referencia.appendChild(error);
  }

  function limpiarAlerta(referencia) {
    const alerta = referencia.querySelector(".bg-red-600");
    if (alerta) {
      alerta.remove();
    }
  }

  function limpiarAlertas() {
    const alertas = document.querySelectorAll(".bg-red-600");
    for (let alerta of alertas) {
      alerta.remove();
    }
  }

  function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    return resultado;
  }

  function comprobarEmail() {
    if (Object.values(email).includes("")) {
      btnSubmit.classList.add("opacity-50");
      btnSubmit.disabled = true;
      return;
    }
    btnSubmit.classList.remove("opacity-50");
    btnSubmit.disabled = false;
  }

  function resetDeFormulario() {
    email.email = "";
    email.asunto = "";
    email.mensaje = "";

    formulario.reset();
    comprobarEmail();
  }
});
