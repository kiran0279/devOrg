import { LightningElement, api, wire, track } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/zh_Providers__c'; 
import LANGUAGE_FIELD from '@salesforce/schema/zh_Providers__c.zh_Category__c';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import saveRecord from '@salesforce/apex/zh_save_Provider_class.saveApplication';


const MAX_FILE_SIZE = 2097152;
export default class Zh_Donorform extends LightningElement {
    uploadedFiles = []; file; fileContents; fileReader; content; fileName
    @track filesData = [];
    @api recordId;
    showSpinner = false;
    lstSelected = [];
    @track lstOptions = [];
    @track name = '';
    @track phone = '';
    @track email ='';
    @track quantity = '';
    @track description = '';
    @track address = '';
    @track street ='';
    @track city ='';
    @track province ='';
    @track country ='';
    @track postalCode ='';

    // Get Object Info.
    @wire (getObjectInfo, {objectApiName: ACCOUNT_OBJECT})
    providersObjectInfo;

    // Get Picklist values.
    @wire(getPicklistValues, {recordTypeId: '$providersObjectInfo.data.defaultRecordTypeId', fieldApiName: LANGUAGE_FIELD })
    languages(data, error){
        if(data && data.data && data.data.values){
            data.data.values.forEach( objPicklist => {
                this.lstOptions.push({
                    label: objPicklist.label,
                    value: objPicklist.value
                });
            });
        } else if(error){
            console.log(error);
        }
    };
    handleChange(event) {
        this.lstSelected = event.detail.value;
        console.log('lstSelected',this.lstSelected);
    }
    callname(event){
        this.name = event.target.value;
        console.log('name',this.name);
    }
    callphone(event){
        this.phone = event.target.value;
    }
    callemail(event){
        this.email = event.target.value;
    }
    callquantity(event){
        this.quantity = event.target.value;
    }
    calldescription(event){
        this.description = event.target.value;
    }
    calladdress(event)
    {
        this.address = event.target.value
        this.street = event.target.street;
        this.city = event.target.city;
        this.province = event.target.province;
        this.country = event.target.country;
        this.postalCode = event.target.postalCode;
        this.address = this.street+' ,'+this.city+' -' +this.postalCode+','+this.province+' ,' +this.country;

    }
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
    removeReceiptImage(event) {
        var index = event.currentTarget.dataset.id;
        this.filesData.splice(index, 1);
    }
    handlesave()
    {
          //Step-1 : create field list
          var fields = {
                            'sobjectType': 'zh_Providers__c', 
                            'Name' : this.name,
                            'zh_Contact_Number__c' : this.phone,
                            'zh_Email_Id__c' : this.email,
                            'zh_Quantity__c' : this.quantity,
                            'zh_Description__c' : this.description,
                            'zh_Category__c' : this.lstSelected,
                            'zh_Address__c' : this.address
                        }
                        if(this.filesData == [] || this.filesData.length == 0) {
                            this.showToast('Error', 'error', 'Please select files first');
                             return;
                        }
                  
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
            alert('The request has been Created Successfully With request Id : ' +Response);
                
            [...this.template
                .querySelectorAll('lightning-input',)]
                .forEach((input) => { input.value = ''; 
            });
            [...this.template
                .querySelectorAll('lightning-dual-listbox',)]
                .forEach((input) => { input.options = ''; 
            });
            [...this.template
                .querySelectorAll('lightning-input-address')]
                .forEach((input) => { input.value = ''; 
                console.log('check lightning input>>>>>>>>',input);
                input.city= '';
                input.street='';
                input.postalCode='';
                input.province='';
                input.address='';
            });
            }).catch(error=>{
                    alert('The request Creation failed with following error : ' +error.body.message);
                });
               
        } else {
        alert('Invalid Name');
         }
       
    }
    handlecancel(e){
        //eval("$A.get('e.force:refreshView').fire();");
        [...this.template
            .querySelectorAll('lightning-input',)]
            .forEach((input) => { input.value = ''; 
        });
        [...this.template
            .querySelectorAll('lightning-dual-listbox',)]
            .forEach((input) => { input.options = ''; 
        });
        [...this.template
            .querySelectorAll('lightning-input-address')]
            .forEach((input) => { input.value = ''; 
            console.log('check lightning input>>>>>>>>',input);
            input.city= '';
            input.street='';
            input.postalCode='';
            input.province='';
            input.address='';
        });
    }

}