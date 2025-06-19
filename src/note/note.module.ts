import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { PrismaModule } from '../prisma/prisma.module'; // Import PrismaModule to use PrismaService

@Module({
  imports: [PrismaModule], // Import PrismaModule to use PrismaService
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
