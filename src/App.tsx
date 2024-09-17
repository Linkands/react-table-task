import React from 'react';
import './App.css';
import TaskTable from './components/TaskTable/TaskTable'

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Task manager</h1>
      <TaskTable />
    </div>
  );
};

export default App;
