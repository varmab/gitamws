MongoDB Training Lab 1
Starting the Mongo server
1)	Connect to the server you started using the mongo shell.
2)	Change the database you are using to the database named “training” 
3)	Echo the database name in the shell. - db
4)	Find out what mongo server you are connected to.
5)	Insert a document {_id:1, test: true} into a collection named “lab1” 
db.lab1.insert({_id:’1’, test:’true’})
6)	In the shell, show the collections you have in the “training” database
show collections
Writing Documents
1)	Start a mongo server if you do not have one running already.
2)	Connect to your mongo instance from the mongo shell. 
3)	Switch to using the database “training”.
4)	In the following steps, all documents will be in a collection named “cr”
5)	Create a document with an _id field set to 1 using the insert command
db.cr.insert({_id:’1’})
6)	Create a document with the same id, and insert it using the insert command
7)	Observe the error. 
a.	How can you avoid such error?
8)	Create a document with and id field set to 2 and save it using the save command
db.cr.save({_id:’2’})
 
9)	Run the same command again. Observe the results echoed in the screen. What is different among the first run and second run of saving the same document?
10)	Add a field to ALL the documents in the collection. Name the field “added” with a Boolean value of true.
db.cr.updateMany({},{$set:{added:’true’}})
11)	How can you tell that all documents were updated without querying?
12)	Query the collection to ensure you updated all documents.
13)	Update the document with _id of 1.
Create a new field named tags with an array containing the values: 1, 2, and 3.
db.cr.update({_id:’1’},{$set:{tags:[1,2,3]}})
14)	Update the same document, and add the number 4 to the tags array. Do this without replacing the whole array.
db.cr.update({_id:’1’},{$set:{tags:4}})
15)	Query to ensure the document now has 4 elements.
16)	Update the same document, and remove the first 2 elements from it. 
Query to ensure the document *does not* contain values 1 and 2 anymore.
db.cr.update({_id:'1'},{$pull:{tags:{$in:[1,2]}}})
A new feature requires you to have the number of tags in the array handy and pre-calculated. Each time you add a tag, you will need to update the tag count.
1)	Add a counter field named “count” to all documents
2)	Set the value of the field count to the number of tags in each document. Do that separately (a query to target and update each document manually).
3)	Now to *every* document in the cr collection:
a.	Add an item 'a' into the tags array:
b.	Increment the tag count in the count field
c.	Do so in one update command for all documents and both operations simultaneously.
4)	Check your work to ensure you can repeat step 3 and get consistent count and array expansion.
Query
Start a Mongo server if you don’t have one running
Switch to a database “training”
Run the following to create a collection you can query on.

db.q1.save({_id: 1, name:{f:'bob',l:'smith'}, tags:['happy','west']})
db.q1.save({_id: 2, name:{f:'lex'}, tags:['north','west']})
db.q1.save({_id: 3, name:{f:'jen',l:'smith'}, tags:['awesome','happy']})
db.q1.find({tags:{$elemMatch:{{$or:{$eq:'happy',$eq:'awesome'}}},{name:1,_id:0})

1)	Find in the q1 collection to find all people with the last name “smith”
=>db.q1.find({$where:function(){return(this.name.l === 'smith')}},{name:1,_id:0})
2)	Find all people who have a last name.
=>db.q1.find({$where:function(){return(this.name.l)}},{name:1,_id:0})
3)	Find all people who are tagged as happy
db.q1.find({tags:{$elemMatch:{$eq:'happy'}}},{name:1,_id:0})
4)	Find people who are either happy or awesome
db.q1.findOne({tags:{$in: ["happy","awesome"]}},{name:1,_id:0});
5)	Repeat the find() in step (4), this time returning only the first name of these people.
db.q1.findOne({tags:{$in: ["happy","awesome"]}},{'name.f':1,_id:0});
6)	Find people who do *not* have a last name (hint: use negation)
db.q1.find({$where:function(){return!((this.name.l))}},{name:1,_id:0})
7)	Return the _id only for documents  where the first name starts with ‘a’ to ‘h’
db.q1.find({$where:function(){return(this.’name.f’.charAt(0) === 'a' || this.’name.f’.charAt(0) === 'b' || this.’name.f’.charAt(0) === 'c' || this.’name.f’.charAt(0) === 'd' || this.’name.f’.charAt(0) === 'e' || this.’name.f’.charAt(0) === 'f')}},{name:1,_id:0}) - chek this code - its not correct


MongoDB Training Lab 2

You're creating a database for a small-time CRM (Customer Relationship Management) system.
1.	Create a collection of customers. 
2.	Add a new customer with a business_name of Acme, num_employees of 1200, account_value of 50000
db.cust.insert({_id:'c1',business_name:'Acme',num_employees:1200,account_value:50000})
3.	Add a new customer with a business_name of Apple, num_employees of 35100, account_value of 23000000
db.cust.insert({_id:'c2',business_name:'Apple',num_employees:35100,account_value:23000000})
4.	Add a new customer with a business_name of Ma&Pa, num_employees of 15, account_value of 1200
db.cust.insert({_id:'c3',business_name:'Ma&Pa',num_employees:15,account_value:1200})
Now, practice querying for results:
1. Select all customers with an account value of greater than 10000
=> db.cust.find({account_value:{$gt:10000}})
2. Select only names of businesses that have less than 2000 employees
=> db.cust.find({ num_employees:{$lt: 2000}},{business_name: 1,_id:0 })
3. Select all customers sorted by number of employees (ascending, or lowest to highest)
db.cust.find().sort({num_employees:1}) - for ascending
db.cust.find().sort({num_employees:-1}) - for descending
4. Select the id of customers whose business name's begin with 'A' (hint: http://docs.mongodb.org/manual/reference/operator/query/where/#op._S_where)
=>  db.cust.find({$where:function(){return(this.business_name.indexOf('A')==0)}})
Let's modify some of our records:
1. Add a rep for each record in the collection:
	For Acme, rep name: 'Wile E. Coyote', employee #: 4311
	For Apple, rep name: 'Fan Boi', employee #: 1216
	For Ma&Pa, rep name: 'Jedediah', employee #: 5918
2. Update every customer to have an active status of true
3. Update Ma&Pa to have 20 employees and an account_value of 2500
db.cust.update({_id:'c3'},{$set:{num_employees:'20',account_value:'2500'}})
4. Select the rep names of every customer
db.cust.find({},{rep_name:1,_id:0})
