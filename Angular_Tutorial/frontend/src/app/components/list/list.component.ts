import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../issue.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { Issue } from '../../issue.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  //class property issues is of type Issues[]
  //issues[] stores data coming from the service calls in the backend
  issues: Issue[];
  //what will be printed as column names
  displayedColumns = ['title', 'responsible', 'severity', 'status', 'actions'];
  constructor(private issueService: IssueService, private router: Router) {}

  ngOnInit() {
    //launch fetch issues right away
    this.fetchIssues();
  }

  fetchIssues() {
    //this line calls the getIssues() function, waits for it to be succsessful, then sends the Issue[] array through a callback
    //takes paramater data which is of type Issue[] array
    this.issueService.getIssues().subscribe((data: Issue[]) => {
      this.issues = data;
      console.log('Data requested');
      console.log(this.issues);
    });
  }

  editIssue(id) {
    //using the router function, navigate to the edit component and apply the provided id
    this.router.navigate([`/edit/${id}`]);
    console.log(id);
  }

  deleteIssue(id) {
    this.issueService.deleteIssue(id).subscribe(() => {
      this.fetchIssues();
    });
  }
}
