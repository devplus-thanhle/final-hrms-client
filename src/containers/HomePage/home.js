import React from 'react'
import AppAbout from './Layout/about';
import AppFeature from './Layout/feature';
import AppHero from './Layout/hero';

function AppHome()  {
  return (
    <div className='main'>
        <AppHero/>
        <AppAbout/>
        <AppFeature/>
    </div>
  )
}

export default AppHome;