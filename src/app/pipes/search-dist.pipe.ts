import { Pipe, PipeTransform } from '@angular/core';
import { Center } from '../model/center/center';

@Pipe({
  name: 'searchDist',
  standalone: true
})
export class SearchDistPipe implements PipeTransform {

  transform(center: Center[], query:string): Center[] {
    if (query == "") return center;
    return center.filter((prod) => 
    JSON.stringify(prod).toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  }

}
