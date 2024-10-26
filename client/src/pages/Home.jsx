import React from 'react'

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">

      {/* Portfolio Home Content */}
      <div className="flex flex-col items-center justify-center text-center py-16">
        {/* Developer's Name */}
        <h1 className="text-5xl font-bold mb-2 text-gray-900 dark:text-white">Hello, I'm Jubayer</h1>
        
        {/* Short Intro */}
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          A passionate full-stack developer who loves building web applications.
        </p>
        
        {/* Profile Image */}
        <div className="w-40 h-40 mb-6">
          <img
            className="rounded-full border-4 border-gray-300 dark:border-gray-700 shadow-lg"
            src="https://res.cloudinary.com/dhw3jdygg/image/upload/w_1000,ar_1:1,c_fill/v1727500468/Users_images/jubayer_shuvo/avatar.png"
            alt="Developer Profile"
          />
        </div>

        {/* Skills Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Skills:</h2>
          <ul className="flex flex-wrap justify-center gap-3">
            <li className="bg-blue-500 text-white py-2 px-4 rounded-full">JavaScript</li>
            <li className="bg-green-500 text-white py-2 px-4 rounded-full">React</li>
            <li className="bg-yellow-500 text-white py-2 px-4 rounded-full">Node.js</li>
            <li className="bg-indigo-500 text-white py-2 px-4 rounded-full">Tailwind CSS</li>
            <li className="bg-purple-500 text-white py-2 px-4 rounded-full">GraphQL</li>
          </ul>
        </div>

        {/* Call to Action - Contact Me */}
        <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-300">
          Contact Me
        </button>
      </div>
    </div>
  )
}

export default Home