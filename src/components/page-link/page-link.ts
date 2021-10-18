import { LitElement } from 'lit'
import { html } from 'lit-html'
import { customElement, property } from 'lit/decorators.js'
import { isRouteActive, router } from '../../router'
import styles from './page-link.styl'

const name = 'page-link'

@customElement(name)
export class PageLink extends LitElement {
  static readonly styles = styles

  constructor() {
    super()

    window.addEventListener('vaadin-router-location-changed', () => {
      this.requestUpdate()
    })
  }
  @property({ type: String })
  readonly name = ''

  render() {
    return html`
      <a
        href=${router.urlForName(this.name)}
        rel="noreferrer noopener"
        ?active=${isRouteActive(this.name)}
        >${this.name}
      </a>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    readonly [name]: PageLink
  }
}
