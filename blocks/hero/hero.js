const NODETYPES = {
  '.': function (item, val) { return item.classList.add(val); },
  '#': function (item, val) { return item.setAttribute('id', val); }
}
const createElems = (items) => {
  const elems = items.split('>');
  let objs = document.createElement('div');

  elems.forEach((e) => {
    const attr = e.match(/\.?\#?[a-z-\-]*/gm).filter((m) => {if(m) return m;});
    let obj;
    attr.forEach((a, i) => {
      if (!i) obj = document.createElement(a);
      else {
        NODETYPES[a.slice(0, 1)](obj, a.slice(1));
      }
    });
    if(objs.firstElementChild) objs.firstElementChild.appendChild(obj);
    else objs.appendChild(obj);
  });
  return objs.firstElementChild;
};

export default async function decorate(block) {
  const picture = block.querySelector('picture');
  const content = block.querySelector('p');

  const contentLeft = createElems('div.content-left#left-content > div');

  content.remove(picture);
  console.log(content);
  contentLeft.appendChild(picture);
  contentLeft.querySelector('div').appendChild(content);

  console.log(contentLeft);
  block.append(contentLeft);
}