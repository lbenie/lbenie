<template>
  <div
    class="bg-background-primary font-sans leading-normal flex flex-col min-h-screen"
  >
    <header>
      <nav
        class="container mx-auto flex flex-wrap justify-between items-center py-8"
      >
        <div>
          <!-- Logo -->
          <g-link to="/"
            ><g-image src="~/static/logo.svg" class="w-40" alt="logo"
          /></g-link>
        </div>
        <div class="block lg:hidden">
          <button
            @click="toggle"
            class="flex items-center px-3 py-2 border rounded border-gray-500 hover:text-gray-600 hover:border-gray-600"
            aria-label="Menu"
          >
            &#x2630;
          </button>
        </div>
        <ul
          class="uppercase tracking-wide font-bold w-full flex-grow lg:flex lg:flex-initial lg:w-auto items-center mt-8 lg:mt-0"
          :class="isOpen ? 'block' : 'hidden'"
        >
          <li class="mr-8 mb-6 lg:mb-0">
            <g-link to="/" class="hover:text-gray-600">{{
              $static.metadata.siteName
            }}</g-link>
          </li>
          <li class="mr-8 mb-6 lg:mb-0">
            <g-link class="hover:text-gray-600" to="/projects" v-smooth-scroll
              >Projects</g-link
            >
          </li>
          <!-- <li class="mr-8 mb-6 lg:mb-0">
            <g-link class="hover:text-gray-600" to="/resume" v-smooth-scroll
              >Resume</g-link
            >
          </li> -->
          <li class="mr-8 mb-6 lg:mb-0">
            <g-link class="hover:text-gray-600" to="/blog" v-smooth-scroll
              >Blog</g-link
            >
          </li>
        </ul>
      </nav>
    </header>
    <div class="flex-grow" :class="isOpen ? 'opacity-0' : ''">
      <slot />
    </div>
    <footer class="bg-green-700 text-white">
      <div
        class="container mx-auto flex flex-col lg:flex-row items-center justify-between py-8"
      >
        <div class="mb-8 lg:mb-0">
          <div>
            Copyright &copy; 2019 - {{ new Date().getFullYear() }}. All rights
            reserved.
          </div>
          <div>
            <!-- <a
              href="/rss.xml"
              class="text-white hover:text-gray-400 font-normal"
              >RSS Feed</a
            >
            | -->
            <a
              href="/sitemap.xml"
              class="text-white hover:text-gray-400 font-normal"
              >Sitemap</a
            >
          </div>
        </div>
        <ul class="flex items-center">
          <li
            class="mr-8"
            v-for="{ node } in $static.socials.edges"
            :key="node.id"
          >
            <template v-if="node.icon === 'email'">
              <a
                :href="`mailto:${node.uri}`"
                target="_blank"
                rel="noreferrer noopener"
                class="text-white hover:text-gray-400"
                :aria-label="`Send an email to ${node.uri}`"
                ><svg
                  width="25"
                  height="20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 0h20A2.5 2.5 0 0 1 25 2.5v15a2.5 2.5 0 0 1-2.5 2.5h-20A2.5 2.5 0 0 1 0 17.5v-15C0 1.125 1.125 0 2.5 0zm20 4.225V2.5h-20v1.725l10 5 10-5zm0 2.8l-9.438 4.713a1.25 1.25 0 0 1-1.124 0L2.5 7.025V17.5h20V7.025z"
                    fill-rule="nonzero"
                  /></svg
              ></a>
            </template>
            <template v-else-if="node.icon === 'github'">
              <a
                :href="node.uri"
                target="_blank"
                rel="noreferrer noopener"
                class="text-white hover:text-gray-400"
                aria-label="Lucien's GitHub handle"
              >
                <svg
                  width="20"
                  height="19"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 0c1.814 0 3.487.435 5.02 1.306a9.827 9.827 0 0 1 3.639 3.542A9.33 9.33 0 0 1 20 9.734c0 2.121-.636 4.03-1.908 5.723a9.783 9.783 0 0 1-4.928 3.518c-.234.042-.408.012-.52-.09a.49.49 0 0 1-.17-.38l.006-.969c.005-.621.007-1.19.007-1.705 0-.82-.226-1.42-.677-1.8.495-.05.94-.126 1.335-.228a5.4 5.4 0 0 0 1.223-.494 3.62 3.62 0 0 0 1.055-.843c.282-.334.512-.777.69-1.33.178-.554.267-1.19.267-1.909a3.7 3.7 0 0 0-1.028-2.61c.32-.77.286-1.631-.105-2.586-.243-.076-.594-.03-1.054.14-.46.168-.86.354-1.198.557l-.495.304a9.478 9.478 0 0 0-2.5-.33c-.86 0-1.693.11-2.5.33a11.6 11.6 0 0 0-.553-.342c-.23-.135-.593-.298-1.088-.488-.494-.19-.863-.247-1.106-.171-.391.955-.426 1.816-.105 2.585A3.7 3.7 0 0 0 3.62 9.227c0 .719.089 1.352.267 1.902.178.549.406.993.683 1.33.278.339.627.622 1.048.85a5.4 5.4 0 0 0 1.224.494c.395.102.84.178 1.335.228-.338.305-.551.74-.638 1.306a2.631 2.631 0 0 1-.586.19 3.782 3.782 0 0 1-.742.063c-.287 0-.57-.09-.853-.272a2.256 2.256 0 0 1-.723-.792 2.068 2.068 0 0 0-.631-.66c-.256-.168-.471-.27-.645-.304l-.26-.038c-.182 0-.308.02-.378.057-.07.038-.09.087-.065.146.026.06.065.118.117.178.053.059.109.11.17.152l.09.063c.192.085.38.245.567.482.187.236.324.452.41.646l.13.292c.113.32.304.58.574.78.269.198.56.325.872.38.312.054.614.084.905.088.29.004.532-.01.723-.044l.299-.05c0 .32.002.694.007 1.12l.006.692a.49.49 0 0 1-.17.38c-.112.101-.286.13-.52.089a9.783 9.783 0 0 1-4.928-3.518C.636 13.763 0 11.855 0 9.734a9.33 9.33 0 0 1 1.341-4.886 9.827 9.827 0 0 1 3.64-3.542C6.512.436 8.185 0 10 0zM3.79 13.98c.025-.058-.005-.11-.092-.151-.087-.026-.143-.017-.17.025-.025.06.005.11.092.152.078.05.134.042.17-.025zm.403.432c.06-.043.052-.11-.026-.203-.087-.076-.157-.089-.209-.038-.06.042-.052.11.026.203.087.084.157.097.209.038zm.39.57c.078-.06.078-.14 0-.24-.07-.11-.143-.136-.221-.077-.078.042-.078.118 0 .228.078.11.152.14.221.089zm.547.532c.07-.067.052-.148-.052-.24-.104-.102-.19-.115-.26-.039-.078.068-.061.148.052.241.104.102.19.114.26.038zm.742.317c.026-.093-.03-.16-.169-.203-.13-.033-.213-.004-.247.09-.035.092.021.155.169.19.13.05.213.025.247-.077zm.82.064c0-.11-.073-.157-.22-.14-.14 0-.209.047-.209.14 0 .11.074.156.221.139.14 0 .209-.046.209-.14zm.756-.127c-.017-.093-.096-.131-.234-.114-.14.025-.2.088-.183.19.018.101.096.135.235.101.139-.034.2-.093.182-.177z"
                    fill-rule="nonzero"
                  />
                </svg>
              </a>
            </template>
            <template v-else-if="node.icon === 'linkedin'">
              <a
                :href="node.uri"
                target="_blank"
                rel="noreferrer noopener"
                class="text-white hover:text-gray-400"
                aria-label="Lucien's LinkedIn handle"
              >
                <svg
                  viewBox="-28 0 512 512.00098"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="22"
                >
                  <path
                    d="m104.359375 151.625h-86.3125c-9.675781 0-17.546875 7.871094-17.546875 17.546875v325.285156c0 9.671875 7.871094 17.542969 17.546875 17.542969h86.3125c9.671875 0 17.542969-7.871094 17.542969-17.542969v-325.285156c0-9.675781-7.871094-17.546875-17.542969-17.546875zm-12.5 330.332031h-61.316406v-300.289062h61.316406zm0 0"
                    fill-rule="nonzero"
                  />

                  <path
                    d="m61.203125 0c-33.75 0-61.203125 27.453125-61.203125 61.199219 0 33.75 27.453125 61.203125 61.203125 61.203125 33.742187 0 61.199219-27.453125 61.199219-61.203125 0-33.746094-27.453125-61.199219-61.199219-61.199219zm0 92.359375c-17.183594 0-31.160156-13.976563-31.160156-31.160156 0-17.179688 13.976562-31.15625 31.160156-31.15625 17.179687 0 31.15625 13.976562 31.15625 31.15625 0 17.179687-13.976563 31.160156-31.15625 31.160156zm0 0"
                    fill-rule="nonzero"
                  />

                  <path
                    d="m401.046875 189.761719c-20.632813-17.222657-46.863281-26.433594-73.832031-25.933594-16.75.308594-33.117188 4.347656-47.949219 11.660156v-7.101562c0-9.253907-7.503906-16.757813-16.757813-16.757813h-87.882812c-9.253906 0-16.757812 7.503906-16.757812 16.757813v326.855469c0 9.257812 7.503906 16.757812 16.757812 16.757812h89.617188c8.296874 0 15.023437-6.726562 15.023437-15.019531v-194.878907c0-16.683593 13.054687-30.800781 29.726563-31.296874 17.328124-.511719 31.585937 13.429687 31.585937 30.644531v195.84375c0 8.121093 6.585937 14.707031 14.707031 14.707031h86.128906c8.121094 0 14.707032-6.585938 14.707032-14.707031v-189.886719c0-45.546875-20.074219-88.429688-55.074219-117.644531zm25.03125 292.195312h-55.453125v-180.507812c0-33.46875-27.230469-60.699219-60.703125-60.699219-33.46875 0-60.699219 27.230469-60.699219 60.699219v180.507812h-61.3125v-300.289062h61.3125v21.832031h.019532c-.003907 3.539062 1.226562 7.09375 3.757812 9.957031 5.496094 6.210938 14.992188 6.789063 21.203125 1.289063 14.800781-13.101563 33.824219-20.515625 53.566406-20.882813 19.761719-.375 38.941407 6.367188 54.027344 18.960938 28.144531 23.492187 44.28125 57.964843 44.28125 94.582031zm0 0"
                    fill-rule="nonzero"
                  />
                </svg>
              </a>
            </template>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<static-query>
  query {
    metadata {
      siteName
    }
    socials: allContentfulSocialLinks {
      edges {
        node {
          id
          title
          uri
          icon
        }
      }
    }
  }
</static-query>

<script>
import { ref } from '@vue/composition-api'

export default {
  setup() {
    const isOpen = ref(false)

    const toggle = () => (isOpen.value = !isOpen.value)

    return {
      isOpen,
      toggle,
    }
  },
}
</script>
