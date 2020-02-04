import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { requestApiData } from "./actions";


function searchingFor(search) {
  return function(x) {
    return x.text.toLowerCase().includes(search.toLowerCase()) | !search; 
  }
}

class Home extends React.Component {
  constructor(props){
  super(props);
  this.state = {
    search: '',
    show: false,
    visible: 10
  };
  this.searchHandler = this.searchHandler.bind(this);
      this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    this.props.requestApiData();
  }

  operation() {
    this.setState({
      show: true
    })
  }
  
  loadMore() {
    this.setState((prev) => {
      return {visible: prev.visible + 40};
    });
  }


  searchHandler(e) {
    this.setState({
      search: e.target.value,
      show: false,
      visible: 10
    })
     document.getElementById("load").style.display="none"
  }

  person = (x, i) => 
    <ul className="card bg-light list-unstyled" key={i}>
                <li className=" card-img-top"><img src={x.user.profile_image_url} alt={x.user.profile_image_url}/></li>
      <li className=" card-body  card-title">{x.user.name}</li>
      <li className=" card-body card-text">{x.text}</li>
    </ul>
    ;

  searchResult = () => {
    let values = this.props.data.filter(searchingFor(this.state.search));  
    if(values.length < 10) {
      document.getElementById("load").style.display="none"
    }  else {
      document.getElementById("load").style.display="block"
    }
    return this.props.data.length ? values.map(this.person): <h1>LOADING...</h1>
  }

  render() {
    return (
      <div className="container col-sm-6">
        <h1> Searching for Twitter data:</h1>
        <input type="text" name="search" id="search" value={this.state.search} className="form-control" onChange={this.searchHandler}/>
        <button type="button" name="button" className="form-control btn-primary btn-lg mt-3 mb-5" onClick={()=>this.operation()}>Search</button>
        {this.state.show ? this.searchResult().slice(0, this.state.visible) :null}
              {this.state.visible < this.props.data.length && 
             <button onClick={this.loadMore} type="button" id="load" className="btn-primary btn-lg mt-3 mb-5 " style={{display: "none"}}>Load more</button>
          }
      </div> 
    )
  }
}

const mapStateToProps = state => ({ data: state.data });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestApiData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);