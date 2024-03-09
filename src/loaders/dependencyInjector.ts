import { Container } from 'typedi';
import LoggerInstance from './logger';
import { CronHandler } from '@/services/cronhandler';
import axios from 'axios';
import { setTimeout } from "timers/promises";
import config from '@/config';

export default () => {
    try {
        const cronhandlerInstance = new CronHandler('*/10 * * * * *', async () => {
            LoggerInstance.info('cron job is called ');

            const apiKey = config.openapikey.jejucits;
            const apiUrl = `http://api.jejuits.go.kr/api/infoParkingStateList`;
            const response = await axios.get(apiUrl, { params: { code: apiKey } });

            LoggerInstance.info(JSON.stringify(response.data));
        });

        Container.set('cronHandler', cronhandlerInstance);
        Container.set('logger', LoggerInstance);
    } catch (e) {
        LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
        throw e;
    }
};