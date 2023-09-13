import { LightningElement,track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
export default class LDS_Example_Create_Account extends LightningElement 
{
    @track name;
    @track phone;
    @track fax;
    @track indus;

    callnm(event)
    {
        this.name = event.target.value;
    }
    callph(event)
    {
        this.phone = event.target.value;
    }
    callfx(event)
    {
        this.fax = event.target.value;
    }
    callin(event)
    {
        this.indus = event.target.value;
    }
    save(event)
    {
        //Step-1 : create field list
        const fields = {'Name' : this.name,
                        'Phone' : this.phone,
                        'Fax' : this.fax,
                        'Industry' : this.indus}
        // Step-2 : Create API Record with fields 
        const recordData = {apiName : 'Account',fields};
        // Step-3 : Call Imperation 
        createRecord(recordData).then(Response=>{
            alert('Account Was Created Successfully With Account Id : ' +Response.id);
        }).catch(error=>{
            alert('Record Creation failed with following error : ' +error.body.message);
        });
    }
}