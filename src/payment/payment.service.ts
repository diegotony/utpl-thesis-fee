import { Injectable, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePaymentDto } from '../shared/dto/create-payment.dto';
import { Model } from 'mongoose';
import { Payment } from '../shared/dto/payment.dto';
import { ApiImplicitParam } from '@nestjs/swagger';
import { ExecutePayment } from '../shared/dto/execute.dto';
import { ExecutePaymentNormal } from '../shared/dto/execute-normal.dto';
@Injectable()
export class PaymentService {

  constructor(@InjectModel('Payment') private readonly paymentModel: Model<CreatePaymentDto>) {}

  async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    try {
      const payment = new CreatePaymentDto();
      payment.id_client = createPaymentDto.id_client;
      payment.id_order = createPaymentDto.id_order;
      payment.total = createPaymentDto.total;
      payment.payType = createPaymentDto.payType
      const createdPayment = new this.paymentModel(payment);

      if (!createdPayment) {
        throw new HttpException("Upps error ..", HttpStatus.BAD_REQUEST);
      }
      return createdPayment.save((err, payment)=>{
        return payment._id
      });
    } catch (error) {
      throw new HttpException(
        `Callback post Order ${error.message}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async updatePayment(dto: ExecutePayment,data) {
    return await this.paymentModel.findByIdAndUpdate(dto.id_payment, {"status":data}, {
      new: true,
      runValidators: true
    });
  }

  async updatePaymentNormal(dto: ExecutePaymentNormal,data) {
    return await this.paymentModel.findByIdAndUpdate(dto.id_payment, {"status":data}, {
      new: true,
      runValidators: true
    });
  }
}
