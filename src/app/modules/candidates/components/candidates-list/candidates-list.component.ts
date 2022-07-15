import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Candidate } from '../../../commons/interfaces/candidate';
import { CANDIDATES } from '../../../commons/mockups/mock-candidates';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

const DATA: Array<Candidate> = CANDIDATES;
@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.scss'],
})
export class CandidatesListComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'source',
    'project',
    'position',
    'status',
    'stage',
    'assignee',
    'profile',
  ];
  dataSource = new MatTableDataSource(DATA);

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
