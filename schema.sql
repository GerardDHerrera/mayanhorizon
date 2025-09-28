-- Base de datos para una plataforma de Bienes Raíces
-- Autor: Jules, programador experto en PHP y MySQL
-- Fecha: 2024-07-25

-- Se recomienda usar el motor InnoDB para soportar transacciones y claves foráneas.
SET default_storage_engine=InnoDB;

-- -----------------------------------------------------
-- Tabla `clientes`
-- Almacena los usuarios (agentes o propietarios) que publican propiedades.
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clientes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `fecha_registro` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC)
)
COMMENT = 'Tabla para almacenar a los usuarios que suben propiedades.';


-- -----------------------------------------------------
-- Tabla `caracteristicas`
-- Tabla maestra para todas las posibles características y amenidades.
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `caracteristicas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre_caracteristica` VARCHAR(100) NOT NULL,
  `categoria` VARCHAR(50) NOT NULL COMMENT 'Ej: Amenidades, Servicios, Legal, Ubicación',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `nombre_caracteristica_UNIQUE` (`nombre_caracteristica` ASC)
)
COMMENT = 'Tabla maestra de características y amenidades para las propiedades.';


-- -----------------------------------------------------
-- Tabla `propiedades`
-- Tabla principal que contiene la información de cada propiedad.
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `propiedades` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_cliente` INT NOT NULL,
  `tipo_propiedad` VARCHAR(50) NOT NULL COMMENT 'Ej: Terreno, Departamento, Casa, Bodega',
  `titulo` VARCHAR(255) NOT NULL,
  `descripcion` TEXT NOT NULL,
  `precio` DECIMAL(12, 2) NOT NULL,
  `moneda` VARCHAR(3) NOT NULL COMMENT 'Código de moneda de 3 letras (ej: USD, MXN)',
  `m2` DECIMAL(10, 3) NOT NULL,
  `region` VARCHAR(100) NULL DEFAULT NULL,
  `manzana` VARCHAR(100) NULL DEFAULT NULL,
  `lote` VARCHAR(100) NULL DEFAULT NULL,
  `latitud` DECIMAL(10, 8) NULL,
  `longitud` DECIMAL(11, 8) NULL,
  `estatus` VARCHAR(20) NOT NULL DEFAULT 'disponible' COMMENT 'Ej: disponible, vendido, rentado',
  `fecha_creacion` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_propiedades_clientes_idx` (`id_cliente` ASC),
  CONSTRAINT `fk_propiedades_clientes`
    FOREIGN KEY (`id_cliente`)
    REFERENCES `clientes` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
)
COMMENT = 'Tabla principal para almacenar la información de las propiedades.';


-- -----------------------------------------------------
-- Tabla `propiedad_caracteristicas`
-- Tabla pivote para la relación muchos-a-muchos entre propiedades y características.
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `propiedad_caracteristicas` (
  `id_propiedad` INT NOT NULL,
  `id_caracteristica` INT NOT NULL,
  PRIMARY KEY (`id_propiedad`, `id_caracteristica`),
  INDEX `fk_propiedad_caracteristicas_caracteristicas_idx` (`id_caracteristica` ASC),
  INDEX `fk_propiedad_caracteristicas_propiedades_idx` (`id_propiedad` ASC),
  CONSTRAINT `fk_propiedad_caracteristicas_propiedades`
    FOREIGN KEY (`id_propiedad`)
    REFERENCES `propiedades` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_propiedad_caracteristicas_caracteristicas`
    FOREIGN KEY (`id_caracteristica`)
    REFERENCES `caracteristicas` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
)
COMMENT = 'Tabla pivote para relacionar propiedades con sus características.';