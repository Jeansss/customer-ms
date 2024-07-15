import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IDataServices } from 'src/core/abstracts/data-services.abstract';
import { Customer, CustomerDocument } from './entities/customer.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerRepositoryImpl } from './gateways/customer.repository';

@Injectable()
export class MongoDataServices
  implements IDataServices<CustomerRepositoryImpl>, OnApplicationBootstrap {
  customers: CustomerRepositoryImpl;

  constructor(
    @InjectModel(Customer.name)
    private CustomerRepository: Model<CustomerDocument>,
  ) { }

  onApplicationBootstrap() {
    this.customers = new CustomerRepositoryImpl(this.CustomerRepository);
  }
}
