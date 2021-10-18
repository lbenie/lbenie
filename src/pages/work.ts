import { LitElement } from 'lit'
import { html } from 'lit-html'
import { customElement } from 'lit/decorators.js'
import '../components/navigation/navigation'

const name = 'page-work'

@customElement(name)
export class PageWork extends LitElement {
  render() {
    return html`<h1>work</h1>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    readonly [name]: PageWork
  }
}
