import { Component, Input } from '@angular/core';
import { StaffInfo } from 'src/app/models/staff-info';

@Component({
  selector: 'label-staff-card',
  templateUrl: './label-staff-card.component.html',
  styleUrls: ['./label-staff-card.component.scss'],
})
export class LabelStaffCardComponent {
  @Input() member: StaffInfo;
  constructor() {}
}
