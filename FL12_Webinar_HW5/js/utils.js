const SPINNER_TEMPLATE = `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgb(255, 255, 255); display: block; shape-rendering: auto;" width="100px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
<circle cx="50" cy="50" fill="none" stroke="#ececec" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138" transform="rotate(210.09 50 50)">
  <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
</circle>
</svg>`;

function executeWithSpinner(node) {
  return async function(callback) {
    const spinner = document.createElement("div");
    spinner.insertAdjacentHTML("afterbegin", SPINNER_TEMPLATE);
    node.textContent = "";
    node.appendChild(spinner);
    result = await callback();
    spinner.remove();
    return result;
  };
}
