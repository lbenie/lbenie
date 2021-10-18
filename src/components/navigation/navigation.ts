import { LitElement } from 'lit'
import { html } from 'lit-html'
import { customElement, state } from 'lit/decorators.js'
import { repeat } from 'lit/directives/repeat.js'
import type {
  Navigation,
  NavigationCollection,
} from '../../services/contentful'
import { contentfulFetch } from '../../services/contentful'
import styles from './navigation.styl'

const name = 'app-navigation'

@customElement(name)
export class AppNavigation extends LitElement {
  static readonly styles = styles

  @state()
  navigationItems!: readonly Navigation[]

  @state()
  isLoading = true

  connectedCallback() {
    super.connectedCallback()
    this.fetchData()
  }

  private async fetchData() {
    const query = `
      {
        navigationCollection(order:name_ASC) {
          items {
            slug
          }
        }
      }
    `
    const { items } = await contentfulFetch<NavigationCollection>(query)

    this.navigationItems = items
    this.isLoading = false
  }

  render() {
    return html`
      ${this.isLoading
        ? html`<p>loading</p>`
        : html`
            <nav>
              <ul class="list">
                ${repeat(
                  this.navigationItems,
                  ({ slug }) => slug,
                  ({ slug }) =>
                    html`<li class="list-item">
                      <page-link name=${slug}></page-link>
                    </li>`,
                )}
              </ul>
            </nav>
          `}
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    readonly [name]: AppNavigation
  }
}
