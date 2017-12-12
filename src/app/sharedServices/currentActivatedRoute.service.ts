
import { Injectable } from '@angular/core';

@Injectable()
export class CurrentActivatedRouteService {
    previousActivatedRouteValue: any;
    currentActivatedRouteValue : any;

    setCurrentActivatedRoute(value : any){
        this.previousActivatedRouteValue = this.currentActivatedRouteValue;
        this.currentActivatedRouteValue = value;
    }
    getPreviousActivatedRoute() : any {
        return this.previousActivatedRouteValue;
    }
}