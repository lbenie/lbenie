import { LitElement } from 'lit'
import { html } from 'lit-html'
import { customElement } from 'lit/decorators.js'

const name = 'page-not-found'

@customElement(name)
export class AppLink extends LitElement {
  render() {
    return html`<h1>OOPS</h1>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    readonly [name]: AppLink
  }
}
