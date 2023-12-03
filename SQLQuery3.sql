--Crea una base de datos llamada hecl lavanderia

create database HECL_LAVANDERIA

use HECL_LAVANDERIA

create table clientes (
    telefono varchar(20) primary key,
    nombre varchar(100)
);

create table tipos_prenda (
    id int primary key NOT NULL,
    tipo varchar(100) unique
);

create table tipos_servicio (
    id int primary key NOT NULL,
    tipo varchar(100) unique
);

create table precios (
    id int primary key NOT NULL,
    tipo_prenda_id int,
    tipo_servicio_id int,
    precio decimal(8, 2),
    foreign key (tipo_prenda_id) references tipos_prenda(id),
    foreign key (tipo_servicio_id) references tipos_servicio(id)
);

create table servicios (
    id int primary key NOT NULL,
    cliente_telefono varchar(20),
    tipo_prenda_id int,
    tipo_servicio_id int,
    fecha_entrega date,
    es_pago_efectivo bit,
    foreign key (cliente_telefono) references clientes(telefono),
    foreign key (tipo_prenda_id) references tipos_prenda(id),
    foreign key (tipo_servicio_id) references tipos_servicio(id)
);
