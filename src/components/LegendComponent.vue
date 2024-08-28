<template>
    <div class="container">
        <p class="legendtitle">Number of<br>Mosquito<br>Eggs</p>
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
            return chroma(this.colorscale[i]).alpha(0.7).css();
          }
        }
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
  .legendtitle {
    font-size: 14px;
    font-weight: bold;
    font-family: 'Courier New', Courier, monospace;
    margin-bottom: 5px;
  }
  .color-box {
    margin: 0;
    padding: 0;
    width: 75px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    font-weight: bold;
    font-size: 14px;
  }
  </style>
  