import { NgForm } from '@angular/forms/src/directives';
import { Location } from '@angular/common';
import { Announcement } from '../../models/announcement.model';
import { Router } from '@angular/router';
import { CourseQuestionService } from '../courseQuestion-service/courseQuestion.service'
import { Component, OnInit } from '@angular/core';
import { CourseQuestion } from '../../models/courseQuestion.model';

@Component({
  selector: 'app-announcement-edit',
  templateUrl: './announcement-edit.component.html',
  styleUrls: ['./announcement-edit.component.css']
})

export class courseQuestionEditComponent implements OnInit {
  constructor(private CourseQuestionService: CourseQuestionService,
              private location: Location,
              private router : Router) { }
  courseQuestionToEdit : CourseQuestion;

  ngOnInit() {
    this.courseQuestionToEdit= this.CourseQuestionService.getcourseQuestionToEdit();
    if(this.courseQuestionToEdit == null){
      // TODO: show error page here
      this.router.navigateByUrl('/dashboard');
    }
  }
  onSubmit(form : NgForm) {
    const updatedAnnouncement = new Announcement(
      form.value.title,
      form.value.announcement,
      this.courseQuestionToEdit.dateCreated,
      new Date(),
      this.courseQuestionToEdit.courseQuestionID
    );
    // this.CourseQuestionService.updatecourseQuestion(this.courseQuestionToEdit)
    //   .subscribe (
    //   //data => console.log(data),
    //   //error => console.log(error)
    //   );
    form.reset();
    this.location.back()
  }
  onGoBack() {
    this.location.back()
  }
}