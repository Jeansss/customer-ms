import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { IDataServices } from "src/core/abstracts/data-services.abstract";
import { CustomerFactoryService } from "./customer-factory.service";
import { CustomerDTO } from "src/dto/customer.dto";
import { Customer } from "src/frameworks/data-services/mongo/entities/customer.model";

@Injectable()
export class CustomerUseCases {

    constructor(private dataServices: IDataServices, private customerFactoryService: CustomerFactoryService) { }

    async getAllCustomers(): Promise<Customer[]> {
        return await this.dataServices.customers.getAll();
    }

    async getCustomerById(id: string): Promise<Customer> {
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            const foundCustomer = await this.dataServices.customers.get(id);

            if (foundCustomer != null) {
                return foundCustomer;
            } else {
                throw new NotFoundException(`Customer with id: ${id} not found at database.`);
            }
        } else {
            throw new BadRequestException(`'${id}' is not a valid ObjectID`);
        }
    }

    async getCustomerByCPF(customerCPF: string) {
        const foundCustomer = await this.dataServices.customers.getCustomerByCPF(customerCPF);

        if (foundCustomer != null) {
            return foundCustomer;
        } else {
            throw new NotFoundException(`Customer with id: ${customerCPF} not found at database.`);
        }
    }

    async createCustomer(customerDTO: CustomerDTO): Promise<Customer> {
        const newCustomer = this.customerFactoryService.createNewCustomer(customerDTO);
        return this.dataServices.customers.create(newCustomer);
    }

    async updateCustomer(customerId: string, customerDTO: CustomerDTO): Promise<Customer> {
        const newCustomer = this.customerFactoryService.updateCustomer(customerDTO);
        return this.dataServices.customers.update(customerId, newCustomer);
    }

    async delete(customerId: string) {
        const foundCustomer = await this.getCustomerById(customerId);
        this.dataServices.customers.delete(customerId);
    }

}