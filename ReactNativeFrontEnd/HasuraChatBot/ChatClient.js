import React from 'react';
import ChatView from './ChatView';
import { Container, Header,  Title,  Button, Left, Right, Body } from 'native-base';
import CONST from './Globals';
import Dialogflow from "react-native-dialogflow";

export default class ChatClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
   
    Dialogflow.setConfiguration(
          "b1875eb60ba6407ab940a42ac92e341c", Dialogflow.LANG_ENGLISH
        );
    this.handleSendMessage = this.onSendMessage.bind(this);
    this.getDialogFlow = this.getDialogFlow.bind(this);
  }

  async getDialogFlow(msg) {
    const ACCESS_TOKEN = 'b1875eb60ba6407ab940a42ac92e341c';

    try {
       const response = await fetch(`https://api.dialogflow.com/v1/query?v=20170712`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          query: msg,
          lang: 'EN',
          sessionId: 'somerandomthing'
        })
      })
      let responseJson = await response.json();
      this.setState({
        showText: responseJson.result.fulfillment.speech,
      });
      return responseJson;
    } catch(error) {
      console.error(error);
    }
  }

  handleJoin(name) {
    const messages = this.state.messages.slice();
    messages.push({action: 'join', name: name});
    this.setState({
      messages: messages
    });
  }
  handlePart(name) {
    const messages = this.state.messages.slice();
    messages.push({action: 'part', name: name});
    this.setState({
      messages: messages
    });
  }
  handleMessage(name, message, type) {
    const messages = this.state.messages;
    messages.push({action: 'message', name: name, message: message, type: type});
    this.setState({
      messages: messages
    });

    console.log(messages);
  }

  

  async onSendMessage(text) {
    const payload = {
        message: text
    };
    console.log(this.props);
    this.handleMessage(this.props.name, text, CONST.MSG_TYPE.REQUEST);


    
    
    {/*Dialogflow.requestEvent("https://api.dialogflow.com/V1/",
    {param1: text},
      result=>{
        console.log(result)
      }, error=>{
        console.log(error)
      });*/}

    const dialogflowResponse = await this.getDialogFlow(text);
      if (this.state.showText) {
        console.log(dialogflowResponse);
        this.handleMessage('Bot', dialogflowResponse.result.fulfillment.speech, CONST.MSG_TYPE.RESPONSE);
        
      }
    {/*fetch(`${pusherConfig.restServer}/users/${this.props.name}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });*/}
  }

  render() {
    const messages = this.state.messages;

    return (
       <Container>
        <Header style={{backgroundColor: 'black'}}>
          <Left/>
          <Body>
            <Title>Online Store</Title>
          </Body>
          <Right />
        </Header>
        
        <ChatView messages={ messages } onSendMessage={ this.handleSendMessage } />
        
         
      </Container>
    );
  }
}
