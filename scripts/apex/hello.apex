// Use .apex files to store anonymous Apex.
// You can execute anonymous Apex in VS Code by selecting the
//     apex text and running the command:
//     SFDX: Execute Anonymous Apex with Currently Selected Text
// You can also execute the entire file by running the command:
//     SFDX: Execute Anonymous Apex with Editor Contents

string tempvar = 'Enter_your_name_here';
System.debug('Hello World!');
System.debug('My name is ' + tempvar);

for(Place__c place : [SELECT Id, Name, Rating__c, Image__c, Address__c, Description__c	 FROM Place__c WHERE Address__c INCLUDES ('Hy')]){
    system.debug(place);
        }