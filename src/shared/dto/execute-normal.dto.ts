import { ApiModelProperty } from '@nestjs/swagger';

export class ExecutePaymentNormal {
    @ApiModelProperty()
    readonly id_payment: string;

}