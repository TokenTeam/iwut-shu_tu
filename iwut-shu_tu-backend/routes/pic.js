const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router =express.Router()


// 创建存放上传文件的目录
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// 配置存储方式
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// 提供静态资源访问，使得上传后的图片可以通过 http://localhost:3000/uploads/... 访问
router.use('/uploads', express.static(uploadDir));

// 处理单文件上传
router.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: '没有文件被上传' });
  }
  // 返回符合官方格式的 JSON 结构
  res.json({
    url: `http://localhost:3000/uploads/${req.file.filename}`,
  });
});

module.exports = router
// app.listen(3000, () => {
//   console.log('Server is running at http://localhost:3000');
// });
