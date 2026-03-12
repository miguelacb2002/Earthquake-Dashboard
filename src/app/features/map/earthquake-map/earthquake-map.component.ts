import { Component, Input, OnInit, viewChild, ViewChild } from '@angular/core';
import { GoogleMap, MapMarker, MapInfoWindow } from '@angular/google-maps';
import { CommonModule } from '@angular/common';

import { Earthquake } from '../../../core/models/earhquake.model';
import { EarthquakeStore } from '../../../core/state/earthquake.store';

@Component({
  selector: 'app-earthquake-map',
  standalone: true,
  imports: [GoogleMap, MapMarker, MapInfoWindow, CommonModule],
  templateUrl: './earthquake-map.component.html',
  styleUrl: './earthquake-map.component.scss'
})
export class EarthquakeMapComponent implements OnInit {

  @Input() earthquakes: Earthquake[] = [];
  @ViewChild(GoogleMap) map!:GoogleMap
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  constructor(private store: EarthquakeStore) {}

  center: google.maps.LatLngLiteral = {
    lat: 20,
    lng: 0
  };

  zoom = 2;

  selectedEarthquake: Earthquake | null = null;

  ngOnInit() {

  this.store.selectedEarthquake$
    .subscribe(eq => {

      console.log("MAP RECEIVED", eq)

      if (!eq) return

      const newCenter = {
        lat: Number(eq.latitude),
        lng: Number(eq.longitude)
      }

      this.center = newCenter
      this.zoom = 6

      if (this.map?.googleMap) {
        this.map.googleMap.panTo(newCenter)
      }

    })

}

  popUpInfo(marker: MapMarker, earthquake: Earthquake) {

    this.selectedEarthquake = earthquake;

    this.store.selectEarthquake(earthquake);

    this.infoWindow.open(marker);

  }

}