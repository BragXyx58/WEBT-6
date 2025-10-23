import React, { useState } from "react";
import "./App.css";

interface Note {
  id: number;
  title: string;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const addNote = () => {
    const newNote: Note = {
      id: Date.now(),
      title: title,
      text: text,
      completed: false,
    };

    setNotes((items) => [...items, newNote]);
    setTitle("");
    setText("");
  };

  const deleteNote = (id: number) => {
    setNotes((item) => item.filter((note) => note.id !== id));
  };

  const toggleCompleted = (id: number) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, completed: !note.completed } : note
      )
    );
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="notes-container">
      <h1>Notes</h1>

      <div className="input-block">
        <input
          type="text"
          placeholder="Enter name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter note"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addNote}> + </button>
      </div>

      <div className="search-block">
        <input
          type="text"
          placeholder="Search by name"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ul className="notes-list">
        {filteredNotes.map((item) => (
          <li
            key={item.id}
            className={`note-item ${item.completed ? "completed" : ""}`}
          >
            <div className="note-content">
              <input
                type="checkbox"
                className="note-checkbox"
                checked={item.completed}
                onChange={() => toggleCompleted(item.id)}
              />
              <div className="note-text-content">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
            <button className="delete-btn" onClick={() => deleteNote(item.id)}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;