import { LightningElement,track,wire } from 'lwc';

// import retrieveContactData from '@salesforce/apex/lwcAppExampleApex.retrieveContactData';
export default class EmailToContact extends LightningElement 
{
    selectedAccount;

    handleAccountSelection(event){
        this.selectedAccount = event.target.value;
    }
}