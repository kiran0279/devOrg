/**
 * @description       : 
 * @author            : Saikiran Chintakayala
 * @group             : 
 * @last modified on  : 05-26-2022
 * @last modified by  : Saikiran Chintakayala
**/
global with sharing class saveFiles {
    @AuraEnabled  
   global static string saveApplication(Job_Application__c jobApplictiondata, string file, string fileName) {  
     string applicationNumber;  
     try{  
       Insert jobApplictiondata;  
       System.debug('@@@@@@@@@ :'+applicationNumber);
       System.debug('app Id :'+jobApplictiondata.Id);
       Job_Application__c jobApp = [SELECT Id, Name From Job_Application__c
                                    WHERE Id =:jobApplictiondata.Id ];
      applicationNumber = String.valueOf(jobApp.Name);  
       String base64File = EncodingUtil.urlDecode(file, 'UTF-8');     
       ContentVersion contentVersionRec = new ContentVersion();  
       contentVersionRec.Title = fileName;  
       contentVersionRec.PathOnClient = '/' + fileName;  
       contentVersionRec.FirstPublishLocationId = jobApplictiondata.Id;  
       contentVersionRec.VersionData = EncodingUtil.base64Decode(base64File);  
       contentVersionRec.IsMajorVersion = true;  
       Insert contentVersionRec;  
     } catch(Exception ex){  
       system.debug('Exception===>'+ex.getMessage());  
     }  
     System.debug('applicationNumber :'+applicationNumber);
     return applicationNumber;  
   }    
}