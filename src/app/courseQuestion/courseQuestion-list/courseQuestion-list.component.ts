//import { courseQuestionService } from '../courseQuestionService/announcemenet.service';
import { CourseQuestion } from '../../models/courseQuestion.model';

import { Component, Input, OnInit } from '@angular/core';
import { CourseQuestionService } from '../courseQuestion-service/courseQuestion.service';


@Component({
  selector: 'app-courseQuestion-list',
  templateUrl: './courseQuestion-list.component.html',
  styleUrls: ['./courseQuestion-list.component.css']
})


export class courseQuestionListComponent implements OnInit {
  private courseQuestions: CourseQuestion[] = [];

  constructor(private courseQuestonService: CourseQuestionService) {
    this.courseQuestions = this.courseQuestonService.courseQuestions;
   }

  ngOnInit() {

  }
}

