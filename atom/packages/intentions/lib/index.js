'use babel'

import Intentions from './main'
import {Disposable} from 'atom'

module.exports = {
  activate() {
    this.intentions = new Intentions()
    this.intentions.activate()
  },
  deactivate() {
    this.intentions.dispose()
  },
  consumeListIntentions(provider) {
    const providers = [].concat(provider)
    providers.forEach(provider => {
      this.intentions.consumeListProvider(provider)
    })
    return new Disposable(() => {
      providers.forEach(provider => {
        this.intentions.deleteListProvider(provider)
      })
    })
  },
  consumeHighlightIntentions(provider) {
    const providers = [].concat(provider)
    providers.forEach(provider => {
      this.intentions.consumeHighlightProvider(provider)
    })
    return new Disposable(() => {
      providers.forEach(provider => {
        this.intentions.deleteHighlightProvider(provider)
      })
    })
  }
}
