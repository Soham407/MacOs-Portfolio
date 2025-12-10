import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'


import { Resume, Safari, Terminal } from '#windows'
import {Navbar, Welcome, Dock} from '#components'


gsap.registerPlugin(Draggable);



const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
      <Terminal />
      <Safari />
      <Resume />
    </main>
  )
}

export default App