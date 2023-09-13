import { LightningElement,track } from 'lwc';
import sendEmail from '@salesforce/apex/EmailHandler.sendEmail';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class Email_sending_example extends LightningElement 
{
    @track email = '';
    @track from = '';
    @track sub = '';
    @track bod = '';
    handleFrom(event)
    {
        this.from = event.target.value;
    }
 
    handleChange(event) 
    {
        
            this.email = event.target.value;
        
    }
    handleSubject(event)
    {
            this.sub = event.target.value;
    }
    handleBody(event)
    {
            this.bod = event.target.value;
    }
    sendEmailHandler(event) 
    {
        // send mail
        console.log("Sending email to", this.email);
        const emaildetails = { toAddress: this.email, subject: this.sub , body: this.bod, fromaddress: this.from};
        sendEmail(emaildetails)
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Message sent successfully',
                    variant: 'success',
                }),
            );
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: error.message,
                    variant: 'error',
                }),
            );
        });
    }
    handleReset(event) 
    {
            [...this.template
            .querySelectorAll('lightning-input, lightning-input-rich-text')]
            .forEach((input) => { input.value = ''; });
    }
}