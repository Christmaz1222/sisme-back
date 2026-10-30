
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { SoapTestModule } from './soap-test/soap-test.module.js';
import { SismeModule } from './sisme/sisme.module.js';
import { PrismaModule } from "./prisma/prisma.module.js"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SoapTestModule,
    SismeModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
