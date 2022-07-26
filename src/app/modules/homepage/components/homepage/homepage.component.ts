import { Component, OnInit } from '@angular/core';
import { CandidatesDataService } from 'src/app/modules/candidates/services/candidates-data.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  numberNewCandiates:number;
  numberInterviews = 8;
  public dataSource!: any;

  constructor(
    public service: CandidatesDataService
  ) {
    this.numberNewCandiates=0;
  }


  async ngOnInit(): Promise<void> {
    await this.getNumberOfCandidates();
  }

  
  async getNumberOfCandidates(){
   this.numberNewCandiates = (await this.service.getCandidatesByStatus(['NEW'])).length;

  }
  
}
