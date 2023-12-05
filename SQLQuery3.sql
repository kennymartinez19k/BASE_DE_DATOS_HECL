USE master
GO
CREATE DATABASE [HECL_LANGUAGE_INSTITUTE]
GO
USE [HECL_LANGUAGE_INSTITUTE]
GO
CREATE TABLE [dbo].[Clase] (
	[Id] INT IDENTITY(1,1) PRIMARY KEY,
	[EstudianteId] [int] NOT NULL,
	[SeccionId] [int] NOT NULL,
	[HorasCursadas] [int] NOT NULL
)
GO

CREATE TABLE [dbo].[Curso](
	[Id] INT IDENTITY(1,1) PRIMARY KEY,
	[ProgramaId] [int] NOT NULL,
	[Nombre] [varchar](100) NOT NULL,
	[HorasSemanal] [int] NOT NULL,
	[Orden] [int] NOT NULL,
)

GO
CREATE TABLE [dbo].[Estudiante](
	[Id] INT IDENTITY(1,1) PRIMARY KEY,
	[Nombre] [varchar](100) NOT NULL,
	[Apellido] [varchar](100) NOT NULL,
	[Telefono] [varchar](100) NULL,
	[Email] [varchar](100) NOT NULL,
	[Direccion] [varchar](max) NULL,
	[fecha_nacimiento] [date] NOT NULL,
	[matricula] [varchar](15) NOT NULL,
)

GO
CREATE TABLE [dbo].[Periodo](
	[Id] INT IDENTITY(1,1) PRIMARY KEY,
	[Nombre] [varchar](100) NOT NULL,
	[FechaInicio] [date] NOT NULL,
	[FechaFin] [date] NOT NULL,
)

GO
CREATE TABLE [dbo].[Profesor](
	[Id] INT IDENTITY(1,1) PRIMARY KEY,
	[Nombre] [varchar](100) NULL,
)
GO


CREATE TABLE [dbo].[Programa](
	[Id] INT IDENTITY(1,1) PRIMARY KEY,
	[Nombre] [varchar](100) NOT NULL,
)
GO

CREATE TABLE [dbo].[Seccion](
	[Id] INT IDENTITY(1,1) PRIMARY KEY,
	[CursoId] [int] NOT NULL,
	[Nombre] [varchar](100) NOT NULL,
	[PeriodoId] [int] NOT NULL,
	[ProfesorId] [int] NOT NULL,
	[Dia] [int] NOT NULL,
	[HoraInicio] [time](7) NOT NULL,
	[HoraFin] [time](7) NOT NULL,
 )
GO

