<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h4>Edit User</h4>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <label for="firstName">Firstname</label>
          <input type="text" v-model="model.firstname" id="firstName" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="lastName">Lastname</label>
          <input type="text" v-model="model.lastname" id="lastName" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="email">Email</label>
          <input type="text" v-model="model.email" id="email" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="password">Password</label>
          <input type="text" v-model="model.password" id="password" class="form-control" />
        </div>
        <div class="mb-3">
          <button type="button" @click="updateUser" class="btn btn-primary">Save</button>
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
  name: 'UserEdit',
  data() {
    return {
      UserID: "",
      model: {
        id: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      },
      successMessage: "",
    };
  },

  mounted() {
    this.UserID = this.$route.params.id;
    this.getCafeData(this.UserID);
  },

  methods: {
    getCafeData(UserID) {
      axios.get(`http://localhost:3300/users/${UserID}`)
        .then(res => {
          if (res.data) {
            this.model.id = res.data.id;
            this.model.firstname = res.data.firstname;
            this.model.lastname = res.data.lastname;
            this.model.email = res.data.email;
            this.model.password = res.data.password;
          }
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    },

    updateUser() {
      if (!this.UserID) {
        console.error('User ID is undefined.');
        return;
      }

      axios.put(`http://localhost:3300/users/${this.UserID}`, this.model)
        .then(res => {
          console.log('User updated successfully:', res.data);
          this.successMessage = 'User successfully updated.';
        })
        .catch(error => {
          console.error('User update error:', error);
          this.successMessage = 'Error updating user.';
        });
    },
  },
};
</script>
