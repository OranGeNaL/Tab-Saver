const saveButton = document.querySelector("#saveButton");
const openButton = document.querySelector("#openButton");
const windowFileInput = document.querySelector("#windowFileInput")


saveButton.addEventListener("click", async () => {
    saveWindow();
});

openButton.addEventListener("click", async () => {
    createWindow();
});


async function saveWindow() {
    var tabs = await getWindowTabs()
    var urls = []

    tabs.forEach(tab => {
        urls.push(tab.url)
    });

    let jsonData = JSON.stringify(urls)

    let fileName = document.querySelector("#saveFileName").value

    download(jsonData, fileName + '.json', 'text/plain');
}

async function createWindow() {
    var urls = await openFileFromPC()
    // alert(urls)
}

async function getWindowTabs() {
    let queryOptions = { currentWindow: true };

    let tab = await chrome.tabs.query(queryOptions);
    return tab;
}

async function createTabs(urls) {
    urls.forEach(tab => {
        chrome.tabs.create(
            { url: tab}
        )
    });
}

async function openFileFromPC() {
  const [file] = windowFileInput.files;
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    createTabs(JSON.parse(reader.result))
  }, false);

  if (file) {
    reader.readAsText(file);
  }
}

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}