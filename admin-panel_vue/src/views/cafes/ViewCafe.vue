<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h4>
          Places
          <RouterLink to="/cafes/add" class="btn btn-primary float-end">
            Add Place
          </RouterLink>
        </h4>
      </div>
      <div class="card-body">
        <!-- Yeni eklenen bildirim div -->
        <div v-if="successMessage" class="alert alert-success" role="alert">
          {{ successMessage }}
        </div>
        
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cafe, index) in cafes" :key="index">
              <td>{{ cafe.id }}</td>
              <td>{{ cafe.cafe_name }}</td>
              <td>{{ cafe.cafe_lat }}</td>
              <td>{{ cafe.cafe_lon }}</td>
              <td>{{ cafe.cafe_desc }}</td>
              <td>
                <RouterLink :to="'cafes/' + cafe.id + '/edit'" class="btn btn-success">
                  Edit
                </RouterLink>
                <button type="button" @click="deleteCafe(cafe.id)" class="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-if="cafes.length === 0">
            <tr>
              <td colspan="6">No data available or loading...</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Cafes',
  data() {
    return {
      cafes: [],
      successMessage: "",
    };
  },
  mounted() {
    this.getCafes();
  },
  methods: {
    getCafes() {
      axios.get('http://localhost:3300/cafes').then(res => {
        this.cafes = res.data;
      });
    },
    deleteCafe(cafeID) {
      axios.delete(`http://localhost:3300/cafes/${cafeID}`)
        .then(res => {
          this.successMessage = 'Cafe successfully deleted.';
          this.getCafes();
        })
        .catch(error => {
          console.error('Error deleting cafe:', error);
          this.successMessage = 'Error deleting cafe.';
        });
    }
  }
};
</script>
