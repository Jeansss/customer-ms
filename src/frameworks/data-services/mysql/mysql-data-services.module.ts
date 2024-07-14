import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { IDataServices } from 'src/core/abstracts/data-services.abstract';
import { DataSource, Repository } from "typeorm";
import { MySqlDataServices } from './mysql-data-services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.model';
import { CustomerRepositoryImpl } from './gateways/customer.repository';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forFeature([Customer])
    ],
    providers: [
        {
            provide: IDataServices,
            useClass: MySqlDataServices,
        }
    ],
    exports: [IDataServices],
})
export class MySqlDataServicesModule { }