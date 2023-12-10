/*
Class : PlaceExplorerApp
*/

public with sharing class PlaceExplorerApp {
    
    @AuraEnabled
    public static WrapperClassForDistTime calculateDistanceAndTime(Double lat, double lon, string objId){
        try {
            System.debug('the lat value-->'+lat+'    The long value-->'+lon);
            Place__c objRec = [SELECT id, Coordinates__c FROM Place__c WHERE Id=: objId LIMIT 1];

            // Instantiate new Location objects and compute the distance between them in different ways.
            Location loc = Location.newInstance(lat,lon);
            Double dist = Location.getDistance(loc, objRec.Coordinates__c, 'km');
            System.debug('the distance-->'+dist);
            WrapperClassForDistTime wrap = new WrapperClassForDistTime();
            wrap.totalTime = String.valueOf(dist/40);
            wrap.distance = dist;
            return wrap;
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
}