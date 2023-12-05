create database HECL_LANGUAGE_INSTITUTE;


use HECL_LANGUAGE_INSTITUTE;


create table usuarios (
	id INT IDENTITY(1,1) PRIMARY KEY,
    nombre varchar(100),
    apellido varchar(100),
    telefono int,
    email varchar(100),
    direccion varchar(100),
    dia_nacimiento int,
    mes_nacimiento int,
    ano_nacimiento int,
	matricula varchar(100),
	curso varchar(100)
);


create table cursos (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre varchar(100),
	duracion_horas Int
);


CREATE TABLE sesiones (
    id INT IDENTITY(1,1) PRIMARY KEY,
    id_curso INT,
    sesion_numero INT,
	FOREIGN KEY (id_curso) REFERENCES cursos(id)
);


CREATE TABLE profesores (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre varchar(100),
	apellido varchar(100),
    telefono int,
    email varchar(100),
    direccion varchar(100),
);

go

CREATE TABLE materias (
    id INT IDENTITY(1,1) PRIMARY KEY,
    id_profesor INT,
    sesion_numero INT,
	FOREIGN KEY (id_profesor) REFERENCES profesores(id)
);



