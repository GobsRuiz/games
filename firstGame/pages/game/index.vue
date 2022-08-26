<template>
  <div>
    <ion-phaser
      v-bind:game.prop='game'
      v-bind:initialize.prop='initialize'
    />
  </div>
</template>

<script>
import Phaser from "phaser";
import Start from '~/resources/scenes/start.js';

export default {
    name: "PageGame",
    data() {
    return {
      initialize: false,
      game: {
        width: 800,
        height: 600,
        type: Phaser.AUTO,
        physics: {
            default: 'arcade',
            arcade: {
              gravity: {y: 300},
              debug: true
            }
        },
        scene: [Start]
      }
    };
  },
  created() {
    this.initialize = true;
  },
  methods: {
    initializeGame() {
      this.initialize = true;
    }
  }
}
</script>

<style>

</style>
