import { BehaviorSubject } from 'rxjs';

//create a store for token
export const token$ =
    new BehaviorSubject(window.localStorage.getItem('token') || null);

export function updateToken(token) {
    if(token) {
        window.localStorage.setItem('token', token);
    } else {
        window.localStorage.removeItem('login');
    }
    token$.next(token);
}