import React from 'react';

function TransactionHistory({ transactions }) {
    return (
        <div className="flex items-center">
            <span className="text-green-700 font-medium mr-1">{`+${transactions.positive}`}</span>
            <span className="text-red-700 font-medium">{`-${transactions.negative}`}</span>
            <div className="ml-2 space-x-0.5 flex items-center">
                {transactions.history.map((txn, index) => (
                    <div
                        key={index}
                        className={`h-3.5 w-3.5 border-2 cursor-pointer ${getTxnClass(txn)}`}
                        title={txn.info}
                        onClick={() => window.open(`https://etherscan.io/tx/${txn.hash}`, '_blank')}
                    ></div>
                ))}
            </div>
        </div>
    );
}

function getTxnClass(txn) {
    switch (txn.type) {
        case 'positive': return 'bg-green-600 border-green-700';
        case 'negative': return 'bg-red-600 border-red-700';
        default: return 'bg-gray-200 border-gray-300';
    }
}

export default TransactionHistory;
