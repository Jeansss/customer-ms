import { Module } from "@nestjs/common";
import { CustomerFactoryService } from "./customer-factory.service";
import { CustomerUseCases } from "./customer.use-case";
import { DataServicesModule } from "src/services/data-services.module";
import { DataSource, Repository } from "typeorm";
import { Customer } from "src/frameworks/data-services/mongo/entities/customer.model";
import { CustomerRepositoryImpl } from "src/frameworks/data-services/mysql/gateways/customer.repository";
import { IDataServices } from "src/core/abstracts/data-services.abstract";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [DataServicesModule],
    providers: [
        CustomerFactoryService,
        CustomerUseCases
    ],
    exports: [
        CustomerFactoryService,
        CustomerUseCases
    ]
})
export class CustomerUseCaseModule { }