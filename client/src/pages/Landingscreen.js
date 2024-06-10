import React from 'react'
import { Link } from 'react-router-dom'
const Landingscreen = () => {
    return (
        <div className='row landing justify-content-center'>
          <div className='text-center img' >
            <div className='img1'>
          <h2  className="down"style = {{color:'white',fontSize:'120px'}}>Dom Discovery</h2>
          <h1 style ={{color:"white"}}>"There is only one boss. The Guest."</h1>
          <Link to='/home'>
            <button className='btn landingbtn' style={{color:'black'}}>Get Started</button>
          </Link>
          </div>
        </div>
        </div>
      )
}

export default Landingscreen
