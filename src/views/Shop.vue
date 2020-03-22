<template>
  <layout-default>
    <v-content>
      <v-container class="py-1 px-5 panel" fluid>
        <v-row class="fill-height flex-lg-row-reverse" align="start">
          <v-col lg="3">
            <v-card class="px-3" :elevation="6">
              <v-container class="payment-panel">
                <div v-if="cartList.length == 0" class="payment-panel__img">
                  <v-img src="@/assets/image/shiba-cal.png"> </v-img>
                </div>
                <div v-else class="item-list">
                  <v-row>
                    <v-col
                      v-for="(item, index) in cartList"
                      :key="item.book.id"
                      cols="12"
                      outlined
                    >
                      <v-container>
                        <v-row>
                          <b>{{ item.book.title }}</b>
                        </v-row>
                        <v-row class="d-flex justify-space-between">
                          <div>
                            <v-btn
                              icon
                              color="pink"
                              @click="editItem(index, item.book, 'delete')"
                            >
                              <v-icon>mdi-minus</v-icon>
                            </v-btn>
                            <span class="pa-3 font-weight-bold">
                              {{ item.total }}
                            </span>
                            <v-btn
                              icon
                              color="green"
                              @click="editItem(index, item.book, 'add')"
                            >
                              <v-icon>mdi-plus</v-icon>
                            </v-btn>
                          </div>
                          <b>{{ (item.book.price * item.total) | bath }}</b>
                        </v-row>
                      </v-container>
                      <v-divider></v-divider>
                    </v-col>
                  </v-row>
                </div>
                <v-row>
                  <v-col cols="12">
                    <v-row>
                      <v-col class="d-flex justify-space-between" cols="12">
                        <b>Total</b>
                        <b class="black--text">{{ total.toString() | bath }}</b>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col class="d-flex justify-space-between" cols="12">
                        <b>Discount</b>
                        <b class="red--text">{{
                          discount.toString() | bath
                        }}</b>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col class="d-flex justify-space-between" cols="12">
                        <b>Net</b>
                        <b class="green--text">{{ net.toString() | bath }}</b>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6">
                        <div class="my-2">
                          <v-btn
                            :disabled="cartList.length == 0"
                            width="100%"
                            color="red white--text"
                            @click.stop="reset"
                            >Reset</v-btn
                          >
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="my-2">
                          <v-btn
                            :disabled="cartList.length == 0"
                            width="100%"
                            color="success"
                            @click.stop="dialog = true"
                            >Payment</v-btn
                          >
                        </div>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
          <v-col class="item-panel" cols="12" lg="9">
            <v-card class="pa-2 v-card-main" :elevation="6">
              <v-row v-if="success" class="overflow-auto" no-gutters>
                <v-col
                  v-for="book in bookLists"
                  :key="book.id"
                  cols="4"
                  lg="2"
                  md="3"
                  sm="4"
                >
                  <v-card class="fill-height" tile>
                    <v-container>
                      <v-img :src="book.cover"></v-img>
                    </v-container>

                    <v-card-title class="subtitle-2">
                      {{ book.title }}
                    </v-card-title>

                    <div class="d-flex justify-space-between">
                      <v-card-subtitle>
                        {{ book.price | bath }}
                      </v-card-subtitle>
                      <v-card-actions>
                        <v-btn @click="addToCart(book)" icon color="green">
                          <v-icon>mdi-cart</v-icon>
                        </v-btn>
                      </v-card-actions>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
              <v-container v-else fill-height fluid>
                <v-row align="center" justify="center">
                  <v-col class="d-flex flex-column align-center">
                    <v-img src="@/assets/image/shiba-error.png"> </v-img>
                    <h1>Connection error. Please try again...</h1>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-form ref="form">
            <v-card>
              <v-card-title>
                <span class="headline">Payment</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        label="Total"
                        :value="total.toString() | bath"
                        readonly
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        label="Discount"
                        :value="discount.toString() | bath"
                        readonly
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        label="Net"
                        type="text"
                        readonly
                        :value="net.toString() | bath"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        label="Paid"
                        type="number"
                        min="1"
                        v-model="paid"
                        :rules="paidRules"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="dialog = false"
                  >Close</v-btn
                >
                <v-btn color="green darken-1" text @click="onPayment"
                  >Payment</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
        <v-dialog v-model="success_dialog" max-width="300">
          <v-card>
            <v-card-title class="headline">Payment Successfully</v-card-title>

            <v-card-text>
              <v-container class="text-center">
                <v-img src="@/assets/image/shiba-cal.png"> </v-img>
                <b>Change :</b> {{ change.toString() | bath }}
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                text
                @click="
                  success_dialog = false;
                  change = 0;
                "
              >
                ok
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-content>
  </layout-default>
