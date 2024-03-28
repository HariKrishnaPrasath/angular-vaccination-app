import { Component } from '@angular/core';
import { Slot } from '../../../model/slot/slot';
import { SlotService } from '../../../service/slot/slot.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Route, Router, RouterLinkActive } from '@angular/router';
import { Center } from '../../../model/center/center';
import { SlotDateSearchPipe } from '../../../pipes/slot-date-search.pipe';



@Component({
  selector: 'app-create-slot',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLinkActive],
  templateUrl: './create-slot.component.html',
  styleUrl: './create-slot.component.css'
})
export class CreateSlotComponent {


  updateSlot: Slot = new Slot();
  slots: Slot[] = [];
  newSlot: Slot = new Slot();
  centerId?: number;
  center: Center = new Center();
  constructor(private slotService: SlotService, private router: Router) {
    let data, obj;
    obj = sessionStorage.getItem('Center');
    data = JSON.parse(obj!);
    this.center = { ...data };
    this.loadAllSlots();

  }

  loadAllSlots() {
    this.slotService.getAllSlotsByCenterId(this.center.centerId!).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.slots = res;
        },
        error: (err) => console.log(err)

      }
    )
  }
  createSlot() {
    this.newSlot.center = { ...this.center };
    this.slotService.createSlot(this.newSlot).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.loadAllSlots();
          this.newSlot = new Slot();
        }
      }
    )
  }

  slotFunc(slot: Slot) {
    this.updateSlot = { ...slot };
  }
  updateSlotById() {
    this.updateSlot.center = { ...this.center };
    console.log(this.updateSlot);
    
    this.slotService.updateSlot(this.updateSlot).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.loadAllSlots();
        }
        , error: (err) => console.log(err)

      }
    )
  }
  deleteSlotById() {
    if (confirm('Do you want to delete the slot?')) {
      this.slotService.deleteSlotById(this.updateSlot.id!).subscribe(
        {
          next: (res) => {
            console.log(res);
            this.loadAllSlots();
          },
          error: (err) => console.log(err)
        }
      )
    }
  }
  convert(time: Date | undefined): string | number | Date {
    const today = new Date();
    return new Date(today.toDateString() + ' ' + time);
  }
  name:string=""
  slotDup:Slot[]=[]
  search(){
    if(this.name=="")
    {
      this.loadAllSlots()
    }
    for(let i of this.slots)
    {
      if(this.name == i.date)
      {
        this.slotDup.push(i)
        console.log(i)
      }
    }
    this.name=""
    this.slots=this.slotDup
    this.slotDup=[]
  }

}
