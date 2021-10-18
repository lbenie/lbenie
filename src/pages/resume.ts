import { LitElement } from 'lit'
import { html } from 'lit-html'
import { customElement } from 'lit/decorators.js'
import '../components/navigation/navigation'

const name = 'page-resume'

@customElement(name)
export class PageResume extends LitElement {
  render() {
    return html`<h1>Resume</h1>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    readonly [name]: PageResume
  }
}
