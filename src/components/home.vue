<template>
  <v-app class="grey">
    <v-content>

      <div class="box">   <!-- Space image and inner card :moon2S: -->
        <div id="bgImg">
          <v-img height="55vh" src="@/assets/space.jpg" gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)">
            <v-container fill-height fluid>
              <v-row align="center" justify="center" no-gutters>
                <v-col cols="auto" xs="4">
                  <v-card hover href="https://chrome.google.com/webstore/category/extensions">
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-btn icon href="https://chrome.google.com/webstore/category/extensions"> 
                          <v-icon>fab fa-chrome</v-icon>
                        </v-btn>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>Download WatchPls!</v-list-item-title>
                        <v-list-item-subtitle>Download the WatchPls Chrome<br/>Extension!</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-img>
        </div>

        <div id="bot">    <!-- Buttom page cards ! !! ! ! -->
          <v-container fill-height>
            <div>
              <v-row align="center" justify="center">
                <v-col v-for="(item, i) in items" :key="i" cols="12" align="center" md="4" sm="10">
                  <v-card light flat>
                    <v-list-item>
                      <v-spacer></v-spacer> <!-- HI NICK ! ! ! ! ! ! ! or Adrian :O -->
                      <v-list-item-avatar>
                        <v-icon x-large>{{item.icon}}</v-icon>
                      </v-list-item-avatar>
                      <v-spacer></v-spacer> <!-- Ben smelly -->
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title class="headline" v-text="item.title"></v-list-item-title>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-card-text v-text="item.text"></v-card-text>
                  </v-card>
                </v-col>           
              </v-row>
            </div>
          </v-container>
        </div>

        <div id="foot"> <!-- Footer..but you knew that :flushed: -->
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
        title: "Watch Please!", text: "Watch whatever with whoever! WatchPls makes it easy to be with your friends always!", icon: "fas fa-play"
      },
      {
        title: "Private Rooms!", text: "Each room has its own completely random link accessible only by you and friends! Share wisely!", icon: "fas fa-lock"
      },
      {
        title: "Share Anything!", text: "New YouTube video? Favorite Netflix episode? Maybe Hulu? Share it with others easily!", icon: "far fa-file"
      }
    ]
  })
};
</script>

