import { MatTableDataSource } from "@angular/material/table";
import { Observable, Subscription } from "rxjs";
import { Project } from 'src/app/modules/commons/mockups/mock-projects';

export class ProjectListDataSource extends MatTableDataSource<Project> {
  private projectList: Project[] = [];

  private subscription$: Subscription;

  constructor(projectListObservable: Observable<Project[]>) {
    super();
    this.subscription$ = projectListObservable.subscribe(projectListInObservable => {
      this.projectList = [...projectListInObservable];
      this.data = this.projectList;
    });
  }

  override disconnect() {
    this.subscription$.unsubscribe();
    super.disconnect();
  }
}
