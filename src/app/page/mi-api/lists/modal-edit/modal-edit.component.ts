import { Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { Ejemplo } from '../interfaces/ejemplo';
import { isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { EjemploService } from '../services/ejemplo.service';

@Component({
  selector: 'app-modal-edit',
  standalone: true,
  imports: [NgIf],
  templateUrl: './modal-edit.component.html',
  styleUrl: './modal-edit.component.css'
})
export class ModalEditComponent {
  @Input() ejemplo: Ejemplo = {
    name: '',
    apellido: '',
    edad: 0,
    contacto: []
  }

  private bootstrapmodal:any
  @ViewChild('modalElement') public modal!:ElementRef
  constructor(@Inject(PLATFORM_ID) private plataformId: object,
  private _srvEjemplo:EjemploService){}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.plataformId)) {
      this.inicializarModal();
    }
    if (this.modal) {
      console.log('Modal inicializado:', this.modal);
    }
  }

  inicializarModal() {
    import('bootstrap').then((boostrap) => {
      this.bootstrapmodal = new boostrap.Modal(this.modal.nativeElement);
    });
  }

  open(ejemplo: Ejemplo) {
    this.ejemplo = ejemplo;
    if (isPlatformBrowser(this.plataformId)) {
      if (this.bootstrapmodal) {
        this.bootstrapmodal.show();
      } else {
        this.inicializarModal();
        setTimeout(() => {
          this.bootstrapmodal.show();
        }, 0);
      }
    }
  }

  closeModal() {
    if (isPlatformBrowser(this.plataformId)) {
      if (this.bootstrapmodal) {
        this.bootstrapmodal.hide();
      } else {
        console.error('El modal no está inicializado.');
      }
    }
  }

  editarEjemplo(nombre:String, apellido:String, edad:String, contacto:String, id:String){
    const newEjemplo:Ejemplo = {
      name: String(nombre),
      apellido: String(apellido),
      edad: Number(edad),
      contacto:[String(contacto)]
    } 
    this._srvEjemplo.putEjemplo(id, newEjemplo).subscribe({
      next:(respuest) => {
        console.log('Editado con exito')
        this.closeModal()
        window.location.reload();
      },

      error: (error) => {
        console.log(`error al intentar actualizar: ${error}`)
      }
    })
  }
}
