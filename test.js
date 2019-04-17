const assert = require('assert');

// Return the first element with innerText matching the innerText variable
async function findElement(browser, elements, innerText){
  for (var i=0; i<elements.length; i++){
    const res = await browser.elementIdAttribute(elements[i].ELEMENT, 'innerText');
    if (res.value===innerText){
      return res.value;
      break;
    }
  }
}

async function findElementBySelector(browser, cssSelector, innerText){
  const result = await browser.elements('css selector', cssSelector);
  const elements = result.value;
  return findElement(browser, elements, innerText);
}

module.exports = {
  'Find array element by innerText' : async function (browser) {
    await browser
      .url('http://localhost:3002/stub.html')
    browser.verify.containsText('h1', 'Hello World');
    const found = await findElementBySelector(browser, '.child', "Pick me")
    assert.equal(found, 'Pick me');
    browser.end();
  }

}