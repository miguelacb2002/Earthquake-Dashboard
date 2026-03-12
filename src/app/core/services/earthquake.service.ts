import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable,map,catchError,of } from "rxjs";
import { ToastrService } from "ngx-toastr";

import { Earthquake } from "../models/earhquake.model";
import { EarthquakeApi } from "../models/earthquake-api.model";

@Injectable({
    providedIn:'root'
})
export class EarthquakeService {
    private API_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'

    constructor(
        private http: HttpClient,
        private toast: ToastrService
    ){}

        getEarthquakes(): Observable<Earthquake[]>{
            return this.http.get<EarthquakeApi>(this.API_URL).pipe(

            map(res=> this.apiResponse(res)),
            catchError(error =>{
                console.error("Error loadind eartchquakes api",error)
                this.toast.error('Error al conectar con el Api')
                return of([])
            })
            )
        }
    
    private apiResponse(res: EarthquakeApi):Earthquake[]{
        return res.features.map(feature =>({
            id: feature.id,

      magnitude: feature.properties.mag,

      place: feature.properties.place,

      time: feature.properties.time,

      updated: feature.properties.updated,

      depth: feature.geometry.coordinates[2],

      longitude: feature.geometry.coordinates[0],

      latitude: feature.geometry.coordinates[1],

      tsunami: feature.properties.tsunami,

      alert: feature.properties.alert,

      title: feature.properties.title,

      url: feature.properties.url
    }))
    }

}