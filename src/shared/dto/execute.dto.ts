import { ApiModelProperty } from '@nestjs/swagger';

export class ExecutePayment {
    @ApiModelProperty()
    readonly paymentID : string;
    @ApiModelProperty()
    readonly payerID: string;
    @ApiModelProperty()
    readonly id_payment: string;

}