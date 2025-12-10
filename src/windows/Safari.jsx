import WindowWrapper from "#hoc/WindowWrapper";
import { WindowControls } from "#components";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  MoveRight,
  PanelLeft,
  Plus,
  Search,
  Share,
  ShieldHalf,
} from "lucide-react";
import { blogPosts } from "#constants";


const Safari = () => {
  return (
    <>
      <div id="window-header" className=" flex items-center gap-3 px-4">
        <WindowControls target="safari" />

        <PanelLeft className="icon" />

        <div className="flex items-center gap-1">
          <ChevronLeft className="icon" />
          <ChevronRight className="icon" />
        </div>

        <div className="flex items-center gap-2 flex-1 max-w-2xl mx-auto">
          <ShieldHalf className="icon" />

          <div className="search flex-1 flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1">
            <Search className="icon w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search or enter website name"
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Share className="icon" />
          <Plus className="icon" />
          <Copy className="icon" />
        </div>
      </div>

      <div className="blog">
        <h2>My Thoughts</h2>

        <div className="space-y-8">
            {blogPosts.map(({id,image,title,date , link })=>(
                <div key={id} className="blog-post">
                    <div className="col-span-2">
                        <img src={image} alt={title} />
                    </div>

                    <div className="content">
                        <p>{date}</p>
                        <h3>{title}</h3>
                        <a href={link} target="_blank" rel="noopener noreffer">Check Out the full post 
                            <MoveRight className="icon-hover" />
                        </a>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </>
  );
};

const SafariWindow = WindowWrapper(Safari, "safari");
export default SafariWindow;