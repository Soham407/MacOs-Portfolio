import { WindowControls } from "#components";
import { Search } from "lucide-react";
import WindowWrapper from "#hoc/WindowWrapper";
import { locations } from "#constants";
import useLocationStore from "#store/location.js";
import clsx from "clsx";
import useWindowStore from "#store/window";

const Finder = () => {
  const { openWindow, windows } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();

  const openItem = (item) => {
    if (!item) return;
    if (item.fileType === "pdf") return openWindow("resume");
    if (item.kind === "folder") return setActiveLocation(item);
    if (["fig", "url"].includes(item.fileType) && item.href)
      return window.open(item.href, "_blank");

    const windowKey = `${item.fileType ?? ""}${item.kind ?? ""}`;
    if (windowKey && windows[windowKey]) {
      openWindow(windowKey, item);
    } else {
      console.warn(`No window registered for key: "${windowKey}"`);
    }
  };

  const renderList = (items, name) =>
    !items ? null : (
      <div>
        <h3>{name}</h3>
        <ul>
          {items.map((item) => (
            <li
              key={item.id}
              onClick={() => setActiveLocation(item)}
              className={clsx(
                item.id === activeLocation.id ? "active" : "inactive"
              )}
            >
              <img src={item.icon} className="w-4" alt={item.name} />
              <p className="text-sm font-medium truncate">{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    );

  return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <h2>Finder</h2>
        <Search className="icon" />
      </div>

      <div className="bg-white flex h-full">
        <div className="sidebar">
          {renderList(Object.values(locations.favourites), "Favourite")}
          {renderList(locations.work.children, "Work")}
        </div>
        <ul className="content">
          {activeLocation?.children?.length > 0 ? (
            activeLocation.children.map((item) => (
              <li
                key={item.id}
                className={item.position || ""}
                onClick={() => openItem(item)}
              >
                <img src={item.icon} alt={item.name} />
                <p>{item.name}</p>
              </li>
            ))
          ) : (
            <li className="text-gray-500 p-4">No items to display</li>
          )}
        </ul>
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");
export default FinderWindow;
