
import { Injectable, Logger } from '@nestjs/common';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import * as soap from 'soap';

@Injectable()
export class SoapTestService {
  private readonly logger = new Logger(SoapTestService.name);

  iniciarServidor(httpServer: any): void {
    const rutaWsdl = join(
      process.cwd(),
      'src',
      'soap-test',
      'wsdl',
      'personas.wsdl',
    );

    const wsdl = readFileSync(rutaWsdl, 'utf8');

    const servicios = {
      PersonasService: {
        PersonasPort: {
          ConsultarPersona: (args: {
            Documento: string;
            Pais: string;
          }) => {
            this.logger.log(
              'Solicitud SOAP recibida correctamente',
            );

            const encontrado =
              args.Documento === '1234567' &&
              args.Pais === 'BO';

            return {
              Codigo: encontrado ? '00' : '01',
              Encontrado: encontrado,
              Nombre: encontrado
                ? 'PERSONA DE PRUEBA'
                : '',
            };
          },
        },
      },
    };

    soap.listen(
      httpServer,
      '/soap/personas',
      servicios,
      wsdl,
    );

    this.logger.log(
      'Servidor SOAP iniciado en /soap/personas',
    );
  }
}
