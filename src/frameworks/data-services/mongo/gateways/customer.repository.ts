import { Customer } from "../entities/customer.model";
import { MongoGenericRepository } from "../external/mongo-generic-repository";

export class CustomerRepositoryImpl extends MongoGenericRepository<Customer> {

    getCustomerByCPF(customerCPF: string) {
        return this._repository
            .find({ "cpf": customerCPF })
            .exec();
    }


}