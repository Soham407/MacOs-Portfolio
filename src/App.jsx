import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

import {
  Finder,
  Resume,
  Safari,
  Terminal,
  Text,
  Image,
  Contact,
} from "#windows";
import { Navbar, Welcome, Dock } from "#components";

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
      <Text />
      <Image />
      <Contact />
      <Finder />
    </main>
  );
};

export default App;
