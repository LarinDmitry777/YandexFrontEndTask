import Link from "next/link";
import React from "react";
import {IHashTag} from "../../server/dbAdapter";
import style from "../adventureComponent.module.css";

interface HashTagsProps {
    hashTags: IHashTag[];
    staticBasePath: string;
}

export default function HashTags(props: HashTagsProps): JSX.Element {
    return (
        <div className={style.adventure__hashTagContainer}>
            {props.hashTags.map(hashTag => {
                    const linkAs = `/hashtags/${hashTag.textEn}`;
                    const linkHref = {
                        pathname: '/list',
                        query: {
                            pageHashTagEn: hashTag.textEn,
                            staticBasePath: props.staticBasePath
                        }
                    };
                    return (
                        <Link href={linkHref} as={linkAs} key={hashTag.textEn}>
                    <div className={style.adventure__hashTag}>
                        {`#${hashTag.textRu}`}
                    </div>
                    </Link>
                )
                })}
            </div>
    )
}
