import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//has to be the double /api/api because the default irl is set to go to api, and when we route we are stacking /api's when we are handling different http requests

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  getIssues() {
    return this.http.get(`${this.uri}/api`);
  }

  getIssueById(id) {
    return this.http.get(`${this.uri}/api/api/${id}`);
  }

  addIssue(title, responsible, description, severity) {
    const issue = {
      title: title,
      responsible: responsible,
      description: description,
      severity: severity,
    };
    return this.http.post(`${this.uri}/api/api/add`, issue);
  }

  updateIssue(id, title, responsible, description, severity, status) {
    const issue = {
      title: title,
      responsible: responsible,
      description: description,
      severity: severity,
      status: status,
    };
    console.log(description);
    return this.http.post(`${this.uri}/api/api/update/${id}`, issue);
  }

  deleteIssue(id) {
    return this.http.delete(`${this.uri}/api/api/delete/${id}`);
  }
}
