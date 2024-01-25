import { Component } from '@angular/core';
import { Ganado } from 'src/app/models/ganado';
import {GanadoService} from '../../services/ganado.service';
import { ToastrService } from 'ngx-toastr';
import { Popover } from 'bootstrap';

@Component({
  selector: 'app-partos',
  templateUrl: './partos.component.html',
  styleUrls: ['./partos.component.css']
})
export class PartosComponent {
  filtroID: string = '';
  listGanado: Ganado[] = [];
  filtroGenero: string = 'todos';
  filtroProposito: string = 'todos';
  filtroNombre: string = '';
  imagenUrl!: string; // Recibe la URL de la imagen como entrada
  showImage = false;

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

  aplicarFiltro() {
    return this.listGanado.filter(persona => (persona.ultimoParto !== undefined && persona.ultimoParto !== null) &&
      (this.filtroGenero === 'todos' || persona.genero === this.filtroGenero) &&
      (this.filtroProposito === 'todos' || persona.proposito === this.filtroProposito) &&
      (persona.ganadoID.toLowerCase().includes(this.filtroNombre.toLowerCase()))
    );
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
  calcularFechaProximaVacuna(ganado: Ganado): Date {
    const fechaVacunacion = new Date(ganado.fechaDeVacunacion);
    
    // Sumar 6 meses a la fecha 
    fechaVacunacion.setMonth(fechaVacunacion.getMonth() + 6);
  
    return fechaVacunacion;
  }
}
