<template>
  <span class="c-image" data-module="image">
    <span class="c-image__loader"></span>
    <img ref="image"
         class="c-image__image"
         data-image="image"
         :data-src="src"
         :data-srcset="srcset"
         :alt="alt">
  </span>
</template>

<script lang='ts'>
  import {Component, Vue, Prop} from 'vue-property-decorator';
  import ImageLoader from '../../components/c02-image/image-loader';

  @Component
  export default class LazyImage extends Vue {
    @Prop() src!: string;
    @Prop() srcset!: string;
    @Prop() alt!: string;

    mounted() {
      const imageElement = <HTMLImageElement>this.$refs.image;
      ImageLoader.getInstance().observeImage(imageElement);
    }

    destroy() {
      const imageElement = <HTMLImageElement>this.$refs.image;
      ImageLoader.getInstance().unobserveImage(imageElement);
    }
  }
</script>
