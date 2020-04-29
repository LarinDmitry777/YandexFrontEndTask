import React, {Component, Fragment} from "react";
import {Header} from "../components/headerComponent";
import Loading from "../components/loadingComponent";
import Head from "next/head";
import Scene from "../components/sceneComponent";
import {getDataFromQuery} from "../lib/util";

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
        return {
            adventureName: getDataFromQuery('adventureName', req, query),
            sceneId: getDataFromQuery('sceneId', req, query),
            staticBasePath: getDataFromQuery('staticBasePath', req, query)
        }
    }

    state: ScenePageState = {
        loading: true,
        scene: undefined
    }


    componentDidMount(): void {
        this.loadPage();
    }

    componentDidUpdate(prevProps: Readonly<ScenePageProps>): void {
        if (prevProps.adventureName !== this.props.adventureName ||
            prevProps.sceneId !== this.props.sceneId) {
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
