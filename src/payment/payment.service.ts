import { Injectable, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePaymentDto } from '../shared/dto/create-payment.dto';
import { Model } from 'mongoose';
import { Payment } from '../shared/dto/payment.dto';
import { ApiImplicitParam } from '@nestjs/swagger';
import { ExecutePayment } from '../shared/dto/execute.dto';
import { ExecutePaymentNormal } from '../shared/dto/execute-normal.dto';
import { ClientProxy, ClientProxyFactory, Transport, ClientOptions } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import config from '../config/config';
@Injectable()
export class PaymentService {
  private readonly client: ClientProxy;

  options: ClientOptions = {
    transport: Transport.REDIS,
    options: {
      url: 'redis://'+config.REDIS_HOST+':6379',
    }
  }


  constructor(@InjectModel('Payment') private readonly paymentModel: Model<CreatePaymentDto>) {
    this.client = ClientProxyFactory.create(this.options)
  }


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
      return createdPayment.save((err, payment) => {
        return payment._id
      });
    } catch (error) {
      throw new HttpException(
        `Callback post Order ${error.message}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async findByID(id:string){
    return await this.paymentModel.findById(id,(err,user)=>{
      this.stateOrder(user.id_order)
      console.log(user)
    }).exec();
  }
  async updatePayment(dto: ExecutePayment, data) {
    return await this.paymentModel.findByIdAndUpdate(dto.id_payment, { "status": data }, {
      new: true,
      runValidators: true
    });
  }

  async updatePaymentNormal(dto: ExecutePaymentNormal, data) {
    return await this.paymentModel.findByIdAndUpdate(dto.id_payment, { "status": data }, {
      new: true,
      runValidators: true
    });
  }

  async stateOrder(data) {
    return this.client.emit<any>('stateOrder', [data])
  }


  async test() {
    return this.client.emit<any>('holiEvent', [])
  }

  async test2() {
    return this.client.send<any>('holiPattern', [])
  }

  // changeStatus(data): Observable<string>{
  //   const pattern = { cmd: 'changeStatePago' };
  //   return this.order.send<string>(pattern, [data]);
  // }
}
