const loadLessons = () => {
    const url = 'https://openapi.programming-hero.com/api/levels/all';
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayLessons(data.data));
}

const levelByWord = (id) => {
    // console.log(url);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(wordData => displayWordLesson(wordData.data));
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

            <div class="font-bangla font-semibold text-4xl text-[#18181bb0]">
                "${data.meaning ? data.meaning:'অর্থ পাওয়া যাইনি'} / ${data.pronunciation ? data.pronunciation: 'উচ্চারণ পাওয়া যাইনি'}"
            </div>

            <div class="flex justify-between items-center">
                <button class="btn btn-soft btn-primary">
                    <i class="fa-solid fa-circle-info"></i>
                </button>
                <button class="btn btn-soft btn-primary">
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
        <button onclick="levelByWord(${lesson.level_no})" class="btn btn-outline btn-primary">
            <i class="fa-solid fa-book-open"></i>
            ${lesson.lessonName}
        </button>
    `;
        levelContainer.append(btnDiv);
    }
}

loadLessons();