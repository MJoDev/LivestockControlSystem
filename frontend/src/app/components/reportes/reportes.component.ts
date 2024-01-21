import { Component, OnInit } from '@angular/core';
import { Ganado } from 'src/app/models/ganado';
import {GanadoService} from '../../services/ganado.service';
import { ToastrService } from 'ngx-toastr';
import { Popover } from 'bootstrap';
import { formatDate } from '@angular/common';
import { jsPDF } from "jspdf";


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

      listGanado: Ganado[] = [];
      listaAdultos: Ganado[] = [];
      listaBecerros: Ganado[] = [];
      totalAdultos: number = 0;
      totalBecerros: number = 0;


      constructor(private ganadoService: GanadoService, private toastr: ToastrService){}
      ngOnInit(){
        this.obtenerGanados();

      }
      obtenerGanados(){
        this.ganadoService.getGanados().subscribe(data =>{
          console.log(data);
          this.listGanado = data;
          this.filtrarGanado();
          console.log(this.listaAdultos);
          console.log(this.listaBecerros);
        }, error =>{ console.log(error)});
      }
      filtrarGanado() {
        const hoy = new Date();
        this.listaAdultos = this.listGanado.filter(ganado => {
          const fechaNacimiento = new Date(ganado.fechaDeNacimiento);
          const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
          return edad > 3;
        });
      
        this.listaBecerros = this.listGanado.filter(ganado => {
          const fechaNacimiento = new Date(ganado.fechaDeNacimiento);
          const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
          return edad <= 3;
        });

        this.totalAdultos = this.listaAdultos.length;
        this.totalBecerros = this.listaBecerros.length;

      }
      generarPDF() {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
    
        const doc = new jsPDF();
        doc.text(`Reporte de Animales - ${formattedDate}`, 20, 10);
        doc.text(`Reporte generado el ${formattedDate}`, 20, 20);
    
        const data = [['Total Animales', 'Total Adultos', 'Total Becerros'],
                      [this.listGanado.length, this.totalAdultos, this.totalBecerros]];
    
        doc.autoTable({
          startY: 30,
          head: [['Total Animales', 'Total Adultos', 'Total Becerros']],
          body: [data[1]],
        });
    
        doc.save(`Reporte_Animales_${formattedDate}.pdf`);
      }
      
}
