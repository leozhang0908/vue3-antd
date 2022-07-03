/**
 * Configure and register global directives
 */
import type { App } from 'vue';
import { setupLoadingDirective } from './loading';
export function setupDirectives(app: App) {
    setupLoadingDirective(app);
}
