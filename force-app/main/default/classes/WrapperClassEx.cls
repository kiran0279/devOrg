public with sharing class WrapperClassEx {
     public static List<wrapper> Example()
    {
        List<Wrapper> wrapperList = new List<Wrapper>();
        List<Account> AList = [Select Id, name From Account];
        List<Contact> BList = [Select Id, name From Contact];
        List<Lead> CList = [Select Id, name From Lead];
        List<Opportunity> DList = [Select Id, name From Opportunity];

        for(Account a : AList )
        {
            wrapper w = new wrapper(a);
            wrapperList.add(w);
        }
        for(Contact b : BList )
        {
            wrapper w = new wrapper(b);
            wrapperList.add(w);
        }
        for(Lead c : CList )
        {
            wrapper w = new wrapper(c);
            wrapperList.add(w);
        }
        for(Opportunity d : DList )
        {
            wrapper w = new wrapper(d);
            wrapperList.add(w);
        }
        System.debug('all List : '+wrapperList);
        return wrapperList;
    }

    public class wrapper
    {
        public Account a;
        public Contact b;
        public Lead c;
        public Opportunity d;

        public wrapper(Account a)
        {
            this.a = a;
        }

        public wrapper(Contact b)
        {
            this.b = b;
        }

        public wrapper(Lead c)
        {
            this.c = c;
        }
       public wrapper(Opportunity d)
        {
            this.d = d;
        }

    }
}