import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IDataServices } from 'src/core/abstracts/data-services.abstract';
import { CustomerRepositoryImpl } from './gateways/customer.repository';
import { Customer } from './entities/customer.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MySqlDataServices
  implements IDataServices, OnApplicationBootstrap {
  customers: CustomerRepositoryImpl;

  constructor(
    @InjectRepository(Customer)
    private CustomerRepository: Repository<Customer>,
  ) { }

  onApplicationBootstrap() {
    this.customers = new CustomerRepositoryImpl(this.CustomerRepository);
  }
}
