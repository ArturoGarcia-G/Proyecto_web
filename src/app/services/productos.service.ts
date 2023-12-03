import { Injectable } from '@angular/core';
import { ValidatorService } from './tools/validator.service';
import { ErrorsService } from './tools/errors.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
  ) { }

  public esquemaProduct(){
    return {
      'id': '',
      'nombre': '',
      'precio': '',
      'departamento': '',
      
    }
  }

  //Validación para el formulario
  public validarProducto(data: any){
    console.log("Validando producto... ", data);
    let error: any = [];

    if(!this.validatorService.required(data["id"])){
      error["id"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["nombre"])){
      error["nombre"] = this.errorService.required;
    }
    else if(!this.validatorService.max(data["nombre"], 50)){
      error["nombre"] = this.errorService.max(50);
    }

    if(!this.validatorService.required(data["precio"])){
      error["precio"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["departamento"])){
      error["departamento"] = this.errorService.required;
    }else if(!this.validatorService.min(data["departamento"], 5)){
      error["departamento"] = this.errorService.min(5);
      alert("La longitud de caracteres del departamento es menor, deben ser mas de 5");
    }else if(!this.validatorService.max(data["departamento"], 40)){
      error["departamento"] = this.errorService.max(40);
      alert("La longitud de caracteres del departamento es mayor, deben ser menos de 40");
    }

    
    //Return arreglo
    return error;
  }
}