import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule], // nhap module PrismaModule de su dung PrismaService
    controllers: [AuthController], // dinh nghia AuthController
    providers: [AuthService], // cung cap AuthService cho cac module khac
})

export class AuthModule {}