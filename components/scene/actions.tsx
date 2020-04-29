import Link from "next/link";
import {Action} from "../../pages/scene";
import React from "react";

interface ActionsProps {
    staticBasePath: string;
    actions: Action[];
    adventureUrl: string;
}

export default function Actions(props: ActionsProps) {
    if (props.actions.length === 0) {
        const linkAs = `/quests/${props.adventureUrl}/1`;
        const linkHref = {
            pathname: '/scene',
            query: {adventureName: props.adventureUrl, sceneId: '1', staticBasePath: props.staticBasePath}
        }

        return (
            <div className='action-list'>
                <Link as={linkAs} href={linkHref}>
                    <div className='action-list__action'>
                        Начать заново
                    </div>
                </Link>
            </div>
        )
    }

    return (
        <div className='action-list'>
            {props.actions.map((action: Action) => {
                const linkAs = `/quests/${props.adventureUrl}/${action.nextSceneId}`;
                const linkHref = {
                    pathname: '/scene',
                    query: {
                        adventureName: action.adventureUrl,
                        sceneId: action.nextSceneId.toString(),
                        staticBasePath: props.staticBasePath
                    }
                }

                return (
                    <Link href={linkHref} as={linkAs} key={action.id}>
                        <div className='action-list__action'>
                            {action.text}
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}
