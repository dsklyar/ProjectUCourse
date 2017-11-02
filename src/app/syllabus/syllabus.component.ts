import { SyllabusService } from './syllabus-service/syllabus.service';
import { Syllabus } from '../models/syllabus.model';
import { Component, OnInit } from '@angular/core';

@Component({
    selector : 'app-syllabus',
    templateUrl: './syllabus.component.html',
    styles : []
})

export class SyllabusComponent implements OnInit {
    public syllabus : Syllabus;
    constructor(private syllabusService : SyllabusService){}

    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.syllabus = this.syllabusService.getSyllabus();
    }
    onEditClick(){
        
    }
}