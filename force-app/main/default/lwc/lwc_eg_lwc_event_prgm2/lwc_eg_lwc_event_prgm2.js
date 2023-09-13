import { LightningElement } from 'lwc';

export default class Lwc_eg2_lwc_event_prgm extends LightningElement 
{
    constructor()
    {
        super();
        this.template.addEventListener('pevent',this.handleme);
    }
    handleme(event)
    {
        alert(event.detail);
    }
}