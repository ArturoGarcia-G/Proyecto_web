import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';

declare var $:any;

@Component({
  selector: 'app-registrar-producto-screen',
  templateUrl: './registrar-producto-screen.component.html',
  styleUrls: ['./registrar-producto-screen.component.scss']
})
export class RegistrarProductoScreenComponent implements OnInit {
  //Variables del componente registro
  public editar: boolean = false;
  public product:any = {};
 //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';
  //Para detectar errores
  public errors:any ={};

  constructor(
    private productosService: ProductosService
  ) { }

  ngOnInit(): void {
    this.product = this.productosService.esquemaProduct();
    //Imprimir datos en consola
    console.log("Product: ", this.product);
  }

  public regresar(){

  }

  


  public registrar(){
    //Validar
    this.errors = [];

    this.errors = this.productosService.validarProducto(this.product);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
   
  }
}