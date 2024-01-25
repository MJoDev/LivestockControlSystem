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
import { DomSanitizer } from '@angular/platform-browser';


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
     fechaMinima!: Date;
     fechaMaxima!: Date;
     fechaMedia!: Date;
     previsualizacion!: string;
      loadind!: boolean;
      archivos: any = [];

    ganadoForm!: FormGroup;
    constructor(private fb: FormBuilder, 
       private router: Router, 
       private toastr: ToastrService,
       private ganadoService: GanadoService,
       private aRouter: ActivatedRoute, private sanitizer: DomSanitizer){
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
            litros: [''],
            imagen: ['']
          });
        this.id = this.aRouter.snapshot.paramMap.get('id');

        this.fechaMedia = new Date();
        this.fechaMaxima = new Date('1900-01-01');

        // Configura la fecha mínima como hace tres días
        this.fechaMinima = new Date();
        this.fechaMinima.setDate(this.fechaMinima.getDate() - 5);

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
      ultimoParto: this.ganadoForm.get('ultimoParto')?.value,
      litros: this.ganadoForm.get('litros')?.value,
      salud: this.ganadoForm.get('salud')?.value,
      imagen: this.ganadoForm.get('imagen')?.value,
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
            this.previsualizacion = data.imagen;
            console.log(data);
            this.ganadoForm.setValue({
                _id: data._id,
                ganadoID: data.ganadoID,
                fechaDeNacimiento: data.fechaDeNacimiento,
                descripcion: data.descripcion,
                fechaDeVacunacion: data.fechaDeVacunacion,
                fechaDeIngreso: data.fechaDeIngreso,
                ultimoParto: data.ultimoParto,
                destetado: data.destetado,
                genero: data.genero,
                litros: data.litros,
                salud: data.salud,
                proposito: data.proposito,
                imagen: data.imagen,

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

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.extraerBase64(file).then((imagen:any) => {
      this.previsualizacion = imagen.base;
    });

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.ganadoService.uploadImage(formData).subscribe((response) => {
        this.ganadoForm.patchValue({
          imagen: response.imageUrl
        });
      });
    }
  }
  
  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
        try{
          const unsafeImg = window.URL.createObjectURL($event);
          const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
          const reader = new FileReader();
          reader.readAsDataURL($event);
          reader.onload = () => {
            resolve({
              base: reader.result
            }); 
          }
          reader.onerror = error => {
            resolve({
              base: null
            });
          };
        }catch (e) {
          console.log(e);
        }
      })

     
      
  }


