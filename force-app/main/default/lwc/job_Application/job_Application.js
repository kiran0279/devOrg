import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class Job_Application extends LightningElement 
{
    handleNavigate()
    {
        this[NavigationMixin.Navigate]({
            "type": "standard__component",
            "attributes": {
                "componentName": "c__create_job_application"    
            }
        });
    } 
}