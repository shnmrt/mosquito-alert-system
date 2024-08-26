<template>
    <div class="control-component">
        <ScopeComponent @scope-changed="handleScopeChange"></ScopeComponent>
        <ButtonComponent @button-click="handleButtonClick"></ButtonComponent>
        <br>
        <SliderComponent @slider-change="handleSliderChange"></SliderComponent>
    </div>

</template>
<script>
import ButtonComponent from './ButtonComponent.vue';
import SliderComponent from './SliderComponent.vue';
import ScopeComponent from './ScopeComponent.vue';

export default {
    name : "ControlComponent",
    components: {
        ButtonComponent,
        SliderComponent,
        ScopeComponent
    },
    methods: {
        handleButtonClick(value) {
            this.$emit("update-data", value)
            // this needs to send the data to MapComponent
        },
        handleSliderChange(value) {
            this.$emit("update-color", value)
        },
        handleScopeChange(value) {
            this.$emit("update-scope", value)
        }
    }
}
</script>
<style>

</style>
