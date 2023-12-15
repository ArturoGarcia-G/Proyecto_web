import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MateriasService } from 'src/app/services/materias.service';
import { MatDialog } from '@angular/material/dialog';
import { EditarMateriaModalComponent } from 'src/app/modals/editar-materia-modal/editar-materia-modal.component';

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
    private location : Location,
    public dialog: MatDialog
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
          this.router.navigate(["materias"]);
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

    // Aquí si todo es correcto vamos a registrar - aquí se manda a llamar al servicio
    const dialogRef = this.dialog.open(EditarMateriaModalComponent, {
      data: { id: this.materia.id,
        nrc: this.materia.nrc,
        nombre: this.materia.nombre,
        seccion: this.materia.seccion,
        dias: this.materia.dias,
        horario_inicio: this.materia.horario_inicio,
        horario_fin: this.materia.horario_fin,
        salon: this.materia.salon,
        programa: this.materia.programa
      }, // Se pasan valores a través del componente
      height: '268px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.isEdit) {
        console.log("Materia eliminada");
        // Recargar página
        this.location.back();
      } else {
        console.log("No se eliminó la materia");
        // alert("No se eliminó el usuario");
      }
    });
  }
}
