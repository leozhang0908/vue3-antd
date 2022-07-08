/**
 * Configure and register global directives
 */
import type { App } from 'vue';
import { setupLoadingDirective } from './loading';
import { setupRouterLinkDirective } from './routerLink';
export function setupDirectives(app: App) {
    setupLoadingDirective(app);
    setupRouterLinkDirective(app);
}
