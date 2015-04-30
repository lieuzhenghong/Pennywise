var ACTIVETAB = '';
var TRANSACTIONS = [];
var ACCOUNTS = [];



function hideForm (){
    document.getElementById('form').style.display = 'none';
    document.getElementById('new-transaction-button').style.display = 'block';
    document.getElementById('save-button').style.display = 'none';
    document.getElementById('table-holder').style.display = 'block'; 
}

function showForm(){
    document.getElementById('form').style.display = 'block';
    document.getElementById('new-transaction-button').style.display = 'none';
    document.getElementById('save-button').style.display = 'block';
    document.getElementById('table-holder').style.display = 'none'; 
}

function addAccount(){
    var accountName = prompt('Give a name to your own account:');
    ACCOUNTS.push(accountName);
    renderTabs();
}

function renderTabs(){
    document.getElementById('accounts').innerHTML = "cleared";

    /*
    console.log(ACCOUNTS);
    ACCOUNTS.map(function(account){
        document.getElementById('accounts').innerHTML += "<li class = 'account-tab'><a href =" + "'#account'>" + account + "</a></li>";
    });
    
    document.getElementById('accounts').innerHTML += "<li class = 'account-tab'><a onclick = 'addAccount()'>" + "create new account" + "</a></li>";
    */
}

/*
(function() {
    
    var temp = document.getElementsByClassName('account-tab');
    console.log(temp);
    console.log(temp.length); //????

    var temp2 = [];
    for (var i = 0; i < temp.length; i++){
        console.log('for loop is running!');
        temp2[i] = temp[i];
    }
    
    
})();*/


function addTransaction() {
    showForm();
    pushInputData();
}

function pushInputData() {
    var inputs = [];
    var transaction = {};
    
    inputs = document.getElementsByTagName('input');

    var date = new Date();
    var d = date.toDateString();

    transaction.date = date;
    transaction.readable_date = d;

    transaction.name = inputs[0];
    transaction.amount = inputs[1];
    transaction.category = inputs[2];
    
    TRANSACTIONS.push(transaction);

}

function saveTransaction(){
    drawTable();
    hideForm();
}

function drawTable() {
    
    console.log('drawing table');
    console.log(TRANSACTIONS);
    
    var table = document.getElementById('recent-transactions');
    table.innerHTML = '<tr><th>date</th><th>name</th><th>amount</th><th>category</th><th>edit</th></tr>';
    
    TRANSACTIONS.map(function(transaction){        
        table.innerHTML += '<tr><td>' + transaction.readable_date + '</td><td>' + transaction.name.value + '</td><td>' + '$' + transaction.amount.value + '</td><td>' + transaction.category.value + '</tr>';
    });
}

function findMonthlyTotal() {
    date = new Date();
    month = date.getMonth();
}