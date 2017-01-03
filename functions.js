/*
================================
================================
================================
*/ 

var testTransaction = {
  date: new Date(),
  account: 'Cash on hand',
  category: 'Test',
  amount: 5,
  description: 'Just a test transaction'
};

var testAccount = "Cash on hand";

/*
var testFilter = (i) => {
    return (i.amount > 3);
}
*/

var testFilter = (i) => {
    let date1 = Date.parse("January 1, 2017");
    let date2 = Date.parse("January 4, 2017");
    return (
        Date.parse(i.date) >= date1 &&
        Date.parse(i.date) <= date2
    );
}

function testQuery() {
    transactions = getTransactions(testFilter);
    return (
        transactions.reduce(function(sum, trans) {
            return sum + trans.amount;
        }, 0)
    );
}

//addNewTransaction(testTransaction);
//addNewEntry('accounts', testAccount);
//console.log(getTransactions(testFilter));
//console.log(getEntry('accounts', testAccount));
console.log(testQuery());
//resetDatabase();
