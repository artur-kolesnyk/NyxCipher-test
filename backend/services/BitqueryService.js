const axios = require('axios');
const { BITQUERY_API_KEY, BITQUERY_API_URL } = require('../config/key');

/**
 * Fetches transactions involving whale addresses either as senders or recipients.
 * @param {Array} addresses - List of whale addresses.
 * @param {string} direction - 'to' or 'from', indicating transaction direction.
 * @returns {Promise<Array>} - List of transactions.
 */
exports.getWhaleTransactions = async (addresses, direction) => {
    if (!['to', 'from'].includes(direction)) {
        throw new Error(`Invalid direction parameter: ${direction}. Must be 'to' or 'from'.`);
    }

    const addressesString = addresses.map(addr => `"${addr}"`).join(', ');
    const txField = direction === 'to' ? 'txTo' : 'txSender';

    const query = `
    {
        ethereum(network: bsc) {
            transactions(
                ${txField}: { in: [${addressesString}] }
                options: { limit: 20, desc: "date.date" }
            ) {
                hash
                amount
                gasValue
                sender {
                    address
                }
                to {
                    address
                }
                date {
                    date
                }
            }
        }
    }
    `;

    try {
        const response = await axios.post(
            BITQUERY_API_URL,
            { query },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': BITQUERY_API_KEY,
                },
            }
        );
        return response.data.data.ethereum.transactions;
    } catch (error) {
        console.error(`Error fetching ${direction} whale transactions:`, error);
        throw error;
    }
};
