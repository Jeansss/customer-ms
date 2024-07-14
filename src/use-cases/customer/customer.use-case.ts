import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IDataServices } from "src/core/abstracts/data-services.abstract";
import { CustomerFactoryService } from "./customer-factory.service";
import { CustomerDTO } from "src/dto/customer.dto";
import { Customer } from "src/frameworks/data-services/mongo/entities/customer.model";
import { MySqlDataServices } from "src/frameworks/data-services/mysql/mysql-data-services.service";
import { MySqlGenericRepository } from "src/frameworks/data-services/mysql/external/mysql-generic-repository";

@Injectable()
export class CustomerUseCases {

    constructor(private dataServices: IDataServices, private customerFactoryService: CustomerFactoryService) { }

    async getAllCustomers(): Promise<Customer[]> {
        return await this.dataServices.customers.getAll();
    }

    async getCustomerById(id: string): Promise<Customer> {
        const foundCustomer = await this.dataServices.customers.get(id);
        if (foundCustomer != null) {
            return foundCustomer;
        } else {
            throw new NotFoundException(`Customer with id: ${id} not found at database.`);
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