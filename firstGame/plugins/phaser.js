import { defineCustomElements as defineIonPhaser } from '@ion-phaser/core/loader';
import Vue from 'vue';
 
Vue.config.productionTip = false;
Vue.config.ignoredElements = [/ion-\w*/];
 
defineIonPhaser(window);