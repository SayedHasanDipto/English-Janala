const loadLessons = () => {
    const url = 'https://openapi.programming-hero.com/api/levels/all';
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayLessons(data.data));
}

const displayLessons = (lessons) => {

    // 1. Get the container

    const levelContainer = document.getElementById('level-container')
    levelContainer.innerHTML = '';

    // 2.  Get into every lesson

for (const lesson of lessons) {
    const btnDiv = document.createElement('div');
    btnDiv.innerHTML = `
        <button class="btn btn-outline btn-primary">
            <i class="fa-solid fa-book-open"></i>
            ${lesson.lessonName}
        </button>
    `;
    levelContainer.append(btnDiv);
}
}

loadLessons();