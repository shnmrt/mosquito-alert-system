<template>
  <div class="app-container">
    
    <div id="div1">
      <MapComponent
      :scope=selectedScope
      :year=selectedYear
      :week=selectedWeek
      ></MapComponent>
      <div id="div2">
        <ControlComponent
      @update-scope="handleScopeUpdate"
      @update-data="handleDataUpdate"
      @update-color="handleColorUptade"
      ></ControlComponent>
      </div>
    </div>
    <div id="div3">
      <ChartComponent></ChartComponent>
    </div>
    <div id="div4">
      <LegendComponent></LegendComponent>
    </div>
  </div>

</template>

<script>

import ControlComponent from "./components/ControlComponent.vue"
import MapComponent from "./components/MapComponent.vue"
import ChartComponent from "./components/ChartComponent.vue"
import LegendComponent from "./components/LegendComponent.vue"

export default {
  name: 'App',
  components: {
    LegendComponent,
    ControlComponent,
    MapComponent,
    ChartComponent,
  },
  data() {
    return {
      selectedYear:2018,
      selectedWeek:'1',
      selectedScope:'national'
    }
  },
  methods: {
    handleDataUpdate(value) {
      this.selectedYear = value;
    },
    handleColorUptade(value) {
      this.selectedWeek = value;
    },
    handleScopeUpdate(value) {
      this.selectedScope = value;
    },
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
  width: auto;
  height: auto;
  position: absolute;
  bottom: 10px;
  left: 10px;
  display: flex;
  background-color: rgb(230, 230, 230);
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 10px
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

#div4 {
  top: 10px;
  right: 10px;
  position: absolute;
  display: flex;
  background-color: rgb(230, 230, 230);
  align-items: center;
  justify-content: center;
  border-radius:0;
  padding: 0
}
</style>
