import React from "react";

interface DescriptionProps {
    description?: string;
}

export default function Description(props: DescriptionProps): JSX.Element | null {
    if (props.description === undefined) {
        return null;
    }

    return (
        <div className="adventure__description">{props.description}</div>
    )
}
