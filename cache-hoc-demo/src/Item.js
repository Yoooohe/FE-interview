import React from 'react';

class App extends React.Component {
  _goBack = () => {
    this.props.history.goBack();
  }
  _goToList = () => {
    this.props.history.push({
        pathname: `/`,
    });
  }
  render() {
    console.log(this.props.history)
    const searchId = this.props.location.search.split('=')[1];
    console.log(this.props.location.search)
    return (
      <div style={{ height: "90vh", overflow: "auto" }}>
       <div>{searchId}</div>
       <button onClick={this._goBack}>back</button>
       <button onClick={this._goToList}>goToList</button>
      </div>
    );
  };
};

export default App
