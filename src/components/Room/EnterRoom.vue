<template>
    <v-container fluid>
        <v-dialog v-model="dialog" max-width="500">
            <v-card>
                <v-form v-model="formValid" @submit.prevent="guestLogin">
                <v-card-title class="headline">Choose a temporary username</v-card-title>
                <v-card-text>
                    <v-text-field
                            v-if="dialog"
                            ref="guestUsername"
                            v-model="username"
                            placeholder="Username"
                            :rules="usernameRules"
                    ></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :disabled="!formValid" color="primary" text type="submit">Join the fun</v-btn>
                </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>

        <v-row>
            <v-col cols="12">
                <v-row align="center" justify="center">
                    <h2>Choose what to do</h2>
                </v-row>
                <v-row align="center" justify="center">

                    <v-flex lg2 md4 sm6>
                        <v-hover v-slot:default="{ hover }">
                            <v-card class="ma-2 pa-2" :elevation="hover ? 12 : 2" :style="{ cursor: 'pointer'}" height="200" v-ripple>
                                <v-card-title>
                                    Sign in
                                </v-card-title>
                                <v-card-text>
                                    todo...
                                </v-card-text>
                            </v-card>
                        </v-hover>
                    </v-flex>

                    <v-flex lg2 md4 sm6>
                        <v-hover v-slot:default="{ hover }">
                            <v-card class="ma-2 pa-2" :elevation="hover ? 12 : 2" :style="{ cursor: 'pointer'}" @click="dialog = true" height="200" v-ripple>
                                <v-card-title>
                                    Continue as guest
                                </v-card-title>
                                <v-card-text>
                                    Use a temporary account to do basic features
                                </v-card-text>
                            </v-card>
                        </v-hover>
                    </v-flex>

                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
  export default {
    name: 'EnterRoom',
    data: () => ({
      dialog: false,
      formValid: false,
      username: '',
      usernameRules: [
        v => !!v || 'Username is required',
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ],
    }),
    methods: {
      guestLogin () {
        console.log('t')
        this.$emit('input', this.username)
      }
    }
  }
</script>

<style scoped>

</style>