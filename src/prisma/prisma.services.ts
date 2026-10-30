import "dotenv/config"

import { Injectable, Logger } from "@nestjs/common"
import type {
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common"

import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../generated/prisma/client.js"

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name)

  constructor() {
    const connectionString = process.env.DATABASE_URL

    if (!connectionString) {
      throw new Error("Falta configurar DATABASE_URL en el backend.")
    }

    const adapter = new PrismaPg({
      connectionString,
    })

    super({ adapter })
  }

  async onModuleInit(): Promise<void> {
    await this.$connect()

    // Consulta sencilla para comprobar la conexión real.
    await this.$queryRaw`SELECT 1`

    this.logger.log("Conexión con PostgreSQL verificada.")
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect()
  }
}