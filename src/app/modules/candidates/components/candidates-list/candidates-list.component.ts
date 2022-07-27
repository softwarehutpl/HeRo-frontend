import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
// import { Candidate } from '../../CandidatesInterface';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
// import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CandidatesDataService } from '../../services/candidates-data.service';
import { MatDialog } from '@angular/material/dialog';
import { CandidatesSidenavComponent } from '../candidates-sidenav/candidates-sidenav.component';
import { CreateInitialsService } from 'src/app/modules/commons/services/createInitials/create-initials.service';
// import { Observable } from 'rxjs';


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
  // private candidates!: Array<Candidate>;
  public dataSource!: any;

  createInititals(name: string) {
    return this.initials.createInititals(name);
  }

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public service: CandidatesDataService,
    public dialog: MatDialog,
    public initials: CreateInitialsService
  ) {}

  async ngOnInit(): Promise<void> {
    this.dataSource = this.service.candidates;
    // this.dataSource = new MatTableDataSource(DATA);

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    /* moved to ngOnInit() to bring back Paginator*/
  }

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

  sidenavClicked(candiate: any) {
    this.dialog.closeAll();
    this.dialog.open(CandidatesSidenavComponent, {
      data: { candidate: candiate, dialog: this.dialog },
      height: 'calc(100% - 50px)',
      width: '400px',
      // backdropClass:"backdropClass",
      position: {
        top: '50px',
        right: '0px'
      }
    });

  }
}
