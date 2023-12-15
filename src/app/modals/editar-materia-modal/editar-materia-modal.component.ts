import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MateriasService } from 'src/app/services/materias.service';

@Component({
  selector: 'app-editar-materia-modal',
  templateUrl: './editar-materia-modal.component.html',
  styleUrls: ['./editar-materia-modal.component.scss']
})
export class EditarMateriaModalComponent {
  constructor(
    public materiasService: MateriasService,
    private dialogRef: MatDialogRef<EditarMateriaModalComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  public cerrar_modal(){
    this.dialogRef.close({isEdit:false});
  }

  public editarMateria(){
    this.materiasService.editarMateria(this.data).subscribe(
      (response)=>{
        console.log(response);
        this.dialogRef.close({isEdit:true});
      }, (error)=>{
        this.dialogRef.close({isEdit:false});
      }
    );
  }

}
