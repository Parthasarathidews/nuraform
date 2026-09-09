import React from "react";
import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

const CustomBreadcrumbs = ({ items = [] }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center">
      <ol className="flex items-center gap-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={item.label}>
              <li className="text-gray-400">
                <ChevronRight size={16} />
              </li>

              <li style={{ whiteSpace: "nowrap" }}>
                {isLast ? (
                  <span
                    style={{ whiteSpace: "nowrap" }}
                    className="font-medium text-gray-900"
                  >
                    {item.label}
                  </span>
                ) : item.path === "#" || !item.path ? (
                  <span
                    style={{ whiteSpace: "nowrap" }}
                    className="text-gray-500 transition-colors hover:text-black cursor-default"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    style={{ whiteSpace: "nowrap" }}
                    to={item.path}
                    className="text-gray-500 transition-colors hover:text-black"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default CustomBreadcrumbs;
