import { Module } from '@nestjs/common';

import { SismeService } from './sisme.service.js';
import { SismeController } from './sisme.controller.js';

@Module({
  controllers: [SismeController],
  providers: [SismeService],
  exports: [SismeService],
})
export class SismeModule {}
