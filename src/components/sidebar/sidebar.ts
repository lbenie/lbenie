import type { SocialCollection } from './../../services/contentful/models/socialCollection'
import { html, LitElement } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import type { Social } from '../../services/contentful'
import { contentfulFetch } from '../../services/contentful'
import { repeat } from 'lit/directives/repeat.js'
import styles from './sidebar.styl'

const name = 'app-sidebar'

@customElement(name)
export class AppSidebar extends LitElement {
  static readonly styles = styles

  @state()
  socialItems!: readonly Social[]

  @state()
  isLoading = true

  connectedCallback() {
    super.connectedCallback()
    this.fetchData()
  }

  private async fetchData() {
    const query = `
      {
        socialCollection {
          items {
            title,
            uri,
            icon
          }
        }
      }
    `

    const { items } = await contentfulFetch<SocialCollection>(query)

    this.socialItems = items
    this.isLoading = false
  }

  render() {
    return html`
      ${this.isLoading
        ? html`<p>loading</p>`
        : html`
            <ul class="list">
              ${repeat(
                this.socialItems,
                ({ title }) => title,
                ({ title, uri, icon }) =>
                  html`<li class="list-item">
                    <a href=${uri} aria-label=${title}
                      >${title}<i class="fab fa-accessible-icon"></i>
                    </a>
                  </li>`,
              )}
            </ul>
          `}
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    readonly [name]: AppSidebar
  }
}
