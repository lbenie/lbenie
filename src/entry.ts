import { html, LitElement } from 'lit'
import { customElement, query } from 'lit/decorators.js'
import styles from './entry.styl'
import './components/link'
import { attachRouter } from './router'

const name = 'my-app'

@customElement(name)
export class MyElement extends LitElement {
  static readonly styles = styles

  @query('main')
  readonly main!: HTMLElement

  firstUpdated() {
    attachRouter(this.main)
  }

  render() {
    return html`
      <header>
        <nav>
          <!-- <app-link name="home"></app-link> -->
        </nav>
      </header>
      <main role="main"></main>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    readonly [name]: MyElement
  }
}
