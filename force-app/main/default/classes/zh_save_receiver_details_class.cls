public with sharing class zh_save_receiver_details_class {
    @AuraEnabled  
   public static string saveApplication(zh_Receivers__c jobApplictiondata) {  
     string applicationNumber;  
     try{  
        System.debug('jobApplictiondata :'+jobApplictiondata);
       Insert jobApplictiondata; 
       System.debug('app Id :'+jobApplictiondata.Id);
       zh_Receivers__c jobApp = [SELECT Id, Name,zh_Receiver_Unique_Id__c From zh_Receivers__c
                                    WHERE Id =:jobApplictiondata.Id ];
      applicationNumber = String.valueOf(jobApp.zh_Receiver_Unique_Id__c);
      //applicantName = String.valueOf(jobApp.Name);  

      //List<zh_Receiver__c> ReceiverDetails = new List<zh_Receiver__c>(zh_Receiver_Unique_Id__c = applicationNumber,
      //Name = applicantName);
      //  String base64File = EncodingUtil.urlDecode(file, 'UTF-8');     
      //  ContentVersion contentVersionRec = new ContentVersion();  
      //  contentVersionRec.Title = fileName;  
      //  contentVersionRec.PathOnClient = '/' + fileName;  
      //  contentVersionRec.FirstPublishLocationId = jobApplictiondata.Id;  
      //  contentVersionRec.VersionData = EncodingUtil.base64Decode(base64File);  
      //  contentVersionRec.IsMajorVersion = true;  
      //  Insert contentVersionRec;  
     } catch(Exception ex){  
       system.debug('Exception===>'+ex.getMessage());  
     }  
     System.debug('applicationNumber :'+applicationNumber);

     return  applicationNumber;  
   }
}