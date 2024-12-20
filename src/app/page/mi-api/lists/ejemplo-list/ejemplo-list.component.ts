import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { NgFor, NgIf } from '@angular/common';
import { EjemploService } from '../services/ejemplo.service';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';
import { computadorR, Tcomputadora } from '../interfaces/ejemplo';

@Component({
  selector: 'app-ejemplo-list',
  standalone: true,
  imports: [NgFor, NgIf, ModalEditComponent],
  templateUrl: './ejemplo-list.component.html',
  styleUrl: './ejemplo-list.component.css'
})
export class EjemploListComponent implements OnInit{
  @Input() computadoras:computadorR | undefined

  @ViewChild(ModalEditComponent) public modal!: ModalEditComponent

  constructor(
    private _srvEjemplo:EjemploService
  ){}

  ngOnInit(): void {
      
  }

  openmodal(ejemplo:Tcomputadora){
    if(this.modal){
      this.modal.open(ejemplo)
    }
  }

  eliminarEjemplo(id:String){
    this._srvEjemplo.deleteEjemplo(id).subscribe(eje => {
      console.log('Ejemplo eliminado')
      window.location.reload();
    })
  }
}
