import * as mongoose from 'mongoose';

export const PaymentSchema = new mongoose.Schema({
  id_client: { type: mongoose.Schema.Types.ObjectId ,required:true},
  id_order:  { type: mongoose.Schema.Types.ObjectId ,required:true},
  total:{type:Number,required:true},
  status: {type:String, enum:['Pendiente','Completado']},
  payType:{type:String, enum:['Paypal','Normal'],required:true},
});