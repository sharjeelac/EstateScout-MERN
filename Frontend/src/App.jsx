import React from 'react'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='*' element={<h2>page Not Found</h2>} />
      </Routes>
    </div>
  )
}

export default App
