import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { UsersModule } from './modules/users/users.module';
import { CategoryModule } from './modules/category/category.module';
import { AccountModule } from './modules/account/account.module';

@Module({
  imports: [
    CommonModule,
    UsersModule,
    CategoryModule,
    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
