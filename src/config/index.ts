import path from 'path'
import dotenv from 'dotenv';
import cast from './cast-helper';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

let envFound;
if (process.env.NODE_ENV === 'production') {
    envFound = dotenv.config({ path: path.join(__dirname, '../../env/.env.production') })
} else if (process.env.NODE_ENV === 'development') {
    envFound = dotenv.config({ path: path.join(__dirname, '../../env/.env.development') })
} else {
    throw new Error('process.env.NODE_ENV를 설정하지 않았습니다!')
}

if (envFound.error) {
    // This error should crash whole process

    console.log(envFound);
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    node_env: cast('NODE_ENV', 'string', 'development'),
    port: cast('PORT', 'number', 3306),
    logs: {
        dir: cast('LOGDIR', 'string', 'logs')
    },
    api: {
        prefix: '/api',
    },
    path: {
        root: path.resolve(),
        assets: path.resolve("./dist/assets")
    },
    openapikey: {
        jejucits: cast('OPENAPIKEY_JEJUCITS', 'number', null)
    }
};