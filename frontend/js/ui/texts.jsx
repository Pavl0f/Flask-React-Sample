import React from 'react';
import styled from "styled-components";


export const TextBox = (props)=>{
    return (
        <div className="flex-column-left" style={{width:"80%"}}>
            <StyledLabel for="text">{props.label}</StyledLabel>
            <StyledText type="text" name="text" value={props.value} onChange={props.onChange}/>
        </div>
    );
}

export const PasswordBox = (props)=>{
    return (
        <div className="flex-column-left" style={{width:"80%"}}>
            <StyledLabel for="password">{props.label}</StyledLabel>
            <StyledText type="password" name="password" value={props.value} onChange={props.onChange}/>
        </div>
    );
}

const StyledText = styled.input`
box-sizing: border-box;

height: 30px;
line-height: 30px;
margin-bottom 10px;

transition: 0.3s;
letter-spacing: 1px;

color: #000000;

border: 1px solid #bbbbbb;
border-radius: 2px;
outline: none;

&:focus{
    border: 1px solid #888888;
	box-shadow: 0 0 5px 1px rgba(0,0,0,0.5);
}
`;

const StyledLabel = styled.label`
position: relative;
top: 0;
font-size: 12px;
margin: 0px 0px 0px 0px;
`