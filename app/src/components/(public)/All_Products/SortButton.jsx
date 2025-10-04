"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function SortSelect() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // get current sort from URL (fallback to "all")
  const currentSort = searchParams.get("sort") || "all"

  const [sort, setSort] = useState(currentSort)

  // keep state in sync if URL changes (e.g. back/forward nav)
  useEffect(() => {
    setSort(currentSort)
  }, [currentSort])

  const handleChange = (value) => {
    setSort(value)

    const params = new URLSearchParams(searchParams.toString())

    if (value === "all") {
      params.delete("sort") 
    } else {
      params.set("sort", value)
    }

    router.replace(`?${params.toString()}`)
  }

  return (
    <select
      value={sort}
      onChange={(e) => handleChange(e.target.value)}
      className="select select-accent bg-transparent hover:bg-base-300 hover:text-black font-bold w-38 md:w-40" 
    >
      <option value="all">Sort</option>
      <option value="featured">Featured</option>
      <option value="-createdAt">Newest</option>
      <option value="createdAt">Oldest</option>
      <option value="-price">Price: Low to High</option>
      <option value="price">Price: High to Low</option>
      <option value="ratings">User Ratings</option>
      <option value="title">A-Z</option>
      <option value="-title">Z-A</option>
    </select>
  )
}
