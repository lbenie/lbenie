import { LitElement } from 'lit'
import { html } from 'lit-html'
import { customElement } from 'lit/decorators.js'
import '../components/navigation/navigation'

const name = 'page-projects'

@customElement(name)
export class PageProjects extends LitElement {
  render() {
    return html`<h1>Projects</h1>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    readonly [name]: PageProjects
  }
}
