

# shu-tu项目说明

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

# 配置数据库（修改 config/db.js）
MONGO_URI=mongodb://localhost:27017/shu-tu

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

## 五、后端详细说明

### 1. 目录结构
```
backend/shu-tu-express/
├── app.js          # 应用入口
├── bin/
│   └── www       # 启动脚本
├── config/
│   └── db.js     # 数据库配置
├── models/        # Mongoose 模型
├── routes/        # 路由定义
├── public/        # 静态资源（Jade 模板）
├── views/         # Jade 视图（可选）
└── package.json   # 依赖配置
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
  // config/db.js
  module.exports = {
    mongoURI: process.env.MONGO_URI || 'mongodb+srv://<user>:<pass>@cluster.example.mongodb.net/shu-tu',
  };
  ```

### 4. 接口文档（示例）
- **用户注册**：`POST /api/users/register`
- **文件上传**：`POST /api/files/upload`（使用 Multer）
- **跨域配置**：已全局启用 CORS（`app.use(cors())`）

## 六、完整启动流程（前后端）

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

