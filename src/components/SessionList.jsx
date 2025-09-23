import React from 'react';

const SessionList = ({ allSessions, activeSessionId, setActiveSessionId, handleAddSession }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-2xl h-full flex flex-col">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-200">Your Sessions</h2>
      <div className="flex-grow overflow-y-auto space-y-3 pr-2">
        {allSessions.map((session) => (
          <div
            key={session.id}
            onClick={() => setActiveSessionId(session.id)}
            className={`p-4 rounded-lg cursor-pointer transition duration-200
              ${session.id === activeSessionId ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`}
          >
            <h3 className="text-xl font-semibold">{session.name}</h3>
            <p className="text-sm text-gray-300">{session.exercises.length} exercises</p>
          </div>
        ))}
      </div>
      <button
        onClick={handleAddSession}
        className="mt-6 w-full px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl text-white text-lg font-bold transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
      >
        + Add New Session
      </button>
    </div>
  );
};

export default SessionList;
