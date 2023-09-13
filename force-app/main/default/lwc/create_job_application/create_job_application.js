import { LightningElement, track, wire,api } from 'lwc';
import Degree_Btech__c_FIELD from '@salesforce/schema/Job_Application__c.Degree_Btech__c';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import Job_Application__c_OBJECT from '@salesforce/schema/Job_Application__c';
import saveRecord from '@salesforce/apex/FileUploaderClass.uploadfiles';  

//import { createRecord } from 'lightning/uiRecordApi';

const MAX_FILE_SIZE = 100000000; //10mb  
export default class Create_job_application extends LightningElement 
{
    options = [];

    section = '';
    @track firstname;
    @track lastname;
    @track father;
    @track adhar;
    @track phone;
    @track email;
    @track ssc;
    @track inter;
    @track btech;
    @track sscper;
    @track interper;
    @track btper;
    @track comp;
    @track domain;
    @track skills;
    @track pack;
    @track exp;
    @track currentpack;
    @track address;
    options = [];
    selectedValue;
    uploadedFiles = []; file; fileContents; fileReader; content; fileName  
    onFileUpload(event) {  
        if (event.target.files.length > 0) {  
          this.uploadedFiles = event.target.files;  
          this.fileName = event.target.files[0].name;  
          this.file = this.uploadedFiles[0];  
          if (this.file.size > this.MAX_FILE_SIZE) {  
            alert("File Size Can not exceed" + MAX_FILE_SIZE);  
          }  
        }  
      }  
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

    callfrn(event)
    {
        this.firstname = event.target.value;
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
    }
    calldomain(event)
    {
        this.domain = event.target.value;
    }
    callskills(event)
    {
        this.skills = event.target.value;
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
    callcurrentpack(event)
    {
        this.currentpack = event.target.value;
    }
    handleSectionToggle(event) {
        this.section = event.detail.openSections;
    }

    save(event)
    {
        this.fileReader = new FileReader();  
        this.fileReader.onloadend = (() => {  
          this.fileContents = this.fileReader.result;  
          let base64 = 'base64,';  
          this.content = this.fileContents.indexOf(base64) + base64.length;  
          this.fileContents = this.fileContents.substring(this.content);  
          this.saveRecord();  
        });  
        this.fileReader.readAsDataURL(this.file);  
    }
    saveRecord()
    {
        
         //Step-1 : create field list
         var jobApp = {'sobjectType': 'Job_Application__c',
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
                        'Address__c' : this.address,
                        'Current_Package__c' : this.currentpack
                    }
            // Step-2 : Create API Record with fields 
            //const recordData = {apiName : 'Job_Application__c',fields};
            // Step-3 : Call Imperation 
            const allValid = [...this.template.querySelectorAll('lightning-input','lightning-combobox','lightning-textarea')]
            .reduce((validSoFar, inputCmp) => {
                        inputCmp.reportValidity();
                        return validSoFar && inputCmp.checkValidity();
            }, true);
            if (allValid) {
            //whatever you want to do whenever your field is valid.
            //createRecord(recordData).then(Response=>{
                saveRecord({  
                    jobApplication: jobApp,  
                    file: encodeURIComponent(this.fileContents),  
                    fileName: this.fileName  
                  }).then(Response=>{  
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
    cancel(event)
    {
        [...this.template
            .querySelectorAll('lightning-input','lightning-textarea','lightning-combobox')]
            .forEach((input) => { input.value = ''; });

    }
}