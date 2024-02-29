import { LightningElement, api, wire, track } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/zh_Receivers__c'; 
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import saveRecord from '@salesforce/apex/zh_save_receiver_details_class.saveApplication';


const MAX_FILE_SIZE = 2097152;


export default class ZhReceiverComponent extends LightningElement {


    
    @api recordId;
    showSpinner = false;
    @track lstOptions = [];
    @track ngoname = '';
    @track pointofcontact = '';
    @track ngodetails = '';
    @track aadhardetails = '';
    @track phone = '';
    @track email ='';
    @track quantityrequired = '';
    @track address = '';
    @track street ='';
    @track city ='';
    @track province ='';
    @track country ='';
    @track postalCode ='';

    // Get Object Info.
    @wire (getObjectInfo, {objectApiName: ACCOUNT_OBJECT})
    receiversObjectInfo;

    // // Get Picklist values.
    // @wire(getPicklistValues, {recordTypeId: '$receiversObjectInfo.data.defaultRecordTypeId', fieldApiName: LANGUAGE_FIELD })
    // languages(data, error){
    //     if(data && data.data && data.data.values){
    //         data.data.values.forEach( objPicklist => {
    //             this.lstOptions.push({
    //                 label: objPicklist.label,
    //                 value: objPicklist.value
    //             });
    //         });
    //     } else if(error){
    //         console.log(error);
    //     }
    // };
    handleChange(event) {
        this.lstSelected = event.detail.value;
        console.log('lstSelected',this.lstSelected);
    }
    fetchngoname(event){
        this.ngoname = event.target.value;
        console.log('name',this.name);
    }
    fetchpointofcontact(event){
        this.pointofcontact = event.target.value;
        console.log('name',this.name);
    }
    fetchngodetails(event){
    this.ngodetails = event.target.value;
    console.log('ngodetails'+this.ngodetails);
    
    }
    fetchaadhar(event){
        this.aadhardetails = event.target.value;
        console.log('aadhardetails'+this.aadhardetails);
    }
    fetchphone(event){
        this.phone = event.target.value;
    }
    fetchemail(event){
        this.email = event.target.value;
    }
    fetchquantityrequired(event){
        this.quantityrequired = event.target.value;
    }
    fetchaddress(event)
    {
        this.address = event.target.value
        this.street = event.target.street;
        this.city = event.target.city;
        this.province = event.target.province;
        this.country = event.target.country;
        this.postalCode = event.target.postalCode;
        this.address = this.street+' ,'+this.city+' -' +this.postalCode+','+this.province+' ,' +this.country;

    }
    handlesend()
    {
          //Step-1 : create field list
          var fields = {
                            'sobjectType': 'zh_Receivers__c', 
                            'Name' : this.name,
                            'zh_Contact_Number__c' : this.phone,
                            'zh_Email_Id__c' : this.email,
                            'zh_Quantity_required__c' : this.quantityrequired,
                            'zh_Aadhar__c' :  this.aadhardetails,
                            'zh_Address__c' : this.address
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
                                   jobApplictiondata: fields,
          }).then(Response =>{
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