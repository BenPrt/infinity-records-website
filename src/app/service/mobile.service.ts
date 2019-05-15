import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class MobileService {

    constructor() { }

    isMobile() {
        const ua = navigator.userAgent;
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)) {
            return true;
        } else {
            return false;
        }
    }

}
