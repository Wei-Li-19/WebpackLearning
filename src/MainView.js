import React, {Fragment} from 'react'
import  './index.css'


export default class MainView extends React.PureComponent{

    render(){
        return(<Fragment>
            <div id="redPacket" className="redPacket">
            </div>
            <div className="rankingView">
                <div className="rankingTitle">
                    <span id="myRank" className="leftView rankingText">我的排名: 2名</span>
                    <span id="myFuel" className="rightView rankingText">我的油耗: 6L/100KM</span>
                </div>
                <div id="rankingData" className="rankingText">2019年10月4日排行榜：</div>
                <div id="fuelRanking" className="ranking rankingText">
                    {
                        [{vin:'LBA******123',fuelCapacity:'6',fuelUnit:'L/100KM'},{vin:'LBA******554',fuelCapacity:'7',fuelUnit:'L/100KM'},{vin:'LBA******778',fuelCapacity:'8',fuelUnit:'L/100KM'}].map((item,index)=>{
                            return(
                                <div key={index}><span className="leftView">{`${(index + 1)} ${item.vin}`}</span>
                                    <span>{`${item.fuelCapacity} ${item.fuelUnit}`}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </Fragment>)
    }
}

