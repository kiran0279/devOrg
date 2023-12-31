public class FileUploaderClass {
    @AuraEnabled  
    public static String uploadfiles(Job_Application__c jobApplication, string file, string fileName) 
    { 
        string jobApplicationNumber;   
      try{  
        Insert jobApplication;
        jobApplicationNumber = jobApplication.Name;
        String base64File = EncodingUtil.urlDecode(file, 'UTF-8');     
        ContentVersion contentVersionRec = new ContentVersion();  
        contentVersionRec.Title = fileName;  
        contentVersionRec.PathOnClient = '/' + fileName;  
        contentVersionRec.FirstPublishLocationId = jobApplication.Id;  
        contentVersionRec.VersionData = EncodingUtil.base64Decode(base64File);  
        contentVersionRec.IsMajorVersion = true;  
        Insert contentVersionRec;  
      } catch(Exception ex){  
        system.debug('Exception===>'+ex.getMessage());  
      }  
      return jobApplicationNumber;
    } 
}