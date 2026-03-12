import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, map, zip } from "rxjs";

import { Earthquake } from "../models/earhquake.model";
import { EarthquakeFilters } from "../models/filter.model";
import { EarthquakeService } from "../services/earthquake.service";

@Injectable({
    providedIn:'root'
})
export class EarthquakeStore {

    constructor(
        private earthquakeService:EarthquakeService
    ){
        this.loadEarthquakes()
    }

    /* state */
    private earthquakesSubject = new BehaviorSubject<Earthquake[]>([])
    earthquakes$=this.earthquakesSubject.asObservable()

    private initialFilters: EarthquakeFilters={
    minMagnitude: null,
      maxMagnitude: null,
      tsunami: 0,
      location:''
    }


    /* Filter State */
     private filtersSubject =
    new BehaviorSubject<EarthquakeFilters>(this.initialFilters)

    filters$=this.filtersSubject.asObservable()

    /* Filtered data */
    filteredEarthquakes$=
    combineLatest([
        this.earthquakes$,
        this.filters$
    ]).pipe(
        map(([earthquakes,filters])=>
        this.applyFilters(earthquakes,filters)
        )
    )
    /* Api Load */
    private loadEarthquakes(){
        this.earthquakeService.getEarthquakes().subscribe(data=>{
            this.earthquakesSubject.next(data)
        })
    }
    /* Update Filters */
    updateFilters(filters:Partial<EarthquakeFilters>){
        const current = this.filtersSubject.value
        this.filtersSubject.next({
            ...current,
            ...filters
        })
    }
    /* FilterLogic */
    private applyFilters(
        eartchquakes:Earthquake[],
        filters:EarthquakeFilters
    ):Earthquake[]{

        return eartchquakes.filter(eq=>{
            if(filters.minMagnitude && eq.magnitude 
                < filters.minMagnitude
            ) return false

            if (filters.maxMagnitude && eq.magnitude
                >filters.maxMagnitude
            ) return false 

            if(filters.tsunami && eq.tsunami !== 1)
                return false 

            if(filters.location){
                const location = filters.location.toLowerCase()

                if(!eq.place.toLowerCase().includes(location))
                return false 
            }

            return true 

        })
    }

    private selectedEarthquakeSubject =
        new BehaviorSubject<Earthquake | null>(null)

    selectedEarthquake$ =
        this.selectedEarthquakeSubject.asObservable()

    selectEarthquake(eq:Earthquake){

    this.selectedEarthquakeSubject.next(eq)
    }


    clearFilters(){
        this.filtersSubject.next({...this.initialFilters})
    }

    /* clearFilters */
    prediction$ = this.selectedEarthquake$.pipe(

  map((eq) => {

    if (!eq) {
      return {
        risk: 'No event selected',
        probability: 0
      }
    }

    /* Magnitude factor */

    let magnitudeScore = 0

    if (eq.magnitude < 4) magnitudeScore = 10
    else if (eq.magnitude < 5) magnitudeScore = 30
    else if (eq.magnitude < 6) magnitudeScore = 50
    else magnitudeScore = 70


    /* Depth factor */

    let depthScore = 0

    if (eq.depth < 70) depthScore = 20
    else if (eq.depth < 300) depthScore = 10
    else depthScore = 0


    /* Alert factor */

    let alertScore = 0

    switch(eq.alert){
      case 'green':
        alertScore = 5
        break
      case 'yellow':
        alertScore = 10
        break
      case 'orange':
        alertScore = 15
        break
      case 'red':
        alertScore = 20
        break
    }


    /* Final probability */

    let probability = magnitudeScore + depthScore + alertScore

    if (probability > 100) probability = 100


    /* Risk label */

    let risk = ''

    if (probability >= 70) risk = 'High'
    else if (probability >= 40) risk = 'Moderate'
    else risk = 'Low'


    return {
      risk,
      probability
    }

  })



)

}