/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from "argon2" // thư viện để mã hóa mật khẩu
import { AuthDTO } from "./dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService, // Nếu bạn cần sử dụng JWT để tạo token sau khi đăng nhập
        private readonly configService: ConfigService // Để lấy các biến môi trường từ file .env
    ) {
        // Constructor logic can be added here if needed
    }
    async resgister(authDTO : AuthDTO) {
        try {
            const hashedPassword = await argon.hash(authDTO.password); // Mã hóa mật khẩu ví dụ
            const user = await this.prismaService.user.create({
                data: {
                    email: authDTO.email,
                    hashedPassword: hashedPassword, // Lưu mật khẩu đã mã hóa
                    firstName: authDTO.firstName,
                    lastName: authDTO.lastName,
                },
                select: {
                    id: true,
                    email: true,
                    createdAt: true,
                }
            });
            
            return {
                message: `User registered successfully`,
                status: "success",
                data: user
            };
        } catch (error) {
            if (error.code === 'P2002') {
                // P2002 is the error code for unique constraint violation in Prisma
                throw new ForbiddenException(`Email ${authDTO.email} is already registered.`);
            }

            throw new ForbiddenException(`Error registering user: ${error.message}`);
        }
    }

    async login(authDTO: AuthDTO) {
        try {
            const user = await this.prismaService.user.findUnique({
                where: {
                    email: authDTO.email
                },
                select: {
                    id: true,
                    email: true,
                    hashedPassword: true, // Lấy mật khẩu đã mã hóa để so sánh
                }
            })

            if (!user) {
                throw new ForbiddenException(`Email ${authDTO.email} is not registered.`);
            }
            const passwordMatches = await argon.verify(user.hashedPassword, authDTO.password);
            if (!passwordMatches) {
                throw new ForbiddenException(`Invalid password for email ${authDTO.email}.`);
            }       
            return {
                message: `User logged in successfully`,
                status: "success",
                data: {
                    id: user.id,
                    email: user.email
                },
                token: await this.signJwtToken(user.id, user.email) // Gọi hàm để tạo token JWT
            };

        } catch (error) {
            throw new ForbiddenException(`Error logging in user: ${error.message}`);
        }
    }

    async signJwtToken(userId: number, email: string): Promise<{accessToken: string}> {
        const payload = {
            sub: userId, // sub là viết tắt của subject, thường dùng để lưu trữ ID người dùng
            email: email // Thêm email vào payload để có thể sử dụng trong token
        }

        const jwtString = await this.jwtService.signAsync(payload, {
            expiresIn: '10m', // Thời gian hết hạn của token, có thể điều chỉnh theo nhu cầu
            secret: this.configService.get<string>('JWT_SECRET')
        });

        return {
            accessToken: jwtString // Trả về token JWT
        }
    }
}