import { LightningElement } from 'lwc';
import SalesforceNoob from '@salesforce/resourceUrl/SalesforceNoob';
import { NavigationMixin } from 'lightning/navigation';
export default class Home extends NavigationMixin(LightningElement){
  
  // playerImages = SalesforceNoob + '/SalesforceImages/download.jpg';
  // players  = SalesforceNoob + '/SalesforceImages/child6.jpg';
  players=[
    {
      id:"1",
      header:"“Children are great imitators. So give them something great to imitate.” ",
      src: SalesforceNoob + '/SalesforceImages/child6.jpg',
      description:"child",
    },
    
    {
      id:"2",
      header:"“When I approach a child, he inspires in me two sentiments — tenderness for what he is and respect for what he may become.” ",
      src: SalesforceNoob + '/SalesforceImages/DONATION.jpg',
      description:"child",
    },
    {
      id:"3",
      header:"“If we are to teach real peace in this world, and if we are to carry on a real war against war, we shall have to begin with the children.” ",
      src: SalesforceNoob + '/SalesforceImages/CHILD5.jpg',
      description:"child",
    },
    {
      id:"4",
      header:"“Children are the hands by which we take hold of heaven.” ",
      src: SalesforceNoob + '/SalesforceImages/CHILD.jpg',
      description:"child",
    },

    {
      id:"5",
      header:"“Children are our country's most valuable resource.” ",
      src: SalesforceNoob + '/SalesforceImages/NGO2.jpg',
      description:"child",
    }
  ]
  handleNavigateProvider() {
    console.log('eneter to naviagte');
        let cmpDef = {
            componentDef: "c:Zh_Donorform"
          };
      
          let encodedDef = btoa(JSON.stringify(cmpDef));
          this[NavigationMixin.Navigate]({
            type: "standard__webPage",
            attributes: {
              url: "/one/one.app#" + encodedDef
            }
          });
}
handleNavigateReceiver(){
  console.log('eneter to naviagte');
  let cmpDef = {
      componentDef: "c:zhReceiverComponent"
    };

    let encodedDef = btoa(JSON.stringify(cmpDef));
    this[NavigationMixin.Navigate]({
      type: "standard__webPage",
      attributes: {
        url: "/one/one.app#" + encodedDef
      }
    });
}
 
}