### 效果图

![](https://github.com/yangxin9527/translate/raw/master/result.gif)

![](https://github.com/yangxin9527/translate/raw/master/result2.gif)


> 用了一段时间tampermonkey 的 iciba翻译，
> 原作者：https://noe132.com。
> 感觉还可以优化下，参考思路，自己写了一个。

## 还可以优化（有时间在玩吧 - -！）

1. 优化整体代码，丢到油猴上面 ---------------可做
2. 增加播放读音功能 ------------------------可做
3. 查询功能 -------------------------------可做（很蠢）
4. 倒叙查询，最多查询数量限制（100条）-------可做
5. 批量删除 -------------------------------可做
6. 同步谷歌账户，同一账户，不同平台通用
7. 单词去重 -------------------------------可做


```
    还有很多小地方需要优化

    如果查询的的中文，不发请求或者做判断
    查询时去掉头尾空格
    开关功能优化，让用户开关时能在当前页面有提示。
    
    
    还可以增加很多功能：

    保存格式可以为excel和pdf，便于阅读
    每次收藏单词不光记录单词，还可以记录一整句话在表格中，便于记忆
    去重功能改为显示收藏次数，有的单词重复收藏，表示自己掌握不够
```


## 2017/09/07 功能全部实现


## 2017/09/06 发现之前真的很蠢，现在使用消息传递.开关功能完成，显示效果还需优化。查词功能改进为消息传递，不监听cookie.

#### 还需完成

- 开关效果优化
- 收藏功能改进
- 句子查询收藏改进


## 2017/09/05  导出excel优化，增加删除 开关按钮，css样式优化

#### 还需完成

- 开关功能
- 句子保存

## 2017/09/01  导出excel完成，所有域名下更改translateJson 都会产生一个生词

#### 还需完成

- 开关功能需要优化，现在每个页面开关都是单独判断
- 句子保存做何处理，干脆短句不能收藏
- 监听cookie方法还需优化
- css样式优化
- 是否需要删除功能

## 2017/09/01  Alt+t切换开关功能

#### 还需完成

- 收藏功能，为了让popup.html能获取收藏内容，
```
    2种方式：
    1. cookies 存本地locastorage（主分支开发）

    2. chrome.storage 存谷歌浏览器上，可以同步设备，只要同一账户，都可以同步。（更好，在分支storage-sync开发）
```
- 可以导出为excel。excel 遍历所有cookie，按域名分类。



## 2017/08/29 定位完成

#### 还需完成

- 增加开关功能 Alt+t切换
- 发声，播放功能 http://web.jobbole.com/91132/




## 2017/08/26 放弃iciba的api,文档太烂，不全。使用有道智云的api。基本翻译功能完成

#### 还需完成

- 增加开关功能 Alt+t切换
- 现在在屏幕边缘会有bug。定位问题，判断边界


### 最初想法：

1. 翻译
2. 保存
3. 添加笔记