const creatElement = (arr) => {
    // console.log(arr)
    const htmlElements = arr.map(el => `<span class="btn btn-soft btn-info">${el}</span>`)
    return (htmlElements.join(' '));
}



const loadLessons = () => {
    const url = 'https://openapi.programming-hero.com/api/levels/all';
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayLessons(data.data));
}
const removeActive = () => {
    const activeButtons = document.querySelectorAll('.active-btn');
    // console.log(activeButtons);
    activeButtons.forEach(activeButton => activeButton.classList.remove('btn-active'));
}
const levelByWord = (id) => {
    // console.log(url);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(wordData => {
            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`);

            clickBtn.classList.add('btn-active');

            displayWordLesson(wordData.data)
        });
}

const loadWordDetail = (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(details => displayWordDetails(details.data));
}

const displayWordDetails = (word) => {
    // console.log(word)
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `
            <div class="border border-violet-300 rounded-xl p-6">
                    <h2 class="text-3xl mb-8 leading-10 font-bangla">${word.word} (<i
                            class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation})</h2>
                    <p class="font-semibold mb-3 text-2xl">Meaning</p>
                    <p class="font-bangla text-xl leading-10 mb-8 font-medium">${word.meaning}</p>
                    <p class="font-semibold mb-2 text-2xl">Example</p>
                    <p class="font-bangla text-xl leading-10 mb-8 font-medium">${word.sentence}</p>
                    <p class="font-semibold mb-4 text-2xl font-bangla">সমার্থক শব্দ গুলো</p>
                    <div class="space-x-4">
                        <div>${creatElement(word.synonyms)}</div>
                    </div>
                </div>
    `;
    document.getElementById('my_modal_5').showModal();
}

const displayWordLesson = (datas) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = "";

    if (datas.length == 0) {
        wordContainer.innerHTML = `
        <div class="text-center col-span-full py-16 space-y-6 rounded-xl">
            <img src="./assets/alert-error.png" alt="aleartError" class='mx-auto'>
            <p class="font-bangla leading-6  mb-3 text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h1 class="font-bangla leading-10 text-4xl text-[#292524]">নেক্সট Lesson এ যান</h1>
        </div>
        `;
        return;

    }
    datas.forEach(data => {
        // console.log(data);
        const card = document.createElement('div');
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-5">
            <h2 class="font-bold text-3xl">${data.word ? data.word : "শব্দ পাওয়া যাইনি"}</h2>
            <p class="font-semibold text-xl">Meaning /Pronounciation</p>

            <div class="font-bangla font-semibold text-4xl max-sm:text-2xl text-[#5b5b70b0]">
                "${data.meaning ? data.meaning : 'অর্থ পাওয়া যাইনি'} / ${data.pronunciation ? data.pronunciation : 'উচ্চারণ পাওয়া যাইনি'}"
            </div>

            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${data.id})" class="btn btn-soft btn-info">
                    <i class="fa-solid fa-circle-info"></i>
                </button>
                <button class="btn btn-soft btn-info">
                    <i class="fa-solid fa-volume-high"></i>
                </button>           
            </div>
        </div>
        `;
        wordContainer.append(card);
    });
}
const displayLessons = (lessons) => {
    // 1. Get the container
    const levelContainer = document.getElementById('level-container')
    levelContainer.innerHTML = '';
    // 2.  Get into every lesson
    for (const lesson of lessons) {
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
                         <button id="lesson-btn-${lesson.level_no}" onclick="levelByWord(${lesson.level_no})" class="btn btn-outline btn-info active-btn">
                                <i class="fa-solid fa-book-open"></i>
                                ${lesson.lessonName}
                         </button>
    `;
        levelContainer.append(btnDiv);
    }
}







loadLessons();