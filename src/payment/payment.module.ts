import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentSchema } from '../schemas/payment.schema';


@Module({
  imports:[MongooseModule.forFeature([{ name: 'Payment', schema: PaymentSchema }])],
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentModule {}
