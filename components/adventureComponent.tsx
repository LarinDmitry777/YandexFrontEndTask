import React from "react";
import {IHashTag} from "../server/dbAdapter";
import Image from "./adventure/image";
import Title from "./adventure/title";
import Description from "./adventure/description";
import HashTags from "./adventure/hashTags";

export interface AdventureProps {
    adventureUrl: string;
    staticBasePath: string;
    imageName: string;
    name: string;
    description?: string;
    hashTags: IHashTag[];
}

export function Adventure(props: AdventureProps): JSX.Element {
    return (
        <article className='adventure'>
            <Image urlText={props.adventureUrl}
                   staticBasePath={props.staticBasePath}
                   imageName={props.imageName}
                   adventureUrl={props.adventureUrl}/>
            <div className="adventure__description-column">
                <Title urlText={props.adventureUrl}
                       name={props.name}
                       adventureUrl={props.adventureUrl}
                       staticBasePath={props.staticBasePath}/>
                <Description description={props.description}/>
                <HashTags hashTags={props.hashTags} staticBasePath={props.staticBasePath}/>
            </div>
        </article>
    )
}
