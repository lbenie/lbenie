<template>
  <Layout>
    <section class="container-inner mx-auto py-8">
      <div class="flex flex-wrap lg:flex-no-wrap justify-center">
        <div class="w-8/12">
          <h1 class="text-6xl font-bold">Hello! 👋</h1>
          <p class="text-3xl">My name is <strong>Lucien Bénié</strong>.</p>
          <p class="pt-5 leading-loose">
            I'm a Senior Front-End Developer based in Québec City, Québec,
            Canada. I've started doing web development back in 2014. I've had
            the opportunity to work with modern frameworks like
            <strong>angular.js</strong>, <strong>angular</strong>,
            <strong>react</strong> &amp; <strong>vue.js</strong>. Also, I'm a
            proud father of a 2-year-old. I like watching movies, sports and
            listening to music. In my spare time, I like having a great time
            with my family and friends.
          </p>
        </div>
        <g-image
          alt="Lucien Bénié"
          src="~/static/avatar.png"
          class="rounded-lg"
        />
      </div>
    </section>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Lucien Bénié',
  },
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
