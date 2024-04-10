import React from 'react';

function KycShimmer() {
  return (
    <li className="col-span-1 mt-5 ms-5 divide-y divide-gray-200 rounded-lg bg-white shadow animate-pulse">
      {/* Shimmer effect */}
      <div className="flex w-full items-center justify-between space-x-6 p-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            {/* Shimmer effect for name */}
            <h3 className="truncate text-sm font-medium text-transparent bg-gray-200 rounded w-20">&nbsp;</h3>
            {/* Shimmer effect for role */}
            <span className="inline-flex flex-shrink-0 items-center rounded-full bg-gray-200 px-1.5 py-0.5 text-xs font-medium text-transparent">&nbsp;</span>
          </div>
          {/* Shimmer effect for description */}
          <p className="mt-1 truncate text-sm text-gray-500 bg-gray-200 rounded">&nbsp;</p>
          {/* Shimmer effect for DOB */}
          <p className="mt-1 truncate text-sm text-gray-500 bg-gray-200 rounded">&nbsp;</p>
          {/* Shimmer effect for email */}
          <p className="mt-1 truncate text-sm text-gray-500 bg-gray-200 rounded">&nbsp;</p>
          {/* Shimmer effect for gender */}
          <p className="mt-1 truncate text-sm text-gray-500 bg-gray-200 rounded">&nbsp;</p>
   
        </div>
        {/* Shimmer effect for profile image */}
        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"></div>
      </div>
      {/* Shimmer effect for email and call buttons */}
      <div className="-mt-px flex divide-x divide-gray-200">
        <div className="flex w-0 flex-1">
          <a href="#" className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 bg-gray-200 rounded">&nbsp;</a>
        </div>
        <div className="-ml-px flex w-0 flex-1">
          <a href="#" className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 bg-gray-200 rounded">&nbsp;</a>
        </div>
      </div>
    </li>
  );
}

export default KycShimmer;
