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

function __addNewTransaction(transaction) {
    // Private function: not meant to be used
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