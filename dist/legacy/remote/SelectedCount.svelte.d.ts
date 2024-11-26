import type { DataHandler, Row } from './';
declare class __sveltets_Render<T extends Row> {
    props(): {
        [x: string]: any;
        handler: DataHandler<T>;
    };
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {};
    bindings(): string;
    exports(): {};
}
interface $$IsomorphicComponent {
    new <T extends Row>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<T>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<T>['props']>, ReturnType<__sveltets_Render<T>['events']>, ReturnType<__sveltets_Render<T>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<T>['bindings']>;
    } & ReturnType<__sveltets_Render<T>['exports']>;
    <T extends Row>(internal: unknown, props: ReturnType<__sveltets_Render<T>['props']> & {
        $$events?: ReturnType<__sveltets_Render<T>['events']>;
    }): ReturnType<__sveltets_Render<T>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any>['bindings']>;
}
declare const SelectedCount: $$IsomorphicComponent;
type SelectedCount<T extends Row> = InstanceType<typeof SelectedCount<T>>;
export default SelectedCount;
