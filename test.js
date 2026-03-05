const creatElement = (arr) => {
    // console.log(arr)
    const htmlElements = arr.map(el => `<span class="btn">${el}</span>`)
    console.log(htmlElements.join(' '));
}


const syn = ['uyerekrwalserr', ' asdfasdf', 'sdfasedf'];

creatElement(syn);