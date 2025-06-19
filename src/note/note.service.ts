import { Body, Injectable } from "@nestjs/common";
import { NoteDTO } from "../auth/dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class NoteService {
    constructor(private prismaService: PrismaService) {
        // Constructor can be used to inject other services if needed
    }

    async getNotes(userId: number) {
        const data = await this.prismaService.note.findMany({
            where: {
                userId: userId, // Assuming userId is passed correctly
            },
        });

        return {
            message: 'Notes retrieved successfully',
            status: 'success',
            data: data,
        };
    }

    getNoteById() {
        return 'This action returns a note by ID';
    }

    async createNote(@Body() body: NoteDTO, userId: number) {
        const existingNote = await this.prismaService.note.findFirst({
            where: {
                title: body.title,
                userId: userId, // Assuming userId is passed correctly
            },
        });

        if (existingNote) {
            return {
                message: 'Note with this title already exists',
                status: 'error',
                data: null,
            };
        }

        await this.prismaService.note.create({
            data: {
                title: body.title,
                description: body.description,
                url: body.url,
                userId: userId, // Assuming userId is passed correctly
            },
        });

        return {
            message: 'Note created successfully',
            status: 'success',
            data: body,
        };
    }

    updateNote() {
        return 'This action updates a note';
    }

    deleteNote() {
        return 'This action deletes a note';
    }
}