import { LitElement } from 'lit'
import { html } from 'lit-html'
import { customElement, property } from 'lit/decorators.js'
import { urlForName } from '../router'

const name = 'app-link'

@customElement(name)
export class AppLink extends LitElement {
  @property({ type: String })
  readonly name!: string

  connectedCallback() {
    super.connectedCallback()
    console.log('link', this.name)
  }

  render() {
    return html`
      <a href="${urlForName(this.name)}" rel="noreferrer noopener"
        >${this.name}
      </a>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    readonly [name]: AppLink
  }
}
