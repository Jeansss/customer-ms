import { Module } from "@nestjs/common";
import { CustomerFactoryService } from "./customer-factory.service";
import { CustomerUseCases } from "./customer.use-case";
import { DataServicesModule } from "src/services/data-services.module";

@Module({
    imports: [DataServicesModule],
    providers: [CustomerFactoryService, CustomerUseCases],
    exports: [CustomerFactoryService, CustomerUseCases]
})
export class CustomerUseCaseModule {}