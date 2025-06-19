/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// quản lý request cần dùng jwt 
// login rồi và có jwt token thì sẽ dùng jwt để xác thực các request tiếp theo

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(configService: ConfigService) {
        super({
            // token sẽ được lấy từ header Authorization
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // secret key để giải mã token
            secretOrKey: configService.get<string>('JWT_SECRET')
        });
    }

    validate(payload: any) { // hàm dùng để validate token
        // payload chứa thông tin người dùng đã được mã hóa trong token
        // có thể là id, email, v.v.
        return { userId: payload.sub, email: payload.email };
    }
}


