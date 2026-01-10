USE the_good_code;

-- =======================================================
-- 1. LIMPIEZA SEGURA (EVITA EL ERROR #1701)
-- =======================================================
SET FOREIGN_KEY_CHECKS = 0; -- Desactivamos protección momentáneamente

-- Usamos DELETE en lugar de TRUNCATE para evitar el error de restricción
DELETE FROM donacion;
DELETE FROM campaña;

-- Reiniciamos los contadores de ID a 1 manualmente
ALTER TABLE campaña AUTO_INCREMENT = 1;
ALTER TABLE donacion AUTO_INCREMENT = 1;

-- =======================================================
-- 2. INSERTAR 20 CAMPAÑAS (IDs 1 al 20)
-- =======================================================
INSERT INTO `campaña` (`id_campana`, `nombre_campana`, `objetivo_litros_campana`, `fecha_inicio_campana`, `fecha_fin_campana`, `urgente_campana`) VALUES
(1, 'Maratón Universitario', 100.00, '2024-03-01', '2024-03-05', 0),
(2, 'Emergencia Verano', 250.50, '2024-07-01', '2024-08-31', 1),
(3, 'Colecta Hospital Central', 500.00, '2024-01-10', '2024-12-20', 0),
(4, 'Operación Salida Segura', 120.00, '2024-04-01', '2024-04-15', 1),
(5, 'Donación en Empresas Tech', 80.00, '2024-09-10', '2024-09-12', 0),
(6, 'Bus Solidario Ruta Norte', 60.50, '2024-05-01', '2024-05-30', 0),
(7, 'Campaña Navideña', 150.00, '2024-12-01', '2024-12-24', 1),
(8, 'Jornadas Salud Joven', 75.00, '2024-10-15', '2024-10-20', 0),
(9, 'Semana de la Salud', 200.00, '2024-05-10', '2024-05-17', 0),
(10, 'Alerta Reservas Bajas', 400.00, '2024-08-01', '2024-08-15', 1),
(11, 'Donación Universitaria II', 150.00, '2024-10-01', '2024-10-05', 0),
(12, 'Campaña de Otoño', 180.50, '2024-11-01', '2024-11-30', 0),
(13, 'Operación Kilo de Sangre', 90.00, '2024-02-14', '2024-02-14', 1),
(14, 'Fiestas Patronales', 120.00, '2024-08-15', '2024-08-20', 0),
(15, 'Maratón Tech', 300.00, '2024-06-10', '2024-06-12', 0),
(16, 'Emergencia Sísmica', 500.00, '2024-01-05', '2024-02-28', 1),
(17, 'Ruta Solidaria Sur', 75.25, '2024-04-20', '2024-04-25', 0),
(18, 'Campaña Escolar Padres', 110.00, '2024-09-15', '2024-09-30', 0),
(19, 'Invierno Cálido', 220.00, '2024-01-15', '2024-03-01', 0),
(20, 'Urgencia Nacional', 600.00, '2024-12-26', '2024-12-31', 1);

-- =======================================================
-- 3. INSERTAR 55 DONACIONES (IDs 1 al 55)
-- =======================================================
INSERT INTO `donacion` (`id_donacion`, `id_campana`, `nombre_donante`, `peso_donante`, `fecha_donacion`, `es_primera_vez`, `grupo_sanguineo`) VALUES
-- Campaña 1
(1, 1, 'Juan Pérez', 75.50, '2024-03-02', 1, 'A+'),
(2, 1, 'Ana García', 62.00, '2024-03-02', 0, '0-'),
(3, 1, 'Carlos Ruiz', 80.00, '2024-03-03', 0, 'B+'),
-- Campaña 2
(4, 2, 'María López', 55.50, '2024-07-10', 1, 'AB+'),
(5, 2, 'Lucía Fernández', 68.00, '2024-07-15', 0, 'A-'),
(6, 2, 'Jorge Yáñez', 90.20, '2024-07-20', 0, '0+'),
-- Campaña 3
(7, 3, 'Raúl González', 78.00, '2024-02-15', 0, 'B-'),
(8, 3, 'Elena Nito', 60.00, '2024-03-20', 1, 'A+'),
-- Campaña 4
(9, 4, 'Pedro Pascal', 85.00, '2024-04-02', 0, '0-'),
(10, 4, 'Sara Connor', 64.50, '2024-04-05', 1, 'AB-'),
-- Campaña 5
(11, 5, 'Elon M.', 88.00, '2024-09-10', 0, 'A+'),
(12, 5, 'Bill G.', 70.00, '2024-09-11', 0, 'B+'),
-- Campaña 6
(13, 6, 'Marta Sánchez', 58.00, '2024-05-02', 1, '0+'),
(14, 6, 'David Bisbal', 72.50, '2024-05-03', 0, 'A-'),
-- Campaña 7
(15, 7, 'Papá Noel', 120.00, '2024-12-23', 0, '0-'),
(16, 7, 'El Grinch', 50.00, '2024-12-20', 1, 'B-'),
-- Campaña 8
(17, 8, 'Laura Pausini', 61.00, '2024-10-16', 0, 'A+'),
(18, 8, 'Alejandro Sanz', 80.00, '2024-10-18', 0, 'AB+'),
-- Campaña 9
(19, 9, 'Roberto Álamo', 85.00, '2024-05-11', 1, 'A+'),
(20, 9, 'Sonia Bermúdez', 62.40, '2024-05-12', 0, '0-'),
(21, 9, 'Iker Casillas', 90.00, '2024-05-12', 0, 'B+'),
-- Campaña 10
(22, 10, 'Penélope Cruz', 54.00, '2024-08-02', 1, 'AB+'),
(23, 10, 'Antonio Banderas', 78.50, '2024-08-03', 0, 'A-'),
(24, 10, 'Javier Bardem', 95.00, '2024-08-05', 0, '0+'),
(25, 10, 'Elsa Pataky', 59.00, '2024-08-10', 1, 'B-'),
-- Campaña 11
(26, 11, 'Rafa Nadal', 86.00, '2024-10-02', 0, 'A+'),
(27, 11, 'Fernando Alonso', 72.00, '2024-10-03', 0, '0+'),
-- Campaña 12
(28, 12, 'Rosalía Vila', 60.50, '2024-11-05', 1, 'A-'),
(29, 12, 'C. Tangana', 75.00, '2024-11-15', 0, 'B+'),
(30, 12, 'Aitana Ocaña', 56.00, '2024-11-20', 1, 'AB-'),
-- Campaña 13
(31, 13, 'Pablo Alborán', 80.00, '2024-02-14', 0, '0-'),
(32, 13, 'Vanesa Martín', 63.00, '2024-02-14', 0, 'A+'),
-- Campaña 14
(33, 14, 'Ibai Llanos', 110.00, '2024-08-16', 1, 'B+'),
(34, 14, 'El Rubius', 65.00, '2024-08-17', 0, 'AB+'),
-- Campaña 15
(35, 15, 'Auron Play', 78.00, '2024-06-11', 1, '0+'),
(36, 15, 'The Grefg', 74.00, '2024-06-11', 0, 'A-'),
-- Campaña 16
(37, 16, 'Pedro Pascal', 88.50, '2024-01-10', 0, 'B-'),
(38, 16, 'Úrsula Corberó', 53.00, '2024-01-20', 1, '0+'),
(39, 16, 'Miguel Herrán', 70.00, '2024-02-05', 0, 'A+'),
(40, 16, 'Jaime Lorente', 76.50, '2024-02-15', 0, 'AB-'),
-- Campaña 17
(41, 17, 'Ester Expósito', 55.00, '2024-04-21', 1, '0-'),
(42, 17, 'Arón Piper', 72.00, '2024-04-22', 0, 'A+'),
-- Campaña 18
(43, 18, 'Madre Teresa', 50.00, '2024-09-16', 0, '0-'),
(44, 18, 'Padre Ángel', 75.00, '2024-09-17', 0, 'A+'),
-- Campaña 19
(45, 19, 'Jon Nieve', 80.00, '2024-01-20', 1, 'B-'),
(46, 19, 'Daenerys T.', 55.00, '2024-01-25', 0, 'AB+'),
-- Campaña 20
(47, 20, 'Presidente Uno', 85.00, '2024-12-27', 0, 'A+'),
(48, 20, 'Ministra Dos', 60.00, '2024-12-28', 1, '0+');

-- =======================================================
-- 4. RESTAURAR CONFIGURACIÓN Y CONTADORES
-- =======================================================
ALTER TABLE donacion AUTO_INCREMENT = 49;
SET FOREIGN_KEY_CHECKS = 1; -- Volvemos a activar la protección