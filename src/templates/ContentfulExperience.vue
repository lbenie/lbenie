<template>
  <Layout>
    <div class="container-inner mx-auto my-16">
      <h1 class="text-4xl font-bold leading-tight mb-4">
        {{ $page.experience.title }}
      </h1>
    </div>
  </Layout>
</template>

<page-query>
  query Experience($path: String!) {
    experience: contentfulExperience(path: $path) {
      title
      company
      address
      role
      from
      to
      description
      stack
    }
  }
</page-query>

<script>
export default {
  metaInfo() {
    const title = this.$page.experience.title
    const description = this.$page.experience.description

    return {
      title,
      meta: [
        { key: 'og:type', name: 'og:type', content: 'article' },
        { key: 'og:title', name: 'og:title', content: title },
        { key: 'og:locale', name: 'og:locale', content: 'en_CA' },
        {
          key: 'og:description',
          name: 'og:description',
          content: description,
        },
        {
          key: 'description',
          name: 'description',
          content: description,
        },
        {
          key: 'keywords',
          name: 'keywords',
          content: `${this.$page.experience.stack},Lucien Bénié,Blog,lbenie,Lucien,Bénié,benie`,
        },
      ],
    }
  },
}
</script>
