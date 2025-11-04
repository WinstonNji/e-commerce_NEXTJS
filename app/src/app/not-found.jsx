"use client"
import React from 'react';
import { Home, Package, Search, ArrowLeft } from 'lucide-react';

// General 404 Not Found Page 
export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#fffbf0' }}>
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6" style={{ backgroundColor: '#D4B48320' }}>
            <Search className="w-12 h-12" style={{ color: '#97322D' }} />
          </div>
          <h1 className="text-6xl font-bold mb-2" style={{ color: '#97322D' }}>404</h1>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: '#97322D' }}>
            Page Not Found
          </h2>
          <p className="mb-8" style={{ color: '#97322D', opacity: 0.8 }}>
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
        </div>
        
        <div className="space-y-3">
          <a
            href="/"
            className="inline-flex items-center justify-center w-full px-6 py-3 text-white font-medium rounded-lg transition-all hover:opacity-90"
            style={{ backgroundColor: '#97322D' }}
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </a>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center w-full px-6 py-3 font-medium rounded-lg transition-all hover:opacity-80"
            style={{ backgroundColor: '#D4B483', color: '#97322D' }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
