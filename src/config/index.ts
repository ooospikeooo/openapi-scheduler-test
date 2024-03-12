import path from 'path'
import dotenv from 'dotenv';
import cast from './cast-helper';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

let envFound;
if (process.env.NODE_ENV === 'production') {
    envFound = dotenv.config({ path: path.join(__dirname, '../../env/.env.production'), debug:  true })
} else if (process.env.NODE_ENV === 'development') {
    envFound = dotenv.config({ path: path.join(__dirname, '../../env/.env.development'), debug:  true })
} else {
    throw new Error(`process.env.NODE_ENV 값이 유효하지 않습니다 : ${process.env.NODE_ENV}`)
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
    dataInterfaceIpAddress: cast('DATAINTERFACE_IPADDRESS', 'string', undefined),
    api: {
        prefix: '/api',
    },
    path: {
        root: path.resolve(),
        assets: path.resolve("./dist/assets")
    },
    openapi: {
        url: 'http://api.jejuits.go.kr/api/infoParkingStateList',
        keys: {
            jejucits: cast('OPENAPIKEY_JEJUCITS', 'number', undefined)
        }
    },
    cron: {
        initialPattern: cast('CRON_INITIAL_PATTERN', 'string', undefined)
    },
    avro: {
        schemaPath: cast('AVRO_SCHEMA_FILE', 'string', 'ParkingLotStatus.avsc')
    }
};