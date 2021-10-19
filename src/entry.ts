import { html, LitElement } from 'lit'
import { customElement, query } from 'lit/decorators.js'
import styles from './entry.styl'
import { attachRouter, router } from './router'
import './components'

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
        <a href=${router.urlForName('home')}>Lucien Bénié</a>
        <app-navigation></app-navigation>
      </header>
      <app-sidebar></app-sidebar>
      <main role="main"></main>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    readonly [name]: MyElement
  }
}
