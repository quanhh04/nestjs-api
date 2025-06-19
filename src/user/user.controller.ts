import { Controller, Get, UseGuards } from '@nestjs/common';
import { MyJwtGuard } from '../auth/guard/myjwt.guard'; // Import custom JWT guard
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';

@Controller('user')
export class UserController {
    // @UseGuards(AuthGuard('jwt')) // Sử dụng AuthGuard để bảo vệ route này
    @UseGuards(MyJwtGuard) // Sử dụng custom JWT guard
    // MyJwtGuard sẽ kế thừa AuthGuard('jwt') và có thể thêm logic
    @Get('profile')
    // getProfile(@Req() req: any) { // Sử dụng @Req() để lấy request từ client
    getProfile(@GetUser() user: User) { // Sử dụng custom User decorator để lấy thông tin người dùng
        // cần "Guard" để xác thực người dùng đã đăng nhập hay chưa
        // và lấy thông tin người dùng từ token JWT
        // console.log('User profile request:', req.user);
        // req.user sẽ chứa thông tin người dùng đã được xác thực
        // nó đến từ JwtStrategy.validate() trong auth/strategy/jwt.strategy.ts
        // Bạn có thể trả về thông tin người dùng hoặc thực hiện các thao tác khác
        
        return { 
            message: 'User profile',
            status: 'success',
            data: user // Trả về thông tin người dùng đã xác thực
        };
        // luồng Guards mặc định là như vậy

        // 1. Nhận request từ client
        // 2. Kiểm tra xem người dùng đã đăng nhập hay chưa
        // 3. Nếu đã đăng nhập, lấy thông tin người dùng từ token JWT
        // 4. Trả về thông tin người dùng hoặc thực hiện các thao tác khác
        // 5. Nếu chưa đăng nhập, trả về lỗi 401 Unauthorized
        // 6. Nếu có lỗi trong quá trình xác thực, trả về lỗi 403
        // 7. Nếu có lỗi trong quá trình truy vấn cơ sở dữ liệu, trả về lỗi 500 Internal Server Error
        // 8. Nếu không có lỗi, trả về thông tin người dùng đã xác thực

        // giờ sẽ custom guard để bảo vệ các route khác
        // và sẽ dùng guard này để bảo vệ các route khác trong ứng dụng
    }
}
