import { Syllabus } from '../../models/syllabus.model';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()
export class SyllabusService {
    private syllabus : Syllabus = 
        new Syllabus('Fall CSE 172 Syllabus',
                     'Get ready bois.',
                     'id',
                     new Date(),
                     new Date());

    updateSyllabus(updatedSyllabus : Syllabus){
        this.syllabus = updatedSyllabus;
    }
    getSyllabus(){
        return this.syllabus;
    }
}