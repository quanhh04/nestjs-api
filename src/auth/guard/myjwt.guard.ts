import { AuthGuard } from "@nestjs/passport";

// Custom JWT Guard để sử dụng trong các route cần xác thực người dùng
// Kế thừa từ AuthGuard của Passport để sử dụng chiến lược JWT
export class MyJwtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  canActivate(context) {
    // Custom logic can be added here if needed
    return super.canActivate(context);
  }
}