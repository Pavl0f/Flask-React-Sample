import React, { Component } from "react";
import ReactDOM from "react-dom";

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import Root from "./js/root"
import Main from "./js/main"
import Signup from "./js/signup"

import './scss/index'

import request from "superagent"


class Index extends Component {

  constructor(props) {

    super(props);
    this.state = {};
  
  };


  render() {


    return (

      <Router>


        <Switch>
  
          {/* 認証不要 */}
          <Route exact path="/" component={Root}/>
          <Route exact path="/signup" component={Signup} />

          {/* 認証必要 */}
          <Auth path="/main">
            <Route exact path="/main" component={Main} />          
          </Auth> 

        </Switch>

      </Router>      

    );

  }
}


const Auth = (props) => {

  // var request_data = {"path":props.path}
  

  // 認証情報が無い場合はログイン画面にリダイレクト
  request.get('/authenticate').set('Content-Type', 'application/json; charset=utf-8').end((error, res) => {

    var res = JSON.parse(res.text);
    console.log("fuga")
    console.log(res["is_authenticated"]);

    if(res["is_authenticated"]==false){
        
      window.location.href="/"
      alert({1:"ログインしてください", 2:"管理者権限がありません"}[res["error_code"]])
      // return <Switch><Route exact path="/" component={Root}/></Switch>
    }
  })

  return <Switch>{props.children}</Switch>
 
}


ReactDOM.render(<Index />, document.getElementById("root"));
