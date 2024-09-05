import { Logger, Module } from '@nestjs/common';

import { CustomerUseCaseModule } from './use-cases/customer/customer.use-cases.module';
import { AppController } from './controllers/app.controller';
import { CustomerController } from './controllers/customer/customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './frameworks/data-services/mysql/entities/customer.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database-2.cruc02goorhv.us-east-1.rds.amazonaws.com',
      port: 5556,
      username: 'admin',
      password: 'Nowadays*557fazom65',
      entities: [Customer],
      database: 'database-2',
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

export class AppModule {}
