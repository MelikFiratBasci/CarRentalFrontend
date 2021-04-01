import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

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
  constructor(private carService:CarService,private carImageService:CarImageService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
        this.getCarDetailsById(params["carId"])
        this.getCarImagesById(params["carId"])
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
  setCurrentImageClass(image:CarImage){
    this.currentImage = image;
    console.log("alkfnlasfsajflbasjlbflksaf")
  }
}
