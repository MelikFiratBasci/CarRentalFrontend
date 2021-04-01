import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars:Car[] =[];
  carImages:CarImage[] = [];
  currentCar:Car;
  dataLoaded= false;
  basePath ="https://localhost:44308/";
  constructor(private carService:CarService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["brandId"]) {
        this.getCarsByBrand(params["brandId"])
      }else{
        if (params["colorId"]) {
          this.getCarsByColor(params["colorId"])
        }
        this.getCars();
      }
    })
  }
  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars= response.data;
      this.dataLoaded = true ;
    })
  }
  getCarsByBrand(categoryId:number){
    this.carService.getCarsByBrand(categoryId).subscribe(response=>{
      this.cars = response.data;
      this.dataLoaded = true; 
    })
  }
  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded = true ; 
    })
  }
  getPath(){
    return this.basePath 
  }
  setCurrentCar(car:Car){
    this.currentCar = car
  }
}
