import React from 'react';
import cacheHoc from './cache_hoc';

class App extends React.Component {
  CACHE_NAME = this.props.location;
  scrollDom = null

  _goToDetailPage = (idx) => {
    this.props.history.push({
        pathname: `/item`,
        search: `?id=${idx}`
    });
  }

  _changeKeyWord = (e) => {
    this.setState({
      ...this.state,
      keyword: e.target.value
    })
  }

  _changeLanguage = (e) => {
    this.setState({
      ...this.state,
      language: e.target.value
    })
  }

  _init = () => {
    this.setState({
      keyword: '',
      language: 'English'
    })
  }

  componentDidMount() {
    this.scrollDom = document.querySelector('#test-wrapper')
    this.scrollElRefs = [this.scrollDom]
    if (JSON.stringify(this.state) === '{}') {
      this._init();
    }
    console.log('recover', this.state)
  }

  state= {
    keyword: '',
    language: ''
  }

  render() {
    const { keyword, language } = this.state;
    return (
      <div id="test-wrapper" style={{ height: "90vh", overflow: "auto" }}>
        <div style={{marginBottom: "20px"}}>
          keyWord: <input type="text" name="fname" value={keyword || ''} onChange={this._changeKeyWord}/>
        </div>
        <select name="language" id="language" value={language} onChange={this._changeLanguage}>
          <option value="English">English</option>
          <option value="Chinese">Chinese</option>
          <option value="Japanese">Japanese</option>
          <option value="French">French</option>
        </select>
        {Array(100)
          .fill("")
          .map((item, idx) => (
            <div key={idx}>
              <div style={{ color: "blue", textDecoration: "underline" }} onClick={() => this._goToDetailPage(idx)}>Item {idx}</div>
            </div>
          ))}
      </div>
    );
  };
};

export default cacheHoc(App)
