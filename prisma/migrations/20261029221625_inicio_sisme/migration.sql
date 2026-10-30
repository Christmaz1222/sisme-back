-- CreateEnum
CREATE TYPE "CategoriaConsulta" AS ENUM ('PERSONAS', 'ARMAS', 'VEHICULOS');

-- CreateEnum
CREATE TYPE "EstadoSolicitud" AS ENUM ('ACTIVA', 'FINALIZADA', 'VENCIDA');

-- CreateEnum
CREATE TYPE "EstadoConsulta" AS ENUM ('PENDIENTE', 'COMPLETADA', 'ERROR');

-- CreateTable
CREATE TABLE "funcionarios" (
    "id" SERIAL NOT NULL,
    "identificador" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "grado" TEXT NOT NULL,
    "unidad" TEXT NOT NULL,
    "tipoDocumento" TEXT NOT NULL,
    "numeroDocumento" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "creadoEn" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "funcionarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solicitudes" (
    "id" UUID NOT NULL,
    "funcionarioId" INTEGER NOT NULL,
    "tipoActuacion" TEXT NOT NULL,
    "referencia" TEXT NOT NULL,
    "justificacion" TEXT NOT NULL,
    "categorias" "CategoriaConsulta"[],
    "estado" "EstadoSolicitud" NOT NULL DEFAULT 'ACTIVA',
    "fechaInicio" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaFin" TIMESTAMPTZ(3),
    "codigoControl" TEXT NOT NULL,
    "operadorIdOrigen" INTEGER NOT NULL,
    "tipoDocumentoOperador" TEXT NOT NULL,
    "numeroDocumentoOperador" TEXT NOT NULL,
    "paisOrigen" VARCHAR(2) NOT NULL,
    "organismoSolicitante" TEXT NOT NULL,
    "husoHorarioMinutos" INTEGER NOT NULL,

    CONSTRAINT "solicitudes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consultas" (
    "id" UUID NOT NULL,
    "solicitudId" UUID NOT NULL,
    "categoria" "CategoriaConsulta" NOT NULL,
    "fechaConsulta" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" "EstadoConsulta" NOT NULL DEFAULT 'PENDIENTE',
    "cantidadResultados" INTEGER,
    "duracionMs" INTEGER,
    "codigoError" TEXT,

    CONSTRAINT "consultas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "funcionarios_identificador_key" ON "funcionarios"("identificador");

-- CreateIndex
CREATE UNIQUE INDEX "solicitudes_codigoControl_key" ON "solicitudes"("codigoControl");

-- CreateIndex
CREATE INDEX "solicitudes_funcionarioId_fechaInicio_idx" ON "solicitudes"("funcionarioId", "fechaInicio");

-- CreateIndex
CREATE INDEX "solicitudes_estado_idx" ON "solicitudes"("estado");

-- CreateIndex
CREATE INDEX "consultas_solicitudId_fechaConsulta_idx" ON "consultas"("solicitudId", "fechaConsulta");

-- CreateIndex
CREATE INDEX "consultas_categoria_fechaConsulta_idx" ON "consultas"("categoria", "fechaConsulta");

-- AddForeignKey
ALTER TABLE "solicitudes" ADD CONSTRAINT "solicitudes_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "funcionarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultas" ADD CONSTRAINT "consultas_solicitudId_fkey" FOREIGN KEY ("solicitudId") REFERENCES "solicitudes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
