<template>
    <div class="container">
      <div class="card">
        <div class="card-header">
          <h4>Edit Place</h4>
        </div>
        <div class="card-body">
          <div class="mb-3">
            <label for="cafeName">Name of Place</label>
            <input type="text" v-model="model.cafe_name" id="cafeName" class="form-control" />
          </div>
          <div class="mb-3">
            <label for="cafeLat">Latitude of Place</label>
            <input type="text" v-model="model.cafe_lat" id="cafeLat" class="form-control" />
          </div>
          <div class="mb-3">
            <label for="cafeLon">Longitude of Place</label>
            <input type="text" v-model="model.cafe_lon" id="cafeLon" class="form-control" />
          </div>
          <div class="mb-3">
            <label for="cafeDesc">Description of Place</label>
            <input type="text" v-model="model.cafe_desc" id="cafeDesc" class="form-control" />
          </div>
          <div class="mb-3">
            <button type="button" @click="updateCafe" class="btn btn-primary">Save</button>
          </div>
          
        <div v-if="successMessage" class="alert alert-success">
            {{ successMessage }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'CafeEdit',
    data() {
      return {
        CafeID: "",
        model: {
          id: "",
          cafe_name: "",
          cafe_lat: "",
          cafe_lon: "",
          cafe_desc: "",
        },
        successMessage: "",
      };
    },
  
    mounted() {
      this.CafeID = this.$route.params.id;
      this.getCafeData(this.CafeID);
    },
  
    methods: {
      getCafeData(cafeID) {
        axios.get(`http://localhost:3300/cafes/${cafeID}`)
          .then(res => {
            if (res.data) {
              this.model.id = res.data.id;
              this.model.cafe_name = res.data.cafe_name;
              this.model.cafe_lat = res.data.cafe_lat;
              this.model.cafe_lon = res.data.cafe_lon;
              this.model.cafe_desc = res.data.cafe_desc;
            }
          })
          .catch(error => {
            console.error('Error fetching cafe data:', error);
          });
      },
  
      updateCafe() {
        if (!this.CafeID) {
          console.error('Cafe ID is undefined.');
          return;
        }
  
        axios.put(`http://localhost:3300/cafes/${this.CafeID}`, this.model)
          .then(res => {
            console.log('Cafe updated successfully:', res.data);
            this.successMessage = 'Place successfully updated.';
          })
          .catch(error => {
            console.error('Cafe update error:', error);
            this.successMessage = 'Error updating cafe.';
          });
      },
    },
  };
  </script>
  