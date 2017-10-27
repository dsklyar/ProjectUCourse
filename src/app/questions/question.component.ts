import { UserQuestion } from '../models/userQuestion.model';

import { Component, Input } from '@angular/core';

// <app-question [question] = "question">
@Component({
    selector: 'app-uquestion',
    templateUrl: './question.component.html',
    styleUrls: ['/question.component.css']
})

export class QuestionComponent {
    @Input() uquestion : UserQuestion;
}