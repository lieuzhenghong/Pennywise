var ACCOUNTS = [
    {name: 'cash on hand'},
    {name: 'savings account'},
    {name: 'shared account'}
];

var TRANSACTIONS = [
    {date: '', name: 'Bananas', amount: 6, category: 'Groceries', account: 'cash on hand'},
    {date: '', name: 'Apples', amount: 2.50, category: 'Groceries', account: 'cash on hand'},
    {date: '', name: 'Cash withdrawal', amount: 250, account: 'savings account'}
];

var AccountList = React.createClass({
    render: function () {
        return (
            <ul>
            {
                this.props.accounts.map(function(each_account) {
                        return <li>{each_account.name}</li>
                })
            }
            </ul>
            )
    }
});


var NavBar = React.createClass({
    render: function () {
        return (
            <div id = 'account-tabs'>
                <h2> Accounts </h2>
                <AccountList accounts = {this.props.accounts} />
            </div>
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

var TransactionList = React.createClass ({                      
    render: function () {
        var rows = [];
        this.props.transactions.map(function(each_transaction) {
            if (each_transaction.account == this.props.activeAccount) {
                rows.push(<TransactionRow transaction = {each_transaction} key = {each_transaction.name} />);
            }
            else {
                console.log(each_transaction.account);
            }     
        })
        return (
            <tbody>
            {rows}
            </tbody>
        )
    }
});

var TransactionsTable = React.createClass({
    render: function() {
        return (
            <div id = 'recent-transactions'>
            <h2>Recent Transactions</h2>
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
                    activeAccount = {this.props.activeAccount}/>
            </table>
            </div>
        )
    }
});
        
var TransactionForm = React.createClass({
    render: function() {
        return (
            <div>
            <h2>Add Transaction </h2>
            <p>Transaction name</p>
            <input type = 'text' />
            <p>Price</p>
            <input type = 'number'/>
            <p>Category (optional) </p>
            <input type = 'text' />
            </div>
        )
    }
});
        
        
var ButtonMenu = React.createClass ({
    render: function () {
        return (
            <div>
            <button>Add Transaction</button>
            </div>
        )
    }
});

var Container = React.createClass({
    getIntialState: function() {
        return {
            activeAccount: "cash on hand"
        }
    },
    
    componentWillMount: function(){
        this.setState( 
            {activeaccount: this.state.activeAccount}
        )
    },
    
    render: function () {
        return (
            <div>
            <NavBar accounts = {ACCOUNTS} />
            <TransactionsTable 
                transactions = {TRANSACTIONS}
                activeAccount = {this.state.activeaccount}
            />
            <TransactionForm />
            <ButtonMenu />
            </div>
        );
    }
});


React.render(<Container />, document.body);