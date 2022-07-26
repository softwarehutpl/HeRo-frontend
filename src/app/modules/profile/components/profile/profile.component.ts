import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Candidate } from 'src/app/modules/commons/interfaces/candidate';
import { CandidatesService } from 'src/app/modules/commons/services/candidates/candidates.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // id!: any;
  res!: any;

  constructor(private route: ActivatedRoute, private candidateServer: CandidatesService) { }
  dataLoadet: boolean = false;
  public candidate!: Candidate;
  async ngOnInit(): Promise<void> {

    await this.getData()
  }

  async getData() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log("id: ", this.route.snapshot.paramMap.get('id'));
    this.res = await this.candidateServer.getCandidate(id);
    this.candidate = this.res;
    console.log(this.candidate);
    this.dataLoadet = true;
  }

  public createInititals(name: string): string {
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