SET IDENTITY_INSERT [dbo].[Curso] ON 
GO
INSERT [dbo].[Curso] ([Id], [ProgramaId], [Nombre], [HorasSemanal], [Orden]) VALUES (1, 1, N'Nivel 1', 4, 1)
GO
INSERT [dbo].[Curso] ([Id], [ProgramaId], [Nombre], [HorasSemanal], [Orden]) VALUES (2, 1, N'Nivel 2', 4, 2)
GO
INSERT [dbo].[Curso] ([Id], [ProgramaId], [Nombre], [HorasSemanal], [Orden]) VALUES (3, 1, N'Nivel 3', 4, 3)
GO
INSERT [dbo].[Curso] ([Id], [ProgramaId], [Nombre], [HorasSemanal], [Orden]) VALUES (4, 2, N'Nivel 4', 6, 4)
GO
INSERT [dbo].[Curso] ([Id], [ProgramaId], [Nombre], [HorasSemanal], [Orden]) VALUES (5, 2, N'Nivel 5', 6, 5)
GO
SET IDENTITY_INSERT [dbo].[Curso] OFF
GO
SET IDENTITY_INSERT [dbo].[Estudiante] ON 
GO
INSERT [dbo].[Estudiante] ([Id], [Nombre], [Apellido], [Telefono], [Email], [Direccion], [fecha_nacimiento], [matricula]) VALUES (1, N'Ali', N'Garcia', N'809-590-1278', N'aligarcia@gmail.com', N'Calle Altagracia', CAST(N'1995-01-01' AS Date), N'2325-5456')
GO
INSERT [dbo].[Estudiante] ([Id], [Nombre], [Apellido], [Telefono], [Email], [Direccion], [fecha_nacimiento], [matricula]) VALUES (2, N'John', N'Rodriguez', N'809-590-1111', N'jrodriguez@gmail.com', N'Calle APedro', CAST(N'1996-01-01' AS Date), N'2325-5457')
GO
INSERT [dbo].[Estudiante] ([Id], [Nombre], [Apellido], [Telefono], [Email], [Direccion], [fecha_nacimiento], [matricula]) VALUES (3, N'David', N'Gonzalez', N'809-590-1102', N'dgonzalez@gmail.com', N'Calle Colon', CAST(N'1995-05-01' AS Date), N'2325-5458')
GO
INSERT [dbo].[Estudiante] ([Id], [Nombre], [Apellido], [Telefono], [Email], [Direccion], [fecha_nacimiento], [matricula]) VALUES (4, N'Li', N'Fernandez', N'809-123-1278', N'lifernandez@gmail.com', N'Calle Consuelo', CAST(N'1995-12-31' AS Date), N'2325-5459')
GO
SET IDENTITY_INSERT [dbo].[Estudiante] OFF
GO
SET IDENTITY_INSERT [dbo].[Periodo] ON 
GO
INSERT [dbo].[Periodo] ([Id], [Nombre], [FechaInicio], [FechaFin]) VALUES (1, N'Enero - Marzo 2023', CAST(N'2023-01-01' AS Date), CAST(N'2023-03-31' AS Date))
GO
SET IDENTITY_INSERT [dbo].[Periodo] OFF
GO
SET IDENTITY_INSERT [dbo].[Profesor] ON 
GO
INSERT [dbo].[Profesor] ([Id], [Nombre]) VALUES (1, N'Ana Alcantara')
GO
INSERT [dbo].[Profesor] ([Id], [Nombre]) VALUES (2, N'Beatriz Lopez
')
GO
INSERT [dbo].[Profesor] ([Id], [Nombre]) VALUES (3, N'Julian Gomez
')
GO
INSERT [dbo].[Profesor] ([Id], [Nombre]) VALUES (4, N'Julieta Veriena
')
GO
INSERT [dbo].[Profesor] ([Id], [Nombre]) VALUES (5, N'Lucas Martinez
')
GO
INSERT [dbo].[Profesor] ([Id], [Nombre]) VALUES (6, N'Marcos Ramirez
')
GO
SET IDENTITY_INSERT [dbo].[Profesor] OFF
GO
SET IDENTITY_INSERT [dbo].[Programa] ON 
GO
INSERT [dbo].[Programa] ([Id], [Nombre]) VALUES (1, N'Ingles Basico Para Niños')
GO
INSERT [dbo].[Programa] ([Id], [Nombre]) VALUES (2, N'Ingles Intermedio Para Niños')
GO
SET IDENTITY_INSERT [dbo].[Programa] OFF
GO
SET IDENTITY_INSERT [dbo].[Seccion] ON 
GO
INSERT [dbo].[Seccion] ([Id], [CursoId], [Nombre], [PeriodoId], [ProfesorId], [Dia], [HoraInicio], [HoraFin]) VALUES (1, 1, N'Seccion A', 1, 1, 1, CAST(N'09:00:00' AS Time), CAST(N'11:00:00' AS Time))
GO
INSERT [dbo].[Seccion] ([Id], [CursoId], [Nombre], [PeriodoId], [ProfesorId], [Dia], [HoraInicio], [HoraFin]) VALUES (2, 1, N'Seccion B', 1, 1, 1, CAST(N'11:01:00' AS Time), CAST(N'13:00:00' AS Time))
GO
INSERT [dbo].[Seccion] ([Id], [CursoId], [Nombre], [PeriodoId], [ProfesorId], [Dia], [HoraInicio], [HoraFin]) VALUES (3, 2, N'Seccion A', 1, 2, 2, CAST(N'08:00:00' AS Time), CAST(N'10:00:00' AS Time))
GO
SET IDENTITY_INSERT [dbo].[Seccion] OFF
GO
ALTER TABLE [dbo].[Clase]  WITH CHECK ADD  CONSTRAINT [FK_Clase_Estudiante] FOREIGN KEY([EstudianteId])
REFERENCES [dbo].[Estudiante] ([Id])
GO
ALTER TABLE [dbo].[Clase] CHECK CONSTRAINT [FK_Clase_Estudiante]
GO
ALTER TABLE [dbo].[Clase]  WITH CHECK ADD  CONSTRAINT [FK_Clase_Seccion] FOREIGN KEY([SeccionId])
REFERENCES [dbo].[Seccion] ([Id])
GO
ALTER TABLE [dbo].[Clase] CHECK CONSTRAINT [FK_Clase_Seccion]
GO
ALTER TABLE [dbo].[Curso]  WITH CHECK ADD  CONSTRAINT [FK_Curso_Id_Programa_Id] FOREIGN KEY([ProgramaId])
REFERENCES [dbo].[Programa] ([Id])
GO
ALTER TABLE [dbo].[Curso] CHECK CONSTRAINT [FK_Curso_Id_Programa_Id]
GO
ALTER TABLE [dbo].[Seccion]  WITH CHECK ADD  CONSTRAINT [FK_Seccion_Curso] FOREIGN KEY([CursoId])
REFERENCES [dbo].[Curso] ([Id])
GO
ALTER TABLE [dbo].[Seccion] CHECK CONSTRAINT [FK_Seccion_Curso]
GO
ALTER TABLE [dbo].[Seccion]  WITH CHECK ADD  CONSTRAINT [FK_Seccion_Periodo1] FOREIGN KEY([PeriodoId])
REFERENCES [dbo].[Periodo] ([Id])
GO
ALTER TABLE [dbo].[Seccion] CHECK CONSTRAINT [FK_Seccion_Periodo1]
GO
ALTER TABLE [dbo].[Seccion]  WITH CHECK ADD  CONSTRAINT [FK_Seccion_Profesor] FOREIGN KEY([ProfesorId])
REFERENCES [dbo].[Profesor] ([Id])
GO
ALTER TABLE [dbo].[Seccion] CHECK CONSTRAINT [FK_Seccion_Profesor]
GO
