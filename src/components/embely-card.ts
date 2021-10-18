import { LitElement } from 'lit'
import { html } from 'lit-html'
import { customElement, property } from 'lit/decorators.js'

const name = 'embely-card'

@customElement(name)
export class AppLink extends LitElement {
  @property({ type: String })
  readonly title = ''

  @property({ type: String })
  readonly url = ''

  render() {
    return html`
      <a
        href=${this.url}
        class="embedly-card"
        rel="noopener noreferrer"
        data-card-width="100%"
        data-card-controls="0"
      >
        ${this.title}
      </a>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    readonly [name]: AppLink
  }
}
