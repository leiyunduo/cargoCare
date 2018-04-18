let navData = [
  {
    is_home: 1,
    name: '首页',
    alt: 'index_show',
    active: 1,
  }
]

let clearActive = () => {
  navData.forEach(item => {
    item.active = 0
  })
}

let renderNavs = () => {
  let str = navData.map((item, index) => {
    return `
    <a class="${item.active ? 'active': ''} item" alt="${item.alt}" data-index="${index}" data-active="${item.active}">
      ${item.name}
      ${item.is_home ? '' : `<span class="delPage" data-alt=${item.alt}> X </span>`}
    </a>
    `
  }).join('')

  $('.con_header_children').html(str)
}

let open_or_change = navItem => {
  clearActive()
  let repeatItem = navData.filter(item => {
    return item.alt === navItem.alt
  })

  let isRepeat = !!repeatItem.length
  if(isRepeat) {
    repeatItem[0].active = 1
  }else{
    navData.push(navItem)
  }
  renderNavs()
}

let close_nav = alt => {
  navData.forEach((item, index) => {
    if(item.alt === alt) {
      if(item.active) {
        navData[index - 1].active = 1
      }
      navData.splice(index, 1)
      renderNavs()
    }
  })
}

window.open_or_change = open_or_change

renderNavs()
