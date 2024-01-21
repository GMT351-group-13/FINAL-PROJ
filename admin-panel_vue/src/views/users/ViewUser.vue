<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h4>
          Users
          <RouterLink to="/users/add" class="btn btn-primary float-end">
            Add User
          </RouterLink>
        </h4>
      </div>
      <div class="card-body">
        <!-- New notification div for success message -->
        <div v-if="successMessage" class="alert alert-success" role="alert">
          {{ successMessage }}
        </div>
        
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="index">
              <td>{{ user.id }}</td>
              <td>{{ user.firstname }}</td>
              <td>{{ user.lastname }}</td>
              <td>{{ user.email }}</td>
              <td>
                <RouterLink :to="'users/' + user.id + '/edit'" class="btn btn-success">
                  Edit
                </RouterLink>
                <button type="button" @click="deleteUser(user.id)" class="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-if="users.length === 0">
            <tr>
              <td colspan="5">No data available or loading...</td>
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
  name: 'Users',
  data() {
    return {
      users: [],
      successMessage: "",
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      axios.get('http://localhost:3300/users').then(res => {
        this.users = res.data;
      });
    },
    deleteUser(userID) {
      axios.delete(`http://localhost:3300/users/${userID}`)
        .then(res => {
          this.successMessage = 'User successfully deleted.';
          this.getUsers();
        })
        .catch(error => {
          console.error('Error deleting user:', error);
          this.successMessage = 'Error deleting user.';
        });
    }
  }
};
</script>
