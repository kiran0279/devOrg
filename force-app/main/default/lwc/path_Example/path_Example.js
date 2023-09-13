import { LightningElement, api, wire, track } from 'lwc';
import Degree_Btech__c_FIELD from '@salesforce/schema/Job_Application__c.Degree_Btech__c';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import Job_Application__c_OBJECT from '@salesforce/schema/Job_Application__c';
import saveRecord from '@salesforce/apex/saveFiles.saveApplication';
//import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const MAX_FILE_SIZE = 2097152;
export default class Path_Example extends LightningElement
{
    uploadedFiles = []; file; fileContents; fileReader; content; fileName
    @track filesData = [];
     @api recordId;
     showSpinner = false;
    @track firstname = '';
    @track lastname = '';
    @track father = '';
    @track adhar = '';
    @track phone = '';
    @track email = '';
    @track ssc = '';
    @track inter = '';
    @track btech = '';
    @track sscper = '';
    @track interper = '';
    @track btper = '';
    @track comp = '';
    @track domain = '';
    @track skills = '';
    @track pack = '';
    @track exp = '';
    @track address = '';
    @track cpack = '';
    options = [];
    selectedValue;

    @wire( getObjectInfo, { objectApiName: Job_Application__c_OBJECT } )
    objectInfo;

    @wire( getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: Degree_Btech__c_FIELD } )
    wiredData( { error, data } ) {

        console.log( 'Inside Get Picklist Values' );

        if ( data ) {
                            
            console.log( 'Data received from Picklist Field ' + JSON.stringify( data.values ) );
            this.options = data.values.map( objPL => {
                return {
                    label: `${objPL.label}`,
                    value: `${objPL.value}`
                };
            });
            console.log( 'Options are ' + JSON.stringify( this.options ) );

        } else if ( error ) {

            console.error( JSON.stringify( error ) );

        }

    }
    
    showToast(title, variant, message) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: title,
                variant: variant,
                message: message,
            })
        );
    }
  
    callfrn(event)
    {
        this.firstname = event.target.value;
        console.log('first name :'+this.firstname );
    }
    calllsn(event)
    {
        this.lastname = event.target.value;
    }
    callatherf(event)
    {
        this.father = event.target.value;
    }
    calladhnum(event)
    {
        this.adhar = event.target.value;
    }
    callph(event)
    {
        this.phone = event.target.value;
    }
    callemail(event)
    {
        this.email = event.target.value;
    }
    callssc(event)
    {
        this.ssc = event.target.value;
        console.log('school Name : '+this.ssc);
    }
    callinter(event)
    {
        this.inter = event.target.value;
    }
      callbranch(event)
      {
         console.log( 'New Value selected is ' + JSON.stringify( event.detail.value ) );
         this.selectedValue = event.target.value;
         this.curretst = this.selectedValue; 
      }
    callbtech(event)
    {
        this.btech = event.target.value;
    }
    callsscper(event)
    {
        this.sscper = event.target.value;
    }
    callintper(event)
    {
        this.interper = event.target.value;
    }
    callbtper(event)
    {
        this.btper = event.target.value;        
    }
    callcomp(event)
    {
        this.comp = event.target.value;
        console.log('comapany : '+this.comp);
    }
    calldomain(event)
    {
        this.domain = event.target.value;
    }
    callskills(event)
    {
        this.skills = event.target.value;
    }
    callcpack(event)
    {
        this.cpack = event.target.value;
    }
    callpack(event)
    {
        this.pack = event.target.value;
    }
    callexp(event)
    {
        this.exp = event.target.value;
    }
    calladdress(event)
    {
        this.address = event.target.value;
    }
    @track currentStep = '1';
    onFileUpload(event) {
        if (event.target.files.length > 0) {
            for(var i=0;i< event.target.files.length; i++){
          this.uploadedFiles = event.target.files;
          this.fileName = event.target.files[0].name;
          this.file = this.uploadedFiles[0];
          if (this.file.size > this.MAX_FILE_SIZE) {
            // alert("File Size Can not exceed" + MAX_FILE_SIZE);
            this.showToast('Error!', 'error', 'File size exceeded the upload size limit.');
            return;
          }
          let file = event.target.files[i];
          let reader = new FileReader();
            reader.onload = e => {
                    var fileContents = reader.result.split(',')[1]
                    this.filesData.push({'fileName':file.name, 'fileContent':fileContents});
                };
                reader.readAsDataURL(file);
            }
        }
      }
 
    handleOnStepClick(event) {
        const allValid = [...this.template.querySelectorAll('lightning-input','lightning-combobox','lightning-textarea')]
                    .reduce((validSoFar, inputCmp) => {
                            inputCmp.reportValidity();
                            return validSoFar && inputCmp.checkValidity();
                    }, true);
                    if (allValid) 
                    {
                        this.currentStep = event.target.value;
                    }
    }
 
    get isStepOne() {
        return this.currentStep === "1";
    }
 
    get isStepTwo() {
        return this.currentStep === "2";
    }
 
    get isStepThree() {
        return this.currentStep === "3";
    }
 
    get isEnableNext() 
    {
        if(this.currentStep != "")
        {
        return this.currentStep != "3";
        }
    }
 
    get isEnablePrev() {
        if(this.currentStep != "")
        {
            return this.currentStep != "1";
        }
       
    }
 
    get isEnableFinish() {
        return this.currentStep === "3";
    }
 
    handleNext(){const allValid = [...this.template.querySelectorAll('lightning-input','lightning-combobox','lightning-textarea')]
    .reduce((validSoFar, inputCmp) => {
            inputCmp.reportValidity();
            return validSoFar && inputCmp.checkValidity();
    }, true);
    if (allValid && this.currentStep == "1") {
            this.currentStep = "2";
        }
        else if(allValid && this.currentStep == "2"){
            this.currentStep = "3";
        }
    }
 
    handlePrev(){
        if(this.currentStep == "3"){
            this.currentStep = "2";
        }
        else if(this.currentStep = "2"){
            this.currentStep = "1";
        }
    }
 
    handlesave()
    {
          //Step-1 : create field list
          var fields = {
                            'sobjectType': 'Job_Application__c', 
                            'First_Name__c' : this.firstname,
                            'Last_Name__c' : this.lastname,
                            'Father_Name__c' : this.father,
                            'Adhar_Number__c' : this.adhar,
                            'Phone__c' : this.phone,
                            'Email__c' : this.email,
                            'SSC_School_Name__c' : this.ssc,
                            'Inter_Diploma_College_Name__c' : this.inter,
                            'Btech_College_Name__c' : this.btech,
                            'Percent_In_SSC__c' : this.sscper,
                            'Percent_In_Inter_Diploma__c' : this.interper,
                            'Btech_Percent__c' : this.btper,
                            'Degree_Btech__c' : this.selectedValue,
                            'Company_Name__c' : this.comp,
                            'Domain__c' : this.domain,
                            'Skills__c' : this.skills,
                            'Package__c' : this.pack,
                            'Experience__c' : this.exp,
                            'Current_Package__c' : this.cpack, 
                            'Address__c' : this.address
                        }
                        if(this.filesData == [] || this.filesData.length == 0) {
                            this.showToast('Error', 'error', 'Please select files first');
                             return;
                        }
                    // Step-2 : Create API Record with fields 
                   // const recordData = {apiName : 'Job_Application__c',fields};
                    // Step-3 : Call Imperation 
                    const allValid = [...this.template.querySelectorAll('lightning-input','lightning-combobox','lightning-textarea')]
                    .reduce((validSoFar, inputCmp) => {
                            inputCmp.reportValidity();
                            return validSoFar && inputCmp.checkValidity();
                    }, true);
                    if (allValid) {
                    //whatever you want to do whenever your field is valid.
                    this.showSpinner = true;
                    saveRecord({recordId : this.recordId,
                        filedata : JSON.stringify(this.filesData),
                        jobApplictiondata: fields,
            file: encodeURIComponent(this.fileContents),
            fileName: this.fileName
          }).then(Response =>{
            // this.dispatchEvent(new ShowToastEvent({
            // alert( 'Account created the Id is :'+Response.id)
            alert('Job Application Was Created Successfully With application Id : ' +Response);
                
            [...this.template
                .querySelectorAll('lightning-input','lightning-combobox','lightning-textarea')]
                .forEach((input) => { input.value = ''; });
            }).catch(error=>{
                    alert('Application Creation failed with following error : ' +error.body.message);
                });
               
        } else {
        alert('Invalid Name');
         }
       
    }
    
        

    
    handlecancel()
    {
        // [...this.template
        //     .querySelectorAll('lightning-input','lightning-combobox','lightning-textarea')]
        //     .forEach((input) => { input.value = ''; });
            this.firstname = '';
            this.lastname = '';
            this.father = '';
            this.adhar = '';
            this.phone = '';
            this.email = '';
            this.ssc = '';
            this.inter = '';
            this.btech = '';
            this.sscper = '';
            this.interper = '';
            this.btper = '';
            this.comp = '';
            this.domain = '';
            this.skills = '';
            this.pack = '';
            this.exp = '';
            this.address = '';
            this.cpack = '';
            this.selectedValue = '';
    }
}