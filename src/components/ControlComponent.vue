<template>
    <div class="control-component">
        <ButtonComponent @button-click="handleButtonClick"></ButtonComponent>
        <br>
        <SliderComponent @slider-change="handleSliderChange"></SliderComponent>
    </div>

</template>
<script>
import ButtonComponent from './ButtonComponent.vue';
import SliderComponent from './SliderComponent.vue';

export default {
    name : "ControlComponent",
    components: {
        ButtonComponent,
        SliderComponent
    },
    methods: {
        handleButtonClick(value) {
            this.$emit("update-data", value)
            // this needs to send the data to MapComponent
        },
        handleSliderChange(value) {
            this.$emit("update-color", value)
        },
        
    }
}
</script>
<style>

</style>
