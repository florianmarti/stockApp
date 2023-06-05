// Firebase initialization
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const materialSelect = document.getElementById("materialSelect");
const cantidadInput = document.getElementById("cantidadInput");
const ingresoForm = document.getElementById("ingresoForm");

// Function to get the materials from Realtime Database
const getMateriales = () => {
  database
    .ref("stock/Materiales")
    .once("value")
    .then((snapshot) => {
      const stock = snapshot.val();
      materialSelect.innerHTML = "";
      if (stock) {
        Object.entries(stock).forEach(([material, subStock]) => {
          const option = document.createElement("option");
          option.value = material;
          option.textContent = subStock.nombre;
          materialSelect.appendChild(option);
        });
      } else {
        materialSelect.innerHTML =
          "<option value=''>No hay materiales disponibles</option>";
      }
    })
    .catch((error) => {
      console.error("Error al obtener los materiales:", error);
    });
};

// Add stock when the form is submitted
ingresoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const material = materialSelect.value;
  const cantidad = parseInt(cantidadInput.value);

  if (material && cantidad) {
    const materialRef = database.ref(`stock/Materiales/${material}`);
    materialRef
      .transaction((stock) => {
        if (stock) {
          stock.cantidad = stock.cantidad
            ? stock.cantidad + cantidad
            : cantidad;
        }
        return stock;
      })
      .then(() => {
        console.log("Stock actualizado exitosamente.");
        ingresoForm.reset();
      })
      .catch((error) => {
        console.error("Error al actualizar el stock:", error);
      });
  }
});

// Get the materials when the page loads
getMateriales();

const adminLoginButton = document.getElementById("adminLoginButton");

adminLoginButton.addEventListener("click", () => {
  // Redirect to the admin login page
  window.location.href = "../pages/adminLogin.html";
});
