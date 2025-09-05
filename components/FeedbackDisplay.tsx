import React from 'react';
import Loader from './Loader';

interface FeedbackDisplayProps {
  feedback: string;
  isLoading: boolean;
  error: string | null;
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ feedback, isLoading, error }) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full gap-4 text-center p-4">
          <Loader />
          <p className="text-slate-400">SQLean.fyi is analyzing your code...</p>
          <p className="text-xs text-slate-500">This may take a few moments for complex queries.</p>
        </div>
      );
    }
    if (error) {
      return (
         <div className="flex items-center justify-center h-full p-4">
            <div className="text-center bg-red-900/20 border border-red-500/30 p-6 rounded-xl max-w-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-red-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="text-lg font-semibold text-red-300">An Error Occurred</h3>
                <p className="text-red-400 mt-2 text-sm">{error}</p>
            </div>
         </div>
      );
    }
    if (feedback) {
      return (
        <div 
          className="prose prose-invert prose-sm sm:prose-base max-w-none p-6 
            prose-pre:bg-slate-900/50 prose-pre:border prose-pre:border-slate-700/50 prose-pre:rounded-lg prose-pre:p-4 
            prose-code:text-sky-300 prose-code:before:content-none prose-code:after:content-none
            prose-h3:font-semibold prose-h3:text-sky-400 prose-h3:text-base prose-h3:mb-2 prose-h3:mt-4
            prose-a:text-sky-400 hover:prose-a:text-sky-300 prose-a:transition-colors
            prose-strong:text-slate-200"
          dangerouslySetInnerHTML={{ __html: feedback }}
        />
      );
    }
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 p-4">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
        <h3 className="text-lg font-semibold text-slate-400">Analysis Will Appear Here</h3>
        <p className="max-w-md mt-1 text-sm">
          Enter your code on the left, select the database system, and click "Optimize Query" to get an expert analysis from SQLean.fyi.
        </p>
      </div>
    );
  };
  
  return (
    <div className="bg-slate-800/70 rounded-xl border border-slate-700/50 h-full flex flex-col shadow-2xl shadow-slate-950/50">
        <div className="p-3 border-b border-slate-700/50">
             <h2 className="text-lg font-semibold text-slate-200 pl-2">Analysis</h2>
        </div>
        <div className="flex-grow overflow-y-auto p-2 code-font">
          {renderContent()}
        </div>
    </div>
  );
};

export default FeedbackDisplay;