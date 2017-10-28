import { Router } from '@angular/router';
//import { courseQuestionService } from './courseQuestionService/courseQuestion.service'; //TODO
import { courseQuestion } from '../models/courseQuestion.model';


import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-courseQuestion',
  templateUrl: './courseQuestion.component.html',
  styleUrls: ['./courseQuestion.component.css']
})

export class courseQuestionComponent {
  @Input() courseQuestion: courseQuestion = 
  new courseQuestion('title','question');

  //constructor(private courseQuestionService: courseQuestionService,
   // private router: Router) { }

  onDelete() {
    //this.courseQuestionService.removecourseQuestion(this.courseQuestion)
     // .subscribe(
      //result => console.log(result)
      //);
  }
  onEdit() {
    //this.router.navigateByUrl('/editcourseQuestion');
   // this.courseQuestionService.addcourseQuestionToEdit(this.courseQuestion);
  }
}