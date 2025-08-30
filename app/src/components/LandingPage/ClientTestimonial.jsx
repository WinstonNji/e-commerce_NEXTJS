import React from 'react'
import { Quote, Star } from 'lucide-react'

function ClientTestimonial() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah M.",
      text: "Amazing quality and fast delivery! Will definitely shop here again.",
      role: "Verified Buyer",
      rating: 5
    },
    {
      id: 2,
      name: "Michael R.",
      text: "Best customer service I've experienced online.",
      role: "Verified Buyer",
      rating: 5
    },
    {
      id: 3,
      name: "Jennifer L.",
      text: "Great prices and the products exceeded my expectations.",
      role: "Verified Buyer",
      rating: 5
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-accent mb-2">What Our Customers Say</h2>
        <p className="text-gray-500">Don't just take our word for it</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div 
            key={testimonial.id} 
            className="bg-secondary/20 p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <div className="text-primary opacity-80 mb-4">
              <Quote size={24} className='text-accent '/>
            </div>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              {testimonial.text}
            </p>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
              
              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i}
                    size={20}
                    className="text-accent fill-current"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ClientTestimonial