// initial page load's url
function url() {
  return "http://localhost:3000/";
}

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

// action where you suspect the memory leak might be happening
async function action(page) {
  await page.click("#toggleViewer");
  await delay(300);
  await page.click("#toggleViewer");
  await delay(300);
  await page.click("#toggleViewer");
  await delay(300);
}

// how to go back to the state before action
async function back(page) {
  await page.click("#toggleViewer");
}

module.exports = { action, back, url };
