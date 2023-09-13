import { LightningElement, api } from 'lwc';

export default class LWC_Record_Edit_Form extends LightningElement 
{
    @api recordId = '0035g00000UfuF0AAJ';
    cancel(event)
    {
        const inputFields = this.template.querySelectorAll('lightning-input-field');
        inputFields.forEach(field=>{field.reset();})
 

    }
}