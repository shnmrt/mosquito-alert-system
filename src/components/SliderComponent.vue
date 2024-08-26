<template>
    <div>
        <div class="row">
        <label for="" class="text-start">Weeks:</label>
        </div>
        <input id="small-range" type="range" min=1 max=52 value="1"
        @input="handleInputChange"
         class="form-range custom-spacing">

    </div>
</template>

<script>
export default {
    name: "SliderComponent",
    data() {
        return {
            currentValue:1
        }
    },
    methods: {
        handleInputChange(event) {
            this.currentValue = event.target.value;
            this.$emit('slider-change', this.currentValue)
        }
    }

}
</script>

<style>
   
</style>