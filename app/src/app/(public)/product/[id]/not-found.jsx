import { Home, Package, Search, ArrowLeft } from 'lucide-react';

export default function ProductNotFound({ productId }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#fffbf0' }}>
      <div className="max-w-lg w-full">
        <div className="rounded-2xl shadow-lg p-8 text-center" style={{ backgroundColor: '#fffbf0', border: '2px solid #D4B483' }}>
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6" style={{ backgroundColor: '#D4B48340' }}>
            <Package className="w-10 h-10" style={{ color: '#97322D' }} />
          </div>
          
          <h1 className="text-3xl font-bold mb-3" style={{ color: '#97322D' }}>
            Product Not Found
          </h1>
          
          <p className="mb-2" style={{ color: '#97322D', opacity: 0.8 }}>
            We couldn't find the product you're looking for.
          </p>
          
          {productId && (
            <p className="text-sm mb-6" style={{ color: '#97322D', opacity: 0.6 }}>
              Product ID: <span className="font-mono">{productId}</span>
            </p>
          )}
          
          <div className="rounded-lg p-4 mb-6" style={{ backgroundColor: '#D4B48330', border: '1px solid #D4B483' }}>
            <p className="text-sm" style={{ color: '#97322D' }}>
              This product may have been removed, is out of stock, or the link might be incorrect.
            </p>
          </div>
          
          <div className="space-y-3">
            <a
              href="/all-products"
              className="inline-flex items-center justify-center w-full px-6 py-3 text-white font-medium rounded-lg transition-all hover:opacity-90"
              style={{ backgroundColor: '#97322D' }}
            >
              Browse All Products
            </a>
            
            <a
              href="/"
              className="inline-flex items-center justify-center w-full px-6 py-3 font-medium rounded-lg transition-all hover:opacity-80"
              style={{ backgroundColor: '#D4B483', color: '#97322D' }}
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </a>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm" style={{ color: '#97322D', opacity: 0.8 }}>
            Need help?{' '}
            <a href="/contact" className="hover:underline" style={{ color: '#97322D', fontWeight: 500 }}>
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}