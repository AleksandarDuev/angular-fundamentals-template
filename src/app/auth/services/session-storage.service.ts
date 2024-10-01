import { Injectable, Inject, InjectionToken } from "@angular/core";

const TOKEN = "SESSION_TOKEN";

export const WINDOW = new InjectionToken<Window>("Global window object", {
    factory: () => window,
});

@Injectable({
    providedIn: "root",
})
export class SessionStorageService {
    constructor(@Inject(WINDOW) private window: Window) {}

    setToken(token: string) {
        this.window.sessionStorage.setItem(TOKEN, token);
    }

    getToken() {
        return this.window.sessionStorage.getItem(TOKEN);
    }

    deleteToken() {
        this.window.sessionStorage.removeItem(TOKEN);
    }
}
