import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MateriasService } from 'src/app/services/materias.service';
declare var $:any;

@Component({
  selector: 'app-registro-materias-screen',
  templateUrl: './registro-materias-screen.component.html',
  styleUrls: ['./registro-materias-screen.component.scss']
})
export class RegistroMateriasScreenComponent {
  //Variables del componente registro
  public editar: boolean = false;
  public materia:any = {};
  public idMateria: Number = 0;
  //Para detectar errores
  public errors:any ={};

  constructor(
    private materiasService: MateriasService,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private location : Location
  ) { }

  ngOnInit(): void {
    this.materia = this.materiasService.esquemaMateria();
    //El primer if valida si existe un parámetro en la URL
    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idMateria = this.activatedRoute.snapshot.params['id'];
      console.log("ID Materia: ", this.idMateria);
      //Al iniciar la vista obtiene el usuario por su ID
      this.obtenerMateriaByID();
    }
    //Imprimir datos en consola
    console.log("User: ", this.materia);
  }

  //Función para obtener un solo usuario por su ID
  public obtenerMateriaByID(){
    this.materiasService.getMateriaByID(this.idMateria).subscribe(
      (response)=>{
        this.materia = response;
        //Agregamos valores faltantes
        this.materia.nombre = response.nombre;
        this.materia.seccion = response.seccion;
        this.materia.dias = response.dias;
        this.materia.horario_inicio = response.horario_inicio;
        this.materia.horario_fin = response.horario_fin;
        this.materia.salon = response.salon;
        this.materia.programa = response.programa;
        console.log("Datos user: ", this.materia);
      }, (error)=>{
        alert("No se pudieron obtener los datos de la materia para editar");
      }
    );
  }

  public regresar(){
    this.location.back();
  }

  public registrar(){
    //Validar
    this.errors = [];

    this.errors = this.materiasService.validarMateria(this.materia, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    //Validar la contraseña
      //Aquí si todo es correcto vamos a registrar - aquí se manda a llamar al servicio
    this.materiasService.registrarMateria(this.materia).subscribe(
      (response)=>{
        alert("Materia registrada correctamente");
        console.log("Materia registrada: ", response);
        this.router.navigate(["/"]);
      }, (error)=>{
        alert("No se pudo registrar la materia");
      }
    )
  }

  public actualizar(){
    //Validación
    this.errors = [];

    this.errors = this.materiasService.validarMateria(this.materia, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    console.log("Pasó la validación");

    this.materiasService.editarMateria(this.materia).subscribe(
      (response)=>{
        alert("Materia editada correctamente");
        console.log("Materia editada: ", response);
        //Si se editó, entonces mandar al home
        this.router.navigate(["home"]);
      }, (error)=>{
        alert("No se pudo editar materia");
      }
    );
  }
}
