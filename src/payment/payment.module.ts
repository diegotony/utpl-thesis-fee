import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentSchema } from '../schemas/payment.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports:[MongooseModule.forFeature([{ name: 'Payment', schema: PaymentSchema }]),
ClientsModule.register([{name:"order-service",transport: Transport.REDIS,options:{
  url:'redis://localhost:6379'
}}])
],
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentModule {}
