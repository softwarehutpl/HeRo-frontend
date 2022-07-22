import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { Candidate } from '../../../commons/interfaces/candidate';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CandidatesDataService } from '../../services/candidates-data.service';
import CANDIDATES from '../../../commons/mockups/candidates.json';
import { Subscription, timer } from 'rxjs';

const DATA = CANDIDATES; //This if brute-force import from JSON, i will use this to adapt local mockups to backend.

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.scss'],
})
export class CandidatesListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'recruiterEmail',
    'recruiterId',
    'recruitmentName',
    'source',
    'status',
    'stage',
    'techEmail',
    'techId',
    'profile',
  ];
  //variables:
  // private candidates!: any;
  private candidates!: Array<Candidate> ;
  public dataSource!: any;
  public apidata: any;
  private sub$!: Subscription;

  //paginator settings:
  // moved to service

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public service: CandidatesDataService 
  ) {
    // this.candidates=service.candidates
  }

  async ngOnInit(): Promise<void> {
    //this.candidates = await this.service.getAllCandidates(this.service.pageSize, this.service.pageIndex+1);
    // const myObserver = {
    //   next: (result: any) => {
    //     this.apidata = result;
    //   },
    //   error: (err: Error) => console.error(err),
    //   complete: () => console.log('Finished'),
    // };
    // this.sub$ = timer(0, 3000)
    //   .pipe(switchMap(() => this.candidates))
    //   .subscribe(myObserver);
    // this.candidates = await this.cs.getAllCandidates();
    this.dataSource = this.service.candidates; //new MatTableDataSource(DATA);
    // this.dataSource = this.service.candidates;

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  logData() {
    console.log('local_JSON:', DATA);
    console.log('fetched:', this.candidates);
    console.log('sub:', this.sub$);
  } // debugging function, delete later

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

  
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    /* moved to ngOnInit() to bring back Paginator*/
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  public onChangePage(pe: PageEvent) {
    console.log("onChangePare()");
    console.log(pe.pageIndex);
    console.log(pe.pageSize);
  } // this seems to be dead

  async getPaginatorData(e: PageEvent) {
    console.log('getPaginatorData()');
    console.log(e.pageIndex);
    this.service.pageIndex = e.pageIndex;
    this.service.getAllCandidates();
    // this.candidates=await this.service.getAllCandidates(this.service.pageSize, this.service.pageIndex+1);
  } //this might be where i'll put API call to get next page

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
