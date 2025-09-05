import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import CodeInput from './components/CodeInput';
import FeedbackDisplay from './components/FeedbackDisplay';
import { optimizeQuery } from './services/geminiService';
import { DATABASE_SYSTEMS, EXAMPLE_CODE } from './constants';

// Define interfaces for the global libraries
interface Marked {
  parse(markdown: string): string;
}

interface HLJS {
  highlightAll(): void;
}

// Access global variables from the window object and cast them to the expected type.
// This avoids using `declare`, which might be incorrectly transpiled in some environments.
const marked: Marked = (window as any).marked;
const hljs: HLJS = (window as any).hljs;


const App: React.FC = () => {
  const [dbSystem, setDbSystem] = useState<string>('bigquery');
  const [query, setQuery] = useState<string>(EXAMPLE_CODE.bigquery);
  const [feedback, setFeedback] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleDbSystemChange = (newDbSystem: string) => {
    setDbSystem(newDbSystem);
    setQuery(EXAMPLE_CODE[newDbSystem as keyof typeof EXAMPLE_CODE] || '');
    setFeedback('');
    setError(null);
  };
  
  const handleOptimize = useCallback(async () => {
    if (!query.trim()) {
      setError('Please enter a query or code to optimize.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setFeedback('');

    try {
      const result = await optimizeQuery(query, dbSystem);
      const htmlFeedback = marked.parse(result);
      setFeedback(htmlFeedback);
    } catch (err) {
      console.error(err);
      setError('An error occurred while optimizing the query. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [query, dbSystem]);

  useEffect(() => {
    if (feedback) {
      // Use a timeout to ensure the DOM has been updated before highlighting
      setTimeout(() => {
        try {
          if (hljs) {
            hljs.highlightAll();
          }
        } catch(e) {
          console.error("Error applying syntax highlighting", e);
        }
      }, 0);
    }
  }, [feedback]);


  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col md:flex-row p-4 md:px-8 md:pb-8 gap-6">
        <div className="md:w-1/2 flex flex-col h-[calc(100vh-120px)]">
          <CodeInput
            query={query}
            setQuery={setQuery}
            dbSystem={dbSystem}
            setDbSystem={handleDbSystemChange}
            onOptimize={handleOptimize}
            isLoading={isLoading}
            dbSystems={DATABASE_SYSTEMS}
          />
        </div>
        <div className="md:w-1/2 flex flex-col h-[calc(100vh-120px)]">
          <FeedbackDisplay
            feedback={feedback}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
    </div>
  );
};

export default App;