<template>
    <div class="container">
        <p>Number of Eggs</p>
      <div 
        v-for="(value, index) in values" 
        :key="index" 
        :style="{ backgroundColor: colorgenerator(value) }" 
        class="color-box"
      >
        {{ this.labels[index] }}
      </div>
    </div>
  </template>
  
  <script>
  import chroma from 'chroma-js';
  
  export default {
    name: 'LegendComponent',
    data() {
      return {
        values: [10, 25, 50, 100, 200, 400], // Example values
        labels : ["0 - 10", "10 - 25","25 - 50","50 - 100","100 - 200", "200 - 400", "400 > "],
        colorscale: chroma.scale("YlOrRd").colors(7), // Example color scale
      };
    },
    methods: {
      colorgenerator(value) {
        const treshholds = [10, 25, 50, 100, 200, 400];
  
        for (let i = 0; i < treshholds.length; i++) {
          if (value <= treshholds[i]) {
            console.log(i, chroma(this.colorscale[i]).alpha(0.7).css())
            return chroma(this.colorscale[i]).alpha(0.7).css(); // Convert to CSS-compatible color
          }
        }
  
        return chroma(this.colorscale[this.colorscale.length - 1]).alpha(0.7).css(); // Default color if value exceeds all thresholds
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;

  }
  
  .color-box {
    margin: 0;
    padding: 0;
    width: 100px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    font-weight: bold;
  }
  </style>
  