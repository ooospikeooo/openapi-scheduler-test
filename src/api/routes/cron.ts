import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { Logger } from 'winston';
import { CronHandler } from '@/services/cronhandler';

const route = Router();

export default (app: Router) => {
    app.use('/cron', route);

    route.get('/start', (req: Request, res: Response, next: NextFunction) => {
        const Logger: Logger = Container.get('logger');
        try {
            const cronHandler: CronHandler = Container.get('cronHandler');
            cronHandler.start();
            res.status(201).send("cronJob started.");
        } catch (e) {
            Logger.error('🔥 Error attaching user to req: %o', e);
            next(e);
        }
    });

    route.get('/change', function (req, res) {
        const Logger: Logger = Container.get('logger');
        const cronHandler: CronHandler = Container.get('cronHandler');
        let time='*/5 * * * * *';
        cronHandler.setCronPattern(time);
        res.send("cron time change.");
    })
    
    route.get('/time', function (req, res) {
        const Logger: Logger = Container.get('logger');
        const cronHandler: CronHandler = Container.get('cronHandler');
        res.send(cronHandler.getCronPattern());
    });
};