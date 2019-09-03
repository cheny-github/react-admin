export default [
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


// {/* <span>
// <Link to={item.path}> */}
//   <Icon type={item.icon} />
//   <span>{item.title}</span>
// </Link>
// </span> */}