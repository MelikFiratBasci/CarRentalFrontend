import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {
  colorAddForm:FormGroup;
  constructor(private toastrService:ToastrService,private formBuilder:FormBuilder,private colorService:ColorService) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }
  createColorAddForm(){
    this.colorAddForm = this.formBuilder.group({
      colorName : ["",Validators.required]
    });
  }
  add(){
    if (this.colorAddForm.valid) {
      let colorModel = Object.assign({},this.colorAddForm.value);
      this.colorService.addColor(colorModel).subscribe(
        (response)=>{
          console.log(response);
          this.toastrService.success(response.message,"Basarili");
        },
        (responseError)=>{
          if (responseError.error.Errors.length>0) {
           for (let i = 0; i < responseError.error.Errors.length; i++) {
             this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Dogrulama Hatasi")
           }
          }
        }
      )
    }else{
      this.toastrService.error("hatali Form","dikkat");
    }
  }

}
