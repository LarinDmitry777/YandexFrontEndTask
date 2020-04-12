/*
Тут происходит дублирование интерфейсов.
Я не знаю как это исправить, потому что если я буду использовать импорт,
то в js файле после компиляции появится строка

Object.defineProperty(exports, "__esModule", { value: true });

Эта строка крашит браузер, так как видимо это что-то из nodeJs, а не браузера
Все решения в интернете говорят о том, что в tsconfig.json нужно убрать строку
"module": "commonjs",

Но тогда это поломает серверную часть.

Возможно есть какая-то аннотация, которая это чинит, но я её не нашел.
 */

interface AdventureApiData {
    id: number;
    name: string;
    adventureUrl: string;
    staticBasePath: string;
    imageName: string;
    description?: string;
    hashTags: IHashTag[];
    adventuresCount: number;
}

interface IHashTag {
    textRu: string;
    textEn: string;
}

const hostUrl = window.location.origin;

let skipAdventureCountParam = 0;

let observer: IntersectionObserver | undefined;

const adventuresInOnePack = 5;

let pageHashTagRu = document
    .getElementsByClassName('hash-tag')
    .item(0)
    ?.textContent
    ?.slice(1);

let pageHashTagEn: string | undefined = undefined;

function removeLoadingAmination(): void {
    document.getElementsByClassName('load-animation').item(0)?.remove();
}

function updateWindowTitle(hashTagRu: string): void {
    if (hashTagRu === '') {
        document.title = 'TellTailGames2';
    } else {
        document.title = `TellTailGames2 | #${hashTagRu}`;
    }
}

function createLoadingAnimation(): void {
    removeLoadingAmination();
    const loadingAnimation = document.createElement('img');
    loadingAnimation.src = `https://tall-tale-cdn.surge.sh/gifs/load.gif`
    loadingAnimation.alt = ''
    loadingAnimation.className = 'load-animation'

    const body = document.getElementsByTagName('body').item(0);
    body?.appendChild(loadingAnimation);
}

function removeAdventuresFromPage(): void {
    document.getElementsByClassName('adventures').item(0)?.remove();
    const adventures = document.createElement('section');
    adventures.classList.add('adventures');

    removeLoadingAmination();
    document.getElementsByTagName('body')
        .item(0)
        ?.appendChild(adventures);
    createLoadingAnimation();
}

function updatePageHashTag(textRu: string): Promise<void> {
    pageHashTagRu = textRu;

    const hashTagElement = document.getElementsByClassName('hash-tag').item(0);

    if (hashTagElement !== null) {
        if (pageHashTagRu !== '') {
            hashTagElement.textContent = `#${textRu}`;
            hashTagElement.classList
                ?.remove('hash-tag_hidden');
        } else {
            hashTagElement.textContent = '';
            hashTagElement.classList
                ?.add('hash-tag_hidden');
        }
    }

    const hashTagEnRequest = `${hostUrl}/api/getHashTagEnText/${pageHashTagRu}`;

    return fetch(hashTagEnRequest)
        .then(res => {
            if (res.ok) {
                return res.text();
            } else {
                return '';
            }
        })
        .then((hashTagEn: string) => {
            pageHashTagEn = hashTagEn
        });
}

function addPageToHistory(): void {
    const state = { pageHashTag: pageHashTagRu };
    const title = `${document.title}`;
    const url = pageHashTagRu === '' ? '/' : `/hashTags/${pageHashTagEn}`;

    history.pushState(state, title, url);
}

function createWrapperWithLink(adventureData: AdventureApiData): HTMLElement {
    const wrapper = document.createElement('a');
    wrapper.href = `/quests/${adventureData.adventureUrl}/1`;

    return wrapper;
}

function createAdventureImage(adventureData: AdventureApiData): HTMLElement {
    const image = document.createElement('img');
    image.classList.add('adventure__image');
    image.src = `${adventureData.staticBasePath}images/adventures/${adventureData.imageName}`;
    image.alt = '';

    const wrapper = createWrapperWithLink(adventureData);
    wrapper.appendChild(image);

    return wrapper;
}

function createTitle(adventureData: AdventureApiData): HTMLElement {
    const title = document.createElement('h2');
    title.classList.add('adventure__title');
    title.innerText = adventureData.name;

    const wrapper = createWrapperWithLink(adventureData);
    wrapper.appendChild(title);

    return wrapper;
}

function createDescription(adventureData: AdventureApiData): HTMLElement | null {
    if (adventureData.description === undefined) {
        return null;
    }

    const description = document.createElement('div');
    description.classList.add('adventure__description');
    description.innerText = adventureData.description;

    return description;
}

function connectObserver(): void {
    const target = document.getElementsByClassName('load-animation').item(0);
    if (target !== null){
        observer?.observe(target);
    }
}

function disconnectObserver(): void {
    observer?.disconnect();
}

function loadPageWiaHashTag(hashTagRu: string, isWantAddToHistory: boolean): void {
    if (hashTagRu !== pageHashTagRu) {
        updateWindowTitle(hashTagRu);
        disconnectObserver();
        removeAdventuresFromPage();
        updatePageHashTag(hashTagRu)
            .then(() => {
                connectObserver();
                if (isWantAddToHistory) {
                    addPageToHistory();
                }
            });
        skipAdventureCountParam = 0;
    }
}

function hashTagHandler(hashTagRu: string): void {
    loadPageWiaHashTag(hashTagRu, true);
}

window.onpopstate = function(event: PopStateEvent): void{
    const historyHashTag = event.state === null ? '' : event.state.pageHashTag;
    loadPageWiaHashTag(historyHashTag, false);
};

function createAdventureHashTags(adventureData: AdventureApiData): HTMLElement {
    const hashTagContainer = document.createElement('div');
    hashTagContainer.classList.add('adventure__hash-tag-container');

    adventureData.hashTags.forEach(hashTagObject => {
        const hashTag = document.createElement('div');
        hashTag.classList.add('adventure__hash-tag');
        hashTag.innerText = `#${hashTagObject.textRu}`;
        hashTag.addEventListener('click', () => {hashTagHandler(hashTagObject.textRu)})

        hashTagContainer.appendChild(hashTag);
    });

    return hashTagContainer;
}

function createDescriptionColumn(adventureData: AdventureApiData): HTMLElement {
    const descriptionColumn = document.createElement('div');
    descriptionColumn.classList.add('adventure__description-column');
    descriptionColumn.appendChild(createTitle(adventureData));

    const description = createDescription(adventureData);
    if (description !== null) {
        descriptionColumn.appendChild(description);
    }

    descriptionColumn.appendChild(createAdventureHashTags(adventureData));

    return descriptionColumn;
}

function renderAdventure(adventureData: AdventureApiData): void {
    const adventure = document.createElement('article');
    adventure.classList.add('adventure');
    adventure.appendChild(createAdventureImage(adventureData));
    adventure.appendChild(createDescriptionColumn(adventureData));

    const adventures = document.getElementsByClassName('adventures').item(0);
    if (adventures !== null) {
        adventures.appendChild(adventure);
    } else {
        console.error('Can`t found adventures class')
    }
}

function loadAdventuresPack(): void {
    disconnectObserver();
    const requestParams = [];
    requestParams.push(`skip=${skipAdventureCountParam}`);
    requestParams.push(`limit=${adventuresInOnePack}`)
    if (pageHashTagEn !== undefined && pageHashTagEn !== '') {
        requestParams.push(`hashtag=${pageHashTagEn}`);
    }
    const request = `${hostUrl}/api/adventures/?${requestParams.join('&')}`;
    fetch(request)
    .then(
        (value): Promise<AdventureApiData[]> => value.json()
    ).then(adventures => {
        adventures.forEach(adventure => {
            renderAdventure(adventure)
        });
        skipAdventureCountParam += adventures.length;
        removeLoadingAmination();
        if (adventures.length === adventuresInOnePack ) {
            createLoadingAnimation();
            connectObserver();
        }
    })
        .catch(e => {
            console.error(e)
            disconnectObserver();
            connectObserver();
        });
}

function createObserver(): void {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
    };

    const callback = function(entries: IntersectionObserverEntry[]): void {
        if (entries[0].isIntersecting) {
            createLoadingAnimation()
            loadAdventuresPack();
        }
    };

    observer = new IntersectionObserver(callback, options);

    connectObserver();
}

createLoadingAnimation();
createObserver();

if (pageHashTagRu !== undefined) {
    updateWindowTitle(pageHashTagRu);
}
