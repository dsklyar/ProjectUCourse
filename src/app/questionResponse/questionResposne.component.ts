import { Router } from '@angular/router';
import { questionResponse } from '../models/questionResponse.model';


import { Component, Input } from '@angular/core';
import { questionResponseService } from './questionResponse-service/questionResponse.service';

@Component({
  selector: 'app-questionResponse',
  templateUrl: './questionResponse.component.html',
  styleUrls: ['./questionResponse.component.css']
})

export class questionResponseComponent {
  @Input() questionResponse: questionResponse

  constructor(private questionResponseService: questionResponseService,
   private router: Router) { }
  clicked(){    
    this.questionResponseService.displayquestionResponse(this.questionResponse)
  }
  onDelete() {
    this.questionResponseService.deletequestionResponse(this.questionResponse)
    //this.questionResponseService.removequestionResponse(this.questionResponse)
     // .subscribe(
      //result => console.log(result)
      //);
  }

}