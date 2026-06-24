export {};
declare global {
    class Presence {
        constructor(options: {
            clientId: string;
        });
        on(event: string, callback: Function): void;
        setActivity(data: any): void;
    }
}
//# sourceMappingURL=presence.d.ts.map