public with sharing class zh_save_Provider_class {
    @AuraEnabled  
   public static string saveApplication(zh_Providers__c jobApplictiondata, string file, string fileName) {  
     string applicationNumber;  
     try{  
        System.debug('jobApplictiondata :'+jobApplictiondata);
       Insert jobApplictiondata;  
       System.debug('@@@@@@@@@ :'+applicationNumber);
       System.debug('app Id :'+jobApplictiondata.Id);
       zh_Providers__c jobApp = [SELECT Id, Name,zh_Unique_Id__c From zh_Providers__c
                                    WHERE Id =:jobApplictiondata.Id ];
      applicationNumber = String.valueOf(jobApp.zh_Unique_Id__c);  
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