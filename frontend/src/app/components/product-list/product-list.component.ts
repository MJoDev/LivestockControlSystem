import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import {ProductService} from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Popover } from 'bootstrap';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  filtroID: string = '';
  listProductos: Product[] = [];

  constructor(private productoService: ProductService, private toastr: ToastrService){}
  ngOnInit(){
    this.obtenerProductos();
  }
  obtenerProductos(){
    this.productoService.getProductos().subscribe(data =>{
      console.log(data);
      this.listProductos = data;

    }, error =>{ console.log(error)});
  }
  eliminarProducto(id: any){
    this.productoService.eliminarProducto(id).subscribe(data => {
      this.toastr.error('El producto fue eliminado con exito', 'Producto Eliminado');
      this.obtenerProductos();
    }, error => {console.log(error)});
  }
  descripcionMostrar(producto: any){
    this.toastr.info(producto.descripcion, 'Descripcion del producto: ' + producto.product + ' ' + producto.productID, {
      closeButton: true, disableTimeOut: true, tapToDismiss: false, positionClass: 'toast-top-right'
    })
  }
 

}
