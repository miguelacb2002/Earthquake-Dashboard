import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'

import { EarthquakeStore } from '../../../core/state/earthquake.store';
import { filter } from 'rxjs';

@Component({
  selector: 'app-filters',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {
  minMagnitude:number | null = null
  maxMagnitude:number | null = null 
  startDate: Date | null = null 
  endDate: Date | null = null 
  tsunami=0
  location:string =''

  constructor(
    private store:EarthquakeStore
  ){}

  applyFilters(){
    this.store.updateFilters({
      minMagnitude:this.minMagnitude,
      maxMagnitude:this.maxMagnitude,
      tsunami: this.tsunami,
      location: this.location
    })
  }
}
