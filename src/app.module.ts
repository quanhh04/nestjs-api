/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { NoteModule } from './note/note.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Đặt ConfigModule là toàn cục để có thể sử dụng ở bất kỳ đâu trong ứng dụng
      envFilePath: '.env', // Đường dẫn đến file .env
    }),
    AuthModule,
    UserModule,
    NoteModule,
    PrismaModule
  ],
})
export class AppModule {}
