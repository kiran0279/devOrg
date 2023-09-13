import { LightningElement, track, wire } from 'lwc';
import getConList from '@salesforce/apex/Get_contacts_wire_lwc.getConList';
import { updateRecord } from 'lightning/uiRecordApi';
import First_Name_FIELD from '@salesforce/schema/Contact.FirstName';
import Last_Name_FIELD from '@salesforce/schema/Contact.LastName';
import Id_FIELD from '@salesforce/schema/Contact.Id';
import {refreshApex} from '@salesforce/apex'

const colm = [
                {label : 'First Name',fieldName : 'FirstName', type : 'text',editable:true},
                {label : 'Last Name',fieldName : 'LastName', type : 'text',editable:true},
                {label : 'Phone',fieldName : 'Phone', type : 'phone'},
                {label : 'Email',fieldName : 'Email', type : 'email'},
            ];
export default class Lwc_datatable_wire_lds extends LightningElement  
{
    @track col = colm;
    @track draftvalues =[];
    @wire(getConList) sai;
    handlesave(event)
    {
        const fields = {};
        fields[Id_FIELD.fieldApiName] = event.detail.draftvalues[0].Id;
        fields[First_Name_FIELD.fieldApiName] = event.detail.draftvalues[0].FirstName;
        fields[Last_Name_FIELD.fieldApiName] = event.detail.draftvalues[0].LastName;
        console.log('Fields :' +this.fields);
        const recordInput = {fields};
        updateRecord(recordInput).then(Response=>{
            alert('Record Updated Successfully');
            console.log('Draft Values' +this.Response.data);
            this.draftvalues=[];
            return refreshApex(this.sai);
        }).catch(error=>{
            alert('An Error has encountered during refresh ' +error.body.message);
        });
    }
}