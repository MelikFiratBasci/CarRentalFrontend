import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
 apiUrl= "https://localhost:44308/api/carImages/"
  constructor(private httpClient:HttpClient) { }
  getCarImages(carId:number){
    let newPath = this.apiUrl +"getallbycarid?id="+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);

  }

}
