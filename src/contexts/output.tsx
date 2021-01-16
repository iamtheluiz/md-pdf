import React, { useState } from 'react'

interface OutputContext {
  outputFolder: string;
  setOutputFolder: (value: string) => void;
}

const OutputContext = React.createContext<OutputContext>({} as OutputContext)

export const OutputProvider: React.FC = ({ children }) => {
  const [outputFolder, setOutputFolder] = useState<string>('')

  return (
    <OutputContext.Provider value={{
      outputFolder,
      setOutputFolder
    }}>
      {children}
    </OutputContext.Provider>
  )
}

export default OutputContext
