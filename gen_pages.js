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
title: ${options.name} - ${options.code}
permalink: ${options.permalink}
model_name: ${options.name}
description: "${options.description}"
aka: ${options.aka}
code: ${options.code}
date: ${options.lastmod}
sim: ${options.sim || ''}
keywords: "${options.name}, ${options.code}${options.aka ? ', ' + options.aka : ''}"
---
`
}


function buildSitemapUrl (permalink, priority, lastmod) {
    return `
      <url>
        <loc>https://identifymyipad.com${permalink}</loc>
        <lastmod>${lastmod}</lastmod>
        <priority>${priority}</priority>
      </url>
      <url>
        <loc>http://identifymyipad.com${permalink}</loc>
        <lastmod>${lastmod}</lastmod>
        <priority>${priority}</priority>
      </url>
    `
}

function buildSitemap (content) {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
          xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${content}
    </urlset>`
}

function defaultSitemapUrls () {
  return `
  <url>
    <loc>http://identifymyipad.com/</loc>
    <lastmod>2018-06-03T11:29:50+00:00</lastmod>
    <priority>1.00</priority>
  </url>
  <url>
    <loc>http://identifymyipad.com/about</loc>
    <lastmod>2018-06-03T11:29:50+00:00</lastmod>
    <priority>0.50</priority>
  </url>
  <url>
    <loc>https://identifymyipad.com/</loc>
    <lastmod>2018-06-03T11:29:50+00:00</lastmod>
    <priority>1.00</priority>
  </url>
  <url>
    <loc>https://identifymyipad.com/about</loc>
    <lastmod>2018-06-03T11:29:50+00:00</lastmod>
    <priority>0.50</priority>
  </url>`
}
async function main () {
  let sitemap = defaultSitemapUrls()
  const lastmod = (new Date()).toISOString()

	for (let code in ipadsData) {
		options = ipadsData[code]
		options.aka = options.aka || ''
        options.permalink = `/ipads/${options.name.replace(' ', '-')}-${options.code}/`
        options.lastmod = lastmod
        options.description = `iPad ${options.code} - ${options.name}${options.aka ? ' aka ' + options.aka : ''}. 3 Best compatible iPad cases, pens, chargers and keyboards.`.substring(0, 160)
        let template = genTemplate(options)
        let filename = `./ipads/${code}.md`
        await writeFile(filename, template)
        console.log('wrote', filename)

        let priority = 0.9
        sitemap += buildSitemapUrl(options.permalink, priority, lastmod)
	}

    await writeFile('sitemap.xml', buildSitemap(sitemap))
}



main()
// 1. one html page to determine ipad
// 2. one html page per ipad with configured products some are the same
