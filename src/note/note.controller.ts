/* eslint-disable @typescript-eslint/await-thenable */
import { Controller, Get, Post, UseGuards, Patch, Delete, Req, Body } from '@nestjs/common';
import { MyJwtGuard } from '../auth/guard';
import { NoteService } from './note.service';
import { Request } from 'express';
import { NoteDTO } from '../auth/dto';
import { RequestWithUser } from '../interface/RequestWithUser';

@UseGuards(MyJwtGuard) // UseGuards decorator can be used to apply guards to the controller
@Controller('notes')
export class NoteController {
    constructor(private noteService: NoteService) {
        // Constructor can be used to inject services if needed
    }

    @Get()
    async getNotes(@Req() req: RequestWithUser) {
        const userId = Number(req.user.id);

        return await this.noteService.getNotes(userId);
    }

    @Get(':id')
    async getNoteById() {
        return await this.noteService.getNoteById();
    }

    @Post()
    async createNote(@Req() req: RequestWithUser, @Body() body: NoteDTO) {
        const userId = Number(req.user.id); // Adjust according to your user object

        return await this.noteService.createNote(body, userId);
    }

    @Patch('update')
    async updateNote() {
        return await this.noteService.updateNote();
    }

    @Delete(':id')
    async deleteNote() {
        return await this.noteService.deleteNote();
    }
}
