public with sharing class PE_FeedbackController {
    @AuraEnabled
    public static void saveFeedback(Map<String, Object> feedbackData) {
        System.debug('Received feedbackData: ' + feedbackData);
        Id userId = UserInfo.getUserId();
        try {
            
            Customer_Feedback__c newFeedback = new Customer_Feedback__c(
                Name = (String)feedbackData.get('customerFeedbackName'),
                Feedback_Type__c = (String)feedbackData.get('feedbackType'),
                Description__c = (String)feedbackData.get('description'),
                Rating__c = Integer.valueOf(feedbackData.get('feedbakrating')),
                Customer__c = userId
            );

            insert newFeedback;
            System.debug('Feedback record inserted successfully');
        } catch (Exception e) {
            System.debug('Error while inserting feedback record: ' + e.getMessage());
            // You can also rethrow the exception if needed
            // throw e;
        }
    }

    @AuraEnabled
    public static void sendEmail(Map<String, Object> feedbackData) {
    
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        email.setToAddresses(new String[] { 'nargish.pravin@raagvitech.com' });
        email.setSubject('Customer\'s Feedback'); // Combine feedbackType and description in the subject
    
        email.setPlainTextBody('The Customer Submitted feedback!\n\nCustomer Name : '+(String)feedbackData.get('customerFeedbackName')+'\nFeedback Type : ' + (String)feedbackData.get('feedbackType') + '\nDescription: ' + (String)feedbackData.get('description'));
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] { email });
    }

}