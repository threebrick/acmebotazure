var restify = require('restify');
var builder = require('botbuilder');
var XmlDocument = require('xmldoc').XmlDocument;
var request = require("request");
//var parseString = require('xml2js').parseString;
var util = require("util");
var http = require('http');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
//    appId: process.env.MICROSOFT_APP_ID,
//    appPassword: process.env.MICROSOFT_APP_PASSWORD
//     appId: '54fb320f-3ef6-4a95-b058-b2f53e08e208',
//    appPassword: 'T2CN90g05LjoJAPxtc6tVpp'


    appId: '2ada3b5a-69f4-43c6-9ac0-0ddd1c181f63',
    appPassword: '1Vn1uwsvpZqH6oQg4iTBW0V'
});

// Listen for messages from users 
//server.post('/api/messages', connector.listen());
//server.post('https://lit-oasis-88868.herokuapp.com/api/messages', connector.listen());

server.post('https://rpabot.azurewebsites.net/api/messages', connector.listen());

// Create LUIS recognizer that points at our model and add it as the root '/' dialog for our Cortana Bot.
var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/5083304d-4464-4d0d-b879-fd81bdf9fa05?subscription-key=32ed7dd369e74995af7f62b6c891d266&verbose=true';
var recognizer = new builder.LuisRecognizer(model);

var bot = new builder.UniversalBot(connector);
// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });
//var bot = new builder.UniversalBot(connector, function (session) {
//    session.send("You said: %s", session.message.text);
//});

bot.dialog('/', dialog);

dialog.onBegin(function (session, args, next) {
    session.send("Hi... Welcome to Acme Bank.  How can I assist you today?");
   // next();
});

// Add intent handlers
dialog.matches('Pay Mortgage', [
     function (session) {
        session.send('I can help you pay off your mortgage! First let me get some information from you.');

        // try extracting entities
 //       var cityEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'builtin.geography.city');
 //       var airportEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'AirportCode');
 //       if (cityEntity) {
            // city entity detected, continue to next step
 //           session.dialogData.searchType = 'city';
 //           next({ response: cityEntity.entity });
 //       } else if (airportEntity) {
            // airport entity detected, continue to next step
 //           session.dialogData.searchType = 'airport';
 //           next({ response: airportEntity.entity });
 //       } else {
            // no entities detected, ask user for a destination
 //           builder.Prompts.text(session, 'Please enter your destination');
 //       }
        session.beginDialog('/authenticate');
}
]);

dialog.matches('Get Account Information', [
    function (session) {
        //session.send('I can help you get account information! First let me get some information from you.We are analyzing your message: \'%s\'', session.message.text);
        session.send('I can help you get account information! First let me get some information from you.');
        // try extracting entities
//        var cityEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'builtin.geography.city');
//        var airportEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'AirportCode');
//        if (cityEntity) {
            // city entity detected, continue to next step
//            session.dialogData.searchType = 'city';
//            next({ response: cityEntity.entity });
//        } else if (airportEntity) {
            // airport entity detected, continue to next step
//            session.dialogData.searchType = 'airport';
//            next({ response: airportEntity.entity });
//        } else {
            // no entities detected, ask user for a destination
//            builder.Prompts.text(session, 'Please enter your destination');
//        }
        session.beginDialog('/authenticate');
}
    
]);

//dialog.onDefault(builder.DialogAction.send("I'm sorry I didn't understand. I can only get account information & help pay off mortgages."));
dialog.onDefault(function (session) {
        // Send a greeting and show help.
        
        session.send("We did not recognize your input!  Sorry, we are routing you to a customer service rep.");


try 
        {           
            
// Begin HTTP Code
savedAddress = session.message.address;

  console.log(savedAddress);

  console.log("Id - " + session.message.address.id);
  console.log("Channel Id - " + session.message.address.channelId);
  console.log("User Id - " + session.message.address.user.id);
  console.log("User Name - " + session.message.address.user.name);
  console.log("Conversation Id - " + session.message.address.conversation.id);
  console.log("Bot Id - " + session.message.address.bot.id);
  console.log("Bot Name - " + session.message.address.bot.name);
  console.log("ServiceURL - " + session.message.address.serviceUrl);

                http.get("http://www.threebrick.com/rpa/agentTransfer.php?customerId=$RoutetoAgent_5673434&id=" + session.message.address.id + '&channelid=' + session.message.address.channelId + '&username=' + session.message.address.user.name + '&userid=' + session.message.address.user.id + '&conversationid=' + session.message.address.conversation.id + '&botid=' + session.message.address.bot.id + '&botname=' + session.message.address.bot.name + '&serviceurl=' + session.message.address.serviceUrl + "$", function (response) {
			      
                    
			
 //                message2 = 'Try accessing this url ';
 // message2 += 'http://localhost/agentapp/session_details.php?id=' + session.message.address.id + '&channelid=' + session.message.address.channelId + '&username=' + session.message.address.user.name + '&userid=' + session.message.address.user.id + '&conversationid=' + session.message.address.conversation.id + '&botid=' + session.message.address.bot.id + '&botname=' + session.message.address.bot.name + '&serviceurl=' + session.message.address.serviceUrl;
 // session.send(message2);  
                 

                   
        
                }) // end http code

// End HTTP Code



        } //End of try 
        catch (e) 
        { session.send("Whoops, that didn't match! Try again."); }





        
        
    })


bot.dialog('/authenticate', [
    function (session) 
    {

            builder.Prompts.text(session, "Please enter your Customer ID");

        
    },
    
    
        
    function (session, results) {

        // capture location

        //Try to read in a string of "weather City, ST"
            var custID = session.message.text;
    
            
            console.log(custID);
                             
            
                            //set user's global customer ID 
            session.userData.customerID = custID;
            

            session.beginDialog('/customer info');

        
    }
]); //End of ‘/weather’ dialog waterfall 
bot.beginDialogAction('authenticate', '/authenticate');   // <-- no 'matches' option means this can only be triggered by a button.



bot.dialog('/customer info', [
	
	
	
	function (session)      //WeatherUnderground API 
    {

    //var subCatID = 41;	
    console.log("Customer ID - " + session.userData.customerID);
    
	
    try 
        {           
            
            request("http://eydev.pegatsdemo.com:8080/prweb/PRRestService/RPABot/Services/CustomerService?custid=" + session.userData.customerID, function(error, response, body) {
    
            console.log("XML - " + body);
            
            // Begin XML Parsing Code

            // Parse the XML
  var results = new XmlDocument(body);

  // Demonstrate toString() with an option to abbreviate long strings and compress the output
  console.log("Parsed: \n%s", results.toString({trimmed:true, compressed:true}));

  // Pull out the <books> node
  //var books = results.childNamed("books");
  var Customer = results.childNamed("Customer");

  var Account = results.childNamed("Account");

  // Demonstrate firstChild/lastChild
  //console.log("First book has ISBN '%s', last book has ISBN '%s'", books.firstChild.attr.isbn, books.lastChild.attr.isbn);
 // console.log("First customer account '%s', last customer account attribute has ISBN '%s'", Customer.firstChild.val.Name, Customer.lastChild.val.Email);

  // Print out the ISBNs
  //books.eachChild(function (book) {
  //  console.log("Found book with ISBN '%s'", book.attr.isbn);
//});

  // Print out Customer Account Info - Acct No, Name, Email, Phone
  Customer.eachChild(function (Account) {
    console.log("Found accounts numbers '%s'", Account.val);
  });

  // Look for all children with a certain node name
  var allAccounts = Customer.childrenNamed("Account");

  // The result is an array of <book> XmlElement instances
  console.log("Found %s accounts.", allAccounts.length);

//  console.log("Accounts.", allAccounts.valueWithPath("Type"));

var customerName = Customer.valueWithPath("Name");
var customerID = Customer.valueWithPath("ID");
var customerEmail = Customer.valueWithPath("Email");

var accountNumber = Customer.valueWithPath("Account.ID");

var accountType = Customer.valueWithPath("Account.Type");

var transactionID = Customer.valueWithPath("Account.Transaction.ID");

var transactionAmount = Customer.valueWithPath("Account.Transaction.Amount");

console.log("Customer Name - " + customerName);
console.log("Customer ID - " + customerID);
console.log("Customer Email - " + customerEmail);


console.log("Account Number - " + accountNumber);

console.log("Account Type - " + accountType);

console.log("Transaction ID - " + transactionID);

console.log("Transaction Amount - " + transactionAmount);


            // End XML Parsing Code    

            // Start Receipt Code

            var msg = new builder.Message(session)
            .attachments([
                new builder.ReceiptCard(session)
                    .title("Account Holder: " + customerName)
                    .items([
                   //     builder.ReceiptItem.create(session, "$22.00", "Screen shot").image(builder.CardImage.create(session, "https://upload.wikimedia.org/wikipedia/commons/a/a0/Night_Exterior_EMP.jpg"))
                   //     builder.ReceiptItem.create(session, "$22.00", "Space Needle").image(builder.CardImage.create(session, "https://upload.wikimedia.org/wikipedia/commons/7/7c/Seattlenighttimequeenanne.jpg"))
                    ])                    
                    .facts([
                        builder.Fact.create(session, customerID, "Acct No."),
                        builder.Fact.create(session, customerEmail, "Email"),
                        builder.Fact.create(session, allAccounts.length, "No. of Accts.")
                    ])
                 //   .tax("$4.40")
                 //   .total("$48.40")
            ]);
        session.send(msg);

            // End Receipt Code

            // Next Steps Code

            var msg = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachments([
                new builder.HeroCard(session)
                    
                 //   .text("Does this help?")
                    
                    .buttons([
                        builder.CardAction.dialogAction(session, "account details", null, "Account Details"),
                        builder.CardAction.dialogAction(session, "make a payment", null, "Make a Payment"),
                        
                        builder.CardAction.dialogAction(session, "main menu", null, "Main Menu")
                    ])
            ]);
        session.send(msg);

            // Next Steps Code


            });



        } //End of try 
        catch (e) 
        { session.send("Whoops, that didn't match! Try again."); }
		
        
    session.endDialog();
    } //End of WeatherUnderground API function
	
]);
bot.beginDialogAction('customer info', '/customer info'); // <-- no 'matches' option means this can only be triggered by a button.




bot.dialog('/account details', [
    function (session) {

    //   session.userData.faqTest = "startFAQ"; 

        
        session.endDialog("You have reached the end of the demo for today!");
    }
]);
bot.beginDialogAction('account details', '/account details'); 


server.get('/', restify.serveStatic({
 directory: __dirname,
 default: '/index.html'
}));