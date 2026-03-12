import { Component, OnInit} from '@angular/core';
import {GoogleMap, MapMarker, MapInfoWindow} from '@angular/google-maps'

import { EarthquakeService } from '../../../core/services/earthquake.service';
import { Earthquake } from '../../../core/models/earhquake.model';

import { NgFor,NgIf } from '@angular/common';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-earthquake-map',
  standalone:true,
  imports: [GoogleMap,MapMarker, NgIf, NgFor, MapInfoWindow],
  templateUrl: './earthquake-map.component.html',
  styleUrl: './earthquake-map.component.scss'
})
export class EarthquakeMapComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow!:MapInfoWindow
  earthquakesData: Earthquake[]=[]

  center:google.maps.LatLngLiteral = {
    lat:20,
    lng:0
  }
  zoom = 2
  selectedEarthquake: Earthquake | null =  null

  constructor(private earthquakeService: EarthquakeService){}

  ngOnInit(): void {
    this.earthquakeService.getEarthquakes().subscribe(data=>{
    this.earthquakesData =data
    })
  }
  popUpInfo(marker:MapMarker,earhquake:Earthquake){
    this.selectedEarthquake = earhquake
    this.infoWindow.open(marker)
  }


}
