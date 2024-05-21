<template>
    <div id="mapContainer" ref="mapContainer" class="map-container"></div>
</template>

<script>
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat} from "ol/proj"; 
// vector layer
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
//styling the vector files
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import chroma from 'chroma-js';
import 'ol/ol.css';


let vectorFeatures = new VectorLayer({
    source : new VectorSource({ url:"../assets/geometry.geojson", format: new GeoJSON() }),
    style : new Style({
        fill: new Fill({ color: "rgba(255, 255, 204, 0.7)" }),
        stroke : new Stroke({ color:"#000000", width: 0.5 }),
    }),
});

export default {
    name : "MapComponent",
    props : {
        year: Number,
        week: String
    },
    mounted() {
      this.initMap(),
      this.constructData()
    },
    data () {
        return {

            color_scale: chroma.scale("YlOrRd").colors(7),


            allData: {
                selectedYear : 2018,
                selectedWeek : 'w_01'
            },
        }
    },
    methods: {
        initMap() {

            this.map = new Map({
              target: this.$refs.mapContainer,
              projection: "EPSG:4326",
              layers: [
                new TileLayer({
                  source: new OSM(),
                }),
                vectorFeatures
              ],
              view: new View({
                center: fromLonLat([12, 42.0]),
                zoom: 6,
              }),
            });
            this.map.on('singleclick', this.handleMapClick);
        },
        _deleteFirstKey(obj) {
            return Object.values(obj).slice(1,53) // data cleaning on the fly. .slice operation not really needed unless you have the right amount of data
        },
        _keyFinder(obj, key, name) {
            return obj.find((item) => item[key] == name);
        },
        
        handleMapClick(event) {
            // this function needs to handle the click events
            const pixel = this.map.getEventPixel(event.originalEvent)
            // Hit detection
            this.map.forEachFeatureAtPixel(pixel, (feature) => {
                const featureName = feature.get("NAME_1")
                this.allData.selectedRegion = featureName
                this.updateData(this.allData)
            })
        },
        reStyleFeatures(week, year) {
            let reStyle = (week) => {
                vectorFeatures.setStyle(feature => {
                    let featureValue = this.allData[year].find(item => item["NAME_1"] === feature.get("NAME_1"))[week]

                    return new Style({
                        fill : new Fill({ color: this.colorGenerator(featureValue) }),
                        stroke: new Stroke({ color: '#000000', width : 0.5})
                    })
                })
            };
            try {
                reStyle(week);
            }
            catch(err) {
                reStyle(week);
            }
        },
        colorGenerator(value) {
            const treshholds = [10, 25, 50, 100, 200, 400];

            for (let i=0; i , treshholds.length; i++) {
                if (value <= treshholds[i]) {
                    return chroma(this.color_scale[i]).alpha(0.7);
                }
            }
        },
        async constructData() {
            await this.fetchData("../assets/firstQ.json", "firstQ")
            await this.fetchData("../assets/thirdQ.json", "thirdQ")
            await this.fetchData("../assets/median.json", "median")
            await this.fetchData("../assets/2018.json", "2018")
            await this.fetchData("../assets/2019.json", "2019")
            await this.fetchData("../assets/2020.json", "2020")
            await this.fetchData("../assets/2021.json", "2021")
            await this.fetchData("../assets/2022.json", "2022")

            this.updateData(this.allData)
        },
        async fetchData (url, dataProperty) {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }
                const json = await response.json();
                this.allData[dataProperty] = json;
            } catch (e) {
                console.error("Failed to fetch or parse data:", e.message);
            }
        },
        
        updateData(newData) {
            this.$store.dispatch('updateData',newData);
        }
    },
    watch : {
        year(newYear) {
            // this reactive function updates the year and loads the relevant data
            this.reStyleFeatures(this.allData.selectedWeek, this.allData.selectedYear);
            this.allData.selectedYear = newYear
            this.updateData(this.allData)
        },
        week(newWeek) {
            // this function updates the selected week
            // and restyles the features on the map
            if (Number(newWeek) < 10) {
                this.allData.selectedWeek = 'w_0' + newWeek
            } else {
                this.allData.selectedWeek = 'w_' + newWeek
            }
            this.reStyleFeatures(this.allData.selectedWeek, this.allData.selectedYear);
            this.updateData(this.allData)

        }
    }
};
</script>

<style scoped>
.map-container {
    width: 100%;
    height: 100%;
}
</style>
