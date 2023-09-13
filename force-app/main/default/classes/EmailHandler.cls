public with sharing class EmailHandler {
    @AuraEnabled 
    public static void sendEmail(List<String> toAddress, String subject, String body, String fromaddress) {      
        Messaging.reserveSingleEmailCapacity(1);
        try{
        messaging.SingleEmailMessage mail = new messaging.SingleEmailMessage();
        
        System.debug(toAddress);
        System.debug(body);
        System.debug(subject);
        mail.setToAddresses(toAddress);
        mail.setReplyTo(fromaddress);
        mail.setSenderDisplayName('Message from lwc custom component : ');
        mail.setSubject(subject);
        mail.setHtmlBody(body);
        Messaging.sendEmail(new List<messaging.SingleEmailMessage> {mail});
        }
        catch (exception e){
            throw new AuraHandledException(e.getMessage());
            //return null;
        }
    }
}