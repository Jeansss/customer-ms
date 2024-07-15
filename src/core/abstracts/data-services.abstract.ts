import { CustomerRepositoryImpl } from 'src/frameworks/data-services/mongo/gateways/customer.repository';

// TODO: Validar se isso funciona
export abstract class IDataServices<T> {
  abstract customers: T;
}

// export abstract class IDataServices {
//   abstract customers: any;
// }
