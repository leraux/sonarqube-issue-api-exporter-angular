import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Issues } from './model/issues.model';
import { Resp } from './model/resp.model';
import { ApiService } from './services/api.service';
import Utils from './helpers/utils'
import ExcelService from './services/excel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sonar-qube-exporter-angular';
  sonarQubeForm: FormGroup;

  constructor(private api: ApiService, private excel: ExcelService) { }

  ngOnInit() {
    this.sonarQubeForm = new FormGroup({
      sonarQubeURL: new FormControl('http://localhost:9000/', Validators.required),
      sonarQubeToken: new FormControl('da5ad9e667faf116e42a8aadfb33d0b64f45bd99 ', Validators.required),
      projectKey: new FormControl('WebMVC', Validators.required),
      projectName: new FormControl('WebMVC', Validators.required),
    });
  }
  async export() {
    let sonarQubeURL = this.sonarQubeForm.get('sonarQubeURL').value;
    let sonarQubeToken = this.sonarQubeForm.get('sonarQubeToken').value;
    let projectKey = this.sonarQubeForm.get('projectKey').value;
    let projectName = this.sonarQubeForm.get('projectName').value;
    await this.report(sonarQubeURL, sonarQubeToken, projectKey, projectName);
    this.excel.exportExcel(this.issues, projectName); 
  }

  PAGE_SIZE: number = 500;
  issues: Issues[] = [];

  async report(sonarQubeURL: string, sonarQubeToken: string, projectKey: string, projectName: string) {
    this.issues = [];
    var url: string = this.getURL(sonarQubeURL, sonarQubeToken, projectKey, 1);

    let resp: Resp = await this.api.getData(url);

    if (resp != null) {
      if (resp.issues != null) {

        this.issues = this.issues.concat(resp.issues);
        var total: number = resp.total;

        if (total > this.PAGE_SIZE) {

          var max: number = total / this.PAGE_SIZE + 2;

          for (let i = 2; i < max; ++i) {

            url = this.getURL(sonarQubeURL, sonarQubeToken, projectKey, 1);
            resp = await this.api.getData(url);
            
            if (resp != null) {
              this.issues = this.issues.concat(resp.issues);
            }

          }
        }
      }
    }
    console.log(this.issues);
  }
  
  getURL(sonarQubeURL: string, sonarQubeToken: string, projectKey: string, page: number): string {
    return Utils.makeValidURL(sonarQubeURL + "api/issues/search?projects=" + projectKey + "&statuses=OPEN&pageSize=-1&pageIndex=" + page);
  }
}
