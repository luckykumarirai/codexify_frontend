import data from "../../utils/tags.json";

const PopularTags = () => {
  return (
    <>
      <div className="w-11/12 mr-auto ml-auto rounded-md border p-4">
        <p className="font-serif font-bold flex justify-start">Popular Tags</p>
        <div className="max-h-60 overflow-y-auto">
          {data &&
            data.map((item, index) => {
              return (
                <>
                  <button
                    type="button"
                    className="w-full text-slate-800 font-medium hover:bg-purple-100 hover:text-blue-800 rounded-lg px-3 py-2 flex justify-start"
                  >
                    #{item.name}
                  </button>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};
export default PopularTags;
