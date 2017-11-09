//import { courseQuestionService } from '../courseQuestionService/announcemenet.service';
import { CourseQuestion } from '../../models/courseQuestion.model';

import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-courseQuestion-list',
  templateUrl: './courseQuestion-list.component.html',
  styleUrls: ['./courseQuestion-list.component.css']
})


export class courseQuestionListComponent implements OnInit {
  private courseQuestions: CourseQuestion[] = [new CourseQuestion(
    "Title",
    "",
    new Date(),
    new Date(),
    ""
  ),
  new CourseQuestion(
    "Title",
    "",
    new Date(),
    new Date(),
    ""
  ),
  new CourseQuestion(
    "Title",
    "",
    new Date(),
    new Date(),
    ""
  ),

  ]

  constructor() { }

  ngOnInit() {

  }
}

