const BitqueryService = require('../services/BitqueryService');
const whaleAddresses = require('../config/whaleAddresses');


exports.getWhaleTransactions = async (req, res) => {
    try {
        // Fetch transactions where whales are recipients
        const transactionsTo = await BitqueryService.getWhaleTransactions(whaleAddresses, 'to');

        // Fetch transactions where whales are senders
        const transactionsFrom = await BitqueryService.getWhaleTransactions(whaleAddresses, 'from');

        // Send the combined transactions as the response
        res.status(200).json({ transactionsTo, transactionsFrom });
    } catch (error) {
        console.error('Error fetching whale transactions:', error);
        res.status(500).json({ error: 'Failed to fetch whale transactions' });
    }
};