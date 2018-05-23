const fs = require('fs')

const modelCodes = {
	'A1219': {code: 'A1219', name: "iPad", aka: "iPad 1"},
	'A1337': {code: 'A1337', name: "iPad", aka: "iPad 1", sim: true},
	'A1395': {code: 'A1395', name: "iPad 2",},
	'A1396': {code: 'A1396', name: "iPad 2", sim: true},
	'A1397': {code: 'A1397', name: "iPad 2", sim: true},
	'A1416': {code: 'A1416', name: "iPad 3", aka: "iPad 3rd generation"},
	'A1430': {code: 'A1430', name: "iPad 3", aka: "iPad 3rd generation", sim: true},
	'A1403': {code: 'A1403', name: "iPad 3", aka: "iPad 3rd generation", sim: true},
	'A1458': {code: 'A1458', name: "iPad 4", aka: "iPad 4th generation"},
	'A1459': {code: 'A1459', name: "iPad 4", aka: "iPad 4th generation", sim: true},
	'A1460': {code: 'A1460', name: "iPad 4", aka: "iPad 4th generation", sim: true},
	'A1432': {code: 'A1432', name: "iPad mini", aka: "iPad mini 1"},
	'A1454': {code: 'A1454', name: "iPad mini", aka: "iPad mini 1", sim: true},
	'A1455': {code: 'A1455', name: "iPad mini", aka: "iPad mini 1", sim: true},
	'A1474': {code: 'A1474', name: "iPad Air", aka: "iPad Air 1"},
	'A1475': {code: 'A1475', name: "iPad Air", aka: "iPad Air 1", sim: true},
	'A1489': {code: 'A1489', name: "iPad mini 2", aka: "iPad mini with Retina Display"},
	'A1490': {code: 'A1490', name: "iPad mini 2", aka: "iPad mini with Retina Display", sim: true},
	'A1566': {code: 'A1566', name: "iPad Air 2",},
	'A1567': {code: 'A1567', name: "iPad Air 2", sim: true},
	'A1599': {code: 'A1599', name: "iPad mini 3",},
	'A1600': {code: 'A1600', name: "iPad mini 3", sim: true},
	'A1538': {code: 'A1538', name: "iPad mini 4",},
	'A1550': {code: 'A1550', name: "iPad mini 4", sim: true},
	'A1584': {code: 'A1584', name: "iPad Pro 12.9in (2015)",},
	'A1652': {code: 'A1652', name: "iPad Pro 12.9in (2015)", sim: true},
	'A1673': {code: 'A1673', name: "iPad Pro 9.7in (2016)",},
	'A1674': {code: 'A1674', name: "iPad Pro 9.7in (2016)", sim: true},
	'A1675': {code: 'A1675', name: "iPad Pro 9.7in (2016)", sim: true},
	'A1701': {code: 'A1701', name: "iPad Pro 10.5in (2017)", aka: "iPad Pro 2nd generation"},
	'A1709': {code: 'A1709', name: "iPad Pro 10.5in (2017)", aka: "iPad Pro 2nd generation", sim: true},
	'A1670': {code: 'A1670', name: "iPad Pro 12.9in (2017)", aka: "iPad Pro 12.9in 2nd generation"},
	'A1671': {code: 'A1671', name: "iPad Pro 12.9in (2017)", aka: "iPad Pro 12.9in 2nd generation", sim: true},
	'A1822': {code: 'A1822', name: "iPad 9.7in (2017)", aka: "iPad, iPad 2017 or iPad 5th generation"},
	'A1823': {code: 'A1823', name: "iPad 9.7in (2017)", aka: "iPad, iPad 2017 or iPad 5th generation", sim: true},
	'A1893': {code: 'A1893', name: "iPad 6", sim: true},
	'A1954': {code: 'A1954', name: "iPad 6", sim: true},
}

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
	for (let code in modelCodes) {
		options = modelCodes[code]
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
