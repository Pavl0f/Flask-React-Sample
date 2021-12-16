import React, { Component } from "react";
import request from "superagent";
import {Button} from "./ui/buttons"
import {TextBox, PasswordBox} from "./ui/texts"

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "email":"",
      "password":""
    };
  }

  onLogin(e){

    request.post('/login').set('Content-Type', 'application/json; charset=utf-8').send(this.state).end((error, res) => {

        var res = JSON.parse(res.text);
        console.log(res);

        // ログイン成功
        if(res["request_error"]==0){
          this.props.history.push("/main")

        // ログイン失敗
        }else{
          alert({1:"メールアドレスまたはパスワードが違います", 2:"管理者権限がありません"}[res["request_error"]])
        }
        
    });

  }

  render() {

    return (

      <div id="root_page" className="flex-column-center">
        <div className="mycard" style={{width:"400px"}}>
            
            <div className="flex-column-center" style={{width:"100%", marginBottom:"20px"}}>              
              <TextBox label="メールアドレス" value={this.state["email"]} onChange={(e)=>this.setState({"email":e.target.value})}/>
              <PasswordBox label="パスワード" value={this.state["password"]} onChange={(e)=>this.setState({"password":e.target.value})}/>
            </div>

            <div className="flex-column-center" style={{width:"100%"}}>
              <Button color="BLUE" onClick={(e)=>this.onLogin(e)}>ログイン</Button>
              <div>登録済みでない方は <a href="/signup">こちら</a></div>
            </div>

        </div>
      </div>

    );
  }
}

export default Root;
