const table = document.querySelector('table');
table.addEventListener('click', function (e) { //事件委托
    const target = e.target; //点击的对象
    if (target.tagName === 'TD') { //如果点击的是td标签
        target.style.backgroundColor = 'white'; //改变颜色
    }
});