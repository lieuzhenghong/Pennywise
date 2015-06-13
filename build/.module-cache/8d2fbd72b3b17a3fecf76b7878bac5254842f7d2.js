(function () {
  'use strict';

var ACCOUNTS = [
    {name: 'cash on hand'},
    {name: 'savings account'},
    {name: 'shared account'},
    {name: 'my second wallet'}
];

var TRANSACTIONS = [
    {date: '2015/05/26', name: 'Bananas', amount: 6, category: 'Groceries', account: 'cash on hand'},
    {date: '2015/05/23', name: 'Apples', amount: 2.50, category: 'Groceries', account: 'cash on hand'},
    {date: '2015/05/27', name: 'Cash withdrawal', amount: 250, account: 'savings account'}
];

var sum = 0;

var Container = React.createClass({displayName: "Container",

    getInitialState: function (){
        return {
            activeAccount: ACCOUNTS[0].name,
            transactions: TRANSACTIONS
        };
    },

    setActiveAccount: function(dat) {
        this.setState({
            activeAccount: dat  
        });
    },

    render: function () {
        return (
            React.createElement("div", {className: "container"}, 
            React.createElement("h1", null, "Pennywise"), 
            React.createElement(NavBar, {
                accounts: ACCOUNTS, 
                activeAccount: this.state.activeAccount, 
                onChange: this.setActiveAccount}
            ), 
            React.createElement(TransactionsTable, {
                transactions: this.state.transactions, 
                activeAccount: this.state.activeAccount, 
                sum: this.props.sum}
            )
            )
        );
    }
});

var AccountRow = React.createClass({displayName: "AccountRow",
  
    passOn: function() {
      this.props.onDelete(this.props.account);
    },

    handleClick: function() {
      this.props.onChange(this.props.account);
    },

    render: function () {
        return (
            React.createElement("li", {className: "button", onClick: this.handleClick}, " ", this.props.account, "   ",  
              React.createElement("i", {onClick: this.passOn, className: "fa fa-trash-o"})
            )
        )}
});

var NewAccountButton = React.createClass({displayName: "NewAccountButton",
  
  handleClick: function(e) {
    var name = React.findDOMNode(this.refs.a_name).value.trim();
    this.props.onAddNewAccount({name: name});
    React.findDOMNode(this.refs.a_name).value = '';
  },
  
  render: function () {
    return (
      React.createElement("div", null, 
      React.createElement("input", {type: "text", id: "name", placeholder: "Account name", ref: "a_name"}), 
      React.createElement("button", {className: "button-primary", onClick: this.handleClick}, 
      "Create New Account"
      )
      )
      )
  }
});

var AccountList = React.createClass({displayName: "AccountList",
  
  addNewAccount: function(account) {
    var account = account;
    
    this.setState({
      ACCOUNTS: ACCOUNTS.push(account)
    })
  },
  
  deleteAccount: function(account) {
    var index = ACCOUNTS.indexOf(account);
    
    this.setState({
      ACCOUNTS: ACCOUNTS.splice(index,1)
    })
  },

    render: function () {

        var rows = [];
        this.props.accounts.map(function(each_account) {
            rows.push(
                React.createElement(AccountRow, {
                    account: each_account.name, 
                    key: each_account.name, 
                    onChange: this.props.onChange, 
                    onDelete: this.deleteAccount}
                ));
                      }, this);
        rows.push(React.createElement(NewAccountButton, {key: 'new_account', onAddNewAccount: this.addNewAccount}));
    return (
        React.createElement("ul", null, 
        rows
        )
    )   
    }   
});


var NavBar = React.createClass({displayName: "NavBar",

    render: function () {
        return (
            React.createElement("div", {className: "row"}, 
                React.createElement("h2", null, " Accounts "), 
                React.createElement(AccountList, React.__spread({
                    accounts: this.props.accounts},  
                    this.props)
                )
            )
        )
    }
});     

var TransactionsTable = React.createClass({displayName: "TransactionsTable",
    handleTransactionSubmit: function(transaction) {
        var data = transaction;
        data.account = this.props.activeAccount;
        console.log(data);
        
        this.setState({
            TRANSACTIONS: TRANSACTIONS.push(data)
        })
    },
    
    handleTransactionDelete: function(transaction) {
        var index = TRANSACTIONS.indexOf(transaction);
        
        this.setState({
            TRANSACTIONS: TRANSACTIONS.splice(index, 1)
        })
    },
    
    render: function() {
        return (
            React.createElement("div", {className: "row"}, 
            React.createElement("h2", null, "Recent Transactions for ", this.props.activeAccount), 
            React.createElement("table", {className: "rwd-table"}, 
            React.createElement("thead", null, 
                React.createElement("tr", null, 
                    React.createElement("th", null, "date"), 
                    React.createElement("th", null, "name"), 
                    React.createElement("th", null, "amount"), 
                    React.createElement("th", null, "account"), 
                    React.createElement("th", null, "category"), 
                    React.createElement("th", null, "delete ")
                )
            ), 
                React.createElement(TransactionList, {
                    transactions: this.props.transactions, 
                    activeAccount: this.props.activeAccount, 
                    sum: this.props.sum, 
                    onTransactionDelete: this.handleTransactionDelete}
                )

            ), 
            React.createElement(TransactionForm, {onTransactionSubmit: this.handleTransactionSubmit})
            )
        )
    }
});        
        
var TransactionList = React.createClass ({displayName: "TransactionList",
  
    passOnDelete: function(transaction) {
        this.props.onTransactionDelete(transaction);
    },
    
    sumAll: function(){
      sum = 0;
      this.props.transactions.map(function(e) {sum += e.amount});
    },
    
    render: function () {

        var activeaccount = this.props.activeAccount;

        var rows = [];
        this.props.transactions.map(function(each_transaction) {
            if (each_transaction.account == activeaccount) {

                /* Very strange behaviour
                if (each_transaction account == this.props.activeAccount) 
                DOES NOT WORK, I do not know why this is the case
                
                it is due to javascript scoping of the 'this' variable
                */  

                rows.push(
                    React.createElement(TransactionRow, {
                    onTransactionDelete: this.passOnDelete, 
                    transaction: each_transaction, 
                    key: each_transaction.name}
                    )
                );  
        }
        }, this);
        
          rows.push(
            React.createElement("tr", null, 
            React.createElement("td", null, "Total"), 
            React.createElement("td", null, sum)
            )
            )

        return (
            React.createElement("tbody", null, 
            rows
            )
        )
    }
});        

var TransactionRow = React.createClass({displayName: "TransactionRow",
    
    DeleteTransaction: function( e ) {
        this.props.onTransactionDelete(this.props.transaction);
    },
    
    render: function (){
        var trans = this.props.transaction;

        return (
            React.createElement("tr", null, 
            React.createElement("td", {"data-th": "Date"}, trans.date), 
            React.createElement("td", {"data-th": "Name"}, trans.name), 
            React.createElement("td", {"data-th": "Amount"}, trans.amount), 
            React.createElement("td", {"data-th": "Account"}, trans.account), 
            React.createElement("td", {"data-th": "Category"}, trans.category), 
            React.createElement("td", {"data-th": "Delete"}, React.createElement("i", {onClick: this.DeleteTransaction, className: "fa fa-trash-o"}))
            )
        )
    }
});



var TransactionForm = React.createClass({displayName: "TransactionForm",
    
    handleSubmit: function( e ) {
        e.preventDefault();
        var name = React.findDOMNode(this.refs.t_name).value.trim();
        var amount = React.findDOMNode(this.refs.t_amount).value.trim();
        var cat = React.findDOMNode(this.refs.t_cat).value.trim();
       
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        
        today = yyyy + '/' + mm + '/' + dd;
        
        
        this.props.onTransactionSubmit({date: today, name: name, amount: amount, category: cat});
        
        React.findDOMNode(this.refs.t_name).value = '';
        React.findDOMNode(this.refs.t_amount).value = '';
        React.findDOMNode(this.refs.t_cat).value = '';
        return;
    },
        
    render: function() {
        return (
            React.createElement("form", {onSubmit: this.handleSubmit}, 
            React.createElement("h2", null, "Add Transaction "), 
            React.createElement("label", {htmlFor: "name"}, "Transaction name"), 
            React.createElement("input", {type: "text", id: "name", placeholder: "Transaction name", ref: "t_name"}), 
            React.createElement("label", {htmlFor: "amount"}, "Amount"), 
            React.createElement("input", {type: "number", id: "amount", placeholder: "Amount", ref: "t_amount"}), 
            React.createElement("label", {htmlFor: "category"}, "Category"), 
            React.createElement("input", {type: "text", id: "category", placeholder: "Category (optional)", ref: "t_cat"}), 
            React.createElement("br", null), 
            React.createElement("input", {className: "button-primary", type: "submit", value: "Add Transaction"})
            )
        )
    }
});


React.render(React.createElement(Container, null), document.getElementById('mount-point'));
}());