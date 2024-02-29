import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
/* import IMAGES from "@salesforce/resourceUrl/zh_static_images"; */
import IMAGE from "@salesforce/resourceUrl/theme_image";


export default class Zh_Hometab extends NavigationMixin(LightningElement) {
    pictureUrl = 'https://hackathoncom5-dev-ed.develop.lightning.force.com/lightning/r/ContentDocument/0695j00000JOppsAAD/view';
    /* companyLogo = IMAGES; */
     companyImg = IMAGE;
     get getBackgroundImage(){
      return `background-image:url("${this.companyImg}")`;
  }

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