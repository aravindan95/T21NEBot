import React from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, KeyboardAvoidingView ,ScrollView} from 'react-native';
import { Container,Content, Footer , Item} from 'native-base';
import Color from './Color';
import CONST from './Globals';

export default class ChatView extends React.Component {
  constructor(props) {
    super(props);

    this.handleSendMessage = this.onSendMessage.bind(this);
  }


  onSendMessage(e) {
    this.props.onSendMessage(e.nativeEvent.text);
    this.refs.input.clear();
  }

  renderItem({item}, i) {
    const action = item.action;
    const name = item.name;
    const type = item.type;

    if (action == 'join') {
        return <Text style={ styles.joinPart }>{ name } has joined</Text>;
    } else if (action == 'part') {
        return <Text style={ styles.joinPart }>{ name } has left</Text>;
    } else if (action == 'message') {
      console.log(type);
        if(type == CONST.MSG_TYPE.REQUEST){
          return <View key={i} style={{ height:40, borderBottomWidth:2, borderBottomColor: '#ededed' }}><Text>{ name }: { item.message }</Text></View>;
        }else{
          return <View key={i} style={{ height:40, borderBottomWidth:2, borderBottomColor: '#ededed' }}><Text>{ name }: { item.message }</Text></View>;
        }
    }
  }

  render() {
    let Arr = this.props.messages.map((a, i) => {

      const action = a.action;
    const name = a.name;
    const type = a.type;
    const message = a.message;

            if(type == CONST.MSG_TYPE.REQUEST){
          return <View key={i} style={{ height:40, borderBottomWidth:2, borderBottomColor: '#ededed', backgroundColor: 'gray', alignSelf: 'stretch', marginRight: 0 }}><Text  style={{color: 'black', alignSelf: 'stretch', marginRight: 0 }}>{ name }: { message }</Text></View>;
        }else{
          return <View key={i} style={{ height:40, borderBottomWidth:2, borderBottomColor: '#ededed',backgroundColor: 'blue',  alignSelf: 'stretch', marginLeft: 0 }}><Text style={{color: 'white', alignSelf: 'stretch', marginLeft: 0 }}>{ name }: { message }</Text></View>;
        }
          }) 
    return (
      <Container>
      <Content>
      <ScrollView ref={ref => this.scrollView = ref}
        onContentSizeChange={(contentWidth, contentHeight)=>{        
        this.scrollView.scrollToEnd({animated: true});
        }}>
          
           {Arr}
        
        
        
      </ScrollView>
      </Content>
      <Footer  style={styles.footerContainer} >
        <Item>
                  <TextInput autoFocus
                   keyboardType="default" 
                   returnKeyType="done"
                   enablesReturnKeyAutomatically
                   style={ styles.input }
                   blurOnSubmit={ false }
                   onSubmitEditing={ this.handleSendMessage }
                   ref="input"
                   />    
        </Item>        
        </Footer>
        </Container>
    );
  }

  
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
    
  },
  footerContainer:{
    backgroundColor: '#fff',
    alignSelf: 'stretch'
  },
  messages: {
    alignSelf: 'stretch'
  },
  input: {
    textAlign: 'left',
    alignSelf: 'stretch'
  },
  joinPart: {
    fontStyle: 'italic'
  }

  
});


