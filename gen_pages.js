const fs = require('fs')
const ipadsData = require('./ipads.json')

const readFile = (path, opts = 'utf8') =>
    new Promise((res, rej) => {
        fs.readFile(path, opts, (err, data) => {
            if (err) rej(err)
            else res(data)
        })
    })

const writeFile = (path, data, opts = 'utf8') =>
    new Promise((res, rej) => {
        fs.writeFile(path, data, opts, (err) => {
            if (err) rej(err)
            else res()
        })
    })


function genTemplate (options) {
	return `---
layout: page
title: ${options.code} - ${options.name}
permalink: /${options.code}/
model_name: ${options.name}
aka: ${options.aka}
code: ${options.code}
sim: ${options.sim}
---
`
}


async function main () {
	for (let code in ipadsData) {
		options = ipadsData[code]
		options.aka = options.aka || ''
		var template = genTemplate(options)
		var filename = `./ipads/${code}.md`
		await writeFile(filename, template)
		console.log('wrote', filename)
	}
}

main()
// 1. one html page to determine ipad
// 2. one html page per ipad with configured products some are the same
