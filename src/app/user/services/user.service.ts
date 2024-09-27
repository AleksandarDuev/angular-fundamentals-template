import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../../models"; // Adjust the import path as necessary

@Injectable({
    providedIn: "root",
})
export class UserService {
    private apiUrl = "http://localhost:4000/api/users"; // Replace with your actual API URL

    constructor(private http: HttpClient) {}

    getUser(userId: string): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/${userId}`);
    }
}
