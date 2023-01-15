const WShell = require('WScript.Shell')
const compile = require('./run/compile.js')
const ps = require('ps')
const { resolve } = require('pathname')
const { readFileSync, existsFileSync } = require('filesystem')
const { isNumber, isString } = require('typecheck')

const mouse_exe = resolve(__dirname, '../mouse.exe')
const exists_mouse_exe = existsFileSync(mouse_exe)
const keyboard_exe = resolve(__dirname, '../keyboard.exe')
const exists_keyboard_exe = existsFileSync(keyboard_exe)


const mouse = `$Source = @"
${readFileSync(resolve(__dirname, 'run/mouse.cs'), 'auto')}"@

Add-Type -Language CSharp -TypeDefinition $Source
[MouseSimulator]::Main($args[0], $args[1], $args[2])`

const pos = function mouse_pos(x = 0, y = 0) {
    // x と y は絶対値。
    if (exists_mouse_exe) WShell.Exec(`${mouse_exe} pos ${x} ${y}`)
    ps(mouse, ['pos', x, y])
}

const click = function mouse_click(x = 0, y = 0) {
    // x と y は絶対値ではなく、相対値になることに注意する。
    if (exists_mouse_exe) WShell.Exec(`${mouse_exe} click ${x} ${y}`)
    ps(mouse, ['click', x, y])
}

const leftDown = function mouse_leftDown(x = 0, y = 0) {
    // x と y は絶対値ではなく、相対値になることに注意する。
    if (exists_mouse_exe) WShell.Exec(`${mouse_exe} leftDown ${x} ${y}`)
    ps(mouse, ['leftDown', x, y])
}

const leftUp = function mouse_leftUp(x = 0, y = 0) {
    // x と y は絶対値ではなく、相対値になることに注意する。
    if (exists_mouse_exe) WShell.Exec(`${mouse_exe} leftUp ${x} ${y}`)
    ps(mouse, ['leftUp', x, y])
}

const rightClick = function mouse_rightClick(x = 0, y = 0) {
    // x と y は絶対値ではなく、相対値になることに注意する。
    if (exists_mouse_exe) WShell.Exec(`${mouse_exe} rightClick ${x} ${y}`)
    ps(mouse, ['rightClick', x, y])
}

const rightDown = function mouse_rightDown(x = 0, y = 0) {
    // x と y は絶対値ではなく、相対値になることに注意する。
    if (exists_mouse_exe) WShell.Exec(`${mouse_exe} rightDown ${x} ${y}`)
    ps(mouse, ['rightDown', x, y])
}
const rightUp = function mouse_rightUp(x = 0, y = 0) {
    // x と y は絶対値ではなく、相対値になることに注意する。
    if (exists_mouse_exe) WShell.Exec(`${mouse_exe} rightUp ${x} ${y}`)
    ps(mouse, ['rightUp', x, y])
}

const keyboard = `$Source = @"
${readFileSync(resolve(__dirname, 'run/keyboard.cs'), 'auto')}"@

Add-Type -Language CSharp -TypeDefinition $Source
[KeyboardSimulator]::Main($args[0], $args[1])`

// console.log('[keyboard]: \n%S', keyboard)

const send = function keyboard_send(keyCode) {
    if (isString(keyCode)) WShell.SendKeys(keyCode)
    if (isNumber(keyCode)) {
        if (exists_keyboard_exe) WShell.Exec(`${keyboard_exe} send ${keyCode}`)
        else ps(keyboard, ['send', keyCode])
    }
}

const press = function keyboard_press(keyCode) {
    if (exists_keyboard_exe) WShell.Exec(`${keyboard_exe} press ${keyCode}`)
    if (isNumber(keyCode)) ps(keyboard, ['press', keyCode])
}

const release = function keyboard_release(keyCode) {
    if (exists_keyboard_exe) WShell.Exec(`${keyboard_exe} release ${keyCode}`)
    if (isNumber(keyCode)) ps(keyboard, ['release', keyCode])
}


module.exports = {
    send,
    press,
    release,
    pos,
    click,
    leftDown,
    leftUp,
    rightClick,
    rightDown,
    rightUp,
    compile,
    VK_LBUTTON: 0x01, // マウスの左ボタン
    VK_RBUTTON: 0x02, // マウスの右ボタン
    VK_CANCEL: 0x03, // Ctrl+Break処理
    VK_MBUTTON: 0x04, // 3ボタンマウスの真ん中ボタン
    VK_XBUTTON1: 0x05, // マウスのX1ボタン
    VK_XBUTTON2: 0x06, // マウスのX2ボタン
    VK_BACK: 0x08, // BackSpaceキー
    VK_TAB: 0x09, // Tabキー
    VK_CLEAR: 0x0C, // Clearキー
    VK_RETURN: 0x0D, // Enterキー
    VK_SHIFT: 0x10, // シフトキー
    VK_CONTROL: 0x11, // Ctrlキー
    VK_MENU: 0x12, // Altキー
    VK_PAUSE: 0x13, // Pauseキー
    VK_CAPITAL: 0x14, // CapsLockキー
    VK_KANA: 0x15, // IME カナモード
    VK_HANGEUL: 0x15, // IME Hanguel mode (maintained for compatibility; use VK_HANGUL)
    VK_HANGUL: 0x15, // IME Hangul mode
    VK_JUNJA: 0x17, // IME Junja mode
    VK_FINAL: 0x18, // IME final mode
    VK_HANJA: 0x19, // IME Hanja mode
    VK_KANJI: 0x19, // IME 漢字モード
    VK_ESCAPE: 0x1B, // Escキー
    VK_CONVERT: 0x1C, // IME変換
    VK_NONCONVERT: 0x1D, // IME無変換
    VK_ACCEPT: 0x1E, // IME accept
    VK_MODECHANGE: 0x1F, // IME mode change request
    VK_SPACE: 0x20, // スペースキー
    VK_PRIOR: 0x21, // Page Upキー
    VK_NEXT: 0x22, // Page Downキー
    VK_END: 0x23, // Endキー
    VK_HOME: 0x24, // Homeキー
    VK_LEFT: 0x25, // カーソルキー左
    VK_UP: 0x26, // カーソルキー上
    VK_RIGHT: 0x27, // カーソルキー右
    VK_DOWN: 0x28, // カーソルキー下
    VK_SELECT: 0x29, // Selectキー
    VK_PRINT: 0x2A, // Printキー
    VK_EXECUTE: 0x2B, // Executeキー
    VK_SNAPSHOT: 0x2C, // Print Screenキー
    VK_INSERT: 0x2D, // Insertキー
    VK_DELETE: 0x2E, // Deleteキー
    VK_HELP: 0x2F, // Helpキー
    VK_0: 0x30, // 0キー
    VK_1: 0x31, // 1キー
    VK_2: 0x32, // 2キー
    VK_3: 0x33, // 3キー
    VK_4: 0x34, // 4キー
    VK_5: 0x35, // 5キー
    VK_6: 0x36, // 6キー
    VK_7: 0x37, // 7キー
    VK_8: 0x38, // 8キー
    VK_9: 0x39, // 9キー
    VK_A: 0x41, // Aキー
    VK_B: 0x42, // Bキー
    VK_C: 0x43, // Cキー
    VK_D: 0x44, // Dキー
    VK_E: 0x45, // Eキー
    VK_F: 0x46, // Fキー
    VK_G: 0x47, // Gキー
    VK_H: 0x48, // Hキー
    VK_I: 0x49, // Iキー
    VK_J: 0x4A, // Jキー
    VK_K: 0x4B, // Kキー
    VK_L: 0x4C, // Lキー
    VK_M: 0x4D, // Mキー
    VK_N: 0x4E, // Nキー
    VK_O: 0x4F, // Oキー
    VK_P: 0x50, // Pキー
    VK_Q: 0x51, // Qキー
    VK_R: 0x52, // Rキー
    VK_S: 0x53, // Sキー
    VK_T: 0x54, // Tキー
    VK_U: 0x55, // Uキー
    VK_V: 0x56, // Vキー
    VK_W: 0x57, // Wキー
    VK_X: 0x58, // Xキー
    VK_Y: 0x59, // Yキー
    VK_Z: 0x5A, // Zキー
    VK_LWIN: 0x5B, // 左Windowsキー
    VK_RWIN: 0x5C, // 右Windowsキー
    VK_APPS: 0x5D, // アプリケーションキー
    VK_SLEEP: 0x5F, // スリープキー
    VK_NUMPAD0: 0x60, // テンキー0
    VK_NUMPAD1: 0x61, // テンキー1
    VK_NUMPAD2: 0x62, // テンキー2
    VK_NUMPAD3: 0x63, // テンキー3
    VK_NUMPAD4: 0x64, // テンキー4
    VK_NUMPAD5: 0x65, // テンキー5
    VK_NUMPAD6: 0x66, // テンキー6
    VK_NUMPAD7: 0x67, // テンキー7
    VK_NUMPAD8: 0x68, // テンキー8
    VK_NUMPAD9: 0x69, // テンキー9
    VK_MULTIPLY: 0x6A, // *キー
    VK_ADD: 0x6B, // +キー
    VK_SEPARATOR: 0x6C, // Separator key
    VK_SUBTRACT: 0x6D, // -キー
    VK_DECIMAL: 0x6E, // . キー
    VK_DIVIDE: 0x6F, // /キー
    VK_F1: 0x70, // F1キー
    VK_F2: 0x71, // F2キー
    VK_F3: 0x72, // F3キー
    VK_F4: 0x73, // F4キー
    VK_F5: 0x74, // F5キー
    VK_F6: 0x75, // F6キー
    VK_F7: 0x76, // F7キー
    VK_F8: 0x77, // F8キー
    VK_F9: 0x78, // F9キー
    VK_F10: 0x79, // F10キー
    VK_F11: 0x7A, // F11キー
    VK_F12: 0x7B, // F12キー
    VK_F13: 0x7C, // F13キー
    VK_F14: 0x7D, // F14キー
    VK_F15: 0x7E, // F15キー
    VK_F16: 0x7F, // F16キー
    VK_F17: 0x80, // F17キー
    VK_F18: 0x81, // F18キー
    VK_F19: 0x82, // F19キー
    VK_F20: 0x83, // F20キー
    VK_F21: 0x84, // F21キー
    VK_F22: 0x85, // F22キー
    VK_F23: 0x86, // F23キー
    VK_F24: 0x87, // F24キー
    VK_NUMLOCK: 0x90, // NumLockキー
    VK_SCROLL: 0x91, // ScrollLockキー
    VK_LSHIFT: 0xA0, // 左シフトキー
    VK_RSHIFT: 0xA1, // 右シフトキー
    VK_LCONTROL: 0xA2, // 左Ctrlキー
    VK_RCONTROL: 0xA3, // 右Ctrlキー
    VK_LMENU: 0xA4, // 左Altキー
    VK_RMENU: 0xA5, // 右Altキー
    VK_BROWSER_BACK: 0xA6, // ブラウザ戻るキー
    VK_BROWSER_FORWARD: 0xA7, // ブラウザ進むキー
    VK_BROWSER_REFRESH: 0xA8, // ブラウザ更新キー
    VK_BROWSER_STOP: 0xA9, // ブラウザ停止キー
    VK_BROWSER_SEARCH: 0xAA, // ブラウザサーチキー
    VK_BROWSER_FAVORITES: 0xAB, // ブラウザお気に入りキー
    VK_BROWSER_HOME: 0xAC, // ブラウザHomeキー
    VK_VOLUME_MUTE: 0xAD, // ボリューム無音キー
    VK_VOLUME_DOWN: 0xAE, // ボリューム低下キー
    VK_VOLUME_UP: 0xAF, // ボリューム上昇キー
    VK_MEDIA_NEXT_TRACK: 0xB0, // メディア次トラックキー
    VK_MEDIA_PREV_TRACK: 0xB1, // メディア前トラックキー
    VK_MEDIA_STOP: 0xB2, // メディア停止キー
    VK_MEDIA_PLAY_PAUSE: 0xB3, // メディア再生／一時停止キー
    VK_LAUNCH_MAIL: 0xB4, // メール起動キー
    VK_LAUNCH_MEDIA_SELECT: 0xB5, // メディア選択キー
    VK_LAUNCH_APP1: 0xB6, // 起動キー1
    VK_LAUNCH_APP2: 0xB7, // 起動キー2
    VK_ICO_HELP: 0xE3, // ?
    VK_ICO_00: 0xE4, // ?
    VK_PROCESSKEY: 0xE5, // IME PROCESS key
    VK_ICO_CLEAR: 0xE6, // ?
    VK_PACKET: 0xE7, // 詳細はMSDN参照
    VK_OEM_RESET: 0xE9, // OEM定義キー
    VK_OEM_JUMP: 0xEA, // OEM定義キー
    VK_OEM_PA1: 0xEB, // OEM定義キー
    VK_OEM_PA2: 0xEC, // OEM定義キー
    VK_OEM_PA3: 0xED, // OEM定義キー
    VK_OEM_WSCTRL: 0xEE, // OEM定義キー
    VK_OEM_CUSEL: 0xEF, // OEM定義キー
    VK_OEM_ATTN: 0xF0, // OEM定義キー
    VK_OEM_FINISH: 0xF1, // OEM定義キー
    VK_OEM_COPY: 0xF2, // OEM定義キー
    VK_OEM_AUTO: 0xF3, // OEM定義キー
    VK_OEM_ENLW: 0xF4, // OEM定義キー
    VK_OEM_BACKTAB: 0xF5, // OEM定義キー
    VK_ATTN: 0xF6, // Attn key
    VK_CRSEL: 0xF7, // CrSel key
    VK_EXSEL: 0xF8, // ExSel key
    VK_EREOF: 0xF9, // Erase EOF key
    VK_PLAY: 0xFA, // Play key
    VK_ZOOM: 0xFB, // Zoom key
    VK_NONAME: 0xFC, // Reserved
    VK_PA1: 0xFD, // PA1 key
    VK_OEM_CLEAR: 0xFE, // Clear key
}