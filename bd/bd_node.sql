CREATE DATABASE IF NOT EXISTS umm_kharhem;
USE umm_kharhem;

CREATE TABLE sweets (
    id INT NOT NULL AUTO_INCREMENT,
    menu_name_cat VARCHAR (100) NOT NULL,
    name_cat VARCHAR (100) NOT NULL,
    descripcio_cat VARCHAR (300) NOT NULL,
    menu_name_esp VARCHAR (100) NOT NULL,
    name_esp VARCHAR (100) NOT NULL,
    descripcio_esp VARCHAR (300) NOT NULL,
    preu VARCHAR (100) NOT NULL,
    img TEXT NOT NULL,
    PRIMARY KEY (id)
  );
  
CREATE USER "magda"@"localhost" IDENTIFIED BY "magda" ;
GRANT SELECT, INSERT, UPDATE, DELETE ON umm_kharhem.* TO "magda"@"localhost" ;