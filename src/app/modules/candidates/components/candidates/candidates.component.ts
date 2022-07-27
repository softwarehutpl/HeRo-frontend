import { Component } from '@angular/core';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss'],
})
export class CandidatesComponent {
  public componentName = 'candidates';
  public isAutocomplete = false;
}
