import { Pipe, PipeTransform } from '@angular/core';
import { Slot } from '../model/slot/slot';

@Pipe({
  name: 'slotDateSearch',
  standalone: true
})
export class SlotDateSearchPipe implements PipeTransform {

  transform(value: Slot[], query?: string): Slot[] {
    return value.filter((slot)=>slot.date! === query);
  }

}
