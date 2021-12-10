<template>
  <h1>Hello! <span role="img" aria-label="wave emoji">👋</span></h1>
  <h2>My name is <strong>Lucien Bénié</strong>.</h2>
  <p>
    I'm a Software Developer | Tech Lead specializing in building frontend
    applications. Currently, I'm focused on building the best e-commerce
    platform at
    <a href="https://shopify.com">Shopify</a>.
  </p>
  <p>
    I started working on the web in 2014 when I attended a JavaScript centric
    conference at university. I loved how the web had evolved and JavaScript was
    becomming something huge. Since then, I've had the opportunity to work at my
    <a href="https://geoimagesolutions.com/en/">father's company</a>,
    <a href="https://www.coveo.com/">a world reknown AI coroporation</a>,
    <a href="https://ciao.ca/">a small consultancy agency</a>,
    <a href="https://www.logmein.com/">a huge corporation</a> and
    <a href="https://shopify.com">the biggest canadian tech company</a>.
  </p>
  <p>Here are a few technologies I've been working with:</p>
  <ul>
    <li>JavaScript (ES6+)</li>
  </ul>
</template>

<style lang="scss" scoped>
h1 {
  color: var(--magic-mint);
}

h2 {
  color: var(--opal);
}

a {
  display: inline-block;
  text-decoration: none;

  color: var(--cultured);

  &:visited {
    color: inherit;
  }

  &::after {
    content: '';
    position: relative;
    display: block;
    height: 1px;
    width: 0px;
    bottom: 0.2rem;
    background-color: var(--magic-mint);
    transition: var(--transition);
  }

  &:hover,
  &:focus {
    &::after {
      width: 100%;
    }
  }
}
</style>
