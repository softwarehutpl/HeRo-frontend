import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private activatedRoute: ActivatedRoute) {
    
    const path =this.activatedRoute.snapshot.url[0].path;
    if(path !== 'home' && path !== 'projects' && path !== 'candidates'){
      this.clicedButton = 'candidates';
    }
    else{
      this.clicedButton = path;
    }
  }


  ngOnInit(): void {}

  ckicked(val:string){
    this.clicedButton = val;
  }
}
