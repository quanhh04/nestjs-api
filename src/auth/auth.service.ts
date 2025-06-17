import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService) {
        // Constructor logic can be added here if needed
    }
    resgister() {
        return {
            message: "User registered successfully",
            status: "success"
        };
    }

    login() {
        return {
            message: "User logged in successfully",
            status: "success"
        };
    }
}