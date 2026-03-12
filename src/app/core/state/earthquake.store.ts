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
    prediction$ = this.filteredEarthquakes$.pipe(

    map((earthquakes) => {    

    const total = earthquakes.length

    if (total === 0) {
      return {
        total: 0,
        strong: 0,
        probability: 0,
        message: 'No data available'
      }
    }

    const strong = earthquakes.filter(
      eq => eq.magnitude >= 3
    ).length

    const probability = (strong / total) * 100

    let message = ''

    if (probability > 20) {
      message = 'High probability of strong earthquakes'
    }
    else if (probability > 10) {
      message = 'Moderate seismic activity'
    }
    else {
      message = 'Low probability of strong earthquakes'
    }

    return {
      total,
      strong,
      probability: Number(probability.toFixed(2)),
      message
    }

  })

)

}