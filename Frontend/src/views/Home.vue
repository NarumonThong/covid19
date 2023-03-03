<template>
  <div class="home">
    <div class="card text-center">
      <h1></h1>
      <h6>Covid Global Caese By Worldometers</h6>
      <apexchart type="bar" :options="chartOptions" :series="series"></apexchart>
    
    </div>
    
    
  </div>
</template>

<script>
import { mapState } from "vuex";
import Axios from "axios";
export default {
  data() {
    return {
      chartOptions: {
          chart: {
            id: 'vuechart-example',
          },
          xaxis: {
            categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
                'United States', 'China', 'India'
              ],
          },
          plotOptions: {
              bar: {
                barHeight: '100%',
                distributed: true,
                horizontal: true,
                dataLabels: {
                  position: 'bottom'
                },
              }
          },
          // colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
          //     '#f48024', '#69d2e7'
          //   ],

          dataLabels: {
              enabled: true,
              textAnchor: 'start',
              style: {
                colors: ['#000'],
                fontSize: '8px',
                fontWeight: 300
                
              },
              formatter: function (val, opt) {
                return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
              },
              offsetX: 0,
              dropShadow: {
                enabled: true
              }
        },
      },
      series: [{
          name: 'cases',
          data: [100, 500, 1000, 1500, 2000, 3000, 4000, 5000]
      }]
    }
  },
  mounted() {
    this.initialLoadItem();
  },
  methods: {
    initialLoadItem() {
      Axios.get(`/api/covid`)
        .then(response => {

          this.series = [{
            data: response.data.map(
              function(index) {
                return index.cases
              }
            )
          }]
          this.chartOptions = {
            xaxis: {
              categories: response.data.map(
                function(index) {
                  return index.state
                }
              )
            }
          }

          // this.$refs.radar.updateSeries([{
          //       name: 'Series 1',
          //       data: [your_new_data_here] //ie [1,2,3,4]
          // }])

          // this.$refs.radar.updateOptions({
          //       xaxis: {
          //         categories: [your_new_categories_here] //ie ["a","b","c","d"]
          //       }
          // })
          // this.xaxis = [{
          //   categories: response.data.map(
          //     function(index) {
          //       return index.cases
          //     }
          //   )
          // }],
          // this.series = [{
          //   data: response.data.map(
          //     function(index) {
          //       return index.cases
          //     }
          //   )
          // }]
          // console.log('AAA', )
          console.log(response.data.map(
            function(index) {
              return index.state
            }
          )),
          console.log(response.data.map(
            function(index) {
              return index.cases
            }
          ))
        })
        .catch(err => {
          this.alertify.error(err.response.data.message);
        });
    }
  },
};
</script>
