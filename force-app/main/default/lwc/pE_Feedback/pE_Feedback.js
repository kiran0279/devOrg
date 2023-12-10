import saveFeedback from '@salesforce/apex/PE_FeedbackController.saveFeedback';
import sendEmail from '@salesforce/apex/PE_FeedbackController.sendEmail';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { LightningElement, track } from 'lwc';

export default class PE_Feedback extends LightningElement {
    @track customerFeedbackName;
    @track feedbackType;
    @track description;
    @track feedbakrating;

connectedCallback(){
    console.log("Rating:::::",this.feedbakrating) ;  
}
    // Define options for combobox fields
    feedbackTypeOptions = [
        { label: 'Comments', value: 'Comment' },
        { label: 'Suggestions', value: 'Suggestion' },
        { label: 'Questions', value: 'Question' },
    ];

    rating(event) {
        if (event.target.name === "Rate") {
          this.feedbakrating = event.target.value;
        }
        console.log("Rating:::::",this.feedbakrating) ;
      }
      
    handleCustomerFeedbackNameChange(event) {
        this.customerFeedbackName = event.target.value;
        console.log('customername,',this.customerFeedbackName)
    }

    handleFeedbackTypeChange(event) {
        this.feedbackType = event.target.value;
        console.log('feedbackType',this.feedbackType);
    }

    handleDescriptionChange(event) {
        this.description = event.target.value;
        console.log('description',this.description);
    }

    


   
    handleSubmit() {
        // Prepare data for the Apex method
        const feedbackData = {
            customerFeedbackName: this.customerFeedbackName,
            feedbackType: this.feedbackType,
            description: this.description,
            feedbakrating: this.feedbakrating
        };
        console.log('feedbackData', feedbackData);
        // Call the Apex method to save the feedback
        saveFeedback({ feedbackData })
            .then(response => {                
                // Handle success, e.g., show a success message
                console.log('Feedback saved successfully');
                const radioButtons = this.template.querySelectorAll('input[name="Rate"]');
                radioButtons.forEach(button => {
                    button.checked = false;
                });
                // Check if the response is successful and send email
                sendEmail({ feedbackData })
                .then(result => {
                    console.log('mail  send successfully',result); 
                })
                .catch(error => {
                    console.log('Error:mail not send',error);
                });
                [...this.template
                    .querySelectorAll('lightning-input , lightning-textarea ,lightning-combobox')]
                    .forEach((input) => { input.value = ''; });
                    this.toastEventFire('success','Thank you for submitting your Feedback','success')

            })

            .catch(error => {
                // Handle error, e.g., show an error message
                console.error('Error saving feedback', error);
            });

    }
    toastEventFire(title,msg,variant,mode){
        const e = new ShowToastEvent({
            title:title,
            message:msg,
            variant:variant,mode:mode
        });
        this.dispatchEvent(e);
    }
}