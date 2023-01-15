# controller
Keyboard, Mouse and Window Operations

*wsh (Windows Script Host)* では操作出来ない、キーボードとマウスの操作を可能にします。

## install

```shell
wes install @wachaon/controller --bare
```

## usage

```javascript
const {pos, send, VK_RETURN} = require('controller')

const move = [
    [100, 100],
    [100, 200],
    [200, 200],
    [200, 100],
    [100, 100],
    [300, 300]
]

move.forEach(position => {
    pos.apply(null, position)
})

send('echo finishd!')
send(VK_RETURN)
```

| method | param | description |
|:----|:---:|:----|
| pos | `{number} x,`<br>`{number} y ` | マウスポインタを移動する(絶対位置) |
| click | - | マウスクリック |
| leftDown | `{number} x,`<br>`{number} y ` | マウスの左ボタンを押す(相対位置) |
| leftUp | `{number} x,`<br>`{number} y ` | マウスの左ボタンを離す(相対位置) |
| rightClick | - | 右クリック |
| rightDown | `{number} x,`<br>`{number} y ` | マウスの右ボタンを押す(相対位置) |
| rightUp | `{number} x,`<br>`{number} y ` | マウスの右ボタンを離す(相対位置) |
| send | `{number|string} keyCode` | `keyCode` が数値なら仮想キーコードを文字列ならその文字列を `SendKeys()` します |
| press | `{number} keyCode` | 仮想キーコードのキーを押す |
| release | `{number} keyCode` | 仮想キーコードのキーを離す |

## 仮想キーコードの表示

通常の `SendKey()` では送れないキーも仮想キーコードで操作できます。
仮想キーコードは以下のコードで表示できます。

```javascript
const controller = require('controller')
console.log('%O', controller)
```

## コンパイル
*@wachaon/controller* は *powershell* から *C#* を逐次評価して実行します。
*C#* をコンパイルすることで、逐次評価分の実行時間を短縮できます。

```shell
wes controller/run/compile
```

を実行すると *mouse.exe* *keyboard.exe* をコンパイルします。
*mouse.exe* *keyboard.exe* があると *@wachaon/controller* は優先してそれを使用します。
コンパイル後、最初のサンプルを実行すると実行時間の違いが理解できる筈です。