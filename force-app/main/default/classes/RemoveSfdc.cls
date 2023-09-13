public class RemoveSfdc {

    public static void remove(){
        List<Account> acc = [SELECT Id,Name FROM Account];
        List<Account> accounts = new List<Account>();
        for(Account a : acc){
            String str = a.Name;
            String s = str.replace('sfdcpoint','');
            a.Name = s;
            accounts.add(a);
         }
        UPDATE accounts;
    }
}