var appLightbox = Vue.component('appLightbox', {
  template: "<div id='overlay' @click='close'>" +
    "<div class='spinner' v-if='loading'></div> " +
    "<img :src='imgsource.largeImageURL' alt='' @load='imageLoadedIn' />" +
    "<div class='img-info'>" +
    "<span id='views-count'>Views:&nbsp;{{imgsource.views}}</span>" +
    "<span id='likes-count'>Likes:&nbsp;{{imgsource.likes}}</span>" +

    "</div>" +
    "</div>",
  data: {
    isLoadingIn: false
  },
  props: {
    imgsource: Object,
    close: Function,
    loading: Boolean,
  },
  mounted: function() {
    var overlay = document.getElementById('overlay');
    overlay.setAttribute('style', 'height:' + window.innerHeight + 'px; ' + 'width:' + window.innerWidth + 'px');
    console.log(window.innerWidth);
  },
  methods: {
    imageLoadedIn() {
      // this.loading = false;
      console.log('image loaded', this.loading)
      this.loading = false;
      console.log('image loaded flag', this.loading)
      //  this.$emit('imageLoadedIn');
    }
  }
});

var app = new Vue({
  el: '#app',
  components: {
    appLightbox: appLightbox
  },
  data: {
    images: [],

    currentPic: '',
    lightBoxToggle: false,
    currentLargeImage: null,
    isLoading: null,
  },
  mounted: function() {
    this.fetchImages();
  },

  methods: {
    preloadImage(imageUrl) { //delete in final version
      const image = new Image();
      image.src = imageUrl;
      // console.log('image.src:', image.src)
    },
    imageLoaded() {
      this.loading = false;
      console.log('image loaded in App')
    },
    async fetchImages() {
      const apiKey = '43706222-6aa3d0c612126fbf555457df6'; // Replace with your       
      const url = `https://pixabay.com/api/?key=${apiKey}&q=nature&image_type=photo`;
      const response = await fetch(url);
      const data = await response.json();
      this.images = data.hits;
    },
    openBox: function(d) {
      console.log('on-open', d, d.previewURL)
      this.currentPic = d;
      this.lightBoxToggle = !this.lightBoxToggle;
      this.isLoading = true;
    },
    closeBox: function() {
      this.lightBoxToggle = false;
    }
  },
});
