import { QuestionService } from './question.service';
import { UserQuestion } from '../models/userQuestion.model';

import { Component, Input, OnInit } from '@angular/core';

// <app-question [question] = "question">
@Component({
    selector: 'app-question',
    templateUrl: './question-list.component.html',
    styleUrls: ['/question.component.css'],
    providers: [QuestionService]
})

export class QuestionComponentList implements OnInit {
    private uquestions : UserQuestion[];

    constructor(private questionService : QuestionService) {}


    ngOnInit(){
        this.uquestions = this.questionService.getQuestions();
    }
    
}