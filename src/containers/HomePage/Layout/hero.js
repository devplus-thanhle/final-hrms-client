import React from 'react';
import {Button, Carousel } from 'antd';

const items = [
    {
      key: '1',
      title: 'WE ARE HIRING!',
      content: 'Check which job we are looking and send us your CV or Portfolio for the posistion!',
    }
  ]

function AppHero(){
 return(
   <div id="hero" className="heroBlock">
    <Carousel >
        {items.map(item=>{
            return(
                <div className="container-fluid" key={item.key}>
                    <div className="content">
                       <h3>{item.title}</h3>
                       <p> {item.content}</p>
                       <div className='btnHolder'>
                       <Button type="primary" href="http://localhost:3000/campaign" size='large'>Apply now!</Button>
                       </div>
                    </div>
                </div>
            )
        })}
    
  </Carousel>,
   </div>
 );
}

export default AppHero;