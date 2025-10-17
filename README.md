# e-commerce_NEXTJS


app/
 └─ api/
      ├─ products/
      │    ├─ route.js        // GET all products, POST new product (admin)
      │    └─ [id]/
      │         └─ route.js   // GET one product, PATCH, DELETE
      │
      ├─ categories/
      │    ├─ route.js        // GET all categories, POST new category
      │    └─ [id]/
      │         └─ route.js   // PATCH, DELETE
      │
      ├─ cart/
      │    ├─ route.js        // GET user cart, POST add item
      │    └─ [itemId]/
      │         └─ route.js   // DELETE or PATCH quantity
      │
      ├─ reviews/
      │    ├─ route.js        // POST review, GET all reviews for a product
      │    └─ [id]/
      │         └─ route.js   // PATCH, DELETE
      │
      ├─ hero/
      │    └─ route.js        // GET carousel images, POST/DELETE (admin)
      │
      └─ trust-signals/
           └─ route.js        // GET, POST, DELETE (admin)