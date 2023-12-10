import { LightningElement, wire } from 'lwc';
import searchRecords from '@salesforce/apex/SearchController.searchRecords'; // Replace with your Apex method

export default class SearchComponent extends LightningElement {
    searchResults;

    handleSearch(event) {
        const searchTerm = event.target.value;
        console.log('searchTerm',searchTerm);
        //this.searchRecords(searchTerm);
    }

    @wire(searchRecords, { searchTerm: '$searchTerm' })
    wiredSearchResult({ error, data }) {
        if (data) {
            this.searchResults = data;
        } else if (error) {
            // Handle error
        }
    }
}