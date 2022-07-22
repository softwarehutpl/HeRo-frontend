import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { Candidate } from '../../CandidatesInterface';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CandidatesService } from '../../../commons/services/candidates/candidates.service';
import { CandidatesDataService } from '../../services/candidates-data.service';
import CANDIDATES from '../../../commons/mockups/candidates.json';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.scss'],
})
export class CandidatesListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'recruiterAssignee',
    'recruiterId',
    'recruitmentName',
    'source',
    'status',
    'stage',
    'techAssignee',
    'techId',
    'profile',
  ];
  //variables:
  // private candidates!: any;
  private candidates!: Array<Candidate>;
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
    private service: CandidatesDataService // private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.dataSource = this.service.candidates;
    // this.dataSource = new MatTableDataSource(DATA);

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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

  // goToProfile(id: number) {
  //   const string: string = '/profile/' + id;
  //   this.router.navigate([string]);
  // }
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

  async getPaginatorData(e: PageEvent) {
    this.service.pageIndex = e.pageIndex;
    this.service.pageSize = e.pageSize;
    this.service.getCandidatesForList();
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
