# Vue 3 + TypeScript + Vite + Vant

## 初始化
yarn
yarn dev
## 打包
yarn build
运行打包的代码 serve -s dist 


## 部署
1. 打包 yarn build 
2. docker构建 docker build -t='block-chain-mobile' .
3. 本地运行，校验是否能运行
4. dockerhub 创建仓库
5. 给镜像打标签 docker tag xxx liyong1949/block-chain-mobile:latest (xxx表示镜像ID)
6. 推送到仓库 docker push liyong1949/block-chain-mobile:latest
7. 登录服务器 登录dockerhub
8. 拉取镜像 docker pull block-chain-mobile:latest
9. 查看是否已有该镜像运行的实例，若有执行停止 docker stop xxx，删除 docker rm xxx
10. 运行 docker run -d -p 80:80 --name block-chain-mobile liyong1949/block-chain-mobile:latest