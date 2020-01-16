import Vue from 'vue';
import Vuex from 'vuex';

const presets = [40, 100, 200, 1000, 2500, 5000];
const suggestion = 40;

const currencies = [
	{name: "US Dollar", code: "USD", symbol: "$", rate: 1},
	{name: "Euro", code: "EUR", symbol: "€", rate: 0.897597},
	{name: "British Pound", code: "GBP", symbol: "£", rate: 0.81755},
	{name: "Russian Ruble", code: "RUB", symbol: "₽", rate: 63.461993},
];


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sum: suggestion,
    presetActiveId: 0,
    currency: "USD",
    currencySymbol: "$",
    currencyRate: 1,
    currencyActiveId: 0,
    showCurrencies: false,
    presets
  },
  getters: {
    getCurrencies: () => currencies,
    getCurrencyData: state => currencies.find(it => it.code === state.currency),
  },
  mutations: {
    onPresetsClick(state, id) {
      state.presetActiveId = id;
      state.sum = state.presets[id];
    },
    onInputChange(state, value) {
      state.sum = value;
      state.presetActiveId = state.presets.findIndex(it => it == value);
    },
    onClickAppend(state) {
      state.showCurrencies = !state.showCurrencies;
    },
    onCurrencySelected(state, id) {
      state.showCurrencies = false;
      state.currencyActiveId = id;
      state.currency = currencies[id].code;
      state.currencySymbol = currencies[id].symbol;

      if(id > 0) {
        state.presets = presets.map(val => {
          val = Math.floor(val * currencies[id].rate);
          if(val <= 150) val = Math.round(val / 30) * 30;
          else if(val <= 600) val = Math.round(val / 50) * 50;
          else if(val <= 5000) val = Math.round(val / 500) * 500;
          else if(val <= 50000) val = Math.round(val / 5000) * 5000;
          else val = Math.round(val / 50000) * 50000;

          return val;
        });
      } else state.presets = presets;

      if(state.presetActiveId > -1) {
        state.sum = state.presets[state.presetActiveId];
      } else { 
        state.sum = Math.floor(state.sum * currencies[id].rate / state.currencyRate);
      }

      state.currencyRate = currencies[id].rate;
    },
  },
  actions: {
  },
  modules: {
  },
});
