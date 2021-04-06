import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
  providers:[DatePipe]
})
export class RentalComponent implements OnInit {
  customers:Customer[];
  customerId:number;
  rentals:Rental[];
  dataLoaded = false;
  totalPrice:number=0;

  rentDate:Date;
  returnDate:Date;
  @Input() car:Car;

  minDate :string|any; 
  maxDate: string|null;
  firstDateSelected:boolean =false;

  constructor(private router:Router,private toastrService:ToastrService,private activatedRoute:ActivatedRoute ,private rentalService:RentalService,private customerService:CustomerService,private datePipe:DatePipe) { }

  ngOnInit(): void {
    this.getCustomers();
  }
  getRentals(){
    this.rentalService.getRentals().subscribe(response=>{
      this.rentals=response.data;
      this.dataLoaded=true;
    })
  }
  getCustomers(){
    this.customerService.getCustomers().subscribe(response=>{
      this.customers = response.data;
    })
  }
  getRentMinDate(){
    this.minDate =this.datePipe.transform(new Date(),'yyyy-MM-dd');
    return this.minDate;
  }
  getReturnMinDate(){
    if(this.rentDate!=undefined){
      let tempDate = new Date(this.rentDate);
      let newDate = new Date();
      newDate.setDate(tempDate.getDate()+1);
      return newDate.toISOString().slice(0,10);
    }
    else{
      return this.rentDate;
    }
  }
  getReturnMaxDate(){
    this.maxDate =this.datePipe.transform(
      new Date(new Date().setFullYear(new Date().getFullYear()+1)),
      'yyyy-MM-dd'
    );
    return this.maxDate;
  }
  onChangeEvent(event:any){
    this.minDate = event.target.value;
    this.firstDateSelected = true;
  }
  getTotalPrice():number{
    if (this.rentDate ==undefined || this.returnDate<this.rentDate || this.returnDate ==undefined) {
    return this.totalPrice;
    }
    else{
      let difference = (new Date (this.returnDate.toString()).getTime()) - (new Date(this.rentDate.toString()).getTime());
      let  numberOfDays = Math.ceil(difference / (1000*3600*24));
      this.totalPrice = numberOfDays * this.car.dailyPrice;
      return this.totalPrice;
    }
  }
  
// totalPrice(car:Car){
//   this.dailyPrice=car.dailyPrice;
//   var date1 = new Date(this.returnDate.toString());
//   var date2 = new Date(this.rentDate.toString());
//   var difference = date1.getTime() - date2.getTime();
//   var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24));
//   this.amountPaye = numberOfDays * this.dailyPrice

//}
  createRental() {
    let MyRental: Rental = {
      carId : this.car.id,
      customerId : this.customerId,
      brandName : this.car.brandName,
      colorName : this.car.colorName,
      dailyPrice : this.car.dailyPrice,
      rentDate : this.rentDate,
      returnDate : this.returnDate
      
    };
    if (MyRental.rentDate == undefined||MyRental.rentDate>MyRental.returnDate) {
      console.log(MyRental)
      this.toastrService.error("Hatali bilgi girdiniz","Bilgilerinizi kontrol edin")
    } else{
      this.router.navigate(['/payment/', JSON.stringify(MyRental)]);
      this.toastrService.info(
        'Ödeme sayfasına yönlendiriliyorsunuz...',
        'Ödeme İşlemleri'
      );
    }
  }

}
