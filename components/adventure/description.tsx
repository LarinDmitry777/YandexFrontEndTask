import React from "react";
import style from "../adventureComponent.module.css";

interface DescriptionProps {
    description?: string;
}

export default function Description(props: DescriptionProps): JSX.Element | null {
    if (props.description === undefined) {
        return null;
    }

    return (
        <div className={style.adventure__description}>{props.description}</div>
    )
}
