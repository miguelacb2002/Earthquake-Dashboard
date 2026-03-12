import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'

import { EarthquakeStore } from '../../../core/state/earthquake.store';

@Component({
  selector: 'app-filters',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent implements OnInit {
  minMagnitude:number | null = null
  maxMagnitude:number | null = null 
  startDate: Date | null = null 
  endDate: Date | null = null 
  tsunami=0
  location:string =''

  constructor(
    private store:EarthquakeStore
  ){}

  ngOnInit(): void {
    this.resetFilters()
  }

  applyFilters(){
    this.store.updateFilters({
      minMagnitude:this.minMagnitude,
      maxMagnitude:this.maxMagnitude,
      tsunami: this.tsunami,
      location: this.location
    })
  }
  resetFilters(){
  this.store.clearFilters()

  this.minMagnitude = null
  this.maxMagnitude = null
  this.location = ''
  this.tsunami = 0
  }
}
