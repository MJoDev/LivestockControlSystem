import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validator, Validators} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Product } from 'src/app/models/product';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

     id!: string | null;

     

     productForm!: FormGroup;

     constructor(private fb: FormBuilder, 
       private router: Router, 
       private toastr: ToastrService,
       private productoService: ProductService,
       private aRouter: ActivatedRoute){
       this.productForm = this.fb.group({
          _id: [''],
          productID: [''],
          product: ['', Validators.required],
          stock: ['', Validators.required],
          descripcion: [''],
          tipo: [''],
          alerta: [''],

        });
        this.id = this.aRouter.snapshot.paramMap.get('id');
     };
     ngOnInit(){
       this.esEditar();
       console.log(this.id);
     };
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
          if(this.id !== null){
            this.productoService.editarProducto(this.id, PRODUCTO).subscribe(data=>{
                this.toastr.info('El producto fue editado con exito!', 'Producto actualizado');
                this.router.navigate(['/productos']);
            }, error =>{
                console.log(error);
                this.toastr.error('Datos incorrectos', 'Revisa la informacion suministrada');
                this.productForm.reset();

             });
          }else{
            console.log(PRODUCTO);
              this.productoService.guardarProducto(PRODUCTO).subscribe(data =>{
                this.toastr.success('El producto fue registrado con exito!', 'Producto registrado');
                this.router.navigate(['/productos']);
              }, error =>{
                console.log(error);
                 this.toastr.error('Datos incorrectos', 'Revisa la informacion suministrada');
                this.productForm.reset();

             });
          }   
     };

     esEditar(){
        if(this.id !== null){
          this.productoService.obtenerProducto(this.id).subscribe(data => {
            this.productForm.setValue({
                _id: data._id,
                productID: data.productID,
                product: data.product,
                descripcion: data.descripcion,
                tipo: data.tipo,
                alerta: data.alerta,
                stock: data.stock
            });
              console.log(this.productForm);
          }, error=>{
            console.log(error)
          });
        }
      };
  }

