import ajax,{ajax_sendImg} from './ajax'
export function reqCategoryList() {
   return ajax.get('/manage/category/list')
}

export function reqUpdateCategory(categoryId,categoryName){
    return ajax.post('/manage/category/update',{categoryId,categoryName})
}
export function reqAddCategory(categoryName) {
    return ajax.post('/manage/category/add',{
        categoryName
    })
}

export function reqProductionPage(pageNum,pageSize) {
    return ajax.get('/manage/product/list',{
        params:{      
            pageNum,
            pageSize}
    })
}

export function reqSetProductionStatus(productId,status) {
    return ajax.post('/manage/product/updateStatus',{productId,status})
}

export function reqSearchProductions(searchType,keyWord,pageNum,pageSize) {
    return ajax({
        method:'get',
        url:'/manage/product/search',
        params:{
            [searchType]:keyWord,
            pageNum,
            pageSize
        }
    })
}

export function reqProductionInfoByID(productId) {
    return ajax.get('/manage/product/info',{
        params:{
            productId
        }
    })
}

export function reqCategoryById(categoryId) {
        return ajax.get('/manage/category/info',{
            params:{categoryId}
        })
}

/**
 * @description 添加商品
 * @param {*} production 
 */
export function reqAddProduction(production){
    return ajax.post('/manage/product/add',production)
}

export function reqUpdateProduction(production) {
    return ajax.post('/manage/product/update',production)
}

export function reqDelProdImg(imgName) {
    return ajax.post('/manage/img/delete',{
        name:imgName
    })
}

/**
 * @description 上传图片
 * @param {File} image 
 */
export function reqUploadImg(image){
    const fd = new FormData()
    fd.append('image',image)
    return ajax_sendImg.post('/manage/img/upload',fd,{headers:{'Content-Type':'multipart/form-data'}})
}



/**
 * 获取所有角色信息
 */
export function reqRoleList() {
    return ajax.get('/manage/role/list')
}

export function reqAddRole(roleName){
    return ajax.post('/manage/role/add',{roleName})
} 
// 更新角色(给角色设置权限)
export function reqUpdateRole(_id,menus,auth_time,auth_name) {
    return ajax.post('/manage/role/update',{
        _id,
        menus,
        auth_time,
        auth_name
    })
}




/**
 * 获取所有用户信息
 */
export function reqUserList() {
    return ajax.get('/manage/user/list')
}

/**
 * 添加用户
 */
export function reqAddUser(user) {
    return ajax.post('/manage/user/add',user)
}

/**
 * 
 * @param {object} user 
 * 请求更新用户数据
 */
export function reqUpdateUser(user){
    return ajax.post('/manage/user/update',user)
}

/**
 * 删除用户
 * @param {string} userId 用户ID
 * 
 */
export function reqDeleteUser(userId) {
    return ajax.post('/manage/user/delete',{
            userId
    })
}