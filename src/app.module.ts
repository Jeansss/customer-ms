import { Module } from '@nestjs/common';

import { CustomerUseCaseModule } from './use-cases/customer/customer.use-cases.module';
import { AppController } from './controllers/app.controller';
import { CustomerController } from './controllers/customer/customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './frameworks/data-services/mysql/entities/customer.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      entities: [Customer],
      database: process.env.MYSQL_DB,
      synchronize: true,
      // logging: true,
    }),
    CustomerUseCaseModule
  ],
  controllers: [
    AppController,
    CustomerController,
  ],
  providers: [],
})

export class AppModule {
  constructor() {
    console.log('MySQL Config:', {
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      database: process.env.MYSQL_DB,
    });
  }
 }
