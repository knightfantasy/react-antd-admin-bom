# React-AntD-Admin-Bom 🚀

### 平台简介

基于 React18、vite5、React-Router v6、TypeScript、Ant-Design 实现的一套简单易用的物料管理系统。包含了物料管理，库存管理，生产计划，进出库日志等功能。这是我学习React后重构了原vue3项目，开源了其中一些核心功能，也可为初学react+vite+antd技术栈开发admin后台提供一些参考。

### 在线预览

演示地址：http://101.43.116.64:8080/

### 功能模块

- **物料管理**：管理电子元器件，PCBA，备件，产品，包含供应商，采购价格，PCBA或产品关联BOM清单，显示预估价格，显示库存。
- **库存管理**：管理电子元器件，备件，产品的库存，显示进出库日志，是否达到库存警戒线。
- **生产计划**：提交备件，PCBA，产品的生产计划，可自动根据BOM清单及当前库存判断原材料是否满足生产数量。

### 技术栈

- **React 18**：比VUE3少了很多语法，根本没有传闻的那么难。
- **Vite 5**：给我一个新项目不用vite的理由。
- **TypeScript**：一直都不想学TS，但最终还是加入了。
- **Zustand**：和VUE3的Pinia写法很像。
- **Ant Design v5**：学React就是为了用上AntD
- **UnoCSS**：让我不再害怕CSS。
- **ahooks**: 减少自己写重复代码。

### 项目截图
#### 1、元器件管理：
![part](https://github.com/knightfantasy/react-antd-admin-bom/blob/master/images/part.png)

#### 2、PCBA备件管理：
![pcba](https://github.com/knightfantasy/react-antd-admin-bom/blob/master/images/pcba.png)

#### 3、BOM管理：
![BOM](https://github.com/knightfantasy/react-antd-admin-bom/blob/master/images/bom.png)

#### 4、产品管理：
![product](https://github.com/knightfantasy/react-antd-admin-bom/blob/master/images/product.png)

#### 5、库存管理：
![inventory](https://github.com/knightfantasy/react-antd-admin-bom/blob/master/images/inventory.png)

#### 6、生产计划管理：
![product-plan](https://github.com/knightfantasy/react-antd-admin-bom/blob/master/images/plan.png)

### 提交格式
- feat: 新增功能
- fix: 修复 bug
- docs: 仅仅修改了文档，比如 README, CHANGELOG 等等
- test: 增加/修改测试用例，包括单元测试、集成测试等
- style: 修改了空行、缩进格式、引用包排序等等（不改变代码逻辑）
- perf: 优化相关内容，比如提升性能、体验、算法等
- refactor: 代码重构，「没有新功能或者 bug 修复」
- chore: 改变构建流程、或者增加依赖库、工具等
- revert: 回滚到上一个版本
- merge: 代码合并

如有问题请联系

- QQ：621858598
- 微信：jiangrunfeng
