// api/products.js
import { ref, reactive } from 'vue'

/**
 * 虚拟产品API服务
 * 提供商品分类、描述、规格等功能
 */
export default class ProductService {
  constructor() {
    // 用户收藏列表 - 模拟用户ID为默认用户
    this.favorites = reactive({
      'default-user': []  // 存储产品ID
    })
    
    this.products = reactive([
      {
        id: 1,
        name: '馬克杯',
        category: {
          id: 1,
          name: '自有品牌',
          parentId: null
        },
        description: {
          type: 'image',
          content: '',
          type: 'image',
          content: ''
        },
        specifications: [
          { name: '处理器', value: 'Intel Core i9 12代' },
          { name: '内存', value: '32GB DDR5' },
          { name: '存储', value: '1TB SSD' },
          { name: '显卡', value: 'NVIDIA RTX 4080' },
          { name: '屏幕', value: '15.6英寸 4K OLED' }
        ],
        price: 900,
        stock: 20,
      },
      {
        id: 2,
        name: 'T-shirt',
        category: {
          id: 2,
          name: '自有品牌',
          parentId: null
        },
        description: {
          type: 'image',
          content: '/images/ergonomic-chair.jpg',
          type: 'image',
          content: '/images/ergonomic-chair.jpg'
          
        },
        specifications: [
          { name: '材质', value: '网布+金属' },
          { name: '承重', value: '150kg' },
          { name: '调节', value: '高度、角度、扶手可调' },
          { name: '靠背', value: '全网透气' }
        ],
        price: 1299,
        stock: 100
      },
      {
        id: 3,
        name: '智能手表',
        category: {
          id: 3,
          name: '智能穿戴',
          parentId: 1
        },
        description: {
          type: 'mixed',
          content: [
            { type: 'text', content: '全天候健康监测，内置GPS定位，支持多种运动模式。' },
            { type: 'image', content: '/images/smartwatch-front.jpg', altText: '智能手表正面展示' },
            { type: 'image', content: '/images/smartwatch-functions.jpg', altText: '智能手表功能展示' }
          ]
        },
        specifications: [
          { name: '屏幕', value: '1.4英寸 AMOLED' },
          { name: '电池', value: '300mAh，续航7天' },
          { name: '防水', value: '5ATM' },
          { name: '功能', value: '心率监测、睡眠监测、GPS定位' }
        ],
        price: 1499,
        stock: 200
      }
    ])

    this.categories = reactive([
      { id: 1, name: '电子产品', parentId: null },
      { id: 2, name: '办公家具', parentId: null },
      { id: 3, name: '智能穿戴', parentId: 1 },
      { id: 4, name: '手机', parentId: 1 },
      { id: 5, name: '电脑', parentId: 1 },
      { id: 6, name: '办公椅', parentId: 2 },
      { id: 7, name: '办公桌', parentId: 2 }
    ])
  }

