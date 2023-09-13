import { LightningElement } from 'lwc';

export default class Declarative_lwc extends LightningElement 
{


    inchandler(event)
    {
        // Step : 1  : Create Event  :
        const inc = new CustomEvent('increase');
        
        // Step-2 : Dispatch the event :
        this.dispatchEvent(inc);
    }

    dechandler(event)
    {
        // Single Step :
        const dec = new CustomEvent('decrease');
        
        // Step-2 : Dispatch the event :
        this.dispatchEvent(dec);
    }
}