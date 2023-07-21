render(){
    return <div>
      <h1>React</h1>
      <h2>{this.state.message}</h2>
      <Message maxlength="10" onCheck={this.doCheck} />
    </div>;
  }
  /*<Message>コンポーネントが表示されます。
  maxlength="10"とonCheck={this.doCheck}の2つの属性が渡されています。
  maxlength属性はMessageコンポーネントに対して値 "10" を渡しています。*/

  let list = arr2.map((value,key)=>(
    <li style={this.li} key={key}>{value}.</li>)
  );
  return <div>
    <h2>{this.props.title}</h2>
    <ol>{list}</ol>
  </div>
 }
}
/*.mapメソッドを使用してvalueを表示している。
style={this.li}というプロパティを持たせて、スタイルを適用している。
ループが終了したら、作成したリスト(list)を<ol>要素の中に入れています。 */