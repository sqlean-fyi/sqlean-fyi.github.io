import React from 'react';
import Editor from 'react-simple-code-editor';

// Access the globally loaded highlight.js library
const hljs = (window as any).hljs;

interface CodeInputProps {
  query: string;
  setQuery: (query: string) => void;
  dbSystem: string;
  setDbSystem: (dbSystem: string) => void;
  onOptimize: () => void;
  isLoading: boolean;
  dbSystems: { value: string; label: string }[];
}

const getHighlightLanguage = (dbSystem: string): string => {
  switch (dbSystem) {
    case 'mongodb':
      return 'javascript';
    case 'dynamodb':
      return 'json';
    default:
      return 'sql';
  }
};

const CodeInput: React.FC<CodeInputProps> = ({
  query,
  setQuery,
  dbSystem,
  setDbSystem,
  onOptimize,
  isLoading,
  dbSystems,
}) => {

  const language = getHighlightLanguage(dbSystem);

  const highlightCode = (code: string): string => {
    if (hljs && hljs.getLanguage(language)) {
      try {
        return hljs.highlight(code, { language, ignoreIllegals: true }).value;
      } catch (e) {
        console.error('Highlighting error:', e);
        return code; // Fallback to plain text on error
      }
    }
    return code; // Fallback if hljs or language is not available
  };


  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700/50 flex flex-col h-full shadow-2xl shadow-slate-950/50">
      <div className="flex justify-between items-center p-3 border-b border-slate-700/50">
        <h2 className="text-lg font-semibold text-slate-200 pl-2">Your Query / Code</h2>
        <select
          value={dbSystem}
          onChange={(e) => setDbSystem(e.target.value)}
          className="bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-sm text-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-none custom-select transition-colors hover:bg-slate-700"
        >
          {dbSystems.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-grow editor-container code-font text-sm leading-relaxed">
         <Editor
          value={query}
          onValueChange={code => setQuery(code)}
          highlight={highlightCode}
          padding={16} // p-4
          style={{
            color: '#cbd5e1', // slate-300 text
            backgroundColor: 'transparent',
            minHeight: '100%',
          }}
          spellCheck="false"
        />
      </div>
      <div className="p-4 border-t border-slate-700/50">
        <button
          onClick={onOptimize}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-sky-500 hover:to-sky-500 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-400"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Optimizing...
            </>
          ) : (
            'Optimize Query'
          )}
        </button>
      </div>
    </div>
  );
};

export default CodeInput;