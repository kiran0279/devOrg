public class DeleteContactInvocable {
    @InvocableMethod
    public Static void DeleteContacts(List<List<Contact>> conList)
    {
        List<Contact> conLst = new List<Contact>();
        for(Contact con : conList[0])
        {
            conLst.add(con);
        }
        delete conLst;
    }

}