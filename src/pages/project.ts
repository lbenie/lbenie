import { LitElement } from 'lit'
import { html } from 'lit-html'
import { customElement } from 'lit/decorators.js'
import '../components/navigation'

const name = 'page-project'

@customElement(name)
export class PageProject extends LitElement {
  render() {
    return html`<h1>Projects</h1>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    readonly [name]: PageProject
  }
}
