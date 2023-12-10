import { LightningElement } from 'lwc';
import getRecords from '@salesforce/apex/searchLocationsController.getRecords'
export default class DispalyLocations extends LightningElement {
    isOpenButtons = true;
    isopenDetails = false;
    placeRecords;
    lat1;
    long1;
    onClickHandler(event){
       let selectedHeader = event.target.header;
       this.selectedHeader = selectedHeader;
       console.log('this.selectedHeader',this.selectedHeader);
       this.handleLoad(this.selectedHeader);
    }
    handleLoad(header) {
      console.log('inside of handleLoad method',header);
      if (navigator.geolocation) {
        console.log('navigator');
        navigator.geolocation.getCurrentPosition(pos => {
          console.log('pos',pos);
          this.lat1 = pos.coords.latitude;
          this.long1 = pos.coords.longitude;
          console.log('the long val 1', this.lat1);
          console.log('the long val 1', this.long1);
            getRecords({header:header, lat :this.lat1,lon : this.long1})
              .then((result) => {
                if(result){
                  this.placeRecords = result;
                  this.isOpenButtons = false;
                  this. isopenDetails = true;
                  console.log('result',JSON.stringify(result));
                }
              
              })
              .catch((error) => {
                this.error = error;
              });
            });
            }
      }
}