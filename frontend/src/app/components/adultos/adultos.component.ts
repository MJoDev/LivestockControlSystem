import { Component, OnInit } from '@angular/core';
import { Ganado } from 'src/app/models/ganado';
import {GanadoService} from '../../services/ganado.service';
import { ToastrService } from 'ngx-toastr';
import { Popover } from 'bootstrap';

@Component({
  selector: 'app-adultos',
  templateUrl: './adultos.component.html',
  styleUrls: ['./adultos.component.css']
})
export class AdultosComponent {
  filtroID: string = '';
  listGanado: Ganado[] = [];
  filtroGenero: string = 'todos';
  filtroProposito: string = 'todos';
  filtroNombre: string = '';
  showImage = false;


  constructor(private ganadoService: GanadoService, private toastr: ToastrService){}
  ngOnInit(){
    this.obtenerGanados();

    
  }
  obtenerGanados(){
    this.ganadoService.getGanados().subscribe(data =>{
      console.log(data);
      this.listGanado = data;
      this.filtrarObjetos();

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
   filtrarObjetos(): void {
    this.listGanado = this.listGanado.filter(ganado => {
      const edad = this.calcularEdad(ganado.fechaDeNacimiento);
      const matchEdad = /^(\d+) años/.exec(edad);

      if (matchEdad && matchEdad[1]) {
        return parseInt(matchEdad[1], 10) >= 3;
      }

      return false;
      });
  }
  aplicarFiltro() {
    // Puedes ajustar esta lógica según tus necesidades
    // Si el filtro es 'todos', muestra todas las personas
    // Si no, filtra las personas por género seleccionado
    return this.listGanado.filter(persona => 
      (this.filtroGenero === 'todos' || persona.genero === this.filtroGenero) &&
      (this.filtroProposito === 'todos' || persona.proposito === this.filtroProposito) &&
      (persona.ganadoID.toLowerCase().includes(this.filtroNombre.toLowerCase()))
    );
  } 
  litrosMostrar(ganado: any){
    this.toastr.info(ganado.litros, 'Cuantos litros da: ' + ganado.ganadoID , {
      closeButton: true, disableTimeOut: true, tapToDismiss: false, positionClass: 'toast-top-right'
    })
  }
  saludMostrar(ganado: any){
    this.toastr.info(ganado.salud, 'Estado de salud: ' + ganado.ganadoID , {
      closeButton: true, disableTimeOut: true, tapToDismiss: false, positionClass: 'toast-top-right'
    })
  }

}
