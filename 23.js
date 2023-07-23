import React, { Component } from 'react';
import Rect from './Rect';
import './App.css';


let data = {title:'Title',
  message:'this is sample message.'};


const SampleContext = React.createContext(data);


class App extends Component {


  render() {
    return (
      <div>
        <h1>Context</h1>
        <Title />
        <Message />
      </div>
    );
  }
}


class Title extends Component {
  static contextType = SampleContext;
  /*Component クラスはReactライブラリに含まれており、
  コンポーネントのライフサイクルや状態管理などの機能を提供します。*/


  render(){
    return (
      <div>
        <h2>{this.context.title}</h2>
      </div>
    );
  }
}
/* <h2>{this.context.title}</h2> JSX内で{}の中にJSを記述することで動的なコンテンツの描画が可能
 ここでは、this.context.title というコードが使われています。
 これは、SampleContext というコンテキストから title というプロパティを取得して、
 <h2> タグの中に表示しています。*/


class Message extends Component {
  static contextType = SampleContext;


  render(){
    return (
      <div>
        <p>{this.context.message}</p>
      </div>
    );
  }
}
/*<div> ... </div>: JSX（JavaScript XML）を使ってコンポーネントの描画内容を定義しています。
<div> タグで囲まれた部分が、コンポーネントが描画する要素になります。 */

export default App;