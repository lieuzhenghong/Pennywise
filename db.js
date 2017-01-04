'use strict';
/*
Transaction schema:
    date (unix epoch)
    account
    category
    subcategory (optional)
    amount 
    description (optional)
*/

const low = require('lowdb');
const fs = require('fs'); //Filesystem 

const database_fp = 'lieu.json';
const db = low(database_fp);

db.defaults({
    transactions: [], 
    accounts: [], 
    categories: [],
    subcategories: [] 
}).value()

// Get all transactions according to Boolean condition
function getTransactions(filter) {
    // For all transactions, if filter is true,
    // append the array
    // Return array of Transaction objects
    return (
    db.get('transactions')
    .filter(filter)
    .value()
    );
}

function __addNewTransaction(transaction) { // Private function
    addNewEntry('accounts', transaction.account);
    addNewEntry('categories', transaction.category);
    addNewEntry('subcategories', transaction.subcategory);
    return (
        db.get('transactions')
        .push(transaction)
        .value()
    );
}

function addNewTransaction(transactions) {
    if (typeof(transactions) === 'array') {
        transactions.forEach(function(transaction) {
            __addNewTransaction(transaction); 
        }, this);
    }
    else {
        __addNewTransaction(transactions);
    }
}

function getEntry(entry_type, entry_name) {
    return (
        db.get(entry_type)
        .filter((o)=> {return (o === entry_name)})
        .value()
    );
}

function addNewEntry(entry_type, entry_name) {
    if (getEntry(entry_type, entry_name).length === 0) {
        return(db.get(entry_type).push(entry_name).value());
    }
    /*
    if (db.get(entry_type).indexOf(entry_name).value() === -1) {
        db.get(entry_type).push(entry_name).value();
    }
    */
    else {
        console.log('already exists');
        return('already exists');
    }
}

function resetDatabase(){
    fs.unlink(database_fp);
}
/*
================================
================================
================================
*/ 

/*
function importData(file) {
    // Take that file and do something to it
    data = ...;
    addNewTransaction(data);   
}
*/

function dateFilter(transaction, date, operator) {
    // operator can be !=, >=, >, etc
    if (operator != "!=" && 
        operator != "===" &&
        operator != "==" &&
        operator != "<=" &&
        operator != "<" &&
        operator != ">=" &&
        operator != ">" ) {
            return ("invalid operator");
        }
    return (
        eval("Date.parse(transaction.date)" + operator + "date")
    );
}

function propertyFilter(transaction, property, property_to_filter) {
    return (
        transaction[property] === property_to_filter
    )
}

function sum(transactions) {
    return (transactions.reduce((sum, trans) => sum + trans.amount , 0));
}

function query(filter_array, fn) {
    // filter_array = [ [dateFilter, [args]], "&&", "!", [filter2, [args]]... ]

    // Concatenating all the filters together
    let filter = function(o) {
        var final_value = "";
        filter_array.forEach( (filter) => {
            if (filter !== "&&" && filter !== "||" && filter !== "!" ) {
                // ES6 spread syntax; too clever for me
                // Calls the function ([0]) with the arguments ([1])
                final_value += filter[0](o, ...filter[1])
            }
            else 
            {
                final_value += filter
            }
        });
        console.log(final_value);
        console.log(eval(final_value));
        return (eval(final_value));
    };

// Handling optional parameter (the callback function)
    if (fn !== undefined) {
        return (
            fn(getTransactions(filter))
        );
    }
    else {
        return getTransactions(filter);
    }
}


/*
==============================
==============================
==============================
Testing
*/

var testTransaction = {
  date: new Date(),
  account: 'Cash on hand',
  category: 'Test',
  amount: 5,
  description: 'Just a test transaction'
};

var testAccount = "Cash on hand";

var testFilter = [ 
    [propertyFilter, ['account', "Cash on hand"]], 
    "||", 
    [propertyFilter, ['category', 'test']],
    "||",
    [dateFilter, [Date.now(), ">"]]
];

//addNewTransaction(testTransaction);
//addNewEntry('accounts', testAccount);
//console.log(getTransactions(testFilter));
//console.log(getEntry('accounts', testAccount));
console.log(query(testFilter, sum));
console.log(query(testFilter));
//resetDatabase();