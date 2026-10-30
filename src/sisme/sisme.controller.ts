import {
  Controller,
  Post,
} from '@nestjs/common';

import { SismeService } from './sisme.service.js';

@Controller('api/sisme')
export class SismeController {
  constructor(
    private readonly sismeService: SismeService,
  ) {}

  @Post('personas/prueba')
  async consultarPersonaPrueba() {
    return this.sismeService.consultarPersona();
  }
}
