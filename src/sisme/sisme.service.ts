import {
  Injectable,
  BadGatewayException,
  Logger,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import * as soap from 'soap';

@Injectable()
export class SismeService {
  private readonly logger =
    new Logger(SismeService.name);

  constructor(
    private readonly config: ConfigService,
  ) {}

  async consultarPersona() {
    const wsdl = this.config.getOrThrow<string>(
      'SISME_WSDL_URL',
    );

    const endpoint = this.config.getOrThrow<string>(
      'SISME_ENDPOINT',
    );

    try {
      // Crear cliente a partir del WSDL oficial
      const client = await soap.createClientAsync(
        wsdl,
        {
          endpoint,
          wsdl_options: {
            timeout: 10000,
          },
        },
      );

      // Datos para pruebas autorizadas.
      // Sustituir por valores aprobados por SISME.
      const parametros = {
        sec_trans: 'UY202609070002',
        c_pais: 'UY',
        c_id_op_orig: '123456',
        c_tipo_doc: 'CI',
        c_doc: '123456',
        c_fecha: '2026/08/26',
        c_hora: '01:01:01',
        c_factor_gmt: '-3',
        c_org: 'NONURU',
        c_apellidos: '',
        c_nombres: '',
        c_fec_nac: '',
        c_nro_doc_con: '25214559',
        c_nom_madre: '',
        c_apel_madre: '',
      };

      this.logger.log(
        'Enviando consulta SOAP a SISME',
      );

      const [resultado] =
        await client.BuscarPersonaAsync(
          parametros,
          { timeout: 15000 },
        );

      return {
        exito: true,
        origen: 'SISME',
        operacion: 'BuscarPersona',
        datos: resultado,
      };
    } catch (error) {
      const mensaje =
        error instanceof Error
          ? error.message
          : 'Error desconocido';

      // Evitar registrar XML completo o datos sensibles.
      this.logger.error(
        `Error de comunicación SISME: ${mensaje}`,
      );

      throw new BadGatewayException(
        'No se pudo completar la consulta SOAP a SISME',
      );
    }
  }
}
