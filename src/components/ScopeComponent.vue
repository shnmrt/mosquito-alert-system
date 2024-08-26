<template>
    <div>
      <div class="d-flex">
        <!-- Radio button for National -->
      <div class="form-check custom-spacing">
        <input
          class="form-check-input"
          type="radio"
          id="national"
          value="national"
          v-model="selectedScope"
          @change="emitScope"
        />
        <label class="form-check-label" for="national">
          National
        </label>
      </div>
  
      <!-- Radio button for Regional -->
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          id="regional"
          value="regional"
          v-model="selectedScope"
          @change="emitScope"
        />
        <label class="form-check-label" for="regional">
          Regional
        </label>
      </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ScopeComponent",
    data() {
      return {
        selectedScope: "national", // Default value
      };
    },
    methods: {
      emitScope() {
        this.$emit("scope-changed", this.selectedScope);
      },
    },
  };
  </script>
  
  <style scoped>
  .custom-spacing {
    margin-right: 10px;
    margin-left: 30px
  }
  </style>
  