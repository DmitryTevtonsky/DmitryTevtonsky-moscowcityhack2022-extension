const baseURL = 'http://84.252.137.43:8000'

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

console.log({ submitButton, input });

useCurrentTabHint.onclick = async () => {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, ([currentTab]) => {
        console.log(currentTab.url);
        if (currentTab && currentTab.url) {
            input.value = currentTab.url
        }
    });
}

submitButton.onclick = async () => {
    if (input.value) {
        const data = await sendRequest('api/docs/', 'POST', { url: input.value });
        console.log(data);

        resultLink.innerHTML = data.ar_id;
    }
}



