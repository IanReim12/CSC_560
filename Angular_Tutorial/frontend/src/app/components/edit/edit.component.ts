import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../issue.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Issue } from '../../issue.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  id: String;
  issue: any = {};
  updatedForm: FormGroup;
  constructor(
    private issueService: IssueService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.updatedForm = this.fb.group({
      title: ['', Validators.required],
      responsible: '',
      description: '',
      severity: '',
      status: '',
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.issueService.getIssueById(this.id).subscribe((res) => {
        this.issue = res;
        this.updatedForm.get('title').setValue(this.issue.title);
        this.updatedForm.get('responsible').setValue(this.issue.responsible);
        this.updatedForm.get('description').setValue(this.issue.description);
        this.updatedForm.get('severity').setValue(this.issue.severity);
        this.updatedForm.get('status').setValue(this.issue.status);
      });
    });
  }
  //when user is saving the form

  updatedIssue(title, responsible, description, severity, status) {
    this.issueService
      .updateIssue(this.id, title, responsible, description, severity, status)
      .subscribe(() => {
        this.snackBar.open('Issue updated successfully', 'OK', {
          duration: 3000,
        });
      });
  }
}
