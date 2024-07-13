import { Module } from '@nestjs/common';

import { CustomerUseCaseModule } from './use-cases/customer/customer.use-cases.module';
import { AppController } from './controllers/app.controller';
import { CustomerController } from './controllers/customer/customer.controller';

@Module({
  imports: [CustomerUseCaseModule],
  controllers: [
    AppController,
    CustomerController,
  ],
  providers: [],
})

export class AppModule { }
