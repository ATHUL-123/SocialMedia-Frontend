const PostShimmer = () => {
    return (
        <div className="bg-white mt-10 w-full md:w-2/3 overflow-hidden rounded-lg relative">
        <div className="flex flex-wrap my-auto justify-between">
          <div className="flex items-center p-3">
            <div className="w-12 h-12 rounded-full mr-3 bg-gray-200 animate-pulse"></div>
            <div className="flex flex-col">
              <div className="h-3 bg-gray-200 w-20 mb-1 animate-pulse"></div>
              <div className="h-2 bg-gray-200 w-16 animate-pulse"></div>
            </div>
          </div>
          <div className="relative inline-block">
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
          </div>
        </div>
        <div className="relative">
          <div className="w-full h-80 bg-gray-300 rounded animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="bg-white border shadow p-3 text-xl text-gray-700 font-semibold">
          <div className="h-5 bg-gray-200 w-2/3 mb-2 animate-pulse"></div>
          <div className="h-5 bg-gray-200 w-5/6 animate-pulse"></div>
        </div>
        <div className="bg-white p-1 border shadow flex flex-row flex-wrap rounded-b-lg">
          <div className="w-1/3 hover:bg-gray-100 flex items-center justify-center text-lg font-semibold cursor-pointer transition-colors duration-300 ease-in-out text-gray-700">
            <div className="inline-flex items-center">
              <div className="w-6 h-6 bg-gray-200 rounded-full mr-1 animate-pulse"></div>
              <span>Like</span>
            </div>
          </div>
          <div className="w-1/3 hover:bg-gray-100 border-l-4 border-r flex items-center justify-center text-lg text-gray-700 font-semibold cursor-pointer transition-colors duration-300 ease-in-out">
            <div className="inline-flex items-center">
              <div className="w-6 h-6 bg-gray-200 rounded-full mr-1 animate-pulse"></div>
              <span>Save</span>
            </div>
          </div>
          <div className="w-1/3 hover:bg-gray-100 border-l-4 flex items-center justify-center text-lg text-gray-700 font-semibold cursor-pointer transition-colors duration-300 ease-in-out">
            <div className="inline-flex items-center">
              <div className="w-6 h-6 bg-gray-200 rounded-full mr-1 animate-pulse"></div>
              <span>Comment</span>
            </div>
          </div>
        </div>
      </div>
      
    );
  };
  
  export default PostShimmer;
  