import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(configService: ConfigService) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        super({
            datasources: {
                db: {  
                    url: configService.get<string>('DATABASE_URL')
                },
            },
            log: ['query', 'info', 'warn', 'error'],
        });
    }
}
