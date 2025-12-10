import { WindowControls } from "#components";
import { socials } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";

const Contact = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="contact" />
        <h2>Contact Me</h2>
      </div>

      <div className="p-5 space-y-5 bg-white h-full overflow-y-auto text-black pb-10">
        <img
          src="/images/adrian.jpg"
          alt="Adrian"
          className="w-20 rounded-full"
        />

        <h3 className="text-2xl font-bold">Let's Connect</h3>
        <p className="text-lg">
          Got an idea? A bug to squash? Or just wanna talk tech? I'm in.
        </p>
        <p className="text-lg">
          sohambhutkar1@gmail.com
        </p>

        <ul className="grid grid-cols-2 gap-4">
          {socials.map(({ id, bg, link, icon, text }) => (
            <li
              key={id}
              style={{ backgroundColor: bg }}
              className="rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                title={text}
                className="p-5 h-32 flex flex-col justify-between"
              >
                <img
                  src={icon}
                  alt={text}
                  className="w-8 h-8 invert brightness-0"
                />
                <p className="text-white font-bold text-lg">{text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default WindowWrapper(Contact, "contact");
