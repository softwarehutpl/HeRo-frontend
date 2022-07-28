import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss'],
})
export class CandidatesComponent {
  public componentName = 'candidates';
  public isAutocomplete = false;
  // public location = this.router.url;

  constructor(public router: Router) {}
}
