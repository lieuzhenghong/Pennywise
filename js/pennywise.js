'use strict';

var ACCOUNTS = [
    {name: 'cash on hand'},
    {name: 'savings account'},
    {name: 'shared account'},
    {name: 'my second wallet'}
];

var TRANSACTIONS = [
    {date: '', name: 'Bananas', amount: 6, category: 'Groceries', account: 'cash on hand'},
    {date: '', name: 'Apples', amount: 2.50, category: 'Groceries', account: 'cash on hand'},
    {date: '', name: 'Cash withdrawal', amount: 250, account: 'savings account'}
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
            <div id = 'wrapper'>
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

    handleClick: function(e) {
        this.props.onChange(this.props.account);
    },

    render: function () {
        return (
            <li onClick = {this.handleClick}> {this.props.account}</li>
        )}
});

var AccountList = React.createClass({

    render: function () {

        var rows = [];
        this.props.accounts.map(function(each_account) {
            rows.push(
                <AccountRow 
                    account = {each_account.name} 
                    key = {each_account.name}
                    onChange = {this.props.onChange} 
                />);
                      }, this);
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
            <div id = 'account-tabs'>
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
    
    render: function() {
        return (
            <div id = 'recent-transactions'>
            <h2>Recent Transactions for {this.props.activeAccount}</h2>
            <table>
                <tr>
                    <th>date</th>
                    <th>name</th>
                    <th>amount</th>
                    <th>account</th>
                    <th>edit </th>
                </tr>
                <TransactionList 
                    transactions = {this.props.transactions}
                    activeAccount = {this.props.activeAccount}
                />

            </table>
            <TransactionForm onTransactionSubmit = {this.handleTransactionSubmit} />
            </div>
        )
    }
});        
        
var TransactionList = React.createClass ({                      
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

                rows.push(<TransactionRow transaction = {each_transaction} key = {each_transaction.name} />);
            }
            else {
                /*console.log(each_transaction.account);*/
            }     
        })
        return (
            <tbody>
            {rows}
            </tbody>
        )
    }
});        

var TransactionRow = React.createClass({
    render: function (){
        var trans = this.props.transaction;

        return (
            <tr>
            <td>{trans.date}</td>
            <td>{trans.name}</td>
            <td>{trans.amount}</td>
            <td>{trans.account}</td>
            <td><a href = ''>edit</a></td>
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
        
        this.props.onTransactionSubmit({name: name, amount: amount, cat: cat});
        
        React.findDOMNode(this.refs.t_name).value = '';
        React.findDOMNode(this.refs.t_amount).value = '';
        React.findDOMNode(this.refs.t_cat).value = '';
        return;
    },
        
    render: function() {
        return (
            <form onSubmit = {this.handleSubmit}>
            <h2>Add Transaction </h2>
            <p>Transaction name</p>
            <input type = 'text' placeholder = 'Transaction name' ref = 't_name'/>
            <p>Amount</p>
            <input type = 'number' placeholder = 'Amount' ref = 't_amount' />
            <p>Category (optional) </p>
            <input type = 'text' placeholder = 'Category (optional)' ref = 't_cat' />
            <input type = 'submit' value = 'Add Transaction'/>
            </form>
        )
    }
});


React.render(<Container />, document.body);