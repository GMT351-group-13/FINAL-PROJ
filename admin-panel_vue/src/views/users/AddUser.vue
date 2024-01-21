<template>
    <div class="container">
      <div class="card">
        <div class="card-header">
          <h4>Add User</h4>
        </div>
        <div class="card-body">
          <div class="mb-3">
            <label for="firstname">Firstname</label>
            <input type="text" v-model="model.firstname" class="form-control" />
          </div>
          <div class="mb-3">
            <label for="lastname">Lastname</label>
            <input type="text" v-model="model.lastname" class="form-control" />
          </div>
          <div class="mb-3">
            <label for="email">Email</label>
            <input type="text" v-model="model.email" class="form-control" />
          </div>
          <div class="mb-3">
            <label for="password">Password</label>
            <input type="text" v-model="model.password" class="form-control" />
          </div>
          <div class="mb-3">
            <button type="button" @click="saveUsers" class="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'UserAdd',
    data() {
      return {
        model: {
          id: "",
          firstname: "",
          lastname: "",
          email: "",
          password: "",
        }
      }
    },
    methods: {
      saveUsers() {
        axios.post('http://localhost:3300/users', this.model)
          .then(res => {
            console.log(res.data);
            this.model = {
              id: "",
              firstname: "",
              lastname: "",
              email: "",
              password: "",
            };
          })
          .catch(error => {
            console.error('User add error:', error);
          });
      }
    }
  }
  </script>
  