const firebaseConfig = {
  // Configuración de tu proyecto de Firebase
  apiKey: "AIzaSyD2ugrMWSLEOGxRA8CB-VU-mRAF2eZD1ho",
  authDomain: "tercerappstock.firebaseapp.com",
  databaseURL: "https://tercerappstock-default-rtdb.firebaseio.com",
  projectId: "tercerappstock",
  storageBucket: "tercerappstock.appspot.com",
  messagingSenderId: "1060347314797",
  appId: "1:1060347314797:web:cb7bf4d4ea25e310c4b564",
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Crea una instancia de Firestore
const db = firebase.firestore();

// Exporta las variables necesarias
window.firebaseApp = firebase;
window.firestore = db;
