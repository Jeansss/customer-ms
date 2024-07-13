import { CustomerRepositoryImpl } from 'src/frameworks/data-services/mongo/gateways/customer.repository';

export abstract class IDataServices {
  abstract customers: CustomerRepositoryImpl;
}
