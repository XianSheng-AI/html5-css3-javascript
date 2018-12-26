const methods = {
    //获取标签元素
    getElem: function (el) {
        return document.querySelector(el)
    },

//获取一堆标签元素集合
    getAllElem: function (el) {
        return document.querySelectorAll(el);
    },

//获取class
    getCls: function (el) {
        return el.getAttribute('class');
    },

//设置class
    setCls: function (el, cls) {
        return el.setAttribute('class', cls);
    },

//添加class
    addCls: function (el, cls) {
        let elCls = this.getCls(el);
        if (elCls.indexOf(cls) === -1) {
            this.setCls(el, elCls + ' ' + cls);
        }
    },

//删除class
    delCls: function (el, cls) {
        let elCls = this.getCls(el);
        if (elCls.indexOf(cls) != -1) {
            this.setCls(el, elCls.split(cls).join(' ').replace(/\s+/g, ''))
        }
    },

//    封装小方法--END
    animateElement: {
        '.screen-1': [
            '.screen-1__heading',
            '.screen-1__phone',
            '.screen-1__shadow',
        ],
        '.screen-2': [
            '.screen-2__heading',
            '.screen-2__subheading',
            '.screen-2__phone',
            '.screen-2__point_i_1',
            '.screen-2__point_i_2',
            '.screen-2__point_i_3'
        ],
        '.screen-3': [
            '.screen-3__heading',
            '.screen-3__subheading',
            '.screen-3__phone',
            '.screen-3__features',
        ],
        '.screen-4': [
            '.screen-4__heading',
            '.screen-4__subheading',
            '.screen-4__type-item_i_1',
            '.screen-4__type-item_i_2',
            '.screen-4__type-item_i_3',
            '.screen-4__type-item_i_4',
        ],
        '.screen-5': [
            '.screen-5__heading',
            '.screen-5__subheading',
            '.screen-5__back',
        ],
    },
    //第一步---样式初始化


//初始化动画--init
    setScreenAnimate: function (screenCls) {
        const setElAnimate = this.animateElement[screenCls];

        for (let i = 0, len = setElAnimate.length; i < len; i++) {
            const element = document.querySelector(setElAnimate[i]);
            const baseCls = element.getAttribute('class');
            element.setAttribute('class', baseCls + ' ' + setElAnimate[i].substr(1) + '_animate_init');
        }

    },
    //播放动画---done
    playScreenAnimate: function (screenCls) {
        // const screenEl = document.querySelector(screenCls);
        const setElAnimate = this.animateElement[screenCls];

        for (let i = 0, len = setElAnimate.length; i < len; i++) {
            const element = document.querySelector(setElAnimate[i]);
            const baseCls = element.getAttribute('class');
            element.setAttribute('class', baseCls.replace('init', 'done'));
        }
    },
}

window.onload = function () {
    for (let k in methods.animateElement) {
        methods.setScreenAnimate(k);
    }
}

//第二部:滚动到哪   动画就播放到哪
const navItems = methods.getAllElem('.header__nav-item');     //获取所有头部导航
const outLineItems = methods.getAllElem('.outline__item');    //获取所有右边边导航


//切换头部导航样式
function swichNav(idx) {
    for (let i = 0, len = navItems.length; i < len; i++) {
        methods.delCls(navItems[i], 'header__nav-item_status_active');
    }
    methods.addCls(navItems[idx], 'header__nav-item_status_active')

    for (let i = 0, len = outLineItems.length; i < len; i++) {
        methods.delCls(outLineItems[i], 'outline__item_status_active');
    }
    methods.addCls(outLineItems[idx], 'outline__item_status_active')
}

swichNav(0)

//滚动触发事件
window.onscroll = function () {
    let top = document.documentElement.scrollTop || document.body.scrollTop;
    if (top >= 100) {
        methods.addCls(methods.getElem('.header'), 'header_status_black');
        methods.addCls(methods.getElem('.outline'), 'outline_status_in');
        methods.addCls(methods.getElem('.header__logo'), 'header__logo_status_animate');
    } else {
        methods.delCls(methods.getElem('.header'), 'header_status_black');
        methods.delCls(methods.getElem('.outline'), 'outline_status_in');
        methods.delCls(methods.getElem('.header__logo'), 'header__logo_status_animate');
        swichNav(0);
    }

    if (top > 800 * 1 - 2) {
        methods.playScreenAnimate('.screen-2');
        swichNav(1)
        // swichHeaderNav(1)
    }
    if (top > 800 * 2 - 2) {
        methods.playScreenAnimate('.screen-3');
        swichNav(2)
    }
    if (top > 800 * 3 - 2) {
        methods.playScreenAnimate('.screen-4');
        swichNav(3)
    }
    if (top > 800 * 4 - 2) {
        methods.playScreenAnimate('.screen-5');
        swichNav(4)
    }

}
//第三部双向定位

for (let i = 0, len = navItems.length; i < len; i++) {
    goScreen(i, navItems);
}
for (let i = 0, len = outLineItems.length; i < len; i++) {
    goScreen(i, outLineItems);
}

function goScreen(i, lib) {
    if (i == navItems.length - 1) {
        return;
    }
    const item = lib[i];
    item.onclick = function () {
        document.body.scrollTop = i * 800;
    }
}

//第四步 滑动门效果
const navTip = methods.getElem('.header__nav-item-tip');

function setGunDon(idx, lib) {
    lib[idx].onmouseover = function () {
        navTip.style.left = (idx * 100 + 20) + 'px';
    }
    let activeFlo = 0;
    lib[idx].onmouseout = function () {
        for (let i = 0, len = navItems.length; i < len; i++) {
            if (methods.getCls(lib[i]).indexOf('header__nav-item_status_active') > -1) {
                activeFlo = i;
                break;
            }
        }
        navTip.style.left = (activeFlo * 100 + 20) + 'px';
    }
}

//循环滚动
for (let i = 0, len = navItems.length; i < len; i++) {
    if (i < (len - 1)) {
        setGunDon(i, navItems);
    }
}

setTimeout(function () {
    methods.playScreenAnimate('.screen-1');
}, 500)







