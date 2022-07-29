import { _fixedSizeVirtualScrollStrategyFactory } from '@angular/cdk/scrolling';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatesDataService } from 'src/app/modules/candidates/services/candidates-data.service';
import { FiltersService } from '../../services/filters/filters.service';
import { Data } from '../definition';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

public sidebarButton1: string = Data.sidebarButton1;
public sidebarButton2: string = Data.sidebarButton2;
public sidebarButton3: string = Data.sidebarButton3;

  clicedButton!:string ;

  constructor(private activatedRoute: ActivatedRoute, private _candidateService: CandidatesDataService, private _router: Router, public filterService: FiltersService) {
    
    const path =this.activatedRoute.snapshot.url[0].path;
    if(path !== 'home' && path !== 'projects' && path !== 'candidates'){
      this.clicedButton = 'candidates';
    }
    else{
      this.clicedButton = path;
    }
  }

  ngOnInit(): void {}

public  async ckicked(val:string){
await this._router.navigate([val])
await this._candidateService.getCandidatesForList()
    this.clicedButton = val;
  }
}
