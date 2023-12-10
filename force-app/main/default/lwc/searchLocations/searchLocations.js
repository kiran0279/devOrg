import { LightningElement, wire,api, track } from 'lwc';
import getAccounts from '@salesforce/apex/searchLocationsController.searchAccountNameMethod';
import getLocDetails from '@salesforce/apex/searchLocationsController.calculateDistanceAndTime';

const DELAY = 100;
export default class searchLocations extends LightningElement {
    placeNames = '';
    @track selectedRecord = {};
    displyOptions = false;
    displyDetais = false;
  @track placesList= [];
  @wire (getAccounts,{
        placeName:'$placeNames',
     })
  retrieveAccounts({error, data}){
      if(data){
        console.log('data>>',data);
        this.placesList=data;   
        console.log('placesList>>>',this.placesList); 
        this.displyOptions = false;    
        this.displyDetais = false;  
      }
      else if(error){
 
      }
 
  }
  lat1;
  long1;
  wrapObj = {};
handleOptionClick(event){
  console.log('clicked on the selection');
  let recordId = event.currentTarget.dataset.recordId;
  console.log('the selected item -->',recordId);
  let selectRecord = this.placesList.find((item) => {
    return item.Id === recordId;
  });
  this.selectedRecord = selectRecord;
  console.log('the selected rec nma-->'+this.selectedRecord.Name);
  this.displyOptions = true;
  // Location code
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      this.lat1 = pos.coords.latitude;
      this.long1 = pos.coords.longitude;
      console.log('the long val 1', this.lat1);
      console.log('the long val 1', this.long1);

    getLocDetails({lat :this.lat1,lon : this.long1, objId : this.selectedRecord.Id})
      .then(result => {
        this.wrapObj = result;
          console.log('this wrap class',this.wrapObj);

      })
      .catch(error => {
          console.log(error);
          this.error = error;
      });
    });
  }
  this.displyDetais = true;
}
 
 
searchPlaceAction(event){
    //this.accountName = event.target.value;
    const searchString = event.target.value;
    window.clearTimeout(this.delayTimeout);
    this.delayTimeout = setTimeout(() => {
        this.placeNames = searchString; 
        console.log('placeNames-->>>',this.placeNames);
        displyDetais = false;
    }, DELAY);
}
}