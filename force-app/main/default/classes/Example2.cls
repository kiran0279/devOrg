public class Example2 {
 @InvocableMethod(label='Get Contact details') 
    public static List<Contact> getContact(List<id> contactId)
    {
        List<Contact> conList = new List<Contact>();
        contact con =[SELECT Id, FirstName, LastName, Email, Phone FROM Contact WHERE Id IN: contactId];
        conList.add(con);   
        return conList;
    }
}