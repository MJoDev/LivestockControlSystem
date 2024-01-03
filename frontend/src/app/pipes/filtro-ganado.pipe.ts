import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroGanado'
})
export class FiltroGanadoPipe implements PipeTransform {
  transform(ganados: any[], filtroID: string): any[] {
    if (!filtroID) {
      return ganados;
    }
    return ganados.filter(ganado => ganado.ganadoID.toLowerCase().includes(filtroID.toLowerCase()));
    }

}
