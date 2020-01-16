<template>
  <v-container
    fluid
    fill-height
  >
    <v-layout
      align-center
      justify-center
    >
      <v-flex
        xs12
        sm8
        md4
      >
        <v-card class="elevation-12">
          <v-toolbar
            color="primary"
            dark
            flat
          >
            <v-toolbar-title>Donate form</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-container grid-list-md align-center>
            <v-layout row wrap>
                <v-flex v-for="(next, i) in $store.state.presets" :key="i" xs4>
                  <v-btn
                    :color= "i == $store.state.presetActiveId ? 'primary' : 'normal'"
                    id="`btn${i}`"
                    width="100%"
                    @click="presetClick(i)"
                  >{{ next.toLocaleString('en-US', { style: 'currency', currency: $store.state.currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}</v-btn>
                </v-flex>
            </v-layout>
          </v-container>
          <v-card-text>
            <v-form
              v-on:submit.prevent="onSubmit"
            >
              <v-text-field
                v-model="$store.state.sum"
                label="sum"
                name="sum"
                type="number"
                :prefix="$store.state.currencySymbol"
                :suffix="$store.state.currency"
                :append-icon="$store.state.showCurrencies ? 'fa-angle-up' : 'fa-angle-down'"
                @change="inputChange"
                @click:append="clickAppend"
              ></v-text-field>
            </v-form>
            <v-list v-if="$store.state.showCurrencies">
              <v-list-item-group v-model="$store.state.currencyActiveId" color="primary">
                <v-list-item
                  v-for="(item, i) in $store.getters.getCurrencies"
                  :key="i"
                  :inactive="inactive"
                  @click="currencySelected(i)"
                >
                  <v-list-item-content>
                    <v-list-item-title v-html="item.name"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" id="donate" width="100%" @click="postDonate">DONATE</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const axios = require('axios');

export default {
  name: 'Donator',

  data: () => ({
    //
  }),
  methods: {
    presetClick(index) {
      this.$store.commit('onPresetsClick', index)
    },
    inputChange(value) {
      value = Math.floor(value);
      this.$store.commit('onInputChange', value);
    },
    clickAppend(event) {
      this.$store.commit('onClickAppend');
    },
    currencySelected(value) {
      this.$store.commit('onCurrencySelected', value);
    },
    postDonate() {
      axios
        .post('/donate', {
          amount: this.$store.state.sum, 
          currency: this.$store.state.currency})
        .then(function (response) {
          alert(response);
        })
        .catch(function (error) {
          alert(error);
        });
    },
  }
};
</script>
