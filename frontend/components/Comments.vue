<template>
  <div>
    <h1>{{ $t('episode.comments_section_header') }}</h1>
    <div class="comments">
      <Disqus shortname="hentaini" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    this.$i18n.locale = 'en'
    return {
      locale: 'en'
    }
  }
}
</script>

<style>

</style>
