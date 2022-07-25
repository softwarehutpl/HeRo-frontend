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

  constructor(private route: ActivatedRoute,private candidateServer:CandidatesService) {  }
  dataLoadet:boolean=false;
  public candidate!:Candidate;
  async ngOnInit(): Promise<void> {

    await this.getData()
  }

  async getData(){ 
    const id = this.route.snapshot.paramMap.get('id');
    const res = await this.candidateServer.getCandidate(id);
    this.candidate = res;
    this.dataLoadet=true;
  }

}
