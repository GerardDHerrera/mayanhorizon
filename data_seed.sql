-- Script para poblar la tabla `caracteristicas` con datos iniciales.
-- Autor: Jules
-- Fecha: 2024-07-25

-- Categoría: Ubicación
INSERT INTO `caracteristicas` (`nombre_caracteristica`, `categoria`) VALUES
('Vista al mar', 'Ubicación'),
('Zona céntrica', 'Ubicación'),
('Frente a parque', 'Ubicación'),
('En esquina', 'Ubicación'),
('Cerca de centro comercial', 'Ubicación'),
('Zona de alta plusvalía', 'Ubicación');

-- Categoría: Amenidades
INSERT INTO `caracteristicas` (`nombre_caracteristica`, `categoria`) VALUES
('Piscina', 'Amenidades'),
('Gimnasio', 'Amenidades'),
('Seguridad 24/7', 'Amenidades'),
('Salón de eventos', 'Amenidades'),
('Área de juegos infantiles', 'Amenidades'),
('Terraza / Roof garden', 'Amenidades'),
('Aire Acondicionado', 'Amenidades'),
('Amueblado', 'Amenidades');

-- Categoría: Servicios
INSERT INTO `caracteristicas` (`nombre_caracteristica`, `categoria`) VALUES
('Agua potable', 'Servicios'),
('Electricidad', 'Servicios'),
('Drenaje', 'Servicios'),
('Acceso a Internet de alta velocidad', 'Servicios'),
('Línea telefónica', 'Servicios'),
('Gas natural', 'Servicios');

-- Categoría: Legales y de Terreno
INSERT INTO `caracteristicas` (`nombre_caracteristica`, `categoria`) VALUES
('Uso de suelo residencial', 'Legales y de Terreno'),
('Uso de suelo comercial', 'Legales y de Terreno'),
('Uso de suelo mixto', 'Legales y de Terreno'),
('Título de propiedad', 'Legales y de Terreno'),
('Libre de gravamen', 'Legales y de Terreno'),
('Cesión de derechos', 'Legales y de Terreno'),
('Escritura pública', 'Legales y de Terreno');

-- Fin del script.
-- Puedes añadir más características siguiendo el mismo formato.