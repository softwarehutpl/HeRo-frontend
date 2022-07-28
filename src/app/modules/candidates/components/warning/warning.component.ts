import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface WarningDataInterface {
  name: string;
  status: string;
}

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.scss'],
})
export class WarningComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: WarningDataInterface) {}
}
