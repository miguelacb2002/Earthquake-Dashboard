import { Component, Input} from '@angular/core';
import {GoogleMap, MapMarker, MapInfoWindow} from '@angular/google-maps'

import { Earthquake } from '../../../core/models/earhquake.model';

import { CommonModule} from '@angular/common';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-earthquake-map',
  standalone:true,
  imports: [GoogleMap,MapMarker, CommonModule, MapInfoWindow],
  templateUrl: './earthquake-map.component.html',
  styleUrl: './earthquake-map.component.scss'
})
export class EarthquakeMapComponent {
  @Input() earthquakes: Earthquake[]=[]
  @ViewChild(MapInfoWindow) infoWindow!:MapInfoWindow

  center:google.maps.LatLngLiteral = {
    lat:20,
    lng:0
  }
  zoom = 2
  selectedEarthquake: Earthquake | null =  null

  popUpInfo(marker:MapMarker,earhquake:Earthquake){
    this.selectedEarthquake = earhquake
    this.infoWindow.open(marker)
  }


}
