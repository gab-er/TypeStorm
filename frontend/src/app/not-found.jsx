import React from "react";
// Users are redirected to this page if the url is invalid
// Use notFound() from next/navigation to manually redirect to this page -> better for SEO

const notFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full text-xl mt-50">
      <div className="font-bold"> Not Found </div>
      <div> Looks like this page doesn't exist. </div>
    </div>
  );
};

export default notFound;
