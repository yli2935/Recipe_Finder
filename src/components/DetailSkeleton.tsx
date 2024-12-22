/*
 * @Author: Adam Li adam@bizzone.com
 * @Date: 2024-12-22 11:04:03
 * @LastEditors: Adam Li
 * @LastEditTime: 2024-12-22 16:37:07
 * @FilePath: /Recipe_Finder/src/components/DetailSkeleton.tsx
 */

const DetailSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      {/* Heading Skeleton */}
      <div>
        <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>

      {/* Top Section: Image & Video */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left side (Image placeholder) */}
        <div
          className="
            w-full
            md:w-1/2
            h-[50vh]
            bg-gray-200
            rounded-xl
            relative
            shadow-lg
          "
        >
          {/* Heart button placeholder */}
          <div className="absolute top-5 right-5 w-8 h-8 bg-gray-300 rounded-full" />
        </div>

        {/* Right side (Video placeholder) */}
        <div
          className="
            w-full
            md:w-1/2
            h-[50vh]
            bg-gray-200
            rounded-xl
            relative
            shadow-lg
          "
        />
      </div>

      {/* Bottom Section: Ingredients & Instructions */}
      <div className="flex flex-col md:flex-row gap-6 shadow-lg">
        {/* Ingredients */}
        <div
          className="
            w-full
            md:w-1/2
            overflow-visible
            rounded-xl
            relative
            flex
            items-start
            justify-center
            md:sticky
            md:top-4
          "
        >
          <div className="border border-black rounded-xl p-8 max-w-md w-full">
            <div className="h-5 bg-gray-300 rounded w-1/2 mb-4" />
            <ul className="space-y-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <li key={index} className="h-4 bg-gray-200 rounded w-full"></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Instructions */}
        <div
          className="
            w-full
            md:w-1/2
            min-h-[50vh]
            overflow-y-auto
            rounded-xl
            relative
            flex
            flex-col
          "
        >
          <div className="p-8">
            <div className="h-5 bg-gray-300 rounded w-1/3 mb-4" />
            <div className="space-y-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-4 bg-gray-200 rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSkeleton;
