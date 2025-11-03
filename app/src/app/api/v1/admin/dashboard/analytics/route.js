import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        
        const response = await pool.query(`
            SELECT 
              -- Order metrics
              (SELECT SUM(total_amount) FROM orders WHERE payment_status = 'paid') AS total_revenue,
              (SELECT AVG(total_amount) FROM orders WHERE payment_status = 'paid') AS avg_revenue,
              (SELECT COUNT(*) FROM orders WHERE payment_status = 'failed') AS failed_payments,
              (SELECT COUNT(*) FROM orders WHERE payment_status = 'pending') AS pending_payments,
              (SELECT AVG(item_count) FROM (SELECT COUNT(*) AS item_count FROM order_items GROUP BY order_id)) AS avg_item_per_order,
            -- Product Based Metrics
              (SELECT COUNT(*) FROM products) AS total_products_listed,
              (SELECT SUM(inventory) FROM products) AS total_inventory,
              (SELECT COUNT(*) FROM products WHERE inventory <= 0 ) AS number_of_out_of_stock_products,
              (SELECT title FROM products ORDER BY inventory DESC LIMIT 1) as most_stocked_product,
              (SELECT title FROM products ORDER BY inventory ASC LIMIT 1) AS least_stocked_product,
              (SELECT p.title FROM products p 
                JOIN order_items oi ON p.id = oi.product_id 
                GROUP BY p.id 
                ORDER BY SUM(oi.quantity) DESC 
                LIMIT 1) AS best_selling_product,
            -- User-based Metric
              (SELECT COUNT(DISTINCT user_id) FROM orders) AS active_customers,
              (SELECT COUNT(*) FROM users WHERE id NOT IN (SELECT DISTINCT user_id FROM orders)) AS users_have_account_but_no_purchase,
              (SELECT COUNT(*) FROM (SELECT user_id FROM orders GROUP BY user_id HAVING COUNT(*) > 1)) AS repeated_customers,
            -- Time-based snapshots
              (SELECT COUNT(*) FROM orders WHERE created_at >= NOW() - INTERVAL '7 days') AS orders_in_last_7_days,
              (SELECT SUM(total_amount) FROM orders WHERE created_at >= NOW() - INTERVAL '7 days') AS revenue_in_last_days
            `)

        if(response.rowCount == 0){
            throw new Error("Coulnd't fetch analytics")
        }

        const analytics = response.rows

        console.log(analytics, '***analytics')

        return NextResponse.json({
            success: true,
            data : analytics
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json({
            success: false,
            message: error,
            error: error
        })
    }
}