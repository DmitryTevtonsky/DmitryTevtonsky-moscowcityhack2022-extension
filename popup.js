const baseURL = 'http://84.252.137.43:8000';
const resultText = 'Ознакомиться с полной аналитикой';
const submitButtonText = 'Анализировать';

const sendRequest = async (url, method, data) => {
    try {
        console.log({ url, method, data });

        const responseData = await fetch(`${baseURL}/${url}`, {
            method,
            body: JSON.stringify(data),
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const responseJSON = await responseData.json();

        return responseJSON;
    } catch (error) {
        console.log(error);
    }
};


const submitButton = document.getElementById('submit');
const input = document.getElementById('input');
const useCurrentTabHint = document.getElementById('useCurrentTabHint');
const resultLink = document.getElementById('resultLink');

useCurrentTabHint.onclick = async () => {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, ([currentTab]) => {
        if (currentTab && currentTab.url) {
            input.value = currentTab.url
        }
    });
}

submitButton.onclick = async () => {
    if (input.value) {
        submitButton.innerHTML = `<i class="fa fa-circle-o-notch fa-spin"></i>Загрузка`;
        const data = await sendRequest('api/docs/', 'POST', { url: input.value });
        console.log(data);

        resultLink.innerHTML = `${resultText}: http://84.252.137.43:8000/`;
        resultLink.setAttribute('href', `http://84.252.137.43:8000/`);
        submitButton.innerHTML = submitButtonText;
    }
}



