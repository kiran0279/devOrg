import { LightningElement,track,wire } from 'lwc';
import findcon from '@salesforce/apex/LWC_wire2_search.findcon';

export default class LWC_wire2_searchcon extends LightningElement 
{
    @track searchkey;

    @wire(findcon,{search:'$searchkey'}) contact;
    handlechange(event)
    {
        this.searchkey = event.target.value;
    }
}