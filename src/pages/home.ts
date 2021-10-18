import { LitElement } from 'lit'
import { html } from 'lit-html'
import { customElement } from 'lit/decorators.js'

const name = 'page-home'
@customElement(name)
export class PageHome extends LitElement {
  render() {
    return html`<h1>Home</h1>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    readonly [name]: PageHome
  }
}
