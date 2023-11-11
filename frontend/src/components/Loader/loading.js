import React, { useEffect, useRef } from 'react'
import Lottie from 'lottie-web'
import loaderData from './loader.json'

const Loading = () => {
  const container = useRef({})

  useEffect(() => {
    Lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      // loop: true,
      // autoplay: true,
      animationData: loaderData
    })
  }, [])

  return <div style={{display:'flex', justifyContent:'center',alignItems:"center", height:'78vh'}}>
    <div className='container' ref={container} style={{width:"30%"}}></div>
    </div>
}

export default Loading
