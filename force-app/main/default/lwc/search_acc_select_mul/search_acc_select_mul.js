import { LightningElement ,track,wire} from 'lwc';
import searchAccount from '@salesforce/apex/Search_acc_select_mul_class.searchAccount';
const DELAY = 100;

export default class Search_acc_select_mul extends LightningElement 
{
   @track accountName = '';
   @track accountList= [];
  @wire (searchAccount,{
        accStrName:'$accountName'
     })
     retrieveAccounts({error, data}){
        if(data){
            this.accountList=data;          
        }
        else if(error){
   
        }
        
    }
    searchAccountAction(event){
        //this.accountName = event.target.value;
        const searchString = event.target.value;
        window.clearTimeout(this.delayTimeout);
        this.delayTimeout = setTimeout(() => {
            this.accountName = searchString; 
        }, DELAY);
    }
}