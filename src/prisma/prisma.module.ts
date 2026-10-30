import { Module } from "@nestjs/common"
import { PrismaService } from "./prisma.services.js"

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}