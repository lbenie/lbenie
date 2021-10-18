import { LitElement } from 'lit'
import { html } from 'lit-html'
import { customElement, state } from 'lit/decorators.js'
import { repeat } from 'lit/directives/repeat.js'
import type { Navigation, NavigationCollection } from '../services/contentful'
import { contentfulFetch } from '../services/contentful'
import './link'

const name = 'app-navigation'

@customElement(name)
export class AppNavigation extends LitElement {
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
        navigationCollection {
          skip,
          total,
          limit,
          items {
            name,
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
        : html`<nav>
            <ul>
              ${repeat(
                this.navigationItems,
                ({ slug }) => slug,
                ({ slug }) => html`<li><app-link name=${slug}></app-link></li>`,
              )}
            </ul>
          </nav>`}
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    readonly [name]: AppNavigation
  }
}
