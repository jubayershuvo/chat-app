import React from 'react'

function Skeletion() {
  return (
    <div className="space-y-4">
        <div className="animate-pulse">
            <div className="h-14 bg-gray-300 dark:bg-gray-700 rounded w-full mb-1"></div>
            <div className="h-14 bg-gray-300 dark:bg-gray-700 rounded w-full mb-1"></div>
        </div>
    </div>

  )
}

export default Skeletion