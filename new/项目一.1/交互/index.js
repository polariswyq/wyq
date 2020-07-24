/* 
    需求：在线客服
    1. 鼠标移入a标签，
        1.1. 改变背景图
        1.2. 显示当前a标签下面的span标签

    2. 鼠标移出a标签，
        1.1. 改变背景图
        1.2. 隐藏当前a标签下面的span标签
*/
//获取a标签
let pdom = document.querySelectorAll("#consult a");
//遍历出来a标签
for (let i = 0; i < pdom.length; i++) {
    //注册移入事件
    pdom[i].addEventListener("mouseover", yue);
    function yue() {
        this.style.backgroundPositionX = '-50px'
        this.querySelector('span').style.display = 'block'
    }
    //注册移出事件
    pdom[i].addEventListener("mouseout", yue1);
    function yue1() {
        this.style.backgroundPositionX = 0
        this.querySelector('span').style.display = 'none'
    }
}


/* 
    需求： 滚动滚动条,判断滚动距离大于800时，显示回到顶部按钮，否则就隐藏

    事件源： window(推荐)  document   

    事件类型： onscroll
*/
//注册滚动事件
document.addEventListener("scroll", scroll1)
function scroll1() {
    //获取滚动距离
    let distance = document.documentElement.scrollTop || document.body.scrollTop
    //判断
    if (distance >= 800) {
        //显示
        this.querySelector('.rTop').style.display = 'block'
    }
    else {
        //隐藏
        this.querySelector('.rTop').style.display = 'none'
    }
}

/* 
    需求： 
        1、点击回到顶部按钮
        2、缓慢让滚动条回到页面顶部
    分析： 
        1、点击按钮, 每隔多少毫秒,改变滚动条的位置
        2、点击按钮, 每隔30毫秒,在原来的基础上(起始值) - 50， 再赋值给当前滚动距离
*/
// 获取rTop
let rTop = document.querySelector(".rTop");
//console.log(rTop);

// 注册事件
rTop.addEventListener('click', click1)
/* 法一 */
/* function click1() {
    //设置计时器
    let timeId = setInterval(function () {
        //获取当前的滚动距离
        let distance = document.documentElement.scrollTop || document.body.scrollTop
        document.body.scrollTop= distance - v * 30
        //运动
        document.documentElement.scrollTop = distance - 50
        if (distance <= 0) {
            clearInterval(timeId)
        }
    }, 30)
}
 */
/* 法二 */
function click1() {
    // 点击时获取总时间
    let t = 1000
    // 点击时获取总路程
    let s = document.documentElement.scrollTop
    // 点击时获取总速度
    let v = s / t
    //设置计时器
    let timeId = setInterval(function () {
        //获取当前的滚动距离
        let distance = document.documentElement.scrollTop || document.body.scrollTop
        //运动
        document.documentElement.scrollTop = distance - v * 30
        document.body.scrollTop = distance - v * 30
        if (distance <= 0) {
            clearInterval(timeId)
        }
    }, 30)
}

/* 设置点击事件 点击出现模态框 */
// 获取loginBox和loginBtn
let loginBox = document.querySelector('#loginBox')
let loginBtn = document.querySelector('.loginBtn')
// 封住函数获取模态框宽高
function WH() {
    loginBox.style.height = document.documentElement.clientHeight + 'px'
    loginBox.style.width = document.documentElement.clientWidth + 'px'
}

// 注册点击事件
loginBtn.addEventListener('click', click2)
function click2() {
    //显示模态框
    loginBox.style.display = 'block'
    // 改变宽高
    WH()
}

/* 
    2. 需求： 改变浏览器窗口时，重新设置模态框的宽高
*/
//注册窗口事件
window.addEventListener('resize', resize1)
function resize1() {
    // 重置宽高
    WH()
}

/* 
    3. 需求： 判断用户名长度是否大于0, 大于：显示删除按钮  否则就隐藏
*/
// 获取用户名
let user = document.querySelector('.user')
// 获取用户名图标
let delUser = document.querySelector('.del-user')

// 注册事件 （input是元素值触发事件）
user.addEventListener('input', input1)
function input1() {
    //判断
    if (user.value.length > 0) {
        delUser.style.display = 'block'
    }
    else {
        delUser.style.display = 'none'
    }
}

/* 4. 点击  删除用户名按钮： 清空用户名 隐藏自己 */
// 注册点击事件
delUser.addEventListener('click', click3)
function click3() {
    // 清空用户名
    user.value = ''
    // 隐藏自己
    delUser.style.display = 'none'
}
/* 
    5. 需求： 点击切换图片按钮, 切换图片路径  切换密码框的type属性值
*/
// 获取图片按钮
let changImg = document.querySelector('.chang-img')
let userMsg = document.querySelector('.user-msg')
let pwdMsg = document.querySelector('.pwd-msg')
let pwd = document.querySelector('.pwd')

// 定义标杆
let changImgFlag = true;
// 注册点击事件
changImg.addEventListener('click', click4)
function click4() {
    if (changImgFlag) {
        //切换图片路径
        changImg.src = './images/open.png'
        //切换暗文
        pwd.type = 'text'
    }
    else {
        //切换图片路径
        changImg.src = './images/close.png'
        //切换明文
        pwd.type = 'password'
    }
    changImgFlag = !changImgFlag;
}
/* 
    6. 需求： 失去焦点验证用户名
*/
// 定义登录时的标杆
let loading = {
    userFlag: true,
    pwdFlag: true
}
// 注册事件
user.addEventListener('blur', blur1)
function blur1() {
    //得到用户名
    let userV = user.value
    //创建验证规则
    let reg = /^[A-z][A-z0-9_]{4,16}$/
    // 验证
    let result = reg.test(userV)
    //判断
    if (result) {
        // 成功
        userMsg.innerHTML = ''
        user.style.border = '1px solid #ccc';
    }
    else {
        userMsg.innerHTML = '请输入正确的用户名'
        user.style.border = '1px solid red'
    }
}
/* 
    7.  失去焦点验证密码
*/
// 注册事件
pwd.addEventListener('blur', blur2)
function blur2() {
    //得到用户名
    let pwdV = pwd.value
    //创建验证规则
    let reg = /^[A-z][A-z0-9_]{4,16}$/
    // 验证
    let result = reg.test(pwdV)
    //判断
    if (result) {
        // 成功
        pwdMsg.innerHTML = ''
        pwd.style.border = '1px solid #ccc';
        loading.userFlag = true;
    }
    else {
        pwdMsg.innerHTML = '请输入正确的密码'
        pwd.style.border = '1px solid red'
        loading.userFlag = false;
    }
}
//注册事件 submit验证
let btn = document.querySelector('.btn')
btn.addEventListener('submit', submit1)
function submit1(event) {
    //判断用户名----只验证不通过----submit是默认提交
    if (loading.userFlag === false) {
        user.style.border = '1px solid red';
        userMsg.innerHTML = '请输入正确的用户名';
        //阻止浏览器默认行为
        event.preventDefault();
        /* return false;//dom0级用return false阻止浏览器默认行为
        event.preventDefault();//dom2级用它阻止浏览器默认行为  */
    }
    //判断密码
    else if (loading.userFlag === false) {
        pwdMsg.innerHTML = '请输入正确的密码'
        pwd.style.border = '1px solid red'
        //阻止浏览器默认行为
        event.preventDefault();
    }
}
/* 
    9. 需求： 点击关闭按钮，隐藏模态框
*/

let deleteBtn = document.querySelector('.delete-btn')
deleteBtn.addEventListener('click', function () {
    loginBox.style.display = 'none'
})





/* 
day3js：下拉菜单需求：
    1、鼠标移入li
    2、为当前li添加激活样式(class=active)
    3、显示当前li下面的二级菜单p
*/

//获取元素
let navLi = document.querySelectorAll('#header .nav li')
// 遍历li
for (let i = 0; i < navLi.length; i++) {
    // 注册鼠标移入事件
    navLi[i].addEventListener('mouseover', function () {

        //添加激活样式
        this.className = 'active'
        // 显示当前li下面的二级菜单p
        let p = this.querySelector('p')
        p.style.display = 'block'
    })
    // 注册鼠标移出事件
    navLi[i].addEventListener('mouseout', function () {

        //添加激活样式
        this.className = ''
        // 清除当前li下面的二级菜单p
        let p = this.querySelector('p')
        p.style.display = 'none'
    })
}

function print() {
    let boxTime = document.querySelector('.boxTime')
    // 获取当前时间
    let myDate = new Date()
    // 创建未来时间
    let futerDate = new Date('2020-10-1 00:00:00')
    //判断时间差
    let timeDiff = futerDate - myDate
    if (timeDiff >= 0) {
        // 天
        let day = Math.floor(timeDiff / 1000 / 60 / 60 / 24)
        //时
        let hour = Math.floor(timeDiff / 1000 / 60 / 60 % 24)
        // 分
        let minute = Math.floor(timeDiff / 1000 / 60 % 60)
        // 秒
        let second = Math.floor(timeDiff / 1000 % 60)
        // 渲染
        boxTime.innerHTML = `距离国庆节还有${day}天${hour}时${minute}分${second}秒`
    }
}
//立即执行
print()
//设置计时
setInterval(print, 1000)


// 轮播
/* 
js动态设置pic的宽度 == 可扩展性
*/
//获取元素
let pic = document.querySelector('#main .pic')
let li = document.querySelectorAll('.pic li')
console.log(pic, li);

//添加一个li
pic.appendChild(li[0].cloneNode(true))
//    pic的宽度=li的宽度*个数（即ul里li的长度）
pic.style.width = li[0].offsetWidth * (li.length + 1) + 'px';
// 轮播图制作
// 定义变量保存索引
let index = 0;
//开启计时器
setInterval(function () {
    // 索引自增
    index++
    // 运动
    startMove(pic, { left: -index * li[0].offsetWidth }, 1000, 'easeIn', function () {
        // 先判断
        if (index === li.length) {
            index = 0;
            pic.style.left = 0;
        }
    })
}, 2000)



