import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // add middleware thường use để xử lý các yêu cầu trước khi đến controller
  // Middleware có thể là các hàm xử lý yêu cầu, xác thực, ghi log, v.v.
  app.enableCors(); // cho phép CORS để ứng dụng có thể nhận yêu cầu từ các nguồn khác
  app.useGlobalPipes(new ValidationPipe()); // dung Pipe  de validate du lieu dau vao
  // Pipe se kiem tra du lieu dau vao co hop le hay khong, neu khong hop le se tra ve loi
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
