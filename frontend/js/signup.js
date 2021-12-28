import React, { Component } from "react";
import {Button} from "./ui/buttons"
import {TextBox, PasswordBox} from './ui/texts'
import request from "superagent";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "username":"",
            "email":"",
            "password":"",
            "re-password":""
        };
    }

    // 完了ボタンのコールバック
    onSubmit(e){

        if(this.state["username"]==""|this.state["email"]==""|this.state["password"]==""){ alert("空欄があります"); return 1;}
        if(this.state["password"]!=this.state["re-password"]){ alert("パスワードが一致しません"); return 1;}

        request.post('/register').set('Content-Type', 'application/json; charset=utf-8').send(this.state).end((error, res) => {
                
            var res = JSON.parse(res.text);

            if(res["signup_error"] == 0){
                alert("登録完了しました")
                this.props.history.push("/")
            
            }else if(res["signup_error"] == 1){
                alert("登録に失敗しました")
            }

        });
        
    }

    render() {

        return (
            <div id="signup" className="flex-column-center">

                <div className="mycard" style={{width:"400px"}}>
                    
                    <div className="flex-column-center" style={{width:"100%", marginBottom:"30px"}}>
                        <TextBox label="ユーザー名" value={this.state["username"]} onChange={(e)=>this.setState({"username":e.target.value})}/>
                        <TextBox label="メールアドレス" value={this.state["email"]} onChange={(e)=>this.setState({"email":e.target.value})}/>
                        <PasswordBox label="パスワード" value={this.state["password"]} onChange={(e)=>this.setState({"password":e.target.value})}/>
                        <PasswordBox label="パスワード (再)" value={this.state["re-password"]} onChange={(e)=>this.setState({"re-password":e.target.value})}/>
                    </div>

                    <div className="flex-column-center" style={{width:"100%"}}>
                        <Button color="BLUE" onClick={(e)=>this.onSubmit(e)}>完了</Button>
                    </div>
                </div>

            </div>
        );
    }
}

export default Signup;
