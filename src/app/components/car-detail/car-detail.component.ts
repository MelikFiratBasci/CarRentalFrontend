import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  basePath ="https://localhost:44308/";
  carDetail:Car;
  carImages:CarImage[];
  dataLoaded =false;
  currentImage:CarImage;
  rentalDetails:Rental[];

  rentDate:Date;
  returnDate:Date;
  
  customers:Customer[];
  customerId:number;
  
  minDate:Date=new Date();
  maxDate:Date =new Date();
  minSelected:boolean;
  constructor(private carService:CarService,private carImageService:CarImageService,private rentalService:RentalService,private customerService:CustomerService,
    private activatedRoute:ActivatedRoute,private toastrService:ToastrService,private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
        this.getCarDetailsById(params["carId"])
        this.getCarImagesById(params["carId"])
        this.getCustomers();
    })
  }

  getCarDetailsById(carId:number){
    this.carService.getCarById(carId).subscribe(response=>{
      this.carDetail=response.data;
      this.dataLoaded =true;
    })
  }
  getCarImagesById(carId:number){
    this.carImageService.getCarImages(carId).subscribe(response=>{
      this.carImages = response.data;
    })
  }
  getRentalDetails(carId:number){
    this.rentalService.getRentalsByCarId(carId).subscribe(response=>{
      this.rentalDetails =response.data;
    })
  }
  getCustomers(){
    this.customerService.getCustomers().subscribe(response=>{
      this.customers=response.data;
    })
  }

  getPath(){
    return this.basePath;
  }
  getButtonClass(image:CarImage){
    if (image=this.carImages[0]) {
      return "active";
    }
    else{
      return "";
    }
  }

  getCurrentImageClass(image:CarImage){
    if(this.carImages[0]==image){
      return "carousel-item active";
    } else {
      return "carousel-item ";
    }
  }

  
  
  
  selectMin(){
    this.minSelected =true;
    var date = new Date(this.rentDate);
    date.setDate(date.getDate() + 1);
    this.maxDate = date;
    this.minDate =this.rentDate;
  }

  setCurrentImageClass(image:CarImage){
    this.currentImage = image;
  }
}
