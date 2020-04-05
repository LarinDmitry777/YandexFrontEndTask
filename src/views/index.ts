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

const hostUrl = 'https://larindmitry777-task-2019.herokuapp.com';

let adventureToRenderId = 1;

const pageHashTag = document
    .getElementsByClassName('hash-tag')
    .item(0)
    ?.textContent
    ?.slice(1);

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

function createHashTags(adventureData: AdventureApiData): HTMLElement {
    const hashTagContainer = document.createElement('div');
    hashTagContainer.classList.add('adventure__hash-tag-container');

    adventureData.hashTags.forEach(hashTagObject => {
        const hashTag = document.createElement('a');
        hashTag.classList.add('adventure__hash-tag');
        hashTag.href = `/hashtags/${hashTagObject.textEn}`;
        hashTag.innerText = `#${hashTagObject.textRu}`;

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

    descriptionColumn.appendChild(createHashTags(adventureData));

    return descriptionColumn;
}



function showLoadingAnimation(): void {
    const loadingGif = document.getElementsByClassName('load-animation').item(0);
    // loadingGif?.setAttribute('hidden', 'hidden');
    loadingGif?.classList.remove('load-animation_hidden')
}

function hideLoadingAnimation(): void {
    const loadingGif = document.getElementsByClassName('load-animation').item(0);
    // loadingGif?.setAttribute('hidden', 'hidden');
    loadingGif?.classList.add('load-animation_hidden')
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
    const request = pageHashTag === undefined
        ? `${hostUrl}/api/adventuresPack/${adventureToRenderId}`
        : `${hostUrl}/api/adventuresPack/${adventureToRenderId}/${pageHashTag}`;

    fetch(request)
        .then((value): Promise<AdventureApiData[]> => {
            return value.json()
        })
        .then(adventures => {
            adventures.forEach(adventure => {
                renderAdventure(adventure)
            });
            adventureToRenderId += adventures.length;
        })
        .then(() => {hideLoadingAnimation()})
        .catch(e => console.error(`Request: ${request}\n${e}`));
}


function createObserver(): void {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
    };

    const callback = function(): void {
        showLoadingAnimation();
        loadAdventuresPack();
    };

    const observer = new IntersectionObserver(callback, options);

    const target = document.getElementsByClassName('load-animation').item(0);
    observer.observe(target!);
}


createObserver();
