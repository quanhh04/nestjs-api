import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // danh dau module la Global, co nghia la cung cap PrismaService cho toan bo ung dung
@Module({
  providers: [PrismaService], // cung cap PrismaService cho module hien tai
  exports: [PrismaService], // cho cac module khac co the su dung PrismaService
})
export class PrismaModule {}
