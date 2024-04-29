import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { useEffect } from 'react';
import ImageView from "react-native-image-viewing";

const ImageViewer = ({
    images,
    open,
    setImageViewer

}) => {
    const [visible, setIsVisible] = useState(open);
    const closeImage = () => {
        setImageViewer({
            images: [],
            open: false
        })
        setIsVisible(false)
    }

    useEffect(() => {
        if (open) setIsVisible(true)
    }, [open])
    return (
        <>
            <StatusBar backgroundColor={'#000'} />
            <ImageView
                images={images}
                imageIndex={0}
                visible={visible}
                onRequestClose={closeImage}
            />
        </>
    );
};

export default ImageViewer;

