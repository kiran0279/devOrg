import { LightningElement } from 'lwc';

export default class Lwc_event_vlcplayer extends LightningElement 
{
    vol = 0;
    handlevolincrease(event)
    {
        if(this.vol < 101)
        {
            this.vol = vol+1;
        }
        
    }
    handlevoldecrease(event)
    {
        
        
            this.vol = vol-1;
        
    }
}