import React from 'react';
import '@less/404.less';

class NotFoundPage extends React.Component{
    render(){
        return (
            <div className="box">
                <div className="block">
                <div className="first_line">
                    <text className="big_font">出&thinsp;错&thinsp;啦&thinsp;！</text>
                    <img className="img" src="images/404.png" />
                </div>
                <p>你&thinsp;访&thinsp;问&thinsp;的&thinsp;页&thinsp;面&thinsp;不&thinsp;存&thinsp;在</p>
                </div>
                <div className="buttonbox">
                <a href="/"><button>返回首页</button></a>
                </div>
            </div>
        )
    }
}

export default NotFoundPage;
