import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SessionStorageService } from "./session-storage.service";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private isAuthorized$$ = new BehaviorSubject<boolean>(false); // Private BehaviorSubject to track authorization state
    public isAuthorized$ = this.isAuthorized$$.asObservable(); // Public Observable to expose authorization state

    private apiUrl = "http://localhost:4000/api"; // Base API URL, adjust based on your environment

    constructor(
        private http: HttpClient,
        private sessionStorage: SessionStorageService
    ) {
        // Initialize authorization state based on session storage
        this.isAuthorized$$.next(!!this.sessionStorage.getToken());
    }

    login(user: { email: string; password: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, user).pipe(
            map((response: any) => {
                if (response.token) {
                    this.sessionStorage.setToken(response.token);
                    this.isAuthorized$$.next(true); // Update authorization state
                }
                return response;
            })
        );
    }

    logout(): void {
        this.sessionStorage.deleteToken();
        this.isAuthorized$$.next(false); // Update authorization state
    }

    register(user: { email: string; password: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, user);
    }

    get isAuthorised(): boolean {
        return this.isAuthorized$$.value;
    }

    set isAuthorised(value: boolean) {
        this.isAuthorized$$.next(value);
    }

    getLoginUrl(): string {
        return `${this.apiUrl}/login`;
    }
}
