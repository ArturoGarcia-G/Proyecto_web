import { Injectable } from '@angular/core';
import { ValidatorService } from './tools/validator.service';
import { ErrorsService } from './tools/errors.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FacadeService } from './facade.service';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  private token: string;

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private facadeService: FacadeService
  ) {
    this.token = this.facadeService.getSessionToken();
   }

  public esquemaMateria(){
    return {
      'nrc': '',
      'nombre': '',
      'seccion': '',
      'dias': '',
      'horario_inicio': '',
      'horario_fin': '',
      'salon': '',
      'programa': '',
    }
  }

  //Validación para el formulario
  public validarMateria(data: any, editar: boolean){
    console.log("Validando materia... ", data);
    let error: any = [];

    if(!this.validatorService.required(data["nrc"])){
      error["nrc"] = this.errorService.required;
    }else if(!this.validatorService.numeric(data["nrc"])){
      error["nrc"] = this.errorService.numeric;
    }

    if(!this.validatorService.required(data["nombre"])){
      error["nombre"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["seccion"])){
      error["seccion"] = this.errorService.required;
    }else if(!this.validatorService.numeric(data["seccion"])){
      error["seccion"] = this.errorService.numeric;
    }

    if(!this.validatorService.required(data["dias"])){
      error["dias"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["horario_inicio"])){
      error["horario_inicio"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["horario_fin"])){
      error["horario_fin"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["salon"])){
      error["salon"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["programa"])){
      error["programa"] = this.errorService.required;
    }

    //Return arreglo
    return error;
  }

  //Aquí van los servicios HTTP
  //Servicio para registrar un nuevo usuario
  public registrarMateria(data: any): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.post<any>(`${environment.url_api}/materiasCrear/`,data, {headers:headers});
  }

  //Registrar
  public obtenerListaMaterias(): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/materias/`, {headers:headers});
  }

  //Obtener un solo usuario dependiendo su ID
  public getMateriaByID(idMateria: Number){
    return this.http.get<any>(`${environment.url_api}/materias/${idMateria}/`,httpOptions); 
  }

  //Servicio para actualizar un usuario
  public editarMateria(data: any): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    console.log(data);
    return this.http.put<any>(`${environment.url_api}/materias-edit/`, data, {headers:headers});
  }

  public eliminarMateria(idMateria: number): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.delete<any>(`${environment.url_api}/materias-edit/${idMateria}/`,{headers:headers});
  }
}
