// Cargar los módulos para poderlos utilizar
const mysql = require("mysql2/promise");
const express = require("express");
const path = require("node:path");
const fs = require("node:fs");
const crypto = require("node:crypto");
const methodOverride = require("method-override"); // para "put"


// Crear la instancia del servidor
const app = express();

// Cargar variables de entorno
require("dotenv").config();

// Crear conexión al pool de MySQL usando variables del .env
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  namedPlaceholders: true
});



// Configurar algunos parámetros
process.loadEnvFile();
const PORT = process.env.PORT || 6666;
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "../public")));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Obtener los datos
//let productes = require("../data/pastisseria.json");

// Helpers para DB
async function getProducts() {
  const [rows] = await pool.query(`
    SELECT id, menu_name_cat, name_cat, descripcio_cat,
           menu_name_esp, name_esp, descripcio_esp, preu, img
    FROM sweets
    ORDER BY id
  `);
  return rows;
}


function crearMenu(json, lang) {
  let tipusProductes = [];
  let menu = "<ul>";

  if (lang === "cat") {
  json.forEach((producte) => {
    if (!tipusProductes.includes(producte.menu_name_cat)) {
      tipusProductes.push(producte.menu_name_cat);
    }
  });
} else {
  json.forEach((producte) => {
    if (!tipusProductes.includes(producte.menu_name_esp)) {
      tipusProductes.push(producte.menu_name_esp);
    }
  });
}

  tipusProductes.forEach((tipus) => {
    menu += `<li><a href="/${tipus.toLocaleLowerCase()}">${tipus}</a></li>`;
  });
  menu += "</ul>";
  return menu
}

// Realizar el menú
//const menu = crearMenu(products)



// Ruta català
app.get("/", async (req, res) => {
  const products = await getProducts();
  const menu = crearMenu(products, "cat");
  res.render("index", { title: "Umm...!", menu, products, productes: products, lang: "ESP" });
});

// Ruta raíz o inicial
app.get("/esp", async (req, res) => {
  const products = await getProducts();
  const menu = crearMenu(products, "esp");
  res.render("inicio", { title: "Umm...!", menu, products, productes: products });
});

app.get("/admin", async (req, res) => {
  const products = await getProducts();
  const menu = crearMenu(products, "cat");
  res.render("admin", { title: "Gestió", menu, products, productes: products });
});




app.post("/insert", async (req, res) => {
  const body = req.body;

  // Si tu columna id es AUTO_INCREMENT, no la envíes
  const sql = `
    INSERT INTO sweets
      (menu_name_cat, name_cat, descripcio_cat,
       menu_name_esp, name_esp, descripcio_esp, preu, img)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    await pool.execute(sql, [
      body.menu_name_cat,
      body.name_cat,
      body.descripcio_cat,
      body.menu_name_esp,
      body.name_esp,
      body.descripcio_esp,
      body.preu,
      body.img
    ]);
    return res.redirect("/admin");
  } catch (err) {
    console.error(err);
    // Muestra un 500 sencillo si algo falla
    return res.status(500).send("Error insertando el producto");
  }
});


// Ruta para manejar errores 404
app.use((req, res) => {
  res.render("404", { title: "Error 404", menu });
});

app.listen(PORT, () => {
  console.log(`Servidor arrancado en http://localhost:${PORT}`);
});


