export interface CreditCard{
    fullName:string;
    cardNumber:string;
    expireMonth:number;
    expireYear:number;
    cvc:number;
    price?:number;
}