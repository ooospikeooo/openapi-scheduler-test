import { Container } from 'typedi';
import axios from 'axios';
import avro from 'avsc';

import LoggerInstance from './logger';
import config from '@/config';
import { CronHandler } from '@/services/cronhandler';
import { AvroSchemaParkingLotStatus } from '@/services/avroschemaparkinglotstatus';
import { getDataTime } from '@/utils/time';

export default () => {
    try {
        Container.set('logger', LoggerInstance);

        const avroSchemaParkingLotStatusInstance = new AvroSchemaParkingLotStatus(config.avro.schemaPath)
        Container.set('avroSchemaParkingLotStatus', avroSchemaParkingLotStatusInstance);

        const cronhandlerInstance = new CronHandler(config.cron.initialPattern, async () => {
            let data_time = getDataTime(new Date());

            LoggerInstance.info('cron job is called ');

            const apiKey = config.openapi.keys.jejucits;
            const apiUrl = config.openapi.url;
            const response = await axios.get(apiUrl, { params: { code: apiKey } });

            // LoggerInstance.info(JSON.stringify(response.data));

            const schema: AvroSchemaParkingLotStatus = Container.get('avroSchemaParkingLotStatus');
            let encoder = new avro.streams.BlockEncoder(schema.getSchema());

            response.data.info.forEach((item: any) => {
                item.id = Number(item.id);
                item.date_time = data_time;
                encoder.write(item);
            });
            encoder.end();

            const buff = [];
            for await (let chunk of encoder) {
                buff.push(chunk);
            }

            const binaryData = Buffer.concat(buff);

            LoggerInstance.info('before avro send. ');

            axios.post(config.dataInterfaceIpAddress,
                {
                    avro: Buffer.from(binaryData).toString('base64')
                }).then((res) => {
                    LoggerInstance.info(res.data);
                }).catch(error => {
                    LoggerInstance.error(error.response, error);
                });
        });

        Container.set('cronHandler', cronhandlerInstance);
    } catch (e) {
        LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
        throw e;
    }
};