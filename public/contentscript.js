console.log('Contentscript injected');

// 💰 budget value
const budgetValueElement = document.querySelector(
  '#root > div > div > div.makeStyles-mainPanel-3 > div.makeStyles-scrollbars-5 > div:nth-child(1) > div > section > div:nth-child(3) > p:nth-child(3)',
);
const budgetValue = budgetValueElement.textContent.split(' ')[1];

// 👉 Header
const header = document.querySelector('h1.makeStyles-header-22');
const headerContainer = document.querySelector('section');

// 👉 Create another header element
const newHeader = header.cloneNode(true);

// 👉 Get computed styles of original element
const styles = window.getComputedStyle(header);
let cssText = styles.cssText;
if (!cssText) {
  cssText = Array.from(styles).reduce((str, property) => {
    return `${str}${property}:${styles.getPropertyValue(property)};`;
  }, '');
}

// 👉 Assign CSS styles to the new header
newHeader.style.cssText = cssText;

// 👉 Create container
let container = document.createElement('div');
container.style = 'display: flex; align-items: center';

// 👉 Tooltip
let tooltip = document.createElement('div');
tooltip.style = `
  display: none;
  position: absolute;
  background-color: #323c4e;
  color: white;
  padding: 20px;
  width: 300px;
  border-radius: 8px;
`;
tooltip.innerHTML =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

// 👉 create & style badge
let icon = document.createElement('div');
icon.classList.add('makeStyles-logo-11');
let badge = document.createElement('div');
let span = document.createElement('span');
badge.style = `
  display: flex;
  background-color: #002366;
  font-weight: 700;
  cursor: pointer;
  color: #FFFFFF;
  padding: 15px 25px;
  white-space: nowrap;
  border: none;
  border-radius: 8px;
`;
span.textContent = `Budget-to-Beat: ${budgetValue} €`;
span.style = 'margin-left: 10px;';
badge.appendChild(icon);
badge.appendChild(span);

// 👉 Add events to badge
badge.addEventListener('mouseenter', () => {
  badge.style.backgroundColor = '#323c4e';

  tooltip.style.display = 'block';
  const toolTipPosition = badge.getBoundingClientRect();

  const x = toolTipPosition.left + (badge.offsetWidth - tooltip.offsetWidth) / 2 - 22;
  const y = toolTipPosition.top - tooltip.offsetHeight + 220;

  tooltip.style.left = x + 'px';
  tooltip.style.top = y + 'px';
});

badge.addEventListener('mouseleave', () => {
  badge.style.backgroundColor = '#002366';
  tooltip.style.display = 'none';
});

// 👉 Append badge and header to container
container.appendChild(newHeader);
container.appendChild(badge);
headerContainer.insertBefore(container, headerContainer.firstChild);
document.body.appendChild(tooltip);

header.remove();
