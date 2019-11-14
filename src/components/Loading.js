import React from 'react'
import loading from '../images/loading.gif'

 class Loading extends React.PureComponent{

    render(){
        return(<div style={{position: 'absolute',height: '100%',width: '100%',top: 0,bottom: 0,right: 0,left: 0,textAlign:'center'}} >
            <img style={{height: 45,width: 45,verticalAlign: 'middle'}} src={loading}/>
            <span style={{fontSize:24,color: 'rgba(255,255,255,0.70)', verticalAlign: 'middle'}}>加载中...</span>
            <span style={{display: 'inline-block',height: '100%',width: 0,verticalAlign: 'middle',visibility: 'hidden'}}/>
        </div>)
    }
}

export default Loading
