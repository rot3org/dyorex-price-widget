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
    logoWrapper.setAttribute('style', `display: flex; justify-content: center; align-items: center; width: 120px; height: 65px; background: #ffff; padding: 0px 10px; position: relative; overflow: hidden;`)
    logoWrapper.setAttribute('target', '_blank');
    logoWrapper.setAttribute('href', 'https://www.dyorex.com')
    let logoImage = document.createElement('img');
    logoImage.setAttribute('src', 'https://dyorex-assets.s3.amazonaws.com/logo.gif');
    logoImage.setAttribute('alt', 'dyorex');
    logoImage.setAttribute('style', 'width:100%');
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
    priceWrapper.setAttribute('id', 'dyorexPriceWrapper')
    priceWrapper.setAttribute('style', 'position: relative; width: 100%;height: 100%;box-sizing: content-box;display: flex;z-index: 1;')
    
    let banner = await createBanner();
    let endBanner = await createBanner();

    priceWrapper.appendChild(banner);
    
    let cells = await addPriceCell();
    let endCells = await addPriceCell();

    for (const cell of cells) {
        priceWrapper.appendChild(cell)
    }
    priceWrapper.appendChild(endBanner)
    for (const cell of endCells) {
        priceWrapper.appendChild(cell)
    }
    let cellsWidth = (cells.length)*125;
    let wrapperAnimation = [
        {transform : `translate3d(-${904+cellsWidth}px, 0px, 0px)`}
    ]
    let wrapperTiming = { duration : 13000, delay: 2000 ,iterations : Infinity }
    
    priceWrapper.animate(wrapperAnimation,wrapperTiming)
    timeController(904,cellsWidth)
    return priceWrapper;
}

async function createBanner() {
    let bannerWrapper = document.createElement('div');
    bannerWrapper.setAttribute('style', 'box-sizing: border-box;flex-shrink: 0;height: 100%;position: relative;width: auto;margin: 0 5px 0 0;')
    let bannerLink = document.createElement('a');
    let options = document.getElementById('dyorexScript');
    let utmParams = options.getAttribute('data-utm').split(',');
    let wstyle = options.getAttribute('data-wstyle').split(',');

    bannerLink.setAttribute('href', `https://dyorex.com/?utm_source=${utmParams[0]}&utm_medium=${utmParams[1]}&utm_campaign=${utmParams[2]}`);
    bannerLink.setAttribute('target', '_blank')
    bannerLink.setAttribute('style', `text-decoration: none;display: flex;justify-content: center;align-items: flex-start;flex-direction: column;position: relative;height: 100%;color: #000;background: ${wstyle[0] ? wstyle[0] : '#ffff'};`)
    let bannerText = document.createElement('p')
    bannerText.setAttribute('style', 'margin: 0;padding: 0px 15px;border: 0;text-align: center;font-size: 20px;font-weight: 600;color: #000;')
    bannerText.textContent = 'HEMEN ÜYE OL, İLK YATIRIMINA';

    let text1 = document.createElement('span');
    text1.textContent = " 250 ₺'ye VARAN"
    bannerText.appendChild(text1)
    text1.setAttribute('style', 'color: #d21d2b; font-size:24px;');

    let text2 = document.createElement('span');
    text2.textContent = " ÖDÜLLERİ KAZAN"
    bannerText.appendChild(text2)
    text2.setAttribute('style', 'color: #000; margin-right:5px;');

    let text3 = document.createElement('span');
    text3.textContent = " HEMEN KATIL"
    bannerText.appendChild(text3)
    text3.setAttribute('style', 'color: #fff; background: #08962d; padding: 10px;border-radius: 5px;');

    bannerLink.appendChild(bannerText)
    bannerWrapper.appendChild(bannerLink);
    return bannerWrapper
}

async function addPriceCell() {
    let prices = await getTickerPrices()
    let options = document.getElementById('dyorexScript');
    let currency = options.getAttribute('data-currency');
    let excludes = options.getAttribute('data-exclude').split(',');
    
    let cells = Object.keys(prices).filter(key => {return key.includes(currency) && !excludes.includes(key)}).map( (key) => {
        return createCell(key, prices[key].last, prices[key].percentChange);
    })

    return cells
}

function createCell(name, price, change) {
    let options = document.getElementById('dyorexScript');
    let wstyle = options.getAttribute('data-wstyle').split(',');
    let utmParams = options.getAttribute('data-utm').split(',');

    let pairLogo = name.endsWith('USDT') ? '$' : '₺'
    name = name !== 'USDTTRY' && 'TRYUSDT' ? name.replace('USDT', '').replace('TRY', '') : name.endsWith('USDT') ? 'TRY' : 'USDT'
    let cell = document.createElement('div');
    cell.setAttribute('style', 'width:120px; box-sizing: border-box; padding: 0; flex-shrink: 0; height: 100%; position: relative; transition-property: transform,-webkit-transform; margin: 0 5px 0 0;')
    let cellInner = document.createElement('a'); cellInner.setAttribute('style', `box-sizing: border-box; margin: 0; text-decoration: none; display: flex; justify-content: center; align-items: flex-start; flex-direction: column; position: relative; height: 65px; padding: 10px 15px 10px 15px; background-color: ${wstyle[0]? wstyle[0] : '#fff' }; color: #000;`)
    cellInner.setAttribute('href', `https://www.dyorex.com/markets?utm_source=${utmParams[0]}&utm_medium=${utmParams[1]}&utm_campaign=${utmParams[2]}`)
    let nameSpan = document.createElement('span');
    nameSpan.setAttribute('style', 'color: #000; box-sizing: border-box; display: flex; justify-content: flex-start; align-items: center; padding: 2px 0; font-size: 16px; font-weight:700; line-height: 18px;');
    nameSpan.textContent = name;
    let logoWrapper = document.createElement('i');
    logoWrapper.setAttribute('style', ' box-sizing: border-box; width: 18px; height: 18px; display: block; margin: 0 4px 0 0;')
    let instrumentLogo = document.createElement('img');
    instrumentLogo.setAttribute('src', `https://dyorex.com/assets/images/svg/crypto/${name.toLowerCase()}.svg`)
    logoWrapper.appendChild(instrumentLogo);
    nameSpan.prepend(logoWrapper)
    cellInner.appendChild(nameSpan);
    
    let priceSpan = document.createElement('span');
    priceSpan.textContent = `${pairLogo} ${price}`;
    priceSpan.setAttribute('style', `color: ${parseFloat(change) > 0 ? '#279143' : '#dd3944'}; font-weight:700; font-size:16px;line-height: 18px; white-space: nowrap`)
    cellInner.appendChild(priceSpan);
    
    let changeSpan = document.createElement('span');
    changeSpan.textContent = `${change.toFixed(2)}%`;
    changeSpan.setAttribute('style', 'font-size:14px; line-height: 16px;')
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

async function timeController(bannerWidth) {
    // document.getElementById('dyorexPriceWrapper').style.animationDuration('10s')

    setTimeout(()=> {
        console.log('time')
        console.log(document.getElementById('dyorexPriceWrapper').getAnimations())
        document.getElementById('dyorexPriceWrapper').getAnimations()[0].playbackRate = 0.2
        console.log(document.getElementById('dyorexPriceWrapper').getAnimations())

    },5300)

    setInterval(() => {
        document.getElementById('dyorexPriceWrapper').getAnimations()[0].playbackRate = 1
        setTimeout(() => {
            document.getElementById('dyorexPriceWrapper').getAnimations()[0].playbackRate = 0.2
        }, 3300);
    }, 54000);


}