</template>

<script>
import axios from "axios";
import LayoutDefault from "@/layouts/LayoutDefault.vue";
export default {
  components: {
    LayoutDefault
  },
  filters: {
    bath(value) {
      if (!value) return "";
      value = value.toString();
      return `฿ ${value}`;
    }
  },
  data() {
    return {
      url: process.env.VUE_APP_API_URL,
      success: true,
      bookLists: [],
      cartList: [],
      dialog: false,
      uniqueBook: [],
      paid: 0,
      change: 0,
      paidRules: [
        v => !!v || "Paid is required",
        v => {
          if (v < 0) {
            return "Paid must be more than 0";
          } else {
            return true;
          }
        },
        v => {
          if (v < this.net) {
            return "Not enough money";
          } else {
            return true;
          }
        }
      ],
      success_dialog: false
    };
  },
  mounted() {
    this.initData();
  },
  computed: {
    total() {
      let total = 0;
      this.cartList.forEach(element => {
        total += element.book.price * element.total;
      });
      return total;
    },
    discount() {
      let discount = 0;
      this.uniqueBook.forEach(element => {
        let sum = 0;
        if (element.length > 1) {
          element.forEach(objBook => {
            sum += +objBook.price;
          });
          sum = sum * ((10 + (element.length - 2)) / 100);
        }
        discount += sum;
      });

      return discount;
    },
    net() {
      let net = 0;
      this.cartList.forEach(element => {
        net += element.book.price * element.total;
      });
      return net - this.discount;
    }
  },
  methods: {
    initData() {
      axios
        .get(this.url)
        .then(res => {
          this.success = true;
          this.bookLists = [...res.data.books];
        })
        .catch(err => {
          console.log(err);
          this.success = false;
        });
    },
    addToCart(book) {
      if (this.cartList.length > 0) {
        let found = this.cartList.find(element => {
          return element.book === book;
        });
        if (found) {
          found.total++;
        } else {
          this.cartList.push({
            book: book,
            total: 1
          });
        }
      } else {
        this.cartList.push({
          book: book,
          total: 1
        });
      }
      this.manageUniqueBook(book);
    },
    manageUniqueBook(book, action = "add") {
      if (action == "add") {
        if (this.uniqueBook.length > 0) {
          this.uniqueBook.every((element, index) => {
            let found = element.find(objBook => {
              return objBook == book;
            });
            if (!found) {
              this.uniqueBook[index].push(book);
              return false;
            } else {
              if (!this.uniqueBook[index + 1]) {
                this.uniqueBook.push([book]);
                return false;
              } else {
                return true;
              }
            }
          });
        } else {
          this.uniqueBook.push([book]);
        }
      } else {
        this.uniqueBook.every((element, index) => {
          element.forEach((objBook, objBookIndex) => {
            if (objBook == book) {
              this.uniqueBook[index].splice(objBookIndex, 1);
            }
          });
        });
      }
    },
    editItem(index, book, action) {
      if (action === "add") {
        this.cartList[index].total++;
        this.manageUniqueBook(book);
      } else if (action === "delete") {
        this.cartList[index].total--;
        this.manageUniqueBook(book, action);
        if (this.cartList[index].total <= 0) this.cartList.splice(index, 1);
      }
    },
    reset() {
      this.cartList = [];
    },
    onPayment() {
      if (this.$refs.form.validate()) {
        this.dialog = false;
        this.success_dialog = true;
        this.change = this.paid - this.net;
        this.reset();
        this.$refs.form.reset();
        this.$refs.form.resetValidation();
      }
    }
  }
};
</script>

<style lang="scss">
.v-card {
  border: 1px solid #eee !important;
  box-shadow: none !important;
  &__title {
    &.subtitle-2 {
      font-weight: 700 !important;
    }
  }
  &__subtitle {
    color: #000 !important;
    font-weight: 700 !important;
  }
}

.item-panel {
  .v-card.v-card-main {
    height: 90vh;
    overflow: auto;
  }

  .v-card {
    border: none !important;
  }
}

.payment-panel {
  &__img {
    height: 100%;
    width: 100%;
  }
}
</style>
