import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

    constructor() { }

    isLoaded(loading: boolean): boolean {
        return loading === false;
    }

    tabIs(currentTab: string, tab: string): boolean {
        // Check if current tab is tab name
        return currentTab === tab;
    }
}
