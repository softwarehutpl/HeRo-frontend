import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { Candidate } from '../../../commons/interfaces/candidate';

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CandidatesService } from '../../../commons/services/candidates/candidates.service';
import { CandidatesDataService } from '../../services/candidates-data.service';
import CANDIDATES from '../../../commons/mockups/candidates.json';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
    'source',
    'project',
    'position',
    'status',
    'stage',
    'techAssignee',
    'profile',
  ];
  //variables:
  private candidates!: any;
  // private candidates!: Array<Candidate>;
  public dataSource!: any;
  public apidata: any;
  private sub$!: Subscription;

  //paginator settings:
  public pageIndex: number = 0;
  public pageSize: number = 5;
  public pageSizeOptions: Array<number> = [5, 10, 15, 20, 25];

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private cs: CandidatesService,
    private service: CandidatesDataService
  ) {}

  async ngOnInit(): Promise<void> {
    this.candidates = await this.service.getAllCandidates();
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
    this.dataSource = new MatTableDataSource(this.candidates);

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  logData() {
    console.log('local_JSON:', DATA);
    console.log('fetched:', this.candidates);
    console.log('sub:', this.sub$);
  } // debugging function, delete later

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    /* moved to ngOnInit() to bring back Paginator*/
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  }
  onChangePage(pe: PageEvent) {
    console.log(pe.pageIndex);
    console.log(pe.pageSize);
  } // this seems to be dead

  public getPaginatorData(e: PageEvent) {
    console.log('paginator ' + e.pageIndex);
    this.pageIndex = e.pageIndex;
  } //this might be where i'll put API call to get next page

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
