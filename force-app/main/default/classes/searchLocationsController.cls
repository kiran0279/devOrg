public with sharing class searchLocationsController {
   
    @AuraEnabled(cacheable=TRUE)
    public static List<Place__c> searchAccountNameMethod (String placeName){
        System.debug('placeName'+placeName);
        if(placeName != '')
        {
        String keyNameString = '%' +  placeName + '%';
            
        List<Place__c> placeList = [SELECT Id, Name, Rating__c, Image__c, Address__c, Description__c,Address__City__s	 FROM Place__c WHERE (Name LIKE:keyNameString OR Address__City__s LIKE:keyNameString)];
        System.debug('placeList'+placeList);
        RETURN placeList;
        }
        else {
            Return Null;
        }
    }    
     
    @AuraEnabled(cacheable=TRUE)
    public static List<WrapperClass> getRecords(String header, Double lat, double lon){
        List<WrapperClass> wrapList = new List<WrapperClass>();
        if(String.isNotBlank(header)){
                for (Place__c place : [SELECT Id, Name, Rating__c, Image__c, Address__c, Description__c,Address__City__s FROM Place__c WHERE Type__c = :header]) {
                    WrapperClassForDistTime obj = calculateDistanceAndTime(lat,lon,place.Id);
                    WrapperClass wrapObj = new WrapperClass();
                    wrapObj.totalTime = obj.totalTime;
                    wrapObj.distance = obj.distance;
                    wrapObj.rating = place.Rating__c;
                    wrapObj.imgUrl = place.Image__c;
                    wrapObj.description = place.Description__c;
                    wrapObj.name = place.Name;
                    wrapList.add(wrapObj);
                }
                return wrapList;
        }
        return null;
    }
    @AuraEnabled
    public static WrapperClassForDistTime calculateDistanceAndTime(Double lat, double lon, string objId){
        try {
            System.debug('the lat value-->'+lat+'    The long value-->'+lon);
            Place__c objRec = [SELECT id, Coordinates__c FROM Place__c WHERE Id=: objId LIMIT 1];
            System.debug('the distance---->'+objRec.Coordinates__c);
            // Instantiate new Location objects and compute the distance between them in different ways.
            WrapperClassForDistTime wrap = new WrapperClassForDistTime();
            if (objRec.Coordinates__c != null) {
                Location loc = Location.newInstance(lat,lon);
                Decimal dist = Location.getDistance(loc, objRec.Coordinates__c, 'km');
                System.debug('the distance-->'+dist);
                Decimal tinMin= (dist/40)*60;
                wrap.totalTime = string.valueOf(tinMin.setScale(2));
                wrap.distance = dist.setScale(2);
                return wrap;
            }else {
                wrap.distance = 0;
                wrap.totalTime = '';
                return wrap;
            } 
            
        } catch (Exception e) {
           System.debug('the exception occured at line:22-->'+e.getMessage());
           return null;
        }
    }

    public class WrapperClassForDistTime{
        @AuraEnabled
        public String totalTime;

        @AuraEnabled
        public Double distance;
    }

    public class WrapperClass{
        @AuraEnabled
        public String totalTime;

        @AuraEnabled
        public Double distance;

        @AuraEnabled
        public String name;

        @AuraEnabled
        public String description;
        
        @AuraEnabled
        public Double rating;

        @AuraEnabled
        public String imgUrl;

       
    }

}