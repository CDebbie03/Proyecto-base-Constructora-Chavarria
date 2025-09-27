-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS constructora_chavarria;
USE constructora_chavarria;

-- =========================
-- Tabla Usuarios
-- =========================
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    correo VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

-- Insertar 4 usuarios
INSERT INTO usuarios (correo, password) VALUES
('admin@chavarria.com', 'admin123'),
('gerente@chavarria.com', 'gerente123'),
('supervisor@chavarria.com', 'super123'),
('empleado@chavarria.com', 'empleado123');

select * from usuarios;
-- =========================
-- Tabla Proyectos
-- =========================
CREATE TABLE proyectos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    descripcion TEXT,
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Insertar 20 proyectos
INSERT INTO proyectos (nombre, estado, descripcion, usuario_id) VALUES
('Proyecto A', 'En Progreso', 'Construcción de viviendas en Tegucigalpa', 1),
('Proyecto B', 'Finalizado', 'Edificio de oficinas en San Pedro Sula', 1),
('Proyecto C', 'En Progreso', 'Escuela en Choluteca', 2),
('Proyecto D', 'Pendiente', 'Hospital regional en La Ceiba', 2),
('Proyecto E', 'En Progreso', 'Carretera hacia Danlí', 3),
('Proyecto F', 'Finalizado', 'Puente sobre el río Ulúa', 3),
('Proyecto G', 'En Progreso', 'Complejo habitacional en Comayagua', 4),
('Proyecto H', 'Pendiente', 'Centro comercial en SPS', 1),
('Proyecto I', 'En Progreso', 'Parque recreativo en Santa Rosa de Copán', 2),
('Proyecto J', 'Finalizado', 'Mejoras en aeropuerto Toncontín', 3),
('Proyecto K', 'En Progreso', 'Edificio universitario en UNAH-VS', 4),
('Proyecto L', 'Pendiente', 'Reparación de calles en Choloma', 2),
('Proyecto M', 'En Progreso', 'Residencial en Valle de Ángeles', 1),
('Proyecto N', 'Finalizado', 'Estadio en Tegucigalpa', 3),
('Proyecto O', 'Pendiente', 'Clínica en Catacamas', 4),
('Proyecto P', 'En Progreso', 'Mercado municipal en Juticalpa', 2),
('Proyecto Q', 'Finalizado', 'Terminal de buses en El Progreso', 1),
('Proyecto R', 'En Progreso', 'Centro cultural en Gracias', 3),
('Proyecto S', 'Pendiente', 'Biblioteca en SPS', 2),
('Proyecto T', 'Finalizado', 'Plaza pública en Tela', 4);

select * from proyectos;
-- =========================
-- Tabla Trabajadores
-- =========================
CREATE TABLE trabajadores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    horas_trabajadas INT NOT NULL,
    proyecto_id INT,
    comentario VARCHAR(300) NOT NULL,
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id)
);

-- Insertar 20 trabajadores
INSERT INTO trabajadores (nombre, horas_trabajadas, proyecto_id, comentario) VALUES
('Juan Pérez', 120, 1, 'Trabajador experimentado en albañilería'),
('María López', 95, 1, 'Especialista en soldadura'),
('Carlos Sánchez', 150, 2, 'Experto en estructuras'),
('Ana Torres', 80, 3, 'Ayudante general'),
('Pedro Gómez', 60, 4, 'Encargado de acabados'),
('José Martínez', 110, 5, 'Conductor de maquinaria pesada'),
('Laura Ramírez', 70, 6, 'Inspectora de seguridad'),
('Luis Fernández', 140, 7, 'Maestro de obras'),
('Carmen Díaz', 100, 8, 'Electricista'),
('Miguel Herrera', 130, 9, 'Fontanero'),
('Rosa Morales', 85, 10, 'Jardinera'),
('Andrés Castro', 90, 11, 'Albañil'),
('Paola Reyes', 75, 12, 'Pintora'),
('Jorge Varela', 105, 13, 'Jefe de cuadrilla'),
('Elena Méndez', 115, 14, 'Soldadora'),
('Ricardo Ortiz', 65, 15, 'Ayudante de electricista'),
('Gabriela Suárez', 150, 16, 'Topógrafa'),
('David Castillo', 95, 17, 'Arquitecto de obra'),
('Marta Navarro', 85, 18, 'Decoradora de interiores'),
('Francisco Rivera', 100, 19, 'Supervisor de calidad');

select * from trabajadores;
-- =========================
-- Tabla Inventario
-- =========================
CREATE TABLE inventario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    herramienta VARCHAR(100) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    proyecto_id INT,
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id)
);

-- Insertar 20 items de inventario
INSERT INTO inventario (herramienta, estado, proyecto_id) VALUES
('Martillo', 'Disponible', 1),
('Taladro', 'En uso', 1),
('Cemento', 'Disponible', 2),
('Arena', 'Disponible', 2),
('Grava', 'En uso', 3),
('Carretilla', 'Disponible', 4),
('Escalera', 'Dañada', 5),
('Mezcladora', 'En reparación', 6),
('Casco de seguridad', 'Disponible', 7),
('Guantes', 'Disponible', 8),
('Concreto premezclado', 'Disponible', 9),
('Sierra eléctrica', 'En uso', 10),
('Compresor de aire', 'Disponible', 11),
('Generador eléctrico', 'Disponible', 12),
('Andamios', 'En uso', 13),
('Cables eléctricos', 'Disponible', 14),
('Tubos PVC', 'Disponible', 15),
('Pintura', 'Disponible', 16),
('Ladrillos', 'En uso', 17),
('Bloques de concreto', 'Disponible', 18);

select*from inventario;