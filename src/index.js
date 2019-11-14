import React from 'react'
import ReactDom from 'react-dom'
import './base.css'
import '../lib/responsive/responsive'
import Loading from './components/Loading'
import MainView from './MainView'
import h5NativeBridge from '../lib/h5NativeBridage'

class App extends React.Component{

    constructor(props){
        super(props);
        this.state={
            loading:true,
        }
    }

    componentDidMount() {
        h5NativeBridge.init(()=>{
            console.log('bridge初始化连接结束')
        });

        setTimeout(()=>{
            this.setState({loading:false})
        },2000);
        console.log('hello ~world~')
    }

    render(){
        const { loading } = this.state;


        return(<div className='mainView'>
            {loading && <Loading/>}
            {!loading && <MainView/>}
        </div>)


    }
}

ReactDom.render(<App/>,document.getElementById("root"));

