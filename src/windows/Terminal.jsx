import { techStack } from "#constants";
import { Check, Flag } from "lucide-react";
import  WindowControls  from "#components/WindowControls.jsx";
import WindowWrapper from "#hoc/WindowWrapper.jsx";

const Terminal = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="terminal"/>
        <h2>Tech Stack</h2>
      </div>

      <div className="techstack">
        <p>
          <span className="font-bold">@Soham </span>
          show tech stack
        </p>

        <div className="label">
          <p className="w-32">Category</p>
          <p>Technologies</p>
        </div>
        <ul className="content">
          {techStack.map(({ category, items }) => (
            <li key={category} className="flex items-center gap-3">
              <Check className="check" size={20} />
              <h3>{category}</h3>
              <ul>
                {items.map((items, i) => (
                  <li key={i}>
                    {items}{i < items.length - 1 ? "," : ""}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="footnote">
          <p>
            <Check size={20} /> 5 of 5 stacks loaded successfully
          </p>

          <p className="text-black">
            <Flag size={20} fill="black"/> Render time: 6ms
          </p>
        </div>
      </div>
    </>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;
