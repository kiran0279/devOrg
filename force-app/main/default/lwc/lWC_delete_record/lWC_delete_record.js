import { LightningElement,api } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';
export default class LWC_delete_record extends LightningElement 
{
    @api recordId;
    deleteme(event)
    {
        deleteRecord(this.recordId).then(Response=>{
            this[NavigationMixin.Navigate]({
                type: 'standard__objectPage',
                attributes: {
                    objectApiName: 'Account',
                    actionName: 'home',
                },
            });
            }).catch(error=>{
            alert(error.body.message);
        });
    }
}