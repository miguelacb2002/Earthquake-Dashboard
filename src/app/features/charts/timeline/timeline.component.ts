import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { NgApexchartsModule } from 'ng-apexcharts'
import { CommonModule } from '@angular/common'

import { Earthquake } from '../../../core/models/earhquake.model'
import { EarthquakeStore } from '../../../core/state/earthquake.store'

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [NgApexchartsModule, CommonModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements OnInit, OnChanges {

  @Input() earthquakes: Earthquake[] = []

  chartOptions: any
  selectedIndex: number | null = null

  private selectedEq: Earthquake | null = null

  constructor(private store: EarthquakeStore) {}

  ngOnInit() {

    this.store.selectedEarthquake$.subscribe(eq => {

      this.selectedEq = eq

      if (!eq || !this.earthquakes.length) return

      this.selectedIndex = this.earthquakes.findIndex(e => e.id === eq.id)

      this.updateChart()

    })

  }

  ngOnChanges(changes: SimpleChanges) {

    // caso filtro sin resultados
    if (!this.earthquakes.length) {

      this.selectedIndex = null

      this.chartOptions = {
        series: []
      }

      return
    }

    if (this.selectedEq) {

      this.selectedIndex = this.earthquakes.findIndex(
        e => e.id === this.selectedEq!.id
      )

    }

    this.updateChart()

  }

  updateChart() {

    const data = this.earthquakes.map(eq => ({
      x: new Date(eq.time),
      y: eq.magnitude
    }))

    this.chartOptions = {

      series: [
        {
          name: 'Earthquake Magnitude',
          data
        }
      ],

      chart: {
        type: 'scatter',
        height: 350,
        zoom: { enabled: true },

        events: {
          markerClick: (event: any, chartContext: any, config: any) => {

            const index = config.dataPointIndex
            const eq = this.earthquakes[index]

            if (eq) {
              this.store.selectEarthquake(eq)
            }

          }
        }
      },

      markers: {
        size: 4,
        discrete: this.selectedIndex !== null ? [
          {
            seriesIndex: 0,
            dataPointIndex: this.selectedIndex,
            fillColor: '#ff0000',
            strokeColor: '#000',
            size: 8
          }
        ] : []
      },

      xaxis: {
        type: 'datetime',
        title: { text: 'Time' }
      },

      yaxis: {
        title: { text: 'Magnitude' }
      },

      tooltip: {
        x: { format: 'dd MMM HH:mm' }
      }

    }

  }

}