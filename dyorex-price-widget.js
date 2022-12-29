window.addEventListener("load", (event) => { main() });

async function main() {

    let widget = document.getElementById('dyorex-widget')
    let widgetNode = widgetCreater()
    let logoWrapper = createLogoWrapper();
    let priceContainer = await createPriceContainer();
    widgetNode.appendChild(logoWrapper);
    widgetNode.appendChild(priceContainer);
    widget.appendChild(widgetNode)
}

function widgetCreater() {
    let widgetNode = document.createElement('div');
    widgetNode.setAttribute('style', 'position: relative; display: flex; overflow: hidden')
    return widgetNode
}

function createLogoWrapper() {
    let logoWrapper = document.createElement('a');
    logoWrapper.setAttribute('style', 'display: flex; justify-content: center; align-items: center; width: 120px; height: 65px; background: #080e23; padding: 0px 5px; position: relative; overflow: hidden;')
    logoWrapper.setAttribute('target', '_blank');
    logoWrapper.setAttribute('href', 'https://www.dyorex.com')
    let logoImage = document.createElement('img');
    logoImage.setAttribute('src', 'https://www.dyorex.com/assets/images/logo/logo_light.svg');
    logoImage.setAttribute('alt', 'dyorex');
    logoWrapper.appendChild(logoImage);
    return logoWrapper
}

async function createPriceContainer() {
    let priceContainer = document.createElement('div');
    priceContainer.setAttribute('style', ' box-sizing: border-box; margin: 0 auto; position: relative; overflow: hidden; padding: 0; z-index: 1; width: calc(100% - 130px);')
    
    let priceWrapper = await createPriceWrapper()
    priceContainer.appendChild(priceWrapper)
    return priceContainer
}

async function createPriceWrapper() {
    let priceWrapper = document.createElement('div');
    priceWrapper.setAttribute('style', 'position: relative; width: 100%;height: 100%;box-sizing: content-box;display: flex;z-index: 1;transition-property: transform,-webkit-transform;transition-duration: 6000ms;')
    let cells = await addPriceCell();
    console.log(cells)
    for (const cell of cells) {
        priceWrapper.appendChild(cell)
    }
    let wrapperAnimation = [
        {transform : 'translate3d(-1500px, 0px, 0px)'}
    ]
    let wrapperTiming = { duration : 16000, iterations : 1}
    priceWrapper.animate(wrapperAnimation,wrapperTiming)
    return priceWrapper;
}

async function addPriceCell() {
    let prices = await getTickerPrices()
    let options = document.getElementById('dyorexScript');
    let currency = options.getAttribute('data-currency');
    
    let cells = Object.keys(prices).filter(key => {return key.includes(currency)}).map( (key) => {
        return createCell(key, prices[key].last, prices[key].percentChange);
    })

    return cells
}

function createCell(name, price, change) {
    name = name.replace('USDT', '').replace('TRY', '')
    let cell = document.createElement('div');
    cell.setAttribute('style', ' box-sizing: border-box; padding: 0; flex-shrink: 0; height: 100%; position: relative; transition-property: transform,-webkit-transform; width: auto; margin: 0 5px 0 0;')
    let cellInner = document.createElement('a'); cellInner.setAttribute('style', 'box-sizing: border-box; margin: 0; text-decoration: none; display: flex; justify-content: center; align-items: flex-start; flex-direction: column; position: relative; height: 65px; padding: 10px 25px 10px 10px; background-color: #fff; color: #000;')
    
    let nameSpan = document.createElement('span');
    nameSpan.setAttribute('style', 'color: #000; box-sizing: border-box; display: flex; justify-content: flex-start; align-items: center; padding: 2px 0; font-size: 12px;');
    nameSpan.textContent = name;
    let logoWrapper = document.createElement('i');
    logoWrapper.setAttribute('style', ' box-sizing: border-box; width: 18px; height: 18px; display: block; margin: 0 4px 0 0;')
    let instrumentLogo = document.createElement('img');
    instrumentLogo.setAttribute('src', `https://dyorex.com/assets/images/svg/crypto/${name.toLowerCase()}.svg`)
    logoWrapper.appendChild(instrumentLogo);
    nameSpan.prepend(logoWrapper)
    cellInner.appendChild(nameSpan);
    
    let priceSpan = document.createElement('span');
    priceSpan.textContent = price;
    cellInner.appendChild(priceSpan);
    
    let changeSpan = document.createElement('span');
    changeSpan.textContent = change;
    cellInner.appendChild(changeSpan);
    
    cell.appendChild(cellInner);
    return cell;
}

async function getTickerPrices() {
    const response = await fetch('https://www.dyorex.com/gateway/api-auth/api-ordermatch/api/v1/public/ticker', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const result = await response.json();
    return result.data;
}