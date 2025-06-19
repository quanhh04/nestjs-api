import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { RequestWithUser } from "../../interface/RequestWithUser";

// Custom Decorator để lấy thông tin người dùng từ request
export const GetUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): any => {
    // Lấy đối tượng request từ context
    // ExecutionContext chứa thông tin về request, response, và các thành phần khác của HTTP
    const request: RequestWithUser = context.switchToHttp().getRequest();
    // Lấy thông tin người dùng từ request, thường là từ req.user
    // req.user sẽ chứa thông tin người dùng đã được xác thực
    
    return request.user;
  },
);