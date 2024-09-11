import { Injectable, NotFoundException } from "@nestjs/common";
import { IDataServices } from "src/core/abstracts/data-services.abstract";
import { CustomerFactoryService } from "./customer-factory.service";
import { CustomerDTO } from "src/dto/customer.dto";
import { Customer } from "src/frameworks/data-services/mysql/entities/customer.model";
import { CustomerRepositoryImpl } from "src/frameworks/data-services/mysql/gateways/customer.repository";
import { CustomerInfoDTO } from "src/dto/customer-info.dto";
import { CustomerStatus } from "src/dto/customer-status.enum";

@Injectable()
export class CustomerUseCases {

    constructor(private dataServices: IDataServices<CustomerRepositoryImpl>, private customerFactoryService: CustomerFactoryService) { }

    async getAllCustomers(): Promise<Customer[]> {
        return await this.dataServices.customers.getAll();
    }

    async getCustomerById(id: string): Promise<Customer> {
        const foundCustomer = await this.dataServices.customers.get(id);
        if (foundCustomer != null && foundCustomer.status === CustomerStatus.ACTIVE) {
            return foundCustomer;
        } else {
            throw new NotFoundException(`Customer with id: ${id} not found at database.`);
        }
    }

    async getCustomerByCPF(customerCPF: string) {
        const foundCustomer = await this.dataServices.customers.getCustomerByCPF(customerCPF);
        if (foundCustomer != null && foundCustomer[0].status === CustomerStatus.ACTIVE) {
            return foundCustomer;
        } else {
            throw new NotFoundException(`Customer with id: ${customerCPF} not found at database.`);
        }
    }

    async createCustomer(customerDTO: CustomerDTO): Promise<Customer> {
        const newCustomer = this.customerFactoryService.createNewCustomer(customerDTO);
        newCustomer.status = CustomerStatus.ACTIVE;
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

    async inactivateCustomer(customerId: string, customerInfo: CustomerInfoDTO): Promise<Customer> {
        const foundCustomer = await this.getCustomerById(customerId);
        foundCustomer.status = CustomerStatus.INACTIVE;
        return this.dataServices.customers.update(customerId, foundCustomer);
    }

}