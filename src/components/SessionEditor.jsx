import React, { useState } from 'react';

const SessionEditor = ({ session, setSession }) => {
  const [draggedItem, setDraggedItem] = useState(null);

  const handleAddExercise = () => {
    const newExercise = {
      id: session.length > 0 ? Math.max(...session.map(item => item.id)) + 1 : 1,
      name: 'New Exercise',
      duration: 30,
      type: 'exercise',
      description: 'Description'
    };
    setSession([...session, newExercise]);
  };

  const handleUpdateExercise = (id, field, value) => {
    setSession(session.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleDeleteExercise = (id) => {
    setSession(session.filter(item => item.id !== id));
  };

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.currentTarget);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetItem) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem.id === targetItem.id) {
      return;
    }

    const currentIndex = session.findIndex(item => item.id === draggedItem.id);
    const targetIndex = session.findIndex(item => item.id === targetItem.id);

    const newSession = [...session];
    const [removed] = newSession.splice(currentIndex, 1);
    newSession.splice(targetIndex, 0, removed);

    setSession(newSession);
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <div className="bg-gray-800 p-8 rounded-xl shadow-2xl h-full flex flex-col">
      <h2 className="text-4xl font-bold mb-6 text-center text-gray-200">Edit Session</h2>
      <div className="space-y-4 flex-grow overflow-y-auto pr-2">
        {session.map((item) => (
          <div
            key={item.id}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, item)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, item)}
            onDragEnd={handleDragEnd}
            className={`bg-gray-700 p-4 rounded-lg flex flex-col md:flex-row items-center justify-between gap-3 cursor-grab
              ${draggedItem && draggedItem.id === item.id ? 'opacity-50 border-2 border-blue-500' : ''}`}
          >
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              <input
                type="text"
                value={item.name}
                onChange={(e) => handleUpdateExercise(item.id, 'name', e.target.value)}
                className="bg-gray-600 text-white p-3 rounded-md w-full border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition duration-200"
                placeholder="Exercise Name"
              />
              <input
                type="number"
                value={item.duration}
                onChange={(e) => handleUpdateExercise(item.id, 'duration', parseInt(e.target.value))}
                className="bg-gray-600 text-white p-3 rounded-md w-full border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition duration-200"
                placeholder="Duration (seconds)"
              />
              <input
                type="text"
                value={item.description}
                onChange={(e) => handleUpdateExercise(item.id, 'description', e.target.value)}
                className="bg-gray-600 text-white p-3 rounded-md w-full col-span-full border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition duration-200"
                placeholder="Description (spoken)"
              />
            </div>
            <button
              onClick={() => handleDeleteExercise(item.id)}
              className="flex-shrink-0 px-5 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={handleAddExercise}
        className="mt-6 w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white text-lg font-bold transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Add Exercise
      </button>
    </div>
  );
};

export default SessionEditor;
