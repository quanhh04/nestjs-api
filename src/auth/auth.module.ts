import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

@Module({
    imports: [PrismaModule, JwtModule.register({})], // nhap module PrismaModule de su dung PrismaService
    controllers: [AuthController], // dinh nghia AuthController
    providers: [AuthService, JwtStrategy], // cung cap AuthService va JwtStrategy cho module hien tai
})

export class AuthModule {}