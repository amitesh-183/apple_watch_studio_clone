'use client'
import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import ShareModal from './ShareModal';

const SaveShare = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [watchImage, setWatchImage] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const generateShareableUrl = (imageData) => {
        // Convert base64 to Blob
        const byteString = atob(imageData.split(',')[1]);
        const mimeString = imageData.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });

        // Create shareable URL
        return URL.createObjectURL(blob);
    };

    const captureWatchImage = async () => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const captureWidth = 470;
        const captureHeight = viewportHeight * 0.9;
        const x = (viewportWidth - captureWidth) / 2;
        const y = viewportHeight - captureHeight;

        try {
            const canvas = document.createElement('canvas');
            canvas.width = captureWidth;
            canvas.height = captureHeight;
            const ctx = canvas.getContext('2d');

            await html2canvas(document.body, {
                width: captureWidth,
                height: captureHeight,
                x: x,
                y: y,
                scrollX: -window.scrollX,
                scrollY: -window.scrollY,
                windowWidth: viewportWidth,
                windowHeight: viewportHeight,
                useCORS: true,
                allowTaint: true,
                logging: false,
                imageTimeout: 0
            }).then(tempCanvas => {
                ctx.drawImage(tempCanvas, 0, 0);
                const dataUrl = canvas.toDataURL('image/png', 1.0);
                const shareableUrl = generateShareableUrl(dataUrl);
                setWatchImage(shareableUrl);
            });

            return true;
        } catch (error) {
            console.log('Screenshot error:', error);
            return false;
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        const success = await captureWatchImage();
        if (success) {
            setIsModalOpen(true);
        }
        setIsSaving(false);
    };

    // Cleanup URLs when modal closes
    const handleModalClose = () => {
        if (watchImage) {
            URL.revokeObjectURL(watchImage);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="flex gap-2">
            <button
                onClick={handleSave}
                disabled={isSaving}
                className={`appleBtn font-thin !px-4 text-sm tracking-wider ${isSaving ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
            >
                {isSaving ? 'Save...' : 'Save'}
            </button>

            <ShareModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                imageUrl={watchImage}
                watchName="Apple Watch Series 10"
                watchDetails="Custom Design"
            />
        </div>
    );
};

export default SaveShare;
