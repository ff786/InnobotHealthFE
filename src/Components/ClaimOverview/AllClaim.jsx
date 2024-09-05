import React, { useState } from 'react';

import Table from 'react-bootstrap/Table';

function AllClaimPending() {
  return (
     <div className="container mx-auto p-6 bg-white dark:bg-zinc-500">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-zinc-800">
              <thead>
                <tr className="w-full h-16 border-text-white dark:border-zinc-200 border-b py-8">
                  <th className="text-left pl-8 pr-6 text-xs font-medium text-zinc-600 dark:text-white uppercase tracking-wider">
                    Member ID
                  </th>
                  <th className="text-left px-6 text-xs font-medium text-zinc-600 dark:text-white uppercase tracking-wider">
                    Claim Type
                  </th>
                  <th className="text-left px-6 text-xs font-medium text-zinc-600 dark:text-white uppercase tracking-wider">
                    LastName, FirstName
                  </th>
                  <th className="text-left px-6 text-xs font-medium text-zinc-600 dark:text-white uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 text-xs font-medium text-zinc-600 dark:text-white uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:text-white">
                <tr className="text-zinc-700 dark:text-black">
                  <td className="px-8 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">
                    INBOT001
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">
                    Cashless
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">
                    Theekshana, Mahesh
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">
                    Approved
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">
                    <div className="flex items-center">
                      <button className="text-green-600 hover:text-green-900 mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  );
}

export default AllClaim;