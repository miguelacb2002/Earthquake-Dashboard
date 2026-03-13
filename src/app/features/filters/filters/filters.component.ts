import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'

import { NgxSliderModule, Options } from '@angular-slider/ngx-slider'

import { EarthquakeStore } from '../../../core/state/earthquake.store'

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxSliderModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent implements OnInit {

  
  minMagnitude: number = 0
  maxMagnitude: number = 10

  sliderOptions: Options = {
    floor: 0,
    ceil: 10,
    step: 1,
    showTicks: false,
    showTicksValues: false
  }

  startDate: Date | null = null
  endDate: Date | null = null
  tsunami = 0
  location: string = ''

  private hasLoadedData = false
  private filterApplied = false

  constructor(
    private store: EarthquakeStore,
    private toast: ToastrService
  ) {

    this.store.filteredEarthquakes$
      .subscribe(data => {

       
        if (!this.hasLoadedData) {

          if (data.length > 0) {
            this.hasLoadedData = true
          }

          return
        }

        
        if (this.filterApplied && data.length === 0) {

          this.toast.warning(
            'No earthquakes match the selected filters',
            'No Results'
          )

          this.filterApplied = false
        }

      })

  }

  ngOnInit(): void {
    this.resetFilters()
  }

  applyFilters() {

    this.filterApplied = true

    this.store.updateFilters({
      minMagnitude: this.minMagnitude,
      maxMagnitude: this.maxMagnitude,
      tsunami: this.tsunami,
      location: this.location
    })

  }

  resetFilters() {

    this.store.clearFilters()

    this.minMagnitude = 0
    this.maxMagnitude = 10
    this.location = ''
    this.tsunami = 0

    this.filterApplied = false

  }

}