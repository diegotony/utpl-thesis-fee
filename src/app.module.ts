import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentModule } from './payment/payment.module';
import config from "./config/config";
@Module({
  imports: [
    MongooseModule.forRoot( "mongodb://"+config.MONGO_HOST+"/"+config.MONGO_DB, { useNewUrlParser: true,useUnifiedTopology: true  }),
    PaymentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
