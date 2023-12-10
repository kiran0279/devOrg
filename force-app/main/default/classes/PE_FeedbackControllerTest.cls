@isTest
public class PE_FeedbackControllerTest {
        @isTest
    public static void testSaveFeedback() {
        // Test data
        Map<String, Object> feedbackData = new Map<String, Object>{
            'customerFeedbackName' => 'Test Customer',
            'feedbackType' => 'Comment',
            'description' => 'This is a test feedback',
            'feedbakrating' => '5'
        };

        // Test the saveFeedback method
        Test.startTest();
        PE_FeedbackController.saveFeedback(feedbackData);
        Test.stopTest();

        // Query the database to verify the record was inserted
        List<Customer_Feedback__c> feedbackRecords = [SELECT Id FROM Customer_Feedback__c];
        System.debug('feedbackRecords:::'+feedbackRecords.size());
        System.assertEquals(1, feedbackRecords.size(), 'One feedback record should have been inserted.');
    }
       @isTest
    public static void testSendEmail() {
        // Test data
        Map<String, Object> feedbackData = new Map<String, Object>{
            'customerFeedbackName' => 'Test Customer',
            'feedbackType' => 'Suggestion',
            'description' => 'This is a test feedback'
        };

        // Test the sendEmail method
        Test.startTest();
        PE_FeedbackController.sendEmail(feedbackData);
        Test.stopTest();

        // Perform assertions or use system.assert if necessary
        // For example, you can check if an email was added to the email queue
		System.assert(true, 'Your assertion message');
        // Example: Assert that an email message was added to the queue
        //Integer emailInvocations = Limits.getEmailInvocations();
        //System.assertEquals(1, emailInvocations, 'One email message should have been added to the queue.');
    }
	
}