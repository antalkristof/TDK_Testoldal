<script setup>
import { ref, onMounted, computed } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
  size: {
    type: String,
    default: 'medium',
    validator: value => ['small', 'medium', 'large', 'very-big'].includes(value)
  },
  navigateAd: Function
});

const ads = ref([
  { id: 1, visible: true },
//   { id: 2, visible: true },
//   { id: 3, visible: true },
//   { id: 4, visible: true },
//   { id: 5, visible: true }
]);

const closeAd = (id) => {
  const ad = ads.value.find(ad => ad.id === id);
  if (ad) {
    ad.visible = false;
  }
};

const showAds = () => {
  ads.value.forEach(ad => {
    ad.visible = true;
  });
};

onMounted(() => {
  setInterval(showAds, 15000);
});

const adClass = computed(() => {
  return {
    'ad-small': props.size === 'small',
    'ad-medium': props.size === 'medium',
    'ad-large': props.size === 'large',
    'ad-very-big': props.size === 'very-big'
  };
});
</script>

<template>
  <div class="ads-container">
    <div v-for="ad in ads" :key="ad.id" v-show="ad.visible" :class="['ad', adClass]">
      <button class="close-btn" @click="closeAd(ad.id)">X</button>
    </div>
  </div>
</template>

<style scoped>
.ads-container {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ad {
  background: white;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  background-image: url("../public/nike.jpg");
}

.ad-small {
  width: 150px;
}

.ad-medium {
  width: 200px;
  height: 600px;
}

.ad-large {
  width: 1250px;
  height: 150px;
}
.ad-very-big {
  width: 1250px;
  height: 700px;
}

.close-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 20px;
  cursor: pointer;
}
</style>