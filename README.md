用了一段时间tampermonkey 的 iciba翻译，
原作者：https://noe132.com。

感觉还可以优化下，于是自己想写个。
功能还是翻译词句，但可以保存在本地，这样就可以有个生词本，学习更容易。

1.翻译
2.保存
3.添加笔记
- 发声，播放功能 http://web.jobbole.com/91132/(参考，延后再做)
*
显示多个搜索框()

## 2017/08/26 放弃iciba的api,文档太烂，不全。使用有道智云的api。基本翻译功能完成

#### 还需完成

- 增加开关功能 Alt+t切换
- 现在在屏幕边缘会有bug。定位问题，判断边界

## 2017/08/29 定位完成

#### 还需完成

- 增加开关功能 Alt+t切换
- 发声，播放功能 http://web.jobbole.com/91132/

## 2017/09/01  Alt+t切换开关功能

#### 还需完成

- 收藏功能，为了让popup.html能获取收藏内容，
```
    2种方式：
    1. cookies 存本地locastorage（主分支开发）

    2. chrome.storage 存谷歌浏览器上，可以同步设备，只要同一账户，都可以同步。（更好，在分支storage-sync开发）
```
- 可以导出为excel。excel 遍历所有cookie，按域名分类。


## 2017/09/01  导出excel完成，所有域名下更改translateJson 都会产生一个生词

#### 还需完成

- 开关功能需要优化，现在每个页面开关都是单独判断
- 句子保存做何处理，干脆短句不能收藏
- 监听cookie方法还需优化
- css样式优化
- 是否需要删除功能

## 2017/09/05  导出excel优化，增加删除 开关按钮，css样式优化

#### 还需完成

- 开关功能
- 句子保存


## 2017/09/06 发现之前真的很蠢，现在使用消息传递.开关功能完成，显示效果还需优化。查词功能改进为消息传递，不监听cookie.

#### 还需完成

- 开关效果优化
- 收藏功能改进
- 句子查询收藏改进

## 2017/09/07 功能全部实现

#### 还需完成

- 代码优化
- 开关的时候给个提醒
- 倒叙查询，最多数量限制
- 尝试同步账户

### 严重问题

- 在https下的网站不能运行(已经完成)

### 效果图

![Image]("//github.com/yangxin9527/translate/raw/master/result.gif")
![Image]("//github.com/yangxin9527/translate/raw/master/result2.gif")