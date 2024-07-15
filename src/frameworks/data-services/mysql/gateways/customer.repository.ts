import { Injectable } from "@nestjs/common";
import { Customer } from "../entities/customer.model";
import { MySqlGenericRepository } from "../external/mysql-generic-repository";

@Injectable()
export class CustomerRepositoryImpl extends MySqlGenericRepository<Customer> {

    getCustomerByCPF(customerCPF: string) {
        return this._repository
            .find({
                where: {
                    cpf: customerCPF
                }
            });
    }


}