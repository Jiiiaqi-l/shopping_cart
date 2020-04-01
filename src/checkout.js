import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  paper: {
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
    color: '#007bff',
    '&:hover': {
      color: '#0056b3',
    },
  },
  active: {
    textAlign: 'center',
    backgroundColor: '#007bff',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#007bff',
      color: '#fff',
    },
  },
}));

export default function FormDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}
      className="btn-u checkout-btn">
        CheckOut
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className="dialog-position">
        <Box width={500}>
          <DialogTitle id="form-dialog-title" className="dialog-header">
            <i className="fas fa-cash-register"/>
            Come on! Let's check out
          </DialogTitle>
          <CreditCardForm
          class={classes}
          close={handleClose}/>
          <div className="dialog-footer">
          </div>
        </Box>
      </Dialog>
    </div>
  );
}

class CreditCardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
    this.handleListItemClick = this.handleListItemClick.bind(this);
  }

  handleListItemClick (index) {
    this.setState({
      selectedIndex: index
    });
  }

  render () {

    return (
      <Box className="frame">
        <List component="nav" aria-label="main folders" className="list-padding">
          <Grid container spacing={0}>
            <Grid item xs={12} sm={6}>
              <ListItem
                button
                onClick={() => this.handleListItemClick(0)}
                className={`${this.state.selectedIndex === 0 ? this.props.class.active : this.props.class.paper}`}
              >
                  <Grid item xs={12} sm={12} className="payment-method-color">
                    <i className="far fa-credit-card center"></i>Credit Card
                  </Grid>
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ListItem
                button
                onClick={() => this.handleListItemClick(1)}
                className={`${this.state.selectedIndex === 1 ? this.props.class.active : this.props.class.paper}`}
              >
                <Grid item xs={12} sm={12} className="payment-method-color">
                  <i className="fab fa-paypal center"></i>Paypal
                </Grid>
              </ListItem>
            </Grid>
            <Grid item xs={12}>
              <ListItem
                button
                onClick={() => this.handleListItemClick(2)}
                className={`${this.state.selectedIndex === 2 ? this.props.class.active : this.props.class.paper}`}
              >
                <Grid item xs={12} sm={12} className="payment-method-color">
                  <i className="fas fa-university center"></i>Bank Transfer
                </Grid>
              </ListItem>
            </Grid>
          </Grid>
        </List>
        <Box>
          <PaymentMetod
          paybyindex={this.state.selectedIndex}
          close={this.props.close}/>
        </Box>
      </Box>
    );
  }
}

class PaymentMetod extends React.Component {
  render() {
    if (this.props.paybyindex === 0) {
      return (
        <Box>
          <ForCreditCard close={this.props.close}/>
        </Box>
      );
    }

    if (this.props.paybyindex === 1) {
      return (
        <Box>
          <p>
          PayPal is the easliest way to pay online
          </p>
          <p>
            <button type="submit" className="btn-u btn-color">
              <span className= "btn-font">
                <i className="fab fa-paypal center"></i>Login my Paypal
              </span>
            </button>
          </p>
          <p>
          <b>Note:</b> Here are some notes.
          </p>
        </Box>
      );
    }

    if (this.props.paybyindex === 2) {
      return (
        <Box>
        <p>
          Bank account details
        </p>
        <p>
          <b>
            Bank:
          </b>
        </p>
        <p>
          The World Bank
        </p>
        <p>
          <b>
            Account Number:
          </b>
        </p>
        <p>
          123123123
        </p>
        <p>
          <b>
            IBAN:
          </b>
        </p>
        <p>
          132132132
        </p>
        <p>
          <b>
            Notes:
          </b>
        </p>
        <p>
          Here are some notes.
        </p>

        </Box>
      );
    }
  }
}

class ForCreditCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      name: '',
      number: '',
      exp_mm: '',
      exp_yy: '',
      cvv: '',
      agree: false,
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCardChange = this.handleCardChange.bind(this);
    this.handleExpMM = this.handleExpMM.bind(this);
    this.handleExpYY = this.handleExpYY.bind(this);
    this.handleCVV = this.handleCVV.bind(this);
    this.handleAgreeChange = this.handleAgreeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleNameChange (e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleCardChange (e) {
    let num = e.target.value.replace(/\D/g, '');
    let card = num.replace(/(\d{4}(?!\s))/g, "$1 ").trim();

    if (card.length >19) {
      card = card.slice(0, 19);
    }

    this.setState({
      number: card.trim(),
    });
  }

  handleExpMM (e) {
    let month = e.target.value;
    if (month.length > 2) {
      month = month.slice(0, 2);
    }

    this.setState({
      exp_mm: month,
    });
  }

  handleExpYY (e) {
    let year = e.target.value;
    if (year.length > 2) {
      year = year.slice(0, 2);
    }

    this.setState({
      exp_yy: year,
    });
  }

  handleCVV (e) {
    let cv = e.target.value;
    if (cv.length > 3) {
      cv = cv.slice(0, 3);
    }

    this.setState({
      cvv: cv,
    });
  }

  handleAgreeChange (e) {
    this.setState({
      agree: e.target.checked,
    });
  }

  handleSubmit () {
    this.setState({
      submit: true,
    });

    if (this.state.name.trim()
      && this.state.number.trim()
      && this.state.exp_mm < 12
      && this.state.exp_mm > 0
      && this.state.exp_yy >= 0
      && this.state.cvv >= 0
      && this.state.agree) {
      this.props.close();
    }
  }

  render() {

    return (
      <form>
        <Grid container className="grid-bottom">
          <Grid container item xs={12} sm={12}>
            <label>Full Name</label>
          </Grid>
          <input
          type="text"
          placeholder="Enter FullName"
          value={this.state.name}
          className={`input 
            ${!this.state.name.trim() && this.state.submit ? 'error-border' : ''}
            ${this.state.name.trim() && this.state.submit ? 'right-border' : ''}
            `}
          onChange={this.handleNameChange}/>
          <div className={`${!this.state.name.trim() && this.state.submit ? 'error' : 'fade'}`}>
            Full Name!
          </div>
          <div className={`${this.state.name.trim() && this.state.submit ? 'right' : 'fade'}`}>
            Looks good!
          </div>
        </Grid>
        <Grid container className="grid-bottom card_info">
          <Grid container item xs={12} sm={12}>
            <label>Card Number</label>
          </Grid>
          <Grid container item xs={12} sm={9}>
            <input
            type="text"
            placeholder="Enter Card Number"
            value={this.state.number}
            className={`input
              ${!this.state.number.trim() && this.state.submit ? 'error-border' : ''}
              ${this.state.number.trim() && this.state.submit ? 'right-border' : ''}
            `}
            onChange={this.handleCardChange}/>
          </Grid>
          <Grid item xs={12} sm={3} className="card_icon">
              <i className="fab fa-cc-visa i-margin"></i>
              <i className="fab fa-cc-amex i-margin"></i>
              <i className="fab fa-cc-amex"></i>
          </Grid>
          <div
          className={`${!this.state.number.trim() && this.state.submit ? 'error' : 'fade'}`}>
            xxxx xxxx xxxx xxxx
          </div>
          <div
          className={`${this.state.number.trim() && this.state.submit ? 'right' : 'fade'}`}>
            Looks good!
          </div>
        </Grid>
        <Grid container className="grid-bottom" spacing={4}>
          <Grid container item xs={12} sm={8}>
            <label>Expiration</label>
            <Grid container>
              <Grid container item xs={12} sm={6}>
                <input
                type="number"
                placeholder="MM"
                value={this.state.exp_mm}
                className={`input border-collapser
                  ${(!this.state.exp_mm.trim() || parseInt(this.state.exp_mm) > 12) && this.state.submit ? 'error-border' : ''}
                  ${ parseInt(this.state.exp_mm) >= 0 && parseInt(this.state.exp_mm) < 13 && this.state.submit ? 'right-border' : ''}
                  `}
                onChange={this.handleExpMM}/>
                <div className={`
                  ${(!this.state.exp_mm.trim() || parseInt(this.state.exp_mm) > 12) && this.state.submit ? 'error' : 'fade'}
                  `}>
                  0~12
                </div>
                <div className={`
                  ${(parseInt(this.state.exp_mm) >= 0 && parseInt(this.state.exp_mm) < 13) && this.state.submit ? 'right' : 'fade'}
                  `}>
                  Looks good!
                </div>
              </Grid>
              <Grid container item xs={12} sm={6}>
                <input
                type="number"
                placeholder="YY"
                maxLength="2"
                value={this.state.exp_yy}
                className={`input
                  ${(!this.state.exp_yy.trim()) && this.state.submit ? 'error-border' : ''}
                  ${(this.state.exp_yy.trim()) && this.state.submit ? 'right-border' : ''}
                  `}
                onChange={this.handleExpYY}/>
                <div
                className={`
                  ${!this.state.exp_yy.trim() && this.state.submit ? 'error' : 'fade'}
                  `}>
                  00~99
                </div>
                <div
                className={`
                  ${this.state.exp_yy.trim() && this.state.submit ? 'right' : 'fade'}
                  `}>
                  Looks good!
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid container item xs={12} sm={4}>
            <label>CVV
            <i className="fas fa-question-circle"></i>
            </label>
            <input
            type="number"
            placeholder="CCV"
            value={this.state.cvv}
            className={`input 
               ${!this.state.cvv.trim() && this.state.submit ? 'error-border' : ''}
               ${this.state.cvv.trim() && this.state.submit ? 'right-border' : ''}
               `}
            onChange={this.handleCVV}/>
            <div className={`
              ${!this.state.cvv.trim() && this.state.submit ? 'error' : 'fade'}
              `}>
              xxx
            </div>
            <div className={`${this.state.cvv.trim() && this.state.submit ? 'right' : 'fade'}`}>
              Looks good!
            </div>
          </Grid>
        </Grid>
        <Grid container item sm={12}
          className="label-checkbox">
          <input
            name="agreement"
            type="checkbox"
            checked={this.state.agree}
            onChange={this.handleAgreeChange}
            className={`checkbox `}/>
          <label
            className={`
              ${this.state.agree && this.state.submit ? 'right-font' : ''}
              ${!this.state.agree && this.state.submit ? 'error-font' : ''}
              `}>
            Agreed to terms and conditions
            <div
              className={`${!this.state.agree && this.state.submit ? 'error' : 'fade'}`}>
              You must agree before submitting.
            </div>
            <div
              className={`${this.state.agree && this.state.submit ? 'right' : 'fade'}`}>
              Looks good!
            </div>
          </label>
        </Grid>
        <Button variant="contained" color="primary" className="display-block"
        onClick={this.handleSubmit}>
          Submit
        </Button>
      </form>
    );
  }
}
