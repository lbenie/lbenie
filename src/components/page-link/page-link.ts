import { LitElement } from 'lit'
import { html } from 'lit-html'
import { customElement, property } from 'lit/decorators.js'
import { isRouteActive, router } from '../../router'
import styles from './page-link.styl'

const name = 'page-link'

@customElement(name)
export class PageLink extends LitElement {
  static readonly styles = styles

  @property({ type: String })
  readonly name = ''

  private readonly eventHandler = () => this.requestUpdate()
  private readonly eventName = 'vaadin-router-location-changed'

  connectedCallback() {
    super.connectedCallback()
    window.addEventListener(this.eventName, this.eventHandler)
  }

  disconnectedCallback() {
    window.removeEventListener(this.eventName, this.eventHandler)
    super.disconnectedCallback()
  }

  render() {
    return html`
      <a
        href=${router.urlForName(this.name)}
        rel="noreferrer noopener"
        ?active=${isRouteActive(this.name)}
        class="link"
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
