import { Router } from 'express';
import hello from './routes/hello';
import cron from './routes/cron'

// guaranteed to get dependencies
export default () => {
	const app = Router();
    hello(app);
	cron(app);

	return app
}