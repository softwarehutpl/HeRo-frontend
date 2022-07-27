import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Candidate } from 'src/app/modules/commons/interfaces/candidate';
import { CandidatesService } from 'src/app/modules/commons/services/candidates/candidates.service';
import { CreateInitialsService } from 'src/app/modules/commons/services/createInitials/create-initials.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  res!: any;

  constructor(
    private route: ActivatedRoute,
    private candidateServer: CandidatesService,
    private createInitialsService: CreateInitialsService) { }
  dataLoadet: boolean = false;
  public candidate!: Candidate;
  async ngOnInit(): Promise<void> {

    await this.getData()
  }

  async getData() {
    const id = this.route.snapshot.paramMap.get('id');
    this.res = await this.candidateServer.getCandidate(id);
    this.candidate = this.res;
    this.dataLoadet = true;
  }

  public createInititals(name: string): string {
    return this.createInitialsService.createInititals(name);
  }

}
