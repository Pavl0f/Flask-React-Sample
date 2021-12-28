import React, { Component } from "react";
import {Button} from "./ui/buttons"
import {TextBox, PasswordBox} from './ui/texts'
import request from "superagent";


class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "arg1":"hoge", 
            "arg2":"fuga"
        };
    }

    // 完了ボタンのコールバック
    onClick(e){
        request.post('/test').set('Content-Type', 'application/json; charset=utf-8').send(this.state).end((error, res) => {                
            var res = JSON.parse(res.text);
            console.log(res);
        });        
    }

    render() {

        return (
            <div id="signup" className="flex-column-center">

                <div className="mycard" style={{width:"400px"}}>
                    
                    <div className="flex-column-center" style={{width:"100%", marginBottom:"30px"}}>
                        <TextBox id="arg1" label="arg1" value={this.state["arg1"]} onChange={(e)=>this.setState({"arg1":e.target.value})}/>
                        <TextBox id="arg2" label="arg2" value={this.state["arg2"]} onChange={(e)=>this.setState({"arg2":e.target.value})}/>
                    </div>

                    <div className="flex-column-center" style={{width:"100%"}}>
                        <Button color="BLUE" onClick={(e)=>this.onClick(e)}>送信</Button>
                    </div>
                </div>

            </div>
        );
    }
}

export default Test;
