import React from "react";
import style from "../sceneComponent.module.css";

interface TextProps {
    isHasImage: boolean;
    text?: string;
    textPosition: string;
}

function formatTextPosition(textPosition: string): string {
    const formattedTextPosition = textPosition
        .split('-')
        .map(s => s[0].toUpperCase() + s.slice(1))
        .join('');
    return formattedTextPosition[0].toLowerCase() + formattedTextPosition.slice(1);
}

export default function TextContent(props: TextProps): JSX.Element {
    const textWrapperClass = props.isHasImage
        ? `${style.textWrapper} ${style.textWrapper_withImage}`
        : `${style.textWrapper} ${style.textWrapper_withoutImage}`;

    return (
        <div className={textWrapperClass}>
            <div className={`${style.textWrapper__text} ${style['textWrapper__text_' + formatTextPosition(props.textPosition)]}`}>
                {props.text}
            </div>
        </div>
    )
}
