export default class EventDispatcher {
    private listeners;
    private queue;
    add(event: keyof EventDispatcher['listeners'], callback: () => void): void;
    dispatch(event: keyof EventDispatcher['listeners']): Promise<void>;
    private run;
}
