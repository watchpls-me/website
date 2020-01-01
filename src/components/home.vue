<template>
  <v-app class="grey">
    <v-content>
      <div class="box">
        <div id="bgImg">
          <v-img height="55vh" src="@/assets/space.jpg" gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)">
            <v-container fluid fill-height>
              <v-row align="center" justify="center">
                <v-card hover max-width="400px" max-height="120px">
                  <v-list-item>
                    <v-list-item-avatar>
                      <v-btn icon href="https://chrome.google.com/webstore/category/extensions"> 
                        <v-icon>fab fa-chrome</v-icon>
                      </v-btn>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>Download WatchPls!</v-list-item-title>
                      <v-list-item-subtitle>Download the WatchPls Chrome Extension<br /> to get started!</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-row>
            </v-container>
          </v-img>
        </div>
        <div id="bot">
          <v-container fluid fill-height>
            <v-row align="center" justify="center">
              <v-col v-for="(item, i) in items" :key="i" cols="3">
                <v-card hover>
                  <v-card-title class="text-center" v-text="item.title"></v-card-title>
                  <v-card-text v-text="item.text"></v-card-text>
                </v-card>
              </v-col>           
            </v-row>
          </v-container>
        </div>
        <div id="foot">
          <v-footer>
          <v-btn text icon href="https://chrome.google.com/webstore/category/extensions"><v-icon left>fab fa-chrome</v-icon></v-btn>
          <v-spacer></v-spacer>
          <div id="copyright">&copy;2019 — <strong>WatchPls</strong></div>
        </v-footer>
        </div>
      </div>
    </v-content>
  </v-app>
</template>

<style>
  html { overflow-y: auto }
  
  .box {
    display: flex;
    flex-flow: column;
    height: 100%;
  }

  #bgImg {
    flex: 0 1 auto;
  }

  #bot {
    flex: 1 1 auto;
    background: white;
  }

  #foot {
    flex: 0 1 10px;
  }
</style>

<script>
export default {
  name: 'home',
  data: () => ({
    items: [
      {
        title: "Watch with Friends!", text: "Watch whatever with whoever! WatchPls makes it easy to be with your friends always!"
      },
      {
        title: "Private Rooms!", text: "No randoms interrupting your alone time. Each room is only accesible by who you want to!"
      },
      {
        title: "Share anything!", text: "The only limitation on what you can share is your own imgaination! And the law of course."
      }
    ]
  })
};
</script>

