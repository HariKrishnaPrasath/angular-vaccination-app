import { CommonModule, getLocaleMonthNames } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PatientService } from '../../../service/patient/patient.service';
import { CenterService } from '../../../service/center/center.service';
import { SlotService } from '../../../service/slot/slot.service';
import { Center } from '../../../model/center/center';
import { Slot } from '../../../model/slot/slot';
import { DatePipe } from '@angular/common';
import { Appointment } from '../../../model/appointment/appointment';
import { Patient } from '../../../model/patient/patient';
import { AppointmentService } from '../../../service/appointment/appointment.service';
import { SlotDateSearchPipe } from '../../../pipes/slot-date-search.pipe';

@Component({
  selector: 'app-view-center',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLinkActive, RouterOutlet, RouterLink, SlotDateSearchPipe, DatePipe],
  templateUrl: './view-center.component.html',
  styleUrl: './view-center.component.css'
})
export class ViewCenterComponent {

  centerId?: number;
  selectedCenter: Center = new Center();
  slots: Slot[] = [];
  bookAppointment: Appointment = new Appointment();
  selectedSlot?: Slot;
  patient: Patient = new Patient();
  dateVal?: string;
  selectCard(slot: Slot) {

    if (this.selectedSlot && slot.id === this.selectedSlot!.id) {
      this.selectedSlot = new Slot();
      this.bookAppointment.slot = new Slot();
    }

    else {
      this.bookAppointment.slot = { ...slot };
      this.selectedSlot = slot;
    }
  }
  constructor(private appointmentService: AppointmentService, private centerService: CenterService,
    private slotService: SlotService, private router: Router, private route: ActivatedRoute) {
    this.centerId = parseInt(this.route.snapshot.paramMap.get('centerId')!);

    this.loadCenterById();
    this.loadSlots();

    this.patient = JSON.parse(sessionStorage.getItem('Patient')!);
    this.bookAppointment.patient = this.patient;
    this.bookAppointment.vaccineStatus = false;

    let currentDate = new Date();
    this.bookAppointment.bookingDate = currentDate.toISOString().slice(0, 10);


  }
  loadSlots() {
    this.slotService.getAllSlotsByCenterId(this.centerId!).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.slots = [...res];
        },
        error: (err) => console.log(err.error)

      }
    )
  }
  loadCenterById() {
    this.centerService.getCenterById(this.centerId!).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.selectedCenter = { ...res };
        },
        error: (err) => console.log(err.error)
      }
    )
  }
  bookAnAppointment() {
    console.log(this.dateVal);

    console.log(this.bookAppointment);
    this.appointmentService.bookAnAppointment(this.bookAppointment).subscribe(
      {
        next: (res) => {
          console.log(res);
          let parentUrl = this.route.parent?.snapshot.url.join('/')

          this.router.navigateByUrl(parentUrl + '/center');
        },
        error: (err) => console.log(err.error)

      }
    )

  }
  convert(time: Date | undefined): string | number | Date {
    const today = new Date();
    return new Date(today.toDateString() + ' ' + time);
  }
}

