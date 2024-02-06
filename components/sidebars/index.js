import { useState } from "react";

export default function SideBar(props) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div>
      {!showSidebar ? (
        <button
          type="button"
          onClick={() => setShowSidebar(true)}
          className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      ) : null}
      <div
        id="drawer-navigation"
        className={
          (showSidebar ? "top-16 " : "-translate-x-full ") +
          "fixed left-0 z-40 md:relative md:z-0 h-screen p-4 overflow-y-auto transition-transform md:translate-x-0 bg-white w-64"
        }
        tabindex="-1"
        aria-labelledby="drawer-navigation-label"
      >
        <div className="md:hidden">
          <h5
            id="drawer-navigation-label"
            className="text-base font-semibold text-gray-500 uppercase"
          >
            Menu
          </h5>
          <button
            type="button"
            onClick={() => setShowSidebar(false)}
            data-drawer-hide="drawer-navigation"
            aria-controls="drawer-navigation"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
        </div>
        <div className="overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {props.sidebarButtons &&
              props.sidebarButtons.map((option, index) => {
                return (
                  <li
                    key={index}
                    onClick={option.onClick}
                    className="cursor-pointer"
                  >
                    <div
                      className={
                        (props.selectedOption == option.name
                          ? "bg-gray-100 "
                          : "") +
                        "flex items-center p-2 text-gray-900 rounded hover:bg-gray-100 group"
                      }
                    >
                      {option.icon}
                      <span className="ml-3">{option.name}</span>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}
