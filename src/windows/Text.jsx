import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";

const Text = () => {
  const { windows } = useWindowStore();
  // Safety check just in case, though WindowWrapper also checks existence of the key
  if (!windows.txtfile) return null;

  const { data } = windows.txtfile;

  // Requirement: if no data return null
  if (!data) return null;

  return (
    <>
      <div id="window-header">
        <WindowControls target="txtfile" />
        <h2>{data.name}</h2>
      </div>

      <div className="bg-white h-full p-8 overflow-y-auto text-black pb-14">
        {data.subtitle && (
          <h3 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-4">
            {data.subtitle}
          </h3>
        )}

        {data.image && (
          <div className="mb-6 w-full flex justify-center">
            <img
              src={data.image}
              alt={data.name}
              className="w-full max-h-[100vh] object-cover rounded-xl shadow-md"
            />
          </div>
        )}

        <div className="space-y-4 text-gray-800">
          {Array.isArray(data.description) ? (
            data.description.map((paragraph, index) => (
              <p key={index} className="leading-relaxed text-base">
                {paragraph}
              </p>
            ))
          ) : (
            <p>{data.description}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default WindowWrapper(Text, "txtfile");
