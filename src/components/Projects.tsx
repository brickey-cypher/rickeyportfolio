import React, { useState } from 'react';

const projects = [
  {
    title: 'Security Incident & Assessment Report',
    description:
      'Investigated a web-based malware incident involving HTTP traffic. Used tcpdump to analyze redirection patterns and identify a malicious file disguised as a browser update. Discovered that the attacker compromised site access via brute-force attack, resulting in user infections and admin lockout',
    pdf: '/projects/security-incident-assessment-report.pdf',
  },
  // ...other projects...
];

export default function Projects() {
  const [grid, setGrid] = useState(false);

  return (
    <section className="my-12 px-6">
      <h1 className="text-3xl font-bold text-center mb-6">Projects</h1>

      <div className="flex justify-end mb-4">
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition text-sm"
          onClick={() => setGrid(!grid)}
        >
          {grid ? 'Scroll View' : 'Grid View'}
        </button>
      </div>

      <div
        className={`transition-all ${
          grid
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'flex overflow-x-auto space-x-4 snap-x snap-mandatory pb-4'
        }`}
      >
        {projects.map((p) => (
          <div
            key={p.title}
            className={`bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between ${
              grid ? '' : 'min-w-[90%] sm:min-w-[45%] snap-start shrink-0'
            }`}
          >
            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-900">{p.title}</h2>
              <p className="text-gray-700 mb-4">{p.description}</p>
            </div>
            <a
              href={p.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              View Details
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
