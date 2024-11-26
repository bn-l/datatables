import type { Snippet } from 'svelte';
import { type TableHandlerInterface } from './';
declare class __sveltets_Render<T extends Row> {
    props(): {
        table: TableHandlerInterface<T>;
        children: Snippet;
        basic?: boolean;
        headless?: boolean;
        header?: Snippet;
        footer?: Snippet;
    };
    events(): {};
    slots(): {};
    bindings(): "";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <T extends Row>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<T>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<T>['props']>, ReturnType<__sveltets_Render<T>['events']>, ReturnType<__sveltets_Render<T>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<T>['bindings']>;
    } & ReturnType<__sveltets_Render<T>['exports']>;
    <T extends Row>(internal: unknown, props: ReturnType<__sveltets_Render<T>['props']> & {}): ReturnType<__sveltets_Render<T>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any>['bindings']>;
}
declare const Datatable: $$IsomorphicComponent;
type Datatable<T extends Row> = InstanceType<typeof Datatable<T>>;
export default Datatable;
