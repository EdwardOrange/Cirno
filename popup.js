document.getElementById('bakabaka').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: selectDropdownItem
    });
  });
});

document.getElementById('click-checkbox-button').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: clickCheckbox
    });
  });
});

document.getElementById('click-next-page-button').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: clickNextPage
    });
  });
});

document.getElementById('444').addEventListener('click', () => {
  const delayInput = document.getElementById('delay-input');
  const delay = parseInt(delayInput.value, 10) || 3000; // 默认延时3000毫秒

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: executeButtonSequence,
      args: [delay] // 传递延时参数
    });
  });
});

function selectDropdownItem() {
  const sortDiv = document.querySelector('#perPageDiv');
  
  if (sortDiv) {
    const dropdown = sortDiv.querySelector('.sort-list');
    if (dropdown) {
      dropdown.style.display = 'block'; // 展开下拉栏

      const targetItem = dropdown.querySelector('li[data-val="50"]');
      if (targetItem) {
        const items = dropdown.querySelectorAll('li');
        items.forEach(item => item.classList.remove('cur'));

        targetItem.classList.add('cur'); // 选中目标元素
        targetItem.style.backgroundColor = 'yellow'; // 高亮显示

        targetItem.querySelector('a').click(); // 执行点击操作
      }
    }
  }
}

function clickCheckbox() {
  const checkbox = document.querySelector('#selectCheckAll1');
  if (checkbox) {
    checkbox.click(); // 执行点击操作
  }
}

function clickNextPage() {
  const nextPageLink = document.querySelector('#PageNext');
  if (nextPageLink) {
    nextPageLink.click(); // 执行点击操作
  }
}

// 将所有操作的功能合并到一个脚本中
function executeButtonSequence(delay) {
  function selectDropdownItem() {
    const sortDiv = document.querySelector('#perPageDiv');
    
    if (sortDiv) {
      const dropdown = sortDiv.querySelector('.sort-list');
      if (dropdown) {
        dropdown.style.display = 'block'; // 展开下拉栏
        const targetItem = dropdown.querySelector('li[data-val="50"]');
        if (targetItem) {
          const items = dropdown.querySelectorAll('li');
          items.forEach(item => item.classList.remove('cur'));

          targetItem.classList.add('cur'); // 选中目标元素
          targetItem.style.backgroundColor = 'yellow'; // 高亮显示

          targetItem.querySelector('a').click(); // 执行点击操作
        }
      }
    }
  }

  function clickCheckbox() {
    const checkbox = document.querySelector('#selectCheckAll1');
    if (checkbox) {
      console.log('Found checkbox');
      checkbox.click(); // 执行点击操作
    }
  }

  function clickNextPage() {
    const nextPageLink = document.querySelector('#PageNext');
    if (nextPageLink) {
      console.log('Found next page link');
      nextPageLink.click(); // 执行点击操作
    }
  }

  function performSequence(iterationsLeft) {
    if (iterationsLeft > 0) {
      // 执行第二个按钮功能
      clickCheckbox();
      setTimeout(() => {
        // 执行第三个按钮功能
        clickNextPage();
        setTimeout(() => {
          // 再次延时后继续执行序列
          performSequence(iterationsLeft - 1);
        }, delay);
      }, delay);
    }
  }

  // 首先选择下拉框的元素
  selectDropdownItem();
  setTimeout(() => {
    performSequence(10); // 循环10次
  }, delay); // 使用用户输入的延迟
}

