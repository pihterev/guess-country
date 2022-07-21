'use strict';

import getMapData from './MapDataProvider';

const Highcharts = require('highcharts/highmaps');

const mapData = getMapData();

// Show loading
if (Highcharts.charts[0]) {
  Highcharts.charts[0].showLoading(
    '<i class="fa fa-spinner fa-spin fa-2x"></i>',
  );
}

if (Highcharts.charts[0]) {
  Highcharts.charts[0].showLoading(
    '<i class="fa fa-frown"></i> Карта не найдена',
  );
}

// Generate non-random data for the map
const data = mapData.objects.default.geometries.map((g, value) => ({
  key: g.properties['hc-key'],
  value,
}));

// Data labels formatter. Use shorthand codes for world and US
const formatter = function() {
  return this.point.properties && this.point.properties['hc-a2'];
};

// On point click, look for a detailed map to drill into
const onPointClick = function() {
  //todo обработка клика по стране
  console.log('onPointClick');
};

export class MapService {
  public static init = () => {
    // Instantiate chart
    Highcharts.mapChart('container-map', {
      chart: {
        map: mapData,
      },

      title: {
        text: null,
      },

      accessibility: {
        series: {
          descriptionFormat: '{series.name}, map with {series.points.length} areas.',
          pointDescriptionEnabledThreshold: 50,
        },
      },

      mapNavigation: {
        enabled: true,
        buttonOptions: {
          alignTo: 'spacingBox',
          x: 10,
        },
      },

      colorAxis: {
        min: 0,
        stops: [
          [0, '#EFEFFF'],
          [0.5, Highcharts.getOptions().colors[0]],
          [
            1,
            Highcharts.color(Highcharts.getOptions().colors[0])
              .brighten(-0.5).get(),
          ],
        ],
      },

      legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'bottom',
      },

      series: [
        {
          data,
          joinBy: ['hc-key', 'key'],
          name: 'Random data',
          states: {
            hover: {
              color: Highcharts.getOptions().colors[2],
            },
          },
          dataLabels: {
            enabled: true,
            formatter,
            style: {
              fontWeight: 100,
              fontSize: '10px',
              textOutline: 'none',
            },
          },
          point: {
            events: {
              click: onPointClick,
            },
          },
        }, {
          type: 'mapline',
          name: 'Lines',
          accessibility: {
            enabled: false,
          },
          data: Highcharts.geojson(mapData, 'mapline'),
          nullColor: '#333333',
          showInLegend: false,
          enableMouseTracking: false,
        },
      ],
    });
  }
}
