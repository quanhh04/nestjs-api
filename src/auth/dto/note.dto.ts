/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString } from "class-validator";

export class NoteDTO {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    description: string;

    @IsString()
    url: string;
    
};