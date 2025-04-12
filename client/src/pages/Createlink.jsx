import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createShortLink } from "../features/links/linkSlice";
import QRCodeButton from "../components/QRCodeButton";

const CreateLink = () => {
  const dispatch = useDispatch();
  const { createdLink, loading, error } = useSelector((state) => state.links);
  const [originalUrl, setOriginalUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createShortLink({ originalUrl, customAlias, expirationDate }));
  };

  useEffect(() => {
    if (createdLink) {
      setCopied(false);
      setOriginalUrl("");
      setCustomAlias("");
      setExpirationDate("");
    }
  }, [createdLink]);

  const handleCopy = () => {
    navigator.clipboard.writeText(createdLink.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-950 min-h-screen py-16 px-4 text-white">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10">
          <h2 className="text-4xl font-bold tracking-tight text-white">Create a Short Link</h2>
          <p className="mt-2 text-gray-400 text-sm">Shorten your long URLs with optional custom alias and expiration date.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-800"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-1">Original URL<span className="text-red-500">*</span></label>
            <input
              type="url"
              required
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-500"
              placeholder="https://example.com/very/long/link"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-1">Custom Alias</label>
            <input
              type="text"
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-500"
              placeholder="e.g. my-awesome-link"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-1">Expiration Date</label>
            <input
              type="date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <button
            type="submit"
            className={`${loading ? "cursor-progress" : "cursor-pointer"} w-full bg-blue-600 hover:bg-blue-500 transition text-white font-medium py-2.5 rounded-xl text-center`}
          >
            {loading ? "Generating..." : "Shorten URL"}
          </button>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}
        </form>

        {createdLink && (
          <div className="mt-8 bg-green-900/20 border border-green-700 text-green-300 p-6 rounded-xl space-y-4 transition-all duration-300">
            <div className="flex justify-between items-start flex-wrap gap-3">
              <div>
                <p className="font-semibold text-white mb-1">Short URL:</p>
                <a
                  href={createdLink.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-400 hover:underline break-all"
                >
                  {createdLink.shortUrl}
                </a>
              </div>
              <button
                onClick={handleCopy}
                className="cursor-pointer bg-blue-700 hover:bg-blue-600 transition px-4 py-2 text-sm rounded-xl text-white font-medium"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <QRCodeButton url={createdLink.shortUrl} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateLink;


