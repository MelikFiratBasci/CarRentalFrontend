import { Time } from "@angular/common";

export interface Rental{
    carId:number;
    rentalId?:number;
    brandName?:string;
    rentDate:Date;
    returnDate?:Date;
    customerName?:string;
    customerId:number;
    colorName:string;
    dailyPrice:number;
}