
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { SoapTestService } from './soap-test/soap-test.service.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.init();

  const soapTest = app.get(SoapTestService);

  soapTest.iniciarServidor(app.getHttpServer());

  await app.listen(3000);

  console.log('Servidor REST: http://localhost:3000');
  console.log(
    'Servidor SOAP: http://localhost:3000/soap/personas?wsdl',
  );
}

bootstrap();
