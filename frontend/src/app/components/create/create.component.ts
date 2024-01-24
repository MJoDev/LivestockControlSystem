import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validator, Validators} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Product } from 'src/app/models/product';
import { Ganado } from 'src/app/models/ganado';

import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {ProductService} from '../../services/product.service';
import {GanadoService} from '../../services/ganado.service';
import { DomSanitizer } from '@angular/platform-browser';




@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  titulo = "Crear nuevo";
  productForm!: FormGroup;
  ganadoForm!: FormGroup;
  fechaDeNacimiento: string = '';
  tipo!: boolean;
  id!: string | null;
  generoSeleccionado: string = '';
  propositoSeleccionado: string = '';
  fechaMinima!: Date;
  fechaMaxima!: Date;
  fechaMedia!: Date;
  selectedFile: File | null = null;
  previsualizacion!: string;
  loadind!: boolean;
  archivos: any = [];

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private productoService: ProductService, private aRouter: ActivatedRoute, private ganadoService: GanadoService, private sanitizer: DomSanitizer){
    this.productForm = this.fb.group({
      _id: [''],
      productID: ['', Validators.required],
      product: ['', Validators.required],
      stock: ['', Validators.required],
      tipo: ['', Validators.required],
      descripcion: [''],
      alerta: ['']
    });
    this.ganadoForm = this.fb.group({
      _id: [''],
      ganadoID: ['', Validators.required],
      fechaDeNacimiento: ['', Validators.required],
      proposito: ['', Validators.required],
      genero: ['', Validators.required],
      fechaDeVacunacion: ['', Validators.required],
      fechaDeIngreso: ['', Validators.required],
      litros: [''],
      descripcion: [''],
      salud: [''],
      destetado: [''], 
      imagen: [''], 


    });
    this.fechaMaxima = new Date('1900-01-01');
    this.fechaMedia = new Date();

    // Configura la fecha mínima como hace tres días
    this.fechaMinima = new Date();
    this.fechaMinima.setDate(this.fechaMinima.getDate() - 5);
  }

  ngOnInit(){
    
  }
  addProduct(){

    const PRODUCTO: Product = {
      _id: this.productForm.get('_id')?.value,
      productID: this.productForm.get('productID')?.value,
      product: this.productForm.get('product')?.value,
      descripcion: this.productForm.get('descripcion')?.value,
      stock: this.productForm.get('stock')?.value,
      tipo: this.productForm.get('tipo')?.value,
      alerta: this.productForm.get('alerta')?.value,
    };

    console.log(PRODUCTO);
    this.productoService.guardarProducto(PRODUCTO).subscribe(data =>{
      this.toastr.success('El producto fue registrado con exito!', 'Producto registrado');
      this.router.navigate(['/productos']);
    }, error =>{
      this.toastr.error('Datos incorrectos', 'Revisa la informacion suministrada');
      console.log(error);
      this.toastr.error('Datos incorrectos', 'Revisa la informacion suministrada');
      this.productForm.reset();
    })

  
  }
  addGanado(){

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
      imagen: this.ganadoForm.get('imagen')?.value
    }

    console.log(GANADO);
    this.ganadoService.guardarGanado(GANADO).subscribe(data =>{
      this.toastr.success('Ha registrado un elemento con exito!', 'Elemento registrado');
      this.router.navigate(['/list']);
    }, error =>{
      console.log(error);
      this.toastr.error('Datos incorrectos', 'Revisa la informacion suministrada');
      this.ganadoForm.reset();
    })

  }
  setTipo(){
    this.tipo = true;
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
  quitarTipo(){
    this.tipo = false;
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

