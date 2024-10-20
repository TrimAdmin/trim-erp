import type { App, Directive } from 'vue'

export function registerDirectives(app: App) {
  const directives = import.meta.glob<{ default: Directive }>(['./*.ts', '!./index.ts'], {
    eager: true,
  })
  Object.entries(directives).forEach(([key, value]) => {
    const name = key.replace(/.\//, '').split('.')[0]
    app.directive(name, value.default)
  })
}