  /**
   * 获取所有产品
   * @returns {Promise} 包含所有产品的Promise
   */
  getAllProducts() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.products])
      }, 300) // 模拟网络延迟
    })
  }

  /**
   * 根据ID获取产品
   * @param {Number} id 产品ID
   * @returns {Promise} 包含产品的Promise
   */
  getProductById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = this.products.find(p => p.id === id)
        if (product) {
          resolve(product)
        } else {
          reject(new Error('产品不存在'))
        }
      }, 300)
    })
  }

  /**
   * 根据分类获取产品
   * @param {Number} categoryId 分类ID
   * @returns {Promise} 包含产品列表的Promise
   */
  getProductsByCategory(categoryId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = this.products.filter(p => p.category.id === categoryId || p.category.parentId === categoryId)
        resolve(result)
      }, 300)
    })
  }

  /**
   * 获取所有分类
   * @returns {Promise} 包含所有分类的Promise
   */
  getAllCategories() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.categories])
      }, 300)
    })
  }

  /**
   * 添加新产品
   * @param {Object} product 产品对象
   * @returns {Promise} 包含新增产品的Promise
   */
  addProduct(product) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newId = Math.max(...this.products.map(p => p.id)) + 1
        const newProduct = { ...product, id: newId }
        this.products.push(newProduct)
        resolve(newProduct)
      }, 300)
    })
  }

  /**
   * 更新产品信息
   * @param {Number} id 产品ID
   * @param {Object} updates 更新的字段
   * @returns {Promise} 包含更新后产品的Promise
   */
  updateProduct(id, updates) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.products.findIndex(p => p.id === id)
        if (index !== -1) {
          const updatedProduct = { ...this.products[index], ...updates }
          this.products[index] = updatedProduct
          resolve(updatedProduct)
        } else {
          reject(new Error('产品不存在'))
        }
      }, 300)
    })
  }

  /**
   * 删除产品
   * @param {Number} id 产品ID
   * @returns {Promise} 操作结果
   */
  deleteProduct(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.products.findIndex(p => p.id === id)
        if (index !== -1) {
          this.products.splice(index, 1)
          resolve({ success: true, message: '产品已删除' })
        } else {
          reject(new Error('产品不存在'))
        }
      }, 300)
    })
  }

  /**
   * 搜索产品
   * @param {String} keyword 搜索关键词
   * @returns {Promise} 包含搜索结果的Promise
   */
  searchProducts(keyword) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!keyword) {
          resolve([])
          return
        }
        
        const lowercaseKeyword = keyword.toLowerCase()
        const results = this.products.filter(product => 
          product.name.toLowerCase().includes(lowercaseKeyword) || 
          (product.description.type === 'text' && 
           product.description.content.toLowerCase().includes(lowercaseKeyword)) ||
          product.specifications.some(spec => 
            spec.name.toLowerCase().includes(lowercaseKeyword) || 
            spec.value.toLowerCase().includes(lowercaseKeyword)
          )
        )
        resolve(results)
      }, 300)
    })
  }
  
  /**
   * 按价格范围筛选产品
   * @param {Number} minPrice 最低价格
   * @param {Number} maxPrice 最高价格
   * @returns {Promise} 包含筛选结果的Promise
   */
  filterByPriceRange(minPrice, maxPrice) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = this.products.filter(product => 
          product.price >= (minPrice || 0) && 
          (maxPrice ? product.price <= maxPrice : true)
        )
        resolve(results)
      }, 300)
    })
  }
  
  /**
   * 获取推荐产品
   * @param {Number} productId 当前产品ID
   * @param {Number} limit 推荐数量
   * @returns {Promise} 包含推荐产品的Promise
   */
  getRelatedProducts(productId, limit = 3) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const currentProduct = this.products.find(p => p.id === productId)
        if (!currentProduct) {
          reject(new Error('产品不存在'))
          return
        }
        
        // 获取同类别的产品
        const sameCategoryProducts = this.products.filter(p => 
          p.id !== productId && 
          p.category.id === currentProduct.category.id
        )
        
        // 如果同类别产品不够，添加其他产品
        let relatedProducts = [...sameCategoryProducts]
        if (relatedProducts.length < limit) {
          const otherProducts = this.products.filter(p => 
            p.id !== productId && 
            !sameCategoryProducts.some(cp => cp.id === p.id)
          )
          relatedProducts = [
            ...relatedProducts, 
            ...otherProducts.slice(0, limit - relatedProducts.length)
          ]
        }
        
        resolve(relatedProducts.slice(0, limit))
      }, 300)
    })
  }
  
  /**
   * 添加产品到收藏夹
   * @param {Number} productId 产品ID
   * @param {String} userId 用户ID，默认为'default-user'
   * @returns {Promise} 操作结果
   */
  addToFavorites(productId, userId = 'default-user') {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = this.products.find(p => p.id === productId)
        if (!product) {
          reject(new Error('产品不存在'))
          return
        }
        
        // 确保用户在收藏列表中有记录
        if (!this.favorites[userId]) {
          this.favorites[userId] = []
        }
        
        // 检查产品是否已在收藏夹中
        if (this.favorites[userId].includes(productId)) {
          resolve({ success: true, message: '产品已在收藏夹中' })
          return
        }
        
        // 添加到收藏夹
        this.favorites[userId].push(productId)
        resolve({ 
          success: true, 
          message: '已添加到收藏夹',
          favoriteCount: this.favorites[userId].length
        })
      }, 300)
    })
  }
  
  /**
   * 从收藏夹中移除产品
   * @param {Number} productId 产品ID
   * @param {String} userId 用户ID，默认为'default-user'
   * @returns {Promise} 操作结果
   */
  removeFromFavorites(productId, userId = 'default-user') {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 检查用户是否有收藏记录
        if (!this.favorites[userId]) {
          resolve({ success: true, message: '用户没有收藏记录' })
          return
        }
        
        const index = this.favorites[userId].indexOf(productId)
        if (index === -1) {
          resolve({ success: true, message: '产品不在收藏夹中' })
          return
        }
        
        // 从收藏夹移除
        this.favorites[userId].splice(index, 1)
        resolve({ 
          success: true, 
          message: '已从收藏夹移除',
          favoriteCount: this.favorites[userId].length
        })
      }, 300)
    })
  }
  
  /**
   * 检查产品是否已收藏
   * @param {Number} productId 产品ID
   * @param {String} userId 用户ID，默认为'default-user'
   * @returns {Promise} 包含检查结果的Promise
   */
  isFavorite(productId, userId = 'default-user') {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!this.favorites[userId]) {
          resolve(false)
          return
        }
        
        resolve(this.favorites[userId].includes(productId))
      }, 300)
    })
  }
  
  /**
   * 获取用户收藏的所有产品
   * @param {String} userId 用户ID，默认为'default-user'
   * @returns {Promise} 包含收藏产品列表的Promise
   */
  getFavorites(userId = 'default-user') {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!this.favorites[userId] || this.favorites[userId].length === 0) {
          resolve([])
          return
        }
        
        const favoriteProducts = this.products.filter(product => 
          this.favorites[userId].includes(product.id)
        )
        
        resolve(favoriteProducts)
      }, 300)
    })
  }
  
  /**
   * 获取收藏产品总数
   * @param {String} userId 用户ID，默认为'default-user'
   * @returns {Promise} 包含收藏总数的Promise
   */
  getFavoriteCount(userId = 'default-user') {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!this.favorites[userId]) {
          resolve(0)
          return
        }
        
        resolve(this.favorites[userId].length)
      }, 300)
    })
  }
}