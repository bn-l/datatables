import type { DataHandler, Row } from './';
declare class __sveltets_Render<T extends Row> {
    props(): {
        [x: string]: any;
        handler: DataHandler<T>;
        filterBy: keyof T;
        align?: "left" | "right" | "center";
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
declare const ThFilter: $$IsomorphicComponent;
type ThFilter<T extends Row> = InstanceType<typeof ThFilter<T>>;
export default ThFilter;
