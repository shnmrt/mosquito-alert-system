<template>
    <div class="col">
      <!-- Loop through the buttons array to create a button for each year -->
      <div class="row">
        <label for="" class="text-start">Year:</label>      
      </div>
      <div class="col">
        <button id="button-range"
        v-for="button in buttons"
        :key="button.label"
        @click="emitValue(button.value)"
        type="button"
        class="btn btn-outline-info btn-sm me-1 custom-spacing"
      >
        {{ button.label }}
      </button>        
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ButtonComponent',
    data() {
      return {
        buttons: this.construct_buttons(),
      };
    },
    methods: {
      emitValue(value) {
        // Emit an event with the button's value when clicked
        this.$emit('button-click', value);
      },
      construct_buttons() {
        // create the buttons
        let buttons =[]
        for (let i =2018; i < 2023; i++) {
            buttons.push({'label':i, "value": i})
        }
        return buttons
      },
    },
  };
  </script>
  
  <style scoped>
  .custom-spacing{
    margin-bottom: 2px;

  }
  </style>
  