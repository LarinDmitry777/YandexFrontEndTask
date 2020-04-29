import React from "react";

interface TextProps {
    isHasImage: boolean;
    text?: string;
    textPosition: string;
}

export default function TextContent(props: TextProps): JSX.Element {
    const textWrapperClass = props.isHasImage
        ? 'text-wrapper text-wrapper_with-image'
        : 'text-wrapper text-wrapper_without-image';

    return (
        <div className={textWrapperClass}>
            <div className={`text-wrapper__text text-wrapper__text_${props.textPosition}`}>
                {props.text}
            </div>
        </div>
    )
}
