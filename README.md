

# shu_tu项目说明

## 一、项目架构
### 前端（Vue 3）
- 框架：Vue 3 + Vite
- 状态管理：Pinia
- 路由：Vue Router
- 组件库：TDesign Mobile Vue
- 语言：TypeScript

### 后端（Express）
- 框架：Express
- 数据库：MongoDB（Mongoose ODM）
- 中间件：CORS、Morgan、Multer（文件上传）

## 二、技术栈概览

| 类别       | 前端                          | 后端                          |
|------------|-------------------------------|-------------------------------|
| 框架       | Vue 3 (Vite)                  | Express                       |
| 状态管理   | Pinia                         | -                             |
| 路由       | Vue Router                    | Express Routing               |
| 数据库     | -                             | MongoDB (Mongoose ^8.13.0)     |
| 中间件     | -                             | CORS、Morgan、Multer          |
| 构建工具   | Vite ^6.2.2                   | -                             |
| 语言       | TypeScript ~5.8.0             | JavaScript (ES6+)              |
| 包管理     | pnpm ^10.6.5                  | npm                           |

## 三、环境要求
### 前端
- Node.js: `^20.16.0`
- pnpm: `^10.6.5`

### 后端
- Node.js: `^14.0.0`（建议同前端版本）
- MongoDB: `^6.0`（本地或远程服务）

## 四、启动指南（前后端分离）

### 1. 前端（Vue）启动
```bash
# 安装依赖
cd frontend/shu-tu-vue
pnpm install

# 开发模式
pnpm dev    # 访问 http://localhost:5173

# 生产构建
pnpm build  # 输出到 dist/ 目录
```

### 2. 后端（Express）启动
```bash
# 安装依赖
cd backend/shu-tu-express
npm install

# 配置数据库（修改  db/db.jss）
  mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);
# 启动服务
npm start    # 监听 http://localhost:3000
```

### 3. 前后端联调
1. 确保后端服务运行在 `3000` 端口
2. 前端修改 `vite.config.ts` 代理配置：
   ```typescript
   export default defineConfig({
     server: {
       proxy: {
         '/api': {
           target: 'http://localhost:3000',
           changeOrigin: true,
           rewrite: (path) => path.replace(/^\/api/, ''),
         },
       },
     },
   });
   ```


### 2. 常用脚本
| 命令          | 说明                     |
|---------------|--------------------------|
| `npm start`   | 启动生产环境服务（3000 端口） |
| `npm run dev` | 开发模式（需配合 Nodemon） |

### 3. 数据库配置
- **本地安装 MongoDB**：
  ```bash
  # 启动 MongoDB 服务
  mongod --dbpath ./data/db

  # 创建数据库
  mongo
  > use shu-tu
  ```

- **远程数据库（示例）**：
  ```javascript
  // db/db.js
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);
  ```

### 4. 接口文档

#### 4.1 接口概述
后端项目采用 Express 框架，使用 MongoDB 作为数据库，并通过 Mongoose ODM 进行操作。全局启用了 CORS 中间件以处理跨域请求，前端请求默认前缀为 `/api`。

#### 4.2 具体接口

| 接口名称 | 请求方法 | 请求路径 | 功能描述 | 依赖中间件 |
| --- | --- | --- | --- | --- |
| 提交书籍售卖信息 | POST | `/api/info/submission` | 用于提交书籍售卖帖子信息，包括书籍标题、内容、ISBN、价格、照片等信息 | - |
| 获取书籍售卖信息 | GET | `/api/infos/gain` | 从数据库中获取 5 条书籍售卖信息 | - |
| 上传本地照片 | POST | `/api/upload` | 用于上传本地照片，可能与书籍售卖帖子中的照片上传相关 | Multer |

#### 4.3 接口详细信息

##### 4.3.1 提交书籍售卖信息
- **请求方法**：POST
- **请求路径**：`/api/info/submission`
- **请求参数**：

| 参数名 | 类型 | 是否必传 | 描述 |
| ---- | ---- | ---- | ---- |
| title | string | 是 | 书籍标题 |
| content | string | 是 | 书籍描述内容 |
| book | string | 是 | 书籍名称 |
| isbn | string | 是 | 书籍 ISBN 号 |
| price | number | 是 | 书籍价格 |
| photo | array | 是 | 书籍照片数组，每个元素包含 `name`、`type` 和 `url` 信息 |
| classification | string | 是 | 书籍分类 |

- **响应数据示例**：
```json
{
    "code": "0000",
    "msg": "提交表单成功",
    "data": {
        // 具体的书籍售卖信息对象
        "title": "示例书籍标题",
        "content": "示例书籍描述内容",
        "book": "示例书籍名称",
        "isbn": "1234567890",
        "price": 99.9,
        "imagePic": [
            {
                "i_name": "照片名称",
                "i_type": "照片类型",
                "i_url": "照片访问地址"
            }
        ],
        "classification": "文学"
    }
}
```
- **错误响应示例**：
```json
{
    "code": "1000",
    "msg": "提交表单失败",
    "data": null
}
```

##### 4.3.2 获取书籍售卖信息
- **请求方法**：GET
- **请求路径**：`/api/infos/gain`
- **请求参数**：无
- **响应数据示例**：
```json
{
    "code": "0000",
    "msg": "获取 5 条 bookbar 成功",
    "data": [
        {
            // 具体的书籍售卖信息对象
            "title": "示例书籍标题 1",
            "content": "示例书籍描述内容 1",
            "book": "示例书籍名称 1",
            "isbn": "1234567890",
            "price": 99.9,
            "imagePic": [
                {
                    "i_name": "照片名称 1",
                    "i_type": "照片类型 1",
                    "i_url": "照片访问地址 1"
                }
            ],
            "classification": "文学"
        },
        // 其他书籍售卖信息对象
    ]
}
```
- **错误响应示例**：
```json
{
    "code": "1001",
    "msg": "获取 bookbar 失败",
    "data": null
}
```

##### 4.3.3 上传本地照片
- **请求方法**：POST
- **请求路径**：`/api/upload`
- **请求参数**：

| 参数名 | 类型 | 是否必传 | 描述 |
| ---- | ---- | ---- | ---- |
| file | file | 是 | 要上传的照片文件 |

- **响应数据示例**：
```json
{
    "url": "http://localhost:3000/uploads/1630738200000-123456789-image.jpg"
}
```
- **错误响应示例**：
```json
{
    "message": "没有文件被上传"
}
```

#### 4.4 跨域配置
已全局启用 CORS 中间件，允许前端跨域访问后端接口。在后端代码中通过 `app.use(cors())` 进行配置。

## 五、完整启动流程（前后端）

1. **克隆项目**：
   ```bash
   git clone <repository-url>
   cd shu-tu
   ```

2. **安装依赖**：
   ```bash
   # 前端
   cd frontend/shu-tu-vue
   pnpm install

   # 后端
   cd ../shu-tu-express
   npm install
   ```

3. **启动服务**：
   ```bash
   # 后端
   cd backend/shu-tu-express
   npm start

   # 前端
   cd frontend/shu-tu-vue
   pnpm dev
   ```

