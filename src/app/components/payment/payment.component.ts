import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CreditCard } from 'src/app/models/creditCard';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { PaymentService } from 'src/app/services/payment.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  rental: Rental;
  car: Car;
  customer: Customer;
  getCustomerId: number;
  amountOfPayment: number = 0;

  fullName: string;
  cardNumber: string;
  cvc: number;
  expirationMonth: number;
  expirationYear: number;

  isPaymentReceived: boolean =false;
  isCarRent: boolean =false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService,
    private router: Router,
    private toastrService: ToastrService,
    private rentalService: RentalService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['rental']) {
        this.rental = JSON.parse(params['rental']);
        this.getCustomerId = JSON.parse(params['rental']).customerId;
        this.amountOfPayment = JSON.parse(params['rental']).totalPrice;
      }
    });
  }




  async payResult() {
    await this.payWithCard();
    
      await this.toastrService.warning("Anasayfaya Yonlendiriliyorsunuz")
       await setTimeout(() => {
        this.router.navigate(['/cars']);
    }, 1000);
    
    
  }




   payWithCard(){
    let card: CreditCard = {
      fullName: this.fullName,
      cardNumber: this.cardNumber,
      expireYear: this.expirationYear,
      expireMonth: this.expirationMonth,
      cvc: this.cvc,
    };
    this.rentCar(this.amountOfPayment, card);
  
  }

  rentCar(amount: number, card: CreditCard) {
    this.paymentService
      .payWithCreditCard(amount, card)
      .subscribe((response) => {
        this.isPaymentReceived == response.success;
        this.toastrService.success(
          this.amountOfPayment + 'Tl  ' + this.rental.brandName,
          'Odemeniz Alindi' );
        console.log(response);

        this.addRental();
      }
      ,(error)=>{
        this.isPaymentReceived == false;
        this.toastrService.error('hata');
        console.log(error);
      });
    
  }
  addRental() {
    this.rentalService.addRental(this.rental).subscribe((response) => {
     this.isCarRent === response.success;
     this.toastrService.success('Kiralama islemi Yapildi! ');
     console.log(response);
   },
     (error) => {
       this.isCarRent === error.success;
       this.toastrService.error(
         'Kiralama isleminde hata ile karsilasildi lutfen iletisime gecin.'
       );
       console.log(error);
     })
  }
 
}
