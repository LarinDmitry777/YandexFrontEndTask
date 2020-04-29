import {Achievement} from "../../pages/scene";
import React from "react";

interface AchievementsProps {
    achievements: Achievement[];
    staticBasePath: string;
}

export default function Achievements(props: AchievementsProps): JSX.Element | null {
    if (props.achievements.length === 0) {
        return null;
    }
    return (
        <div className='achievements_list'>
            {props.achievements.map((achievement: Achievement) => {
                return (
                    <div className='achievement' key={achievement.id}>
                        <img className='achievement__image'
                             src={`${props.staticBasePath}images/achievements/${achievement.imageName}`}
                             alt=''
                        />
                        <div className='achievement__text'>Достижение получено</div>
                        <div className='achievement__name'>{achievement.text}</div>
                    </div>
                )
            })}
        </div>
    )
}
