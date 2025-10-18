import pool from "@/lib/db";
import { getUrl } from "@/lib/utils/getUrl";

export async function createTrustSignal(formData) {
    try {
        const text = formData.get('trustSignalText');
        const icon = formData.get('trustSignalIcon');
        const display = formData.get('display');

        const query = `
            INSERT INTO trust_signal (
                trust_signal_text,
                trust_signal_icon,
                display
            )
            VALUES ($1, $2, $3)
            RETURNING *;
        `;

        const values = [
            text,
            icon,
            display || true
        ]

        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getAllTrustSignals() {
    try {
        const query = `
            SELECT * FROM trust_signal;
        `;
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function editTrustSignal(formData, trustSignalId) {
    try {
        const text = formData.get('trustSignalText');
        const iconImg = formData.get('trustSignalIcon');
        const display = formData.get('display');

        // Creating icon url
        const iconUrl = await getUrl(iconImg, 'e-commerce/trust_signals');

        const query = `
            UPDATE trust_signal
            SET 
                trust_signal_text = $1,
                trust_signal_icon = $2,
                display = $3
            WHERE id = $4
            RETURNING *;
        `;
        const values = [
            text,
            iconUrl,
            display,
            trustSignalId
        ];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function deleteTrustSignal(trustSignalId) {
    try {
        const query = `
            DELETE FROM trust_signal
            WHERE id = $1
            RETURNING *;
        `;
        const result = await pool.query(query, [trustSignalId]);
        return result.rows[0];
    } catch (error) {
        console.error(error);
        throw error;
    }  
}
