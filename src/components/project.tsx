import React, { useState } from 'react';
import type { Project } from './types';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [grid, setGrid] = useState(false);

  return (
 <section className="my-12 px-4 sm:px-6">
  <a href="/" className="inline-block text-sm text-blue-600 hover:underline mb-4">
    ← Back to Home
  </a>

      <h1 className="text-3xl font-bold text-center mb-6 text-gray-100">Projects</h1>

      <div className="flex justify-end mb-4">
        <button
          aria-label={grid ? 'Switch to scroll view' : 'Switch to grid view'}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition text-sm"
          onClick={() => setGrid(!grid)}
        >
          {grid ? 'Scroll View' : 'Grid View'}
        </button>
      </div>

      <div
        className={`transition-all ${
          grid
            ? 'grid grid-cols-2 md:grid-cols-3 gap-4 w-full text-[0.75rem] sm:text-sm'
            : 'flex flex-col space-y-4 pb-4 w-full'
        }`}
      >
        {projects.map((p) => (
          <div
            key={p.title}
            className={`bg-white rounded-xl shadow-lg p-4 sm:p-6 flex flex-col justify-between ${
              grid ? 'min-w-0' : 'min-w-[90%] sm:min-w-[45%] snap-start shrink-0'
            }`}
          >
            <div>
              <h2 className="text-base sm:text-xl font-semibold mb-2 text-gray-900">{p.title}</h2>
              <p className="text-gray-700 mb-4 text-xs sm:text-sm">{p.description}</p>
            </div>
            <a
              href={p.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-block px-3 py-2 bg-blue-600 text-white text-xs sm:text-sm rounded hover:bg-blue-700 transition"
            >
              View Details
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
