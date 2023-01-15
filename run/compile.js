const WShell = require('WScript.Shell')
const { toPosixSep, toWin32Sep, resolve } = require('pathname')
const { existsFileSync } = require('filesystem')
const isCLI = require('isCLI')

if (isCLI(__filename)) compile()
else module.exports = compile

function compile() {
    const specs = ['keyboard', 'mouse']

    let CSharp = specs.map(spec => {
        return {
            key: spec + '.exe',
            path: toWin32Sep(resolve(__dirname, spec + '.cs'))
        }
    })

    const versions = [
        "v4.0.30319",
        "V3.5",
        "V3.0",
        "v2.0.50727",
        "v1.1.4322",
        "v1.0.3705"
    ]

    const exe = versions.map(ver => {
        return resolve(
            toPosixSep(WShell.ExpandEnvironmentStrings("%SystemRoot%")),
            "Microsoft.NET/Framework",
            ver,
            "csc.exe"
        )
    }).find(ex => existsFileSync(ex))

    CSharp.forEach(cs => {
        const command = `${toWin32Sep(exe)} /target:exe /out:${cs.key} ${cs.path}`
        //console.log('%O', command)
        const exec = WShell.Exec(command)
        while (!exec.StdOut.AtEndOfStream) console.log(exec.StdOut.ReadLine())
        while (!exec.StdErr.AtEndOfStream) console.error(exec.StdErr.ReadAll())
    })
}
