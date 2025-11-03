import CategoryCard from '@/components/Shared/Category/CategoryCard'

export default async function CategoryList() {
  const baseUrl = process.env.VERCEL_URL ?  `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'
  const res = await fetch(`${baseUrl}/api/v1/admin/category`)
  if (!res.ok) throw new Error('Failed to fetch categories')
  const data = await res.json()
  const categories = data.data || []

  return (
    <div className='relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
      {categories.length > 0 ? (
        categories.map((category, index) => (
          <CategoryCard key={index} info={category} />
        ))
      ) : (
        <p>No categories found.</p>
      )}
    </div>
  )
}
