// src/auth/types/RequestWithUser.ts
import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: {
    id: string; // hoặc kiểu cụ thể theo token bạn decode
    email: string;
    // thêm các field khác nếu cần
  };
}
