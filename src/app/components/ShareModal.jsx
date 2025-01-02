import React, { useState } from 'react';
import Image from 'next/image';

const ShareModal = ({
    isOpen,
    onClose,
    imageUrl,
    watchName,
    watchDetails
}) => {
    const [showCopied, setShowCopied] = useState(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(imageUrl);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
    };

    return (
        <div className={`fixed inset-0 z-[9999] flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
            <div className="fixed inset-0 bg-black/50" onClick={onClose} />
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative z-10">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="space-y-6">
                    <div className="text-center">
                        <h3 className="text-xl font-semibold">{watchName}</h3>
                        <p className="text-gray-600 mt-1">{watchDetails}</p>
                    </div>

                    <div className="relative w-full aspect-square max-w-[300px] mx-auto">
                        {imageUrl && (
                            <Image
                                src={imageUrl}
                                alt={watchName}
                                layout="fill"
                                objectFit="contain"
                                className="rounded-lg"
                            />
                        )}
                    </div>

                    <div className="flex gap-2">
                        <input
                            type="text"
                            readOnly
                            value={imageUrl}
                            className="flex-1 px-3 py-2 border rounded-lg bg-gray-50 text-sm"
                        />
                        <button
                            onClick={handleCopyLink}
                            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 relative"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            {showCopied && (
                                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                                    Copied!
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShareModal;
