firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const adminLoginForm = document.getElementById("adminLoginForm");

adminLoginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email && password) {
    // Autenticar al usuario con Firebase Authentication
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Inicio de sesión exitoso
        console.log("Inicio de sesión exitoso");

        // Redirigir a ingresoStock.html o egresoStock.html según corresponda
        window.location.href = "../pages/egresoStock.html"; // Cambiado a egresoStock.html
      })
      .catch((error) => {
        console.error(
          "Credenciales incorrectas. Por favor, inténtalo de nuevo.",
          error
        );
      });
  } else {
    console.error("Debes completar todos los campos.");
  }
});
