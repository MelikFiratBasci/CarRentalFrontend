import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  carAddForm: FormGroup;
  brands:Brand[];
  colors:Color[];
  
  colorId:number;
  brandId:number;
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private brandService:BrandService,
    private colorService:ColorService,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.createCarAddForm();
    this.getColors();
    this.getBrands();
  }
  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    })
  }
  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors= response.data;
    })
  }
  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  add() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value);
      this.carService.addCar(carModel).subscribe(
        (response) => {
          console.log(response);
          this.toastrService.success(response.message, 'Basarili');
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'dogrulama Hatasi'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Hatalı Form', 'Dikkat');
    }
  }
}
