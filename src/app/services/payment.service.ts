import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl = 'https://localhost:44308/api/payments/';
  
  constructor(private httpClient:HttpClient) { 
    
  }
  
  payWithCreditCard(price:number,creditCard:CreditCard):Observable<ResponseModel>{
    let newPath = this.apiUrl + "paywithcard?price="+price;
    return this.httpClient.post<ResponseModel>(newPath,creditCard)
  }
  
}
