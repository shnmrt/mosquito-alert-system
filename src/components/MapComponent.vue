<template>
    <div id="mapContainer" ref="mapContainer" class="map-container"></div>
</template>

<script>
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat, toLonLat} from "ol/proj";

// vector layer
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Icon from 'ol/style/Icon';
// import Text from 'ol/style/Text';

//styling the vector files
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import chroma from 'chroma-js';
import 'ol/ol.css';


export default {
    name : "MapComponent",
    props : {
        year: Number,
        week: String,
        scope: String,
    },
    mounted() {
      this.initMap('national'),
      this.constructData('national')
      this.constructData('regional')
    },
    data () {
        return {
            color_scale: chroma.scale("YlOrRd").colors(7),
            vectors : {
                "national" : this.vectorGenerator('national'),
                "regional" : this.vectorGenerator('regional')
            },
            allData: {
                week: 1,
                selectedYear : 2018,
                selectedWeek : 'w_01',
                selectedScope: 'national',
                scope: {
                    'national' : {},
                    'regional' : {}
                }
            },
        }
    },
    methods: {
        initMap(scope) {
            this.map = new Map({
              target: this.$refs.mapContainer,
              projection: "EPSG:4326",
              layers: [
                new TileLayer({
                  source: new OSM(),
                }),
                // vectorFeatures,
                this.vectorGenerator(scope)
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
        vectorGenerator(scope) {
            return new VectorLayer({
                source : new VectorSource({ url:"./assets/"+scope+"/geometry.geojson", format: new GeoJSON() }),
                style : new Style({
                    fill: new Fill({ color: "rgba(255, 255, 204, 0.7)" }),
                    stroke : new Stroke({ color:"#000000", width: 0.5 }),
                }),
            });
        },
        iconEmplacement(markerposition) {
            let layers = this.map.getLayers().getArray()
            if (layers.length > 2) {
                let lastlayer = layers[layers.length-1]
                this.map.removeLayer(lastlayer)
                this.map.getLayers().getArray()[layers.length-1].getSource().changed()
            }
            let place = new Feature({
                geometry: new Point(fromLonLat(markerposition))
            })
            place.setStyle(
                new Style({
                    image: new Icon({
                        color:'#000000',
                        crossOrigin: '',
                        src: 'assets/icon.svg',
                        scale: 1
                    })
                })
            )
            const vec_layer = new VectorLayer({
                source: new VectorSource({
                    features: [place]
                })
            })
            this.map.addLayer(vec_layer)
            
        },
        handleMapClick(event) {
            // this function needs to handle the click events
            const pixel = this.map.getEventPixel(event.originalEvent)
            // Hit detection
            let markerPosition = toLonLat(event.coordinate)
            this.iconEmplacement(markerPosition)

            this.map.forEachFeatureAtPixel(pixel, (feature) => {
                const featureName = feature.get("NAME_1")
                this.allData.selectedRegion = featureName
                this.updateData(this.allData)
            })
        },
        reStyleFeatures(week, year) {
            let reStyle = (week) => {
                let vectorFeatures = this.map.getLayers().getArray()[1]
                vectorFeatures.setStyle(feature => {
                    let featureValue = this.allData['scope'][this.allData.selectedScope][year].find(item => item["NAME_1"] === feature.get("NAME_1"))[week]

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
        async constructData(scope) {

            await this.fetchData("./assets/"+scope+"/firstQ.json", "firstQ", scope)
            await this.fetchData("./assets/"+scope+"/thirdQ.json", "thirdQ", scope)
            await this.fetchData("./assets/"+scope+"/median.json", "median", scope)
            await this.fetchData("./assets/"+scope+"/2018.json", "2018", scope)
            await this.fetchData("./assets/"+scope+"/2019.json", "2019", scope)
            await this.fetchData("./assets/"+scope+"/2020.json", "2020", scope)
            await this.fetchData("./assets/"+scope+"/2021.json", "2021", scope)
            await this.fetchData("./assets/"+scope+"/2022.json", "2022", scope)

            this.updateData(this.allData)
        },
        async fetchData (url, dataProperty, scope) {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }
                const json = await response.json();
                this.allData['scope'][scope][dataProperty] = json;
            } catch (e) {
                console.error("Failed to fetch or parse data:", e.message);
            }
        },
        replaceLayer(scope) {
            let layers = this.map.getLayers().getArray()
            let len_layers = layers.length
            while (len_layers > 1) {
                len_layers--
                this.map.removeLayer(layers[len_layers])
            }
            let newLayer = this.vectors[scope]
            this.map.addLayer(newLayer)
            this.map.getLayers().getArray()[1].getSource().changed()

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
            this.allData.week = newWeek
            this.reStyleFeatures(this.allData.selectedWeek, this.allData.selectedYear);
            this.updateData(this.allData)
        },
        scope(newScope) {
            this.replaceLayer(newScope)
            this.allData.selectedScope = newScope
            this.allData.selectedRegion = null
            this.updateData(this.allData)
            this.reStyleFeatures(this.allData.selectedWeek, this.allData.selectedYear);
            
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
