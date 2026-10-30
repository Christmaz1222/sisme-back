
import { Injectable, Logger } from '@nestjs/common';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import * as soap from 'soap';

@Injectable()
export class SoapTestService {
  private readonly logger = new Logger(SoapTestService.name);

  iniciarServidor(httpServer: any): void {
    // Ubicación del contrato WSDL
    const rutaWsdl = join(
      process.cwd(),
      'src',
      'soap-test',
      'wsdl',
      'personas.wsdl',
    );

    const wsdl = readFileSync(rutaWsdl, 'utf8');

    // Operaciones SOAP disponibles
    const servicios = {
      PersonasService: {
        PersonasPort: {
          ConsultarPersona: (
            args: {
              Documento: string;
              Pais: string;
            },
          ) => {
            this.logger.log(
              'Consulta SOAP recibida',
            );

            // Datos ficticios para nuestro laboratorio
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

    // Publicar servidor SOAP
    soap.listen(
      httpServer,
      '/soap/personas',
      servicios,
      wsdl,
    );

    this.logger.log(
      'Servidor SOAP disponible en /soap/personas',
    );
  }
}
