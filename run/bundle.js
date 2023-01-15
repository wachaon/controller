const { readFileSync, writeFileSync } = require('filesystem')
const { resolve, relative, basename } = require('pathname')
const bundle = require('bundle')
const { rCR } = require('text')
const { filter } = require('utility')
const genGUID = require('genGUID')

const AUTO = 'auto'

const spec_keyboard = resolve(__dirname, 'keyboard.cs')
const spec_mouse = resolve(__dirname, 'mouse.cs')
const spec_bundle = resolve(__dirname, 'bundle.js')

const CSharp = {
    [genGUID()]: {
        source: readFileSync(spec_keyboard, AUTO).replace(rCR, ''),
        path: `{${basename(process.cwd())}}/${relative(process.cwd(), spec_keyboard)}`
    },
    [genGUID()]: {
        source: readFileSync(spec_mouse, AUTO).replace(rCR, ''),
        path: `{${basename(process.cwd())}}/${relative(process.cwd(), spec_mouse)}`
    }
}

bundle()

const BUNDLE = resolve(process.cwd(), 'bundle.json')

let pkg = JSON.parse(readFileSync(BUNDLE, AUTO))
pkg = Object.assign(pkg, CSharp)
pkg = filter(pkg, (id) => {
    return id.path !== `{${basename(process.cwd())}}/${relative(process.cwd(), spec_bundle)}`
})

console.log('finishd %O', writeFileSync(BUNDLE, JSON.stringify(pkg, null, 4), 'UTF-8'))