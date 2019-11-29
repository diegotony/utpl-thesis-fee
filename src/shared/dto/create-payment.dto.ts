import { ApiModelProperty } from '@nestjs/swagger';
export class CreatePaymentDto {
    @ApiModelProperty()
    id_client : string;
    @ApiModelProperty()
    id_order: string;
    @ApiModelProperty()
    total: number;
    @ApiModelProperty({enum: ['Normal', 'Paypal'] })
    payType:string;
    @ApiModelProperty()
    status: string;
}