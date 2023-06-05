// Firebase initialization
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const materialSelect = document.getElementById("materialSelect");
const cantidadInput = document.getElementById("cantidadInput");
const egresoForm = document.getElementById("egresoForm");

// Function to get the stock from Realtime Database
const getStock = () => {
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
      console.error("Error al obtener el stock:", error);
    });
};

// Subtract stock when the form is submitted
egresoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const material = materialSelect.value;
  const cantidad = parseInt(cantidadInput.value);

  if (material && cantidad) {
    const materialRef = database.ref(`stock/Materiales/${material}`);
    materialRef
      .transaction((stock) => {
        if (stock) {
          stock.cantidad =
            stock.cantidad - cantidad >= 0 ? stock.cantidad - cantidad : 0;
        }
        return stock;
      })
      .then(() => {
        console.log("Stock actualizado exitosamente.");
        egresoForm.reset();
      })
      .catch((error) => {
        console.error("Error al actualizar el stock:", error);
      });
  }
});

// Get the stock when the page loads
getStock();

const stockButton = document.getElementById("stockButton");

stockButton.addEventListener("click", () => {
  // Redirect to the stock page
  window.location.href = "../pages/stock.html";
});
