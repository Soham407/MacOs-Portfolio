import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'


import { Safari, Terminal } from '#windows'
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
    </main>
  )
}

export default App