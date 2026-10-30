
import { Module } from '@nestjs/common';
import { SoapTestService } from './soap-test.service.js';

@Module({
  providers: [SoapTestService],
  exports: [SoapTestService],
})
export class SoapTestModule {}
