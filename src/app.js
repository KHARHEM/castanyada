// Cargar los módulos para poderlos utilizar
const express = require("express");
const path = require("node:path");
const fs = require("node:fs");
const crypto = require("node:crypto");
const methodOverride = require("method-override"); // para "put"


// Crear la instancia del servidor
const app = express();

// Configurar algunos parámetros
process.loadEnvFile();
PORT = process.env.PORT || 6666;
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "../public")));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Obtener los datos
let productes = require("../data/pastisseria.json");

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
const menu = crearMenu(productes)



// Ruta català
app.get("/", (req, res) => {
  // Realizar el menú
  const menu = crearMenu(productes, "cat")
  res.render("index", { title: "Umm...!",menu, productes, lang: "ESP" });
});
// Ruta raíz o inicial
app.get("/esp", (req, res) => {
  const menu = crearMenu(productes, "esp")
  res.render("inicio", { title: "Umm...!", menu, productes });
});

app.get("/admin", (req, res) => {
  res.render("admin", { title: "Gestió", menu, productes });
});





app.post("/insert", (req, res) => {
  const body = req.body;
  body.id = crypto.randomUUID();
  //console.log(body);
  productes.push(body);
  fs.writeFileSync(
    path.join(__dirname, "../data", "pastisseria.json"),
    JSON.stringify(productes, null, 2),
    (err) => {
      if (err) throw err;
    }
  );
  // res.render("admin", { title: "administración", menu, travels });
  res.redirect("/admin")
});

// Ruta para manejar errores 404
app.use((req, res) => {
  res.render("404", { title: "Error 404", menu });
});

app.listen(PORT, () => {
  console.log(`Servidor arrancado en http://localhost:${PORT}`);
});


