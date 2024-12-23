import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston'
import { PrismaService } from './prisma.service';
import { ValidationService } from './validation.service';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFilter } from './error.filter';
import { format } from "winston";
import { AuthMiddleware } from './auth.middleware';

@Global()
@Module({
  imports: [
    WinstonModule.forRoot({
      format: format.combine(
        format.colorize(), // Menambahkan warna pada output console
        format.printf(({ level, message }) => {
          return `[${level}]: ${message}`; // Format log kustom
        })
      ),
      transports: [
        new winston.transports.Console()
      ]
    }),
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  providers: [PrismaService, ValidationService, {
    provide: APP_FILTER,
    useClass: ErrorFilter
  }],
  exports: [PrismaService, ValidationService]
})

export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/api/*');
  }
}
