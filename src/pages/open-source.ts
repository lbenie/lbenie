import { LitElement } from 'lit'
import { html } from 'lit-html'
import { customElement } from 'lit/decorators.js'
import '../components/navigation/navigation'

const name = 'page-open-source'

@customElement(name)
export class PageOpenSource extends LitElement {
  render() {
    return html`<h1>Open Source</h1>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    readonly [name]: PageOpenSource
  }
}
