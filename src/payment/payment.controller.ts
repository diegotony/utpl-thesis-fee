import { Controller, Get, Post, Body, HttpCode, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreatePaymentDto } from '../shared/dto/create-payment.dto';
import { ExecutePayment } from '../shared/dto/execute.dto';
import { PaymentService } from './payment.service';
import { ApiImplicitQuery } from '@nestjs/swagger';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExecutePaymentNormal } from '../shared/dto/execute-normal.dto';

var paypal = require('paypal-rest-sdk');
@Controller('payment')
export class PaymentController {
    constructor(@InjectModel('Payment') public readonly paymentModel: Model<CreatePaymentDto>
        , private readonly paymentService: PaymentService) {
        paypal.configure({
            'mode': 'sandbox',
            'client_id': 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM',
            'client_secret': 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM'
        });
    }
    @Post('paypal/execute')
    @HttpCode(200)
    async executePaypal(@Body() dto: ExecutePayment, @Res() res: Response): Promise<any> {

        var paymentId = dto.paymentID;
        var payerId = { 'payer_id': dto.payerID };
        var id_payment = dto.id_payment
        paypal.payment.execute(paymentId, payerId, (error, payment) => {
            if (error) {
                console.error(error);
            } else {
                if (payment.state == 'approved') {
                    console.log(id_payment)
                    this.paymentService.updatePayment(dto, "Completado")

                    res.send('payment completed successfully');

                } else {
                    res.send('payment not successful');
                }
            }
        });

    }


    @Post('paypal/create')
    @HttpCode(200)
    async createPaypal(@Body() dto: CreatePaymentDto, @Res() res: Response): Promise<any> {

        var create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://return.url",
                "cancel_url": "http://cancel.url"
            },
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": dto.total
                },
                "description": "This is the payment description."
            }]
        };

        paypal.payment.create(create_payment_json, (error, payment) => {
            if (error) {
                throw error;
                // return res.json({"error":error})
            }
            else {
                const savePayment = new CreatePaymentDto();
                savePayment.id_client = dto.id_client;
                savePayment.id_order = dto.id_order;
                savePayment.total = dto.total;
                savePayment.payType = dto.payType
                savePayment.status = "Pendiente"
                const createdPayment = new this.paymentModel(savePayment).save((err, data) => {
                    return res.json({ "paymentID": payment.id, "id_payment": data._id })
                });

            }
        });

    }
    
    @Post('normal/execute')
    @HttpCode(200)
    async executeNormal(@Body() dto: ExecutePaymentNormal, @Res() res: Response): Promise<any> {
        this.paymentService.updatePaymentNormal(dto, "Completado")
        res.send('payment completed successfully');
    }


    @Post('normal/create')
    @HttpCode(200)
    async createNormal(@Body() dto: CreatePaymentDto, @Res() res: Response): Promise<any> {


        const savePayment = new CreatePaymentDto();
        savePayment.id_client = dto.id_client;
        savePayment.id_order = dto.id_order;
        savePayment.total = dto.total;
        savePayment.payType = "Normal"
        savePayment.status = "Pendiente"
        const createdPayment = new this.paymentModel(savePayment).save((err, data) => {
            return res.json({ "id_payment": data._id })

        });

    }


    @Get()
    @HttpCode(200)
    async findAll(): Promise<any> {
        return (await this.paymentModel.find().exec())
    }



}

