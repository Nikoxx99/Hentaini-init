<template>
  <div>
    <h1>{{ $t('episode.comments_section_header') }}</h1>
    <script type="text/javascript">
      atOptions = {
      'key' : '88d6f96754cdc9eb0d3832cf26586f57',
      'format' : 'iframe',
      'height' : 60,
      'width' : 468,
      'params' : {}
      };
      document.write('<scr' + 'ipt type="text/javascript" src="http' + (location.protocol === 'https:' ? 's' : '') + '://www.bestdisplaycontent.com/88d6f96754cdc9eb0d3832cf26586f57/invoke.js"></scr' + 'ipt>');
    </script>
    <div class="comments">
      <Disqus shortname="hentaini" />
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>

</style>
