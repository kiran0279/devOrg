public with sharing class AccountTeamHandler {
    @AuraEnabled(cacheable=true)

    public static List<AccountTeamMember> findAccountTeamMember(){

      List<AccountTeamMember> acct=[SELECT AccountId, Id, User.Name, User.FullPhotoUrl,
                                    User.AboutMe, TeamMemberRole 
                                    FROM 
                                    AccountTeamMember 
                                    WHERE AccountId='0015i00000Y8e1EAAR'] ;

        System.debug('wert'+ acct);
        for(AccountTeamMember a:acct){
           System.debug('acctfwetjmname'+a.User.Name); 
        }
        
   return acct;
    }
}