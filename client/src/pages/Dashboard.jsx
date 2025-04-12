import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLinks } from "../features/links/linkSlice";
import QRCodeButton from "../components/QRCodeButton";
import { Link } from "react-router-dom";
import { BASE_URL } from "../features/auth/authSlice";
import ChartPage from "./ChartPage";
import Spinner from "../components/loader/Spinner";

const ITEMS_PER_PAGE = 7;
const Dashboard = () => {
  const dispatch = useDispatch();
  const { allLinks, loading, error } = useSelector((state) => state.links);
  const links = allLinks.links && [...allLinks.links].reverse();

  useEffect(() => {
    dispatch(fetchLinks());
  }, [dispatch]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil((links?.length || 0) / ITEMS_PER_PAGE);

  const paginatedLinks = links?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div>
      <div className="bg-gray-950 min-h-screen py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white">
                All Links
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Manage your shortened URLs and track performance.
              </p>
            </div>
            <Link
              to="/create"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm sm:text-base px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-medium transition"
            >
              + New Link
            </Link>
          </div>

          {/* Table / Loading / Error / Empty */}
          {loading ? (
            // <p className="text-gray-300">Loading links...</p>
            <div className="min-w-full min-h-full flex items-center justify-center">{<Spinner/>}</div>
            
          ) : error ? (
            <p className="text-red-500">{error || "ERROR"}</p>
          ) : links?.length === 0 ? (
            <p className="text-gray-400">
              No links yet. Start by creating one.
            </p>
          ) : (
            <div className="overflow-x-auto bg-gray-900 rounded-t-xl shadow-lg">
              <table className="min-w-full divide-y divide-gray-800">
                <thead className="bg-gray-800 text-gray-300">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                      Original URL
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                      Short URL
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                      Clicks
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                      Expires
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                      QR
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {paginatedLinks?.map((link) => (
                    <tr key={link._id} className="hover:bg-gray-800 transition">
                      <td className="px-6 py-4 max-w-[250px] truncate text-blue-400">
                        <a
                          href={link.originalUrl}
                          className="hover:underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {link.originalUrl}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-blue-400">
                        <a
                          href={`${BASE_URL}/${link.shortCode}`}
                          className="hover:underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {`${BASE_URL}/${link.shortCode}`}
                        </a>
                      </td>
                      <td className="px-6 py-4">{link.totalClicks}</td>
                      <td className="px-6 py-4">
                        {new Date(link.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        {link.expirationDate ? (
                          new Date(link.expirationDate) < new Date() ? (
                            <span className="text-red-400">Expired</span>
                          ) : (
                            new Date(link.expirationDate).toLocaleDateString()
                          )
                        ) : (
                          "No expiry"
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <QRCodeButton url={link.shortCode} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center px-6 py-4 bg-gray-800 text-gray-300 text-sm rounded-b-xl scroll-x-hidden">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md transition ${
                  currentPage === 1
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-500"
                }`}
              >
                Previous
              </button>

              <span>
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md transition ${
                  currentPage === totalPages
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-500"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
      <ChartPage/>
    </div>
  );
};

export default Dashboard;
