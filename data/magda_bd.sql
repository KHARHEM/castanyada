USE umm_kharhem;

SET @doc = '
[
  {
    "id": 1,
    "menu_name_cat": "Castanyada",
    "name_cat": "Panellets de pinyons",
    "descripcio_cat": "Elaborats amb pinyons de primera qualitat.",
    "menu_name_esp": "Castañada",
    "name_esp": "Panellets de piñones",
    "descripcio_esp": "Elaborados con piñones de primera calidad.",
    "preu": "7.95 €/Kg",
    "img": "panellets-pinyons.jpeg"
  },
  {
    "id": 2,
    "menu_name_cat": "Castanyada",
    "name_cat": "Panellets d,ametlla",
    "descripcio_cat": "Fets amb ametlles torrades i sucre.",
    "menu_name_esp": "Castañada",
    "name_esp": "Panellets de almendra",
    "descripcio_esp": "Hechos con almendras tostadas y azúcar.",
    "preu": "6.95 €/Kg",
    "img": "panellets-dametlla-2.jpeg"
  },
  {
    "id": 3,
    "menu_name_cat": "Castanyada",
    "name_cat": "Assortiment de panellets",
    "descripcio_cat": "Assortiment de panellets: pinyons, ametlla i coco.",
    "menu_name_esp": "Castañada",
    "name_esp": "Surtido de panellets",
    "descripcio_esp": "Surtido de panellets: piñones, almendra y coco.",
    "preu": "7.25 €/Kg",

    "img": "Panellets-assortiment.webp"
  },
  {
    "id": 4,
    "menu_name_cat": "Castanyada",
    "name_cat": "Castanyes al forn",
"descripcio_cat": "Castanyes al forn acabades de coure.",
    "menu_name_esp": "Castañada",
    "name_esp": "Castañas al horno",
    "descripcio_esp": "Castañas al horno recién hechas.",
    "preu": "5.25 €/Kg",
    "img": "castanyes.webp"
  },
  {
    "id": 5,
    "menu_name_cat": "Pastissos",
    "name_cat": "Pastís de xocolata",
"descripcio_cat": "Pastís esponjós amb cobertura de xocolata negra.",
"menu_name_esp": "Pasteles",
    "name_esp": "Pastel de chocolate",
    "descripcio_esp": "Pastel esponjoso con cobertura de chocolate negro",
    "preu": "15.00 €/u",
    
    "img": "pastis-de-xocolata_2.jpg"
  },
  {
    "id": 6,
    "menu_name_cat": "Pastissos",
    "name_cat": "Pastís de maduixa",
 "descripcio_cat": "Pastís fresc amb crema i maduixes naturals.",
    "menu_name_esp": "Pasteles",
    "name_esp": "Pastel de fresa",
    "descripcio_esp": "Pastel fresco con crema y fresas naturales.",
    "preu": "14.50 €/u",   
    "img": "pastis-de-maduixa.webp"
  },
  {
    "id": 7,
    "menu_name_cat": "Brioixeria",
    "name_cat": "Croissant de mantega",
"descripcio_cat": "Croissant artesanal fet amb mantega de primera qualitat.",
    "menu_name_esp": "Bollería",
    "name_esp": "Croissant de mantequilla",
    "descripcio_esp": "Croissant artesanal hecho con mantequilla de primera calidad.",
    "preu": "2.50 €/u",    
    "img": "croissants.webp"
  },
  {
    "id": 8,
    "menu_name_cat": "Brioixeria",
    "name_cat": "Croissant de xocolata",
    "menu_name_esp": "Bollería",
    "name_esp": "Croissant de chocolate",
    "descripcio_esp": "Croissant relleno de chocolate suave y cremoso.",
    "preu": "2.80 €/u",
    "descripcio_cat": "Croissant farcit de xocolata suau i cremosa.",
    "img": "croissant_xocolata.webp"
  },
  {
    "id": 9,
    "menu_name_cat": "Brioixeria",
    "name_cat": "Ensaimada",
    "menu_name_esp": "Bollería",
    "name_esp": "Ensaimada",
    "descripcio_esp": "Ensaimada tradicional mallorquina, ligera y esponjosa.",
    "preu": "3.00 €/u",
    "descripcio_cat": "Ensaimada tradicional mallorquina, lleugera i esponjosa.",
    "img": "ensaimada.webp"
  }

]'
;
INSERT INTO sweets
  (id, menu_name_cat, name_cat, descripcio_cat, menu_name_esp, name_esp, descripcio_esp, preu, img)
SELECT
  jt.id, jt.menu_name_cat, jt.name_cat, jt.descripcio_cat,
  jt.menu_name_esp, jt.name_esp, jt.descripcio_esp, jt.preu, jt.img
FROM JSON_TABLE(
  @doc, '$[*]'
  COLUMNS(
    id              INT           PATH '$.id',
    menu_name_cat   VARCHAR(255)  PATH '$.menu_name_cat',
    name_cat        VARCHAR(255)  PATH '$.name_cat',
    descripcio_cat  TEXT          PATH '$.descripcio_cat',
    menu_name_esp   VARCHAR(255)  PATH '$.menu_name_esp',
    name_esp        VARCHAR(255)  PATH '$.name_esp',
    descripcio_esp  TEXT          PATH '$.descripcio_esp',
    preu            VARCHAR(50)   PATH '$.preu',
    img             VARCHAR(255)  PATH '$.img'
  )
) AS jt;

SELECT * FROM sweets ;