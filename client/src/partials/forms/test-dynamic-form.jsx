import React from 'react'

export default class IncorporationForm extends React.Component {
    constructor() {
      super();
      this.state = {
        name: '',
        shareholders: [{ name: '' }],
      };
    }
  
    // ...
  
    handleShareholderNameChange = (idx) => (evt) => {
      const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
        if (idx !== sidx) return shareholder;
        return { ...shareholder, name: evt.target.value };
      });
  
      this.setState({ shareholders: newShareholders });
    }
  
    handleSubmit = (evt) => {
      const { name, shareholders } = this.state;
      alert(`Incorporated: ${name} with ${shareholders.length} shareholders`);
    }
  
    handleAddShareholder = () => {
      this.setState({
        shareholders: this.state.shareholders.concat([{ name: '' }])
      });
    }
  
    handleRemoveShareholder = (idx) => () => {
      this.setState({
        shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
      });
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          {/* ... */}
          <h4>Shareholders</h4>
  
          {this.state.shareholders.map((shareholder, idx) => (
            <div className="shareholder input-group">
              <input
                type="text"
                className="form-control"
                placeholder={`Shareholder #${idx + 1} name`}
                value={shareholder.name}
                onChange={this.handleShareholderNameChange(idx)}
              />
              <button type="button" className="input-group-append small" onClick={this.handleRemoveShareholder(idx)}>-</button>
            </div>
          ))}
          <button type="button" onClick={this.handleAddShareholder} className="small">Add Shareholder</button>
          <button>Incorporate</button>
        </form>
      )
    }
  }

