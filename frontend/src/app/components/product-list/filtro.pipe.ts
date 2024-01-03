import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {
  transform(productos: any[], filtroID: string): any[] {
    if (!filtroID) {
      return productos;
    }
    return productos.filter(producto => producto.productID.toLowerCase().includes(filtroID.toLowerCase()));
    }
}
