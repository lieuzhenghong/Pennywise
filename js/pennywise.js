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

        var activeaccount = this.props.activeAccount;

        var rows = [];
        this.props.transactions.map(function(each_transaction) {
            if (each_transaction.account == activeaccount) {

                /* Very strange behaviour
                if (each_transaction account == this.props.activeAccount) 
                DOES NOT WORK, I do not know why this is the case
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

var TransactionsTable = React.createClass({
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

    getInitialState: function (){
        return {
            activeAccount: ACCOUNTS[0].name
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
                transactions = {TRANSACTIONS}
                activeAccount = {this.state.activeAccount}
            />
            <TransactionForm />
            <ButtonMenu />
            </div>
        );
    }
});


React.render(<Container />, document.body);