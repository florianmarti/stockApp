document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const loginButton = document.getElementById("loginButton");

  loginButton.addEventListener("click", () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Inicio de sesión exitoso
        const user = userCredential.user;
        console.log("Inicio de sesión exitoso:", user);

        // Redirigir a stock.html
        window.location.href = "../pages/stock.html";
      })
      .catch((error) => {
        // Error en el inicio de sesión
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error en el inicio de sesión:", errorCode, errorMessage);
        // Realiza las acciones necesarias en caso de error
      });
  });

  // Ejemplo de consulta a la base de datos
  firestore
    .collection("users")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    })
    .catch((error) => {
      console.log("Error al obtener documentos:", error);
    });
});

// Obtiene el elemento del splash screen
const splashScreen = document.getElementById("splashScreen");
// Obtiene el elemento del contenedor de login
const loginContainer = document.querySelector(".login-container");

// Oculta el splash screen después de 3 segundos
setTimeout(() => {
  splashScreen.style.display = "none";
  loginContainer.style.display = "block";
}, 3000);
