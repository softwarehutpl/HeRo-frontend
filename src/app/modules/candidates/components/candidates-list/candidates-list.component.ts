import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { Candidate } from '../../../commons/interfaces/candidate';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CandidatesService } from '../../../commons/services/candidates/candidates.service';
import CANDIDATES from '../../../commons/mockups/candidates.json';

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
  private candidates!: Array<Candidate>;
  public dataSource: any;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private cs: CandidatesService
  ) {}

  async ngOnInit(): Promise<void> {
    this.candidates = await this.cs.getAllCandidates();
    // this.dataSource = new MatTableDataSource(DATA);
    this.dataSource = new MatTableDataSource(this.candidates);
  }

  logData() {
    console.log('local_JSON:', DATA);
    console.log('fetched:', this.candidates);
    // console.log(this.candidates2);
  }
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  onChangePage(pe: PageEvent) {
    console.log(pe.pageIndex);
    console.log(pe.pageSize);
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
