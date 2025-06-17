// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto'; // Import DTO for type safety

@Controller('auth')
export class AuthController {
    constructor(private authServices: AuthService) {

    }

    @Post('resgister')
    // register(@Req() req: Request) { // dung @Req() de lay request (la Decorator cua NestJS)
        // req la Request Object chua toan bo thong tin ve request, bao gom headers, body, params, query, ...
    register(@Body() body: AuthDTO) { // dung @Body() de lay body request (la Decorator cua NestJS)
        // body la Data Transfer Object (DTO) chua du lieu tu client gui len => phai chuan hoa du lieu ko cho phep client gui len cac truong khong hop le
    // register(
    //     @Body('email') email: string, // lay truong email tu body request
    //     @Body('password') password: string, // lay truong password tu body request
    // ) {
        return this.authServices.resgister();
    }

    @Post('login')
    login() {
        return this.authServices.login();
    }
}