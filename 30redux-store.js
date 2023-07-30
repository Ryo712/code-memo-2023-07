import { Component } from 'react';
import {initStore} from '../store';


const isServer = typeof window === 'undefined'
const _NRS_ = '__NEXT_REDUX_STORE__'


function getOrCreateStore (initialState) {
  if (isServer) {
    return initStore(initialState)
  }


  if (!window[_NRS_]) {
    window[_NRS_] = initStore(initialState)
  }
  return window[_NRS_]
}


export default (App) => {
  return class AppWithRedux extends Component {
/*高階コンポーネント（HOC）をエクスポートしています。
これは、与えられたコンポーネント（App）をラップし、
Reduxストアを提供するコンポーネントを返す関数です。*/

    static async getInitialProps (appContext) {
/*AppWithReduxコンポーネントの静的メソッドとして、getInitialPropsが定義されています。
このメソッドは、ページが読み込まれる前にサーバーサイドまたはクライアントサイドで実行され、
ページコンポーネントに初期プロパティを提供します。*/
        const reduxStore = getOrCreateStore()
      appContext.ctx.reduxStore = reduxStore
      let appProps = {}
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext)
      }
      return {
        ...appProps,
        initialReduxState: reduxStore.getState()
      }
    }


    constructor (props) {
      super(props)
      this.reduxStore = getOrCreateStore(props.initialReduxState)
    }
    /*AppWithReduxコンポーネントのコンストラクターで、Reduxストアを作成または取得してthis.reduxStoreに割り当てます。
    これにより、クライアントサイドでのコンポーネントの再マウント時にもストアが保持されます*/


    render () {
      return <App {...this.props}
        reduxStore={this.reduxStore} />
    }
  }
}
/**ラップされたコンポーネント（App）にreduxStoreプロパティを渡しています。
 * これにより、ラップされたコンポーネント内でReduxストアにアクセスできるようになります。
 */