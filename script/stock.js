// Firebase initialization
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const stockList = document.getElementById("stockList");

// Function to get the stock from Realtime Database
const getStock = () => {
  database
    .ref("stock/Materiales")
    .once("value")
    .then((snapshot) => {
      const stock = snapshot.val();
      stockList.innerHTML = "";
      if (stock) {
        Object.entries(stock).forEach(([material, subStock]) => {
          const materialDiv = document.createElement("div");
          materialDiv.classList.add("material-item");
          materialDiv.innerHTML = `<h3 id="materialName">${material}</h3>`;
          const subStockList = document.createElement("ul");
          Object.entries(subStock).forEach(([subMaterial, cantidad]) => {
            const subStockItem = document.createElement("li");
            subStockItem.innerHTML = `<strong id="subMaterialName">${subMaterial}
             <span id="subMaterialQuantity">${cantidad}</span>`;
            subStockList.appendChild(subStockItem);
          });
          materialDiv.appendChild(subStockList);
          stockList.appendChild(materialDiv);
        });
      } else {
        stockList.innerHTML = "No hay datos de stock disponibles.";
      }
    })
    .catch((error) => {
      console.error("Error al obtener el stock:", error);
    });
};

// Get the stock when the page loads
getStock();

const adminLoginButton = document.getElementById("adminLoginButton");

// adminLoginButton.addEventListener("click", () => {
//   // Redirect to the admin login page
//   window.location.href = "../pages/adminLogin.html";
// });
// Search functionality
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const materialItems = Array.from(
    document.getElementsByClassName("material-item")
  );
  materialItems.forEach((item) => {
    const materialName = item
      .querySelector("#materialName")
      .textContent.toLowerCase();
    if (materialName.includes(searchTerm)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const materialItems = Array.from(
    document.getElementsByClassName("material-item")
  );
  materialItems.forEach((item) => {
    const materialName = item
      .querySelector("#materialName")
      .textContent.toLowerCase();
    if (materialName.includes(searchTerm)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});
//
