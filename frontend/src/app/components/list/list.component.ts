import { Component, OnInit } from '@angular/core';
import { Ganado } from 'src/app/models/ganado';
import {GanadoService} from '../../services/ganado.service';
import { ToastrService } from 'ngx-toastr';
import { Popover } from 'bootstrap';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
  filtroID: string = '';
  listGanado: Ganado[] = [];

  constructor(private ganadoService: GanadoService, private toastr: ToastrService){}
  ngOnInit(){
    this.obtenerGanados();
  }
  obtenerGanados(){
    this.ganadoService.getGanados().subscribe(data =>{
      console.log(data);
      this.listGanado = data;

    }, error =>{ console.log(error)});
  }
  eliminarGanado(id: any){
    this.ganadoService.eliminarGanado(id).subscribe(data => {
      this.toastr.error('Ha sido eliminado con exito', 'Elemento Eliminado');
      this.obtenerGanados();
    }, error => {console.log(error)});
  }
  descripcionMostrar(ganado: any){
    this.toastr.info(ganado.descripcion, 'Descripcion de: ' + ganado.ganadoID , {
      closeButton: true, disableTimeOut: true, tapToDismiss: false, positionClass: 'toast-top-right'
    })
  }
   calcularEdad(fechaNacimiento: string): string {
    const fechaNacimientoDate = new Date(fechaNacimiento);
    const hoy = new Date();

    const añosDif = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
    const mesesDif = hoy.getMonth() - fechaNacimientoDate.getMonth();

    let edad = '';

    if (mesesDif < 0 || (mesesDif === 0 && hoy.getDate() < fechaNacimientoDate.getDate())) {
      edad = `${añosDif - 1} años y ${12 + mesesDif} meses`;
    } else {
      edad = `${añosDif} años y ${mesesDif} meses`;
    }

    return edad;
  }
}