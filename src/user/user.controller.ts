import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
    @UseGuards(AuthGuard('jwt')) // Sử dụng AuthGuard để bảo vệ route này
    @Get('profile')
    getProfile() {
        // cần "Guard" để xác thực người dùng đã đăng nhập hay chưa
        // và lấy thông tin người dùng từ token JWT
        return { message: 'User profile' };
    }
}
