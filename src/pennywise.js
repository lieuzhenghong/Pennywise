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

var Container = React.createClass({

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
            <div className = 'container'>
            <h1>Pennywise</h1>
            <NavBar 
                accounts = {ACCOUNTS}
                activeAccount = {this.state.activeAccount}
                onChange = {this.setActiveAccount}
            />
            <TransactionsTable 
                transactions = {this.state.transactions}
                activeAccount = {this.state.activeAccount}
            />  
            </div>
        );
    }
});

var AccountRow = React.createClass({
  
    passOn: function() {
      this.props.onDelete(this.props.account);
    },

    handleClick: function() {
      this.props.onChange(this.props.account);
    },

    render: function () {
        return (
            <li className = 'button' onClick = {this.handleClick}> {this.props.account}  &nbsp; 
              <i onClick = {this.passOn} className = 'fa fa-trash-o'></i>
            </li>
        )}
});

var NewAccountButton = React.createClass({
  
  handleClick: function(e) {
    var name = React.findDOMNode(this.refs.a_name).value.trim();
    this.props.onAddNewAccount({name: name});
    React.findDOMNode(this.refs.a_name).value = '';
  },
  
  render: function () {
    return (
      <div>
      <input type = 'text' id = 'name' placeholder = 'Account name' ref = 'a_name'/>
      <button className = 'button-primary' onClick = {this.handleClick}>
      Create New Account
      </button>
      </div>
      )
  }
});

var AccountList = React.createClass({
  
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
                <AccountRow 
                    account = {each_account.name} 
                    key = {each_account.name}
                    onChange = {this.props.onChange}
                    onDelete = {this.deleteAccount}
                />);
                      }, this);
        rows.push(<NewAccountButton key = {'new_account'} onAddNewAccount = {this.addNewAccount}/>);
    return (
        <ul>
        {rows}
        </ul>
    )   
    }   
});


var NavBar = React.createClass({

    render: function () {
        return (
            <div className= 'row'>
                <h2> Accounts </h2>
                <AccountList 
                    accounts = {this.props.accounts} 
                    {...this.props} 
                />
            </div>
        )
    }
});     

var TransactionsTable = React.createClass({
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
            <div className = 'row'>
            <h2>Recent Transactions for {this.props.activeAccount}</h2>
            <table className = 'rwd-table'>
            <thead>
                <tr>
                    <th>date</th>
                    <th>name</th>
                    <th>amount</th>
                    <th>account</th>
                    <th>category</th>
                    <th>delete </th>
                </tr>
            </thead>
                <TransactionList 
                    transactions = {this.props.transactions}
                    activeAccount = {this.props.activeAccount}
                    onTransactionDelete = {this.handleTransactionDelete}
                />

            </table>
            <TransactionForm onTransactionSubmit = {this.handleTransactionSubmit} />
            </div>
        )
    }
});        
        
var TransactionList = React.createClass ({
  
    passOnDelete: function(transaction) {
        this.props.onTransactionDelete(transaction);
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
                    <TransactionRow 
                    onTransactionDelete = {this.passOnDelete}
                    transaction = {each_transaction} 
                    key = {each_transaction.name}
                    />
                );  
        }
        }, this);
        
        return (
            <tbody>
            {rows}
            </tbody>
        )
    }
});        

var TransactionRow = React.createClass({
    
    DeleteTransaction: function( e ) {
        this.props.onTransactionDelete(this.props.transaction);
    },
    
    render: function (){
        var trans = this.props.transaction;

        return (
            <tr>
            <td data-th = 'Date'>{trans.date}</td>
            <td data-th = 'Name'>{trans.name}</td>
            <td data-th = 'Amount'>{trans.amount}</td>
            <td data-th = 'Account'>{trans.account}</td>
            <td data-th = 'Category'>{trans.category}</td>
            <td data-th = 'Delete'><i onClick = {this.DeleteTransaction} className = 'fa fa-trash-o'></i></td>
            </tr>
        )
    }
});



var TransactionForm = React.createClass({
    
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
            <form onSubmit = {this.handleSubmit}>
            <h2>Add Transaction </h2>
            <label htmlFor = 'name'>Transaction name</label>
            <input type = 'text' id = 'name' placeholder = 'Transaction name' ref = 't_name'/>
            <label htmlFor = 'amount'>Amount</label>
            <input type = 'number' id = 'amount' placeholder = 'Amount' ref = 't_amount' />
            <label htmlFor = 'category'>Category</label>
            <input type = 'text' id = 'category' placeholder = 'Category (optional)' ref = 't_cat' />
            <br/>
            <input className = 'button-primary' type = 'submit' value = 'Add Transaction'/>
            </form>
        )
    }
});


React.render(React.createElement(Container, null), document.getElementById('mount-point'));
}());