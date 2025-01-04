import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { UsersModule } from './modules/users/users.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    CommonModule,
    UsersModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
