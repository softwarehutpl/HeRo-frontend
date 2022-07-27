import { Component, OnInit } from '@angular/core';
// import { Candidate } from '../../CandidatesInterface';

// export interface KanbanDisplay {
//   name: string;
//   project: string;
//   position: string;
// }

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss'],
})
export class CandidatesComponent {
  public componentName = 'candidates';
  public isAutocomplete = false;

  createInititals(name: string): string {
    let initials = '';
    for (let i = 0; i < name.length; i++) {
      if (name.charAt(i) === ' ') {
        continue;
      }
      if (name.charAt(i) === name.charAt(i).toUpperCase()) {
        initials += name.charAt(i);
        if (initials.length == 3) {
          break;
        }
      }
    }
    return initials;
  }
}
