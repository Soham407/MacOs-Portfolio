import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";

const Image = () => {
  const { windows } = useWindowStore();
  // Safety check
  if (!windows.imgfile) return null;

  const { data } = windows.imgfile;

  if (!data) return null;

  return (
    <div className="flex flex-col h-full">
      <div id="window-header">
        <WindowControls target="imgfile" />
        <h2>{data.name}</h2>
      </div>

      <div className="bg-neutral-900 flex-1 flex items-center justify-center overflow-hidden p-4">
        {data.imageUrl && (
          <img
            src={data.imageUrl}
            alt={data.name}
            className="max-w-full max-h-full object-contain pointer-events-none select-none"
          />
        )}
      </div>
    </div>
  );
};

export default WindowWrapper(Image, "imgfile");
