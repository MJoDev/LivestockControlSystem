import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validator, Validators} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Ganado } from 'src/app/models/ganado';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {GanadoService} from '../../services/ganado.service';


@Component({
  selector: 'app-editar-ganado',
  templateUrl: './editar-ganado.component.html',
  styleUrls: ['./editar-ganado.component.css']
})
export class EditarGanadoComponent {

     id!: string | null;
     fechaDeNacimiento: string = '';
     generoSeleccionado: string = '';
     propositoSeleccionado: string = '';
     

    ganadoForm!: FormGroup;
    constructor(private fb: FormBuilder, 
       private router: Router, 
       private toastr: ToastrService,
       private ganadoService: GanadoService,
       private aRouter: ActivatedRoute){
       this.ganadoForm = this.fb.group({
            _id: [''],
            ganadoID: ['', Validators.required],
            fechaDeNacimiento: ['', Validators.required],
            proposito: ['', Validators.required],
            genero: ['', Validators.required],
            fechaDeVacunacion: ['', Validators.required],
            fechaDeIngreso: ['', Validators.required],
            descripcion: [''],
            destetado: [''],
            salud: [''],
            litros: ['']
          });
        this.id = this.aRouter.snapshot.paramMap.get('id');
     };

   addGanado(){
    console.log(this.ganadoForm);
     const GANADO: Ganado = {
      _id: this.ganadoForm.get('_id')?.value,
      ganadoID: this.ganadoForm.get('ganadoID')?.value,
      fechaDeNacimiento: this.ganadoForm.get('fechaDeNacimiento')?.value,
      fechaDeIngreso: this.ganadoForm.get('fechaDeIngreso')?.value,
      genero: this.ganadoForm.get('genero')?.value,
      proposito: this.ganadoForm.get('proposito')?.value,
      descripcion: this.ganadoForm.get('descripcion')?.value,
      destetado: this.ganadoForm.get('destetado')?.value,
      fechaDeVacunacion: this.ganadoForm.get('fechaDeVacunacion')?.value,
      litros: this.ganadoForm.get('litros')?.value,
      salud: this.ganadoForm.get('salud')?.value,
    };

    if(this.id !== null){
            this.ganadoService.editarGanado(this.id, GANADO).subscribe(data=>{
                this.toastr.info('El elemento fue editado con exito', 'Elemento actualizado');
                this.router.navigate(['/list']);
            }, error =>{
                console.log(error);
                this.toastr.error('Datos incorrectos', 'Revisa la informacion suministrada');
                this.ganadoForm.reset();

             });
          }else{
              console.log(GANADO);
              this.ganadoService.guardarGanado(GANADO).subscribe(data =>{
                this.toastr.success('Ha registrado con exito!', 'Registrado');
                this.router.navigate(['/list']);
              }, error =>{
                console.log(error);
                this.toastr.error('Datos incorrectos', 'Revisa la informacion suministrada');
                this.ganadoForm.reset();
              });

           }   
  }
  esEditar(){
        if(this.id !== null){
          this.ganadoService.obtenerGanado(this.id).subscribe(data => {
            console.log(data);
            this.ganadoForm.setValue({
                _id: data._id,
                ganadoID: data.ganadoID,
                fechaDeNacimiento: data.fechaDeNacimiento,
                descripcion: data.descripcion,
                fechaDeVacunacion: data.fechaDeVacunacion,
                fechaDeIngreso: data.fechaDeIngreso,
                destetado: data.destetado,
                genero: data.genero,
                litros: data.litros,
                salud: data.salud,
                proposito: data.proposito,

            });
              console.log(this.ganadoForm);
          }, error=>{
            console.log(error)
          });
        }
  }
  ngOnInit(){
       this.esEditar();
       console.log(this.id);
  }
  calcularEdad(fechaNacimiento: string): number {
    const fechaNacimientoDate = new Date(fechaNacimiento);
    const hoy = new Date();

    const añosDif = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
    const mesesDif = hoy.getMonth() - fechaNacimientoDate.getMonth();

    let edad = añosDif;

    if (mesesDif < 0 || (mesesDif === 0 && hoy.getDate() < fechaNacimientoDate.getDate())) {
      edad -= 1;
    }

    return edad;
  }
}
