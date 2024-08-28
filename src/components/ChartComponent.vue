
<template>
  <div ref="plotContainer" style="width: 100%; height: 100%;"></div>
</template>

<script>
  import Plotly from 'plotly.js-dist-min';
  import { mapState } from 'vuex';

  export default {
    data () {
      return {
        weeks: Array.from({length: 52}, (_, index) => index + 1),
      }
    },
    computed: {
      ...mapState({
        plotData: state => state.sharedData
      })
    },
    mounted() {
      this.renderEmpty()
    },
    watch: {
      plotData: {
        handler(newData) {
          this.generateChart(newData)
        },
        immediate: true,
        deep: true
      }
    },
    methods: {
      renderEmpty() {
        Plotly.newPlot(this.$refs.plotContainer, [{x:[], y:[]}], {} )
      },
      parseObject(obj, key) {
        let query = obj['scope'][obj.selectedScope][key].find((item) => item["NAME_1"] == obj.selectedRegion)
        return Object.values(query).slice(1,53)
      },
      generateChart(data) {
        let prefix = ""
        if (data.selectedScope === 'regional') {
          prefix = 'Province of '
        }
        if (data.selectedRegion !== undefined) {
          try {
            
            let year = data.selectedYear;
            let region = prefix + data.selectedRegion;
            let layout = {
              title : region + ' in ' + String(year),
              xaxis : { title : 'Week', range :[1,52]},
              yaxis : { title : 'Number of eggs', range : [0,400]},
              showlegend : true
  
            };
            let chartdata = [
              {
                x : this.weeks,
                y : this.parseObject(data, data.selectedYear),
                type : 'scatter',
                name : data.selectedYear,
                hoverinfo : "y",
                line : { color : 'gray'},
              },
              {
                x : this.weeks,
                y : this.parseObject(data, 'median'),
                type : 'scatter',
                name : 'median',
                hoverinfo : 'y',
                line : { color : 'blue', dash : 'dash' }
              },
              {
                x : [data.week, data.week],
                y : [0, 400],
                type : "scatter",
                name : "week",
                hoverinfo : 'x',
                line : { color : 'red'},
              }
            ]
            Plotly.newPlot(
              this.$refs.plotContainer,
              chartdata,
              layout
            )
          } catch (e) {
            this.renderEmpty()
          }
        }
      },
    },
  };
</script>

<style>

</style>