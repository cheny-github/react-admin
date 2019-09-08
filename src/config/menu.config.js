 
 const menus = [
    {title:'首页',icon:'home',path:'/home'},
    {title:'商品',icon:'appstore',path:'/goods',
        children:[
            {title:'品类管理',icon:'unordered-list',path:'/category'},
            {title:'商品管理',icon:'tool',path:'/production'},
        ]
    },

    {title:'用户管理',icon:'user',path:'/user'},
    {title:'角色管理',icon:'safety-certificate',path:'/role'},
    {title:'图形图表',icon:'home',path:'/chart',
        children:[
            {title:'柱状图',icon:'bar-chart',path:'/chart/bar'},
            {title:'折线图',icon:'line-chart',path:'/chart/line'},
            {title:'饼图',icon:'pie-chart',path:'/chart/pie'},
        ]
    },
]
 




// 使用path字段来索引menus,方便查找
// 为了方便拿到对应元素的父节点，我把结果放到了一个对象中
/**
 * {
 *  menu:{title:'柱状图',icon:'bar-chart',path:'/chart/bar'}
 *  father:xxx //该字段存储了当前元素的父节点的引用
 * }
 * 
 */
menus.__pathMap ={}
;(function initPathMap(menuList,father=null) {
    menuList.forEach(menu=>{
        if (menu.children) {
            initPathMap(menu.children,menu)
        }
        menus.__pathMap[menu.path] = {menu,father}
    })
})(menus)

menus.getMenuByPath=(path)=>{
    return menus.__pathMap[path]
}

export const menusConfig =menus
export default menus
