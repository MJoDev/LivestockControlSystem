import { Component, OnInit } from '@angular/core';
import { Ganado } from 'src/app/models/ganado';
import {GanadoService} from '../../services/ganado.service';
import { ToastrService } from 'ngx-toastr';
import { Popover } from 'bootstrap';


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

      listGanado: Ganado[] = [];
      listaAdultos: Ganado[] = [];
      listaBecerros: Ganado[] = [];


      constructor(private ganadoService: GanadoService, private toastr: ToastrService){}
      ngOnInit(){
        this.obtenerGanados();
        console.log('lista de adultos' + this.listaAdultos);
        console.log('lista de becerros' + this.listaBecerros);

      }
      obtenerGanados(){
        this.ganadoService.getGanados().subscribe(data =>{
          console.log(data);
          this.listGanado = data;
    
        }, error =>{ console.log(error)});
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
      filtrarBecerros(): void {
        this.listaBecerros = this.listGanado.filter(ganado => {
          const edad = this.calcularEdad(ganado.fechaDeNacimiento);
          const matchEdad = /^(\d+) años/.exec(edad);
    
          if (matchEdad && matchEdad[1]) {
            return parseInt(matchEdad[1], 10) <= 3;
          }
    
          return false;
          });
      }
      filtrarAdultos(): void {
        this.listaAdultos = this.listGanado.filter(ganado => {
          const edad = this.calcularEdad(ganado.fechaDeNacimiento);
          const matchEdad = /^(\d+) años/.exec(edad);
          
          if (matchEdad && matchEdad[1]) {
            return parseInt(matchEdad[1], 10) >= 3;
          }
    
          return false;
          });
      }
}
