import { LitElement } from 'lit'
import { html } from 'lit-html'
import { customElement } from 'lit/decorators.js'
import '../components/navigation'

const name = 'page-home'

@customElement(name)
export class PageHome extends LitElement {
  render() {
    return html`<app-navigation></app-navigation>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    readonly [name]: PageHome
  }
}
