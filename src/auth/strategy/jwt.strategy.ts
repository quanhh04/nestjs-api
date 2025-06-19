/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// quản lý request cần dùng jwt 
// login rồi và có jwt token thì sẽ dùng jwt để xác thực các request tiếp theo

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Prisma } from "@prisma/client";
import { Strategy, ExtractJwt } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        configService: ConfigService,
        private prismaService: PrismaService
    ) {
        super({
            // token sẽ được lấy từ header Authorization
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // secret key để giải mã token
            secretOrKey: configService.get<string>('JWT_SECRET')
        });
    }

    async validate(payload: {sub: number, email: string}) { // hàm dùng để validate token
        // payload chứa thông tin người dùng đã được mã hóa trong token
        // có thể là id, email, v.v.
        const user = await this.prismaService.user.findUnique({
            where: {
                id: payload.sub // sub là id của người dùng
            }
        });
        if (!user) {
            return null;
        } else {
            // Remove hashedPassword from the returned user object
            const { hashedPassword, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }
    }
}


