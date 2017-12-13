import { AssignmentChartistService } from './assignmentChartist-service/assignmentChartist-service';

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist';
import { TSMap } from "typescript-map"
declare var require: any;

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}
const data: any = require('../chart/data.json');

@Component({
  selector: 'app-assignment-chartist',
  templateUrl: './assignmentChartist.component.html',
  styleUrls: ['./assignmentChartist.component.css'],
  providers: [AssignmentChartistService]
})
export class AssignmentChartistComponent implements OnInit {
  chart: Chart;
  assignmentID: string;





  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private assignmentChartistService: AssignmentChartistService) { }

  ngOnInit() {
    this.activatedRoute.paramMap
      .subscribe(params => {
        this.assignmentID = params.get('assignmentID');
        this.assignmentChartistService.setAssignmentID(this.assignmentID);
        this.assignmentChartistService.refreshAssignmentChartist()
          .subscribe(
          data => {
            this.chart  = this.generateDataPlot(data);
          },
          error => console.log(error)
          )
      });

  }
  generateDataPlot(data: any) {
    var questionCountMap = new TSMap();
    var triesUsedTotalMap = new TSMap();
    for (var i = 0; i < data.length; i++) {
      if (triesUsedTotalMap.has(data[i].assignmentQuestionID)) {
        questionCountMap.set(data[i].assignmentQuestionID, (questionCountMap.get(data[i].assignmentQuestionID) as number) + 1);
        triesUsedTotalMap.set(data[i].assignmentQuestionID, triesUsedTotalMap.get(data[i].assignmentQuestionID) + data[i].triesUsed);
      } else {
        questionCountMap.set(data[i].assignmentQuestionID, 1);
        triesUsedTotalMap.set(data[i].assignmentQuestionID, data[i].triesUsed);
      }
    }
    var retval: any;
    var meta: any = [];
    triesUsedTotalMap.keys().forEach((key: any) => meta.push({
      assignmentQuestionID: key,
      average: (triesUsedTotalMap.get(key) as number) / (questionCountMap.get(key) as number)
    }));
    var labels: any = [];
    var series: any = [];
    for (var i = 0; i < meta.length; i++) {
      labels.push('Question ' + (i + 1));
      series.push(meta[i].average);
    }
    retval = {
      type: 'Line',
      data: { series: [series], labels },
      options : {
        
      }
    }
    return retval;
  }
  onDelete() {

  }
  onEdit() {

  }
}