import { Module } from '@nestjs/common';
import { MongoDataServicesModule } from 'src/frameworks/data-services/mongo/mongo-data-services.module';
import { MySqlDataServicesModule } from 'src/frameworks/data-services/mysql/mysql-data-services.module';

@Module({
  // imports: [MongoDataServicesModule],
  // exports: [MongoDataServicesModule],
  imports: [MySqlDataServicesModule],
  exports: [MySqlDataServicesModule],
})
export class DataServicesModule { }