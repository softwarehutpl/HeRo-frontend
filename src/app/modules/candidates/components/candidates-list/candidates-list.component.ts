import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { Candidate } from '../../../commons/interfaces/candidate';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
// import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CandidatesDataService } from '../../services/candidates-data.service';
import CANDIDATES from '../../../commons/mockups/candidates.json';
import { Observable } from 'rxjs';

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
  // private candidates!: Array<Candidate>;
  public dataSource!: any;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public service: CandidatesDataService
  ) {}

  async ngOnInit(): Promise<void> {

    this.dataSource = this.service.candidates;
    // this.dataSource = new MatTableDataSource(DATA);


    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  logData() {
    //   console.log('local_JSON:', DATA);
    //   console.log('fetched:', this.candidates);
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
    console.log('onChangePare()');
    console.log(pe.pageIndex);
    console.log(pe.pageSize);
  } // this seems to be dead

  async getPaginatorData(e: PageEvent) {
    this.service.pageIndex = e.pageIndex;
    this.service.pageSize = e.pageSize;
    this.service.getAllCandidates();
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
