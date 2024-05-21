<template>
  <div class="app-container">
    
    <div id="div1">
      <MapComponent
      :year=selectedYear
      :week=selectedWeek
      ></MapComponent>
      <div id="div2">
        <ControlComponent
      @update-data="handleDataUpdate"
      @update-color="handleColorUptade"
      ></ControlComponent>
      </div>
    </div>
    <div id="div3">
      <ChartComponent></ChartComponent>
    </div>
  </div>

</template>

<script>

import ControlComponent from "./components/ControlComponent.vue"
import MapComponent from "./components/MapComponent.vue"
import ChartComponent from "./components/ChartComponent.vue"

export default {
  name: 'App',
  components: {
    ControlComponent,
    MapComponent,
    ChartComponent,
  },
  data() {
    return {
      selectedYear:2018,
      selectedWeek:'1'
    }
  },
  methods: {
    handleDataUpdate(value) {
      this.selectedYear = value;
    },
    handleColorUptade(value) {
      this.selectedWeek = value;
    }
  }
  
}
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}
.app-container {
  width: 100%;
  height: 100vh;
  
  position: relative;
}
#div1 {
  width: 100%;
  height: 70%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

#div2 {
  margin: 0 auto;
  width: 15%;
  height: 25%;
  position: absolute;
  bottom: 10px;
  left: 10px;
  display: flex;
  background-color: white;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}

#div3 {
  width: 100%;
  height: 30%;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;

}
</style>
