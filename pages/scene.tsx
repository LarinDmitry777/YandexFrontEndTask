import React, {Component, Fragment} from "react";
import {Header} from "../components/headerComponent";
import Link from "next/link";
import Loading from "../components/loadingComponent";
import Head from "next/head";

export interface Action {
    adventureUrl: string;
    id: number;
    sceneId: number;
    nextSceneId: number;
    text: string;
}

export interface Achievement {
    id: number;
    text: string;
    imageName: string;
}

export interface SceneProps {
    sceneId: number;
    adventureUrl: string;
    text?: string;
    imageName?: string;
    textPosition: string;
    achievements: Achievement[];
    actions:  Action[];
    firstSceneId: number;
    staticBasePath: string;
}

interface TextProps {
    isHasImage: boolean;
    text?: string;
    textPosition: string;
}

interface ImageProps {
    imageName?: string;
    staticBasePath: string;
}

interface AchievementsProps {
    achievements: Achievement[];
    staticBasePath: string;
}

interface ActionsProps {
    staticBasePath: string;
    actions: Action[];
    adventureUrl: string;
}

interface ScenePageProps {
    adventureName: string;
    sceneId: string;
    staticBasePath: string;
}

interface ScenePageState {
    loading: boolean;
    scene?: SceneProps;
}

export default class ScenePage extends Component<ScenePageProps, ScenePageState> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static getInitialProps({req, query}: any) {
        const adventureName = req ?
            req.params.adventureName :
            query.adventureName;
        const sceneId = req ?
            req.params.sceneId :
            query.sceneId;
        const staticBasePath = req ?
            req.params.staticBasePath :
            query.staticBasePath;
        return {adventureName, sceneId, staticBasePath};
    }

    state: ScenePageState = {
        loading: true,
        scene: undefined
    }


    componentDidMount(): void {
        this.loadPage();
    }

    componentDidUpdate(prevProps: Readonly<ScenePageProps>): void {
        if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
            this.loadPage();
        }
    }

    loadPage() {
        this.setState({
            loading: true
        })
        const request = `/api/quests/${this.props.adventureName}/${this.props.sceneId}`;
        fetch(request)
            .then(response => response.json())
            .then((scene: SceneProps) => {
                this.setState({scene});
            })
            .then(() => this.setState({loading: false}));
    }

    render(): React.ReactNode {
        if (this.state.loading) {
            return (
                <Fragment>
                    <Head>
                        <title>{`TelltailGames 2 | ${this.props.adventureName}`}</title>
                    </Head>
                    <Header staticBasePath={this.props.staticBasePath} />
                    <Loading />
                </Fragment>
            )
        }

        if (this.state.scene === undefined) {
            return (
                <Fragment>
                    <Header staticBasePath={this.props.staticBasePath} />
                    <h1>Ошибка...</h1>
                </Fragment>

            )
        }

        return (
            <Fragment>
                <Head>
                    <title>{`TelltailGames 2 | ${this.props.adventureName}`}</title>
                </Head>
                <Header staticBasePath={this.state.scene.staticBasePath} />
                <Scene sceneId={this.state.scene.sceneId}
                       adventureUrl={this.state.scene.adventureUrl}
                       textPosition={this.state.scene.textPosition}
                       achievements={this.state.scene.achievements}
                       actions={this.state.scene.actions}
                       firstSceneId={this.state.scene.firstSceneId}
                       staticBasePath={this.state.scene.staticBasePath}
                       imageName={this.state.scene.imageName}
                       text={this.state.scene.text}
                />
            </Fragment>
        )
    }
}

function Scene(props: SceneProps): JSX.Element {
    return (
        <section className='content'>
            <TextContent isHasImage={props.imageName !== null}
                         text={props.text}
                         textPosition={props.textPosition}/>
            <Image staticBasePath={props.staticBasePath}
                    imageName={props.imageName}/>
            <Achievements achievements={props.achievements} staticBasePath={props.staticBasePath}/>
            <Actions actions={props.actions} adventureUrl={props.adventureUrl} staticBasePath={props.staticBasePath} />
        </section>

    )
}

function TextContent(props: TextProps): JSX.Element {
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

function Image(props: ImageProps): JSX.Element | null {
    if (props.imageName === null) {
        return null;
    }

    return (
        <img className="image"
             src={`${props.staticBasePath}images/scenes/${props.imageName}`}
             alt="" />
    )
}

function Achievements(props: AchievementsProps): JSX.Element | null {
    if (props.achievements.length === 0) {
        return null;
    }
    return (
        <div className='achievements_list'>
            {props.achievements.map((achievement: Achievement) => {
                return (
                    <div className='achievement'>
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

function Actions(props: ActionsProps) {
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
                    <Link href={linkHref} as={linkAs}>
                        <div className='action-list__action'>
                            {action.text}
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}
