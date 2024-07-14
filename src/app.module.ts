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
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [Customer],
      database: process.env.DB_NAME,
      synchronize: false,
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

export class AppModule { }
