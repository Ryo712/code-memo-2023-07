import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findMemo } from './Store';


class FindForm extends Component {
  input = {
    fontSize:"14pt",
    color:"#006",
    padding:"0px",
  }
  /*FindFormはComponentクラスを継承しています。
  これにより、Reactコンポーネントとしての機能を利用できます。 */
  btn = {
    fontSize:"12pt",
    color:"#006",
    padding:"1px 10px",
  }

  constructor(props){
    super(props);
    this.state = {
      find:''
    }
    this.doChange = this.doChange.bind(this);
    this.doAction = this.doAction.bind(this);
  }
  /*constructorメソッドは、コンポーネントのインスタンスが作成されるときに最初に呼ばれるメソッドです。*/
  /*this.doChangeとthis.doActionメソッドをコンポーネントインスタンスにバインドしています。
  これにより、メソッド内のthisがコンポーネント自体を指すようになります。*/

  doChange(e){
    this.setState({
      find: e.target.value
    });
  }
  /*doChangeメソッドは、テキスト入力フィールドの値が変更されるたびに呼び出されます。
    入力された値を取得し、this.setStateを使用してfindステートを更新します。*/


  doAction(e){
    e.preventDefault();
    let action = findMemo(this.state.find);
    this.props.dispatch(action);
  }
/**doActionメソッドは、フォームの送信イベント（Submit）が発生した際に呼び出されます。
e.preventDefault()により、デフォルトのフォーム送信動作をキャンセルしています。
findMemoアクションクリエーターを呼び出して、this.state.findの値を引数として渡します。
this.props.dispatch(action)を使用して、アクションをReduxストアにディスパッチ（送信）します。 */

  render(){
    return (
      <form onSubmit={this.doAction}>
        <input type="text" size="10" onChange={this.doChange}
          style={this.input} value={this.state.message} />
        <input type="submit" style={this.btn} value="Find"/>
      </form>
    );
  }
}
export default connect((state)=>state)(FindForm);