import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars:Car[];
  brands:Brand[];
  colors:Color[];
  
  currentCar:Car;
  currentBrand: Brand={brandId:0,brandName:""};
  currentColor: Color={colorId:0,colorName:""};

  filterText:string="";

  dataLoaded= false;
  basePath ="https://localhost:44308/";
  
  constructor(private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private brandService:BrandService,
    private colorService:ColorService,
    private toastr:ToastrService
    ) { }

  ngOnInit(): void {
    this.getAllBrands();
    this.getAllColors();
    this.activatedRoute.params.subscribe(params=>{
      if (params["brandId"]&&params["colorId"]) {
        this.getFilteredCars(params["brandId"],params["colorId"]) 
       }
      else if (params["brandId"]) {
        this.getCarsByBrand(params["brandId"])
      }
     else if (params["colorId"]) {
        this.getCarsByColor(params["colorId"])
      }
      else{
        
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
  getAllBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands= response.data;
    })
  }
  getAllColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data;
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
  getFilteredCars(brandId:number,colorId:number){
    this.carService.getFilteredCars(brandId,colorId).subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded=true;
    })
  }
  getPath(){
    return this.basePath 
  }



  setCurrentCar(car:Car){
    this.currentCar = car
    this.toastr.success(car.brandName,"yonlendiriliyorsunuz");
  }
  setCurrentBrand(brand:Brand){
    this.currentBrand =brand;
  }
  setCurrentColor(color:Color){
    this.currentColor=color;
  }
  
}
