/**
 * router link
 * @Example v-routerLink="{path?,name?}"
 */
import { on } from '@/utils/domUtils';
import type { App, Directive, DirectiveBinding } from 'vue';

const routerLinkDirective: Directive = {
  mounted(el: Element, binding: DirectiveBinding<any>, context) {
    let clicked = false;
    on(el, 'click', (e: any): void => {
      if (clicked) return;
      setTimeout(() => clicked = false, 800)
      binding.modifiers.stop && e.stopPropagation()
      clicked = true;
      binding.value && binding.instance.$router.push(binding.value)
    });
  },
};
export function setupRouterLinkDirective(app: App) {
  app.directive('routerLink', routerLinkDirective);
}

export default routerLinkDirective;
