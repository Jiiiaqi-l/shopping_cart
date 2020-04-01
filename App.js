import React from 'react';
import CheckOut from './checkout';


class SelectQuantity extends React.Component {
  constructor (props) {
    super(props);
    this.handleQuantity = this.handleQuantity.bind(this);
  }

  handleQuantity(e) {
    this.props.handleQuan(e.target.value);
  }

  render() {
    let newArray = [];
    for (let i = parseInt(this.props.limit); i > 0; i--) {
      newArray.unshift(i);
    }

    return (
      <select
        onChange={this.handleQuantity}
        className="custom-select">
        {newArray.map(item => (
          <option
            value={item}
            key={item}>
            {item}
          </option>
          )
        )}
      </select>
    );
  }
}

class TableRow extends React.Component{
  constructor (props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleQuan = this.handleQuan.bind(this);
  }

  handleDelete(index) {
    this.props.handleRowDelete(index);
  }

  handleQuan(quan) {
    this.props.handleQuantityChange(quan, this.props.item.id);
  }

  componentDidMount() {
    window.$('[data-toggle="popover"]').popover();
  }

  render() {
    const items = this.props.item;
    const price = parseFloat(items.price.slice(1)) * (items.quantity || 1);
    return (
      <tr>
        <th scope="row">
          <figure>
            <img src={items.img} alt='kfc' className="kfc"/>
              <figcaption>
                <h4 className="product-name">{items.name}</h4>
                <p>{items.content}</p>
              </figcaption>
          </figure>
        </th>
        <td>
          {items.discount}
        </td>
        <td>
          <SelectQuantity
            limit={items.instore}
            handleQuan={this.handleQuan}/>
        </td>
        <td>
          {'$' + price.toFixed(2)}
        </td>
        <td>
          <div className="btn-toolbar">
            <button
              type="button"
              className="btn-u btn-info"
              data-container="body"
              data-toggle="popover"
              data-placement="left"
              data-content={items.instore}
              data-original-title="Remaining">
              <i className="fas fa-sync-alt"></i>
            </button>
            <button
              type="button"
              className="btn-u btn-danger"
              onClick={() => (this.handleDelete(items.id))}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        </td>
      </tr>
    );
  }
}

class TableInfo extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      data : [],
      isLoaded: false,
      error: null,
    };
    this.handleListDelete = this.handleListDelete.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }

  componentDidMount() {
    fetch('https://36ae04d6-068e-4cc7-ae72-5a18e2c519fe.mock.pstmn.io/kfc_data')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded : true,
            data : result.data, 
          });
        },
        (error) => {
          this.setState({
            isLoaded : true,
            error,
          });
        },
      )
  }
  
  handleListDelete(index) {
    const newdata = this.state.data.filter(i => i.id !== index);
    this.setState({
      data: newdata,
    });
  }
  
  handleQuantityChange(quantity, id) {
    const newdata = this.state.data.map(item => {
      if (item.id === id) {
        item['quantity'] = quantity;
      }

      return item;
    });
    this.setState({
      data: newdata,
    });
  }

  render() {
    if (this.state.error) {
      return (<p>Loading error!{this.state.error.message}</p>);
    } else if (!this.state.isLoaded) {
      return (<p>Loading...</p>);
    }

    const dataObj = this.state.data;
    
    const total = dataObj.map(obj => {
      const price = parseFloat(obj.price.slice(1)) || 0 ;
      const discount = parseFloat(obj.discount) || 0;
      const quantity = obj.quantity || 1;
      return quantity * price * (100 - discount) / 100;
    }).reduce((acc, cur) => acc + cur, 0);

    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Product</th>
            <th>Discount</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dataObj.map(obj => (
            <TableRow
              item={obj}
              key={obj.id}
              handleRowDelete={this.handleListDelete}
              handleQuantityChange={this.handleQuantityChange}/>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th className="space-cell"></th>
            <td className="space-cell"></td>
            <td className="space-cell"></td>
            <td>Total : 
              <br/>$
              {total.toFixed(2)}
            </td>
            <td className="space-cell"></td>
          </tr>
          <tr>
            <th>
              <button type="button" className="btn-u continue-btn">
                Continue Shpping
              </button>
            </th>
            <td className="space-cell"></td>
            <td className="space-cell"></td>
            <td className="space-cell"></td>
            <td>
              <CheckOut/>
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }
}

export default function App() {
  return (
    <div className='home_page'>
    <TableInfo/>
    </div>
  );
}

