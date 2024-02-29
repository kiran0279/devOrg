public class userController {
    @AuraEnabled
    public static String registerUser(Map<String, Object> newUser) {
        String result = 'Error';

        try {
            User u = new User(
                FirstName = (String) newUser.get('Name'),
                LastName = 'LastName', // You can modify this based on your requirement
                Email = (String) newUser.get('Email'),
                Username = (String) newUser.get('Email'),
                Alias = 'Alias', // You can modify this based on your requirement
                CommunityNickname = 'Nickname', // You can modify this based on your requirement
                ProfileId = '00e5g000004zs0pAAA', // You need to specify a Profile Id
                TimeZoneSidKey = 'America/New_York', // You can modify this based on your requirement
                LocaleSidKey = 'en_US', // You can modify this based on your requirement
                EmailEncodingKey = 'UTF-8', // You can modify this based on your requirement
                LanguageLocaleKey = 'en_US', // You can modify this based on your requirement
                IsActive = true
            );
            insert u;

            String password = (String) newUser.get('Password');
            system.setPassword(u.Id, password );
            //u.set('Password', password);


            result = 'Success';
        } catch (Exception e) {
            // Handle exceptions
            result = e.getMessage();
        }

        return result;
    }
}
