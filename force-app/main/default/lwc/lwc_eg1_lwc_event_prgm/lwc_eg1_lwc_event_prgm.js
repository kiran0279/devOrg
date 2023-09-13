import { LightningElement } from 'lwc';

export default class Lwc_eg1_lwc_event_prgm extends LightningElement 
{
    fireme(event)
    {
        this.dispatchEvent(new CustomEvent('pevent',{detail : 'Hi This is child'}));
    }
}