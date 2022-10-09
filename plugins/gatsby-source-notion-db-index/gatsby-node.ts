import type { GatsbyNode, Reporter } from "gatsby"

import { Client } from "@notionhq/client"
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints"

console.log("Plugin loading 🔥")

const fetchPages = async (args: { client: Client; databaseID: string }, reporter: Reporter) => {
	let hasMore = true
	let startCursor: string | null = ""

	const body = {
		page_size: 100,
		start_cursor: undefined as string | undefined,
	}

	const pages: any[] = []

	while (hasMore) {
		if (startCursor) {
			body.start_cursor = startCursor
		}

		try {
			const res: QueryDatabaseResponse = await args.client.databases.query({
				database_id: args.databaseID,
				page_size: 100,
				start_cursor: body.start_cursor,
			})

			startCursor = res.next_cursor
			hasMore = res.has_more

			console.log(res)

			res.results.forEach((page) => {
				console.log(JSON.stringify(page, null, 2))
				pages.push(page)
			})
		} catch (e) {
			reporter.panic(e)
		}
	}

	return pages
}

export const onPreInit: GatsbyNode["onPreInit"] = () => console.log("Loaded gatsby-starter-plugin")

export const onPostBuild: GatsbyNode["onPostBuild"] = async ({ cache }) => {
	await cache.set(`key`, `value`)
	const cachedValue = await cache.get(`key`)
	console.log("cache", cachedValue) // logs `value`
}

export const sourceNodes: GatsbyNode["sourceNodes"] = async (
	{ actions, createContentDigest, createNodeId, reporter },
	options,
) => {
	const { token, databaseId } = options as { token?: string; databaseId?: string }

	console.log(token, databaseId)

	if (!token) {
		reporter.panic("Notion Source - API Token required")
		return
	}

	if (!databaseId) {
		reporter.panic("Notion Source - Target Database-ID required")
		return
	}

	var notion = new Client({ auth: token })

	// const pages = await fetchPages({ client: notion, databaseID: databaseId }, reporter)

	// reporter.format(pages)

	// const pages = await getPages({ token, databaseId }, reporter)
	// pages.forEach((page) => {
	// 	const title = getNotionPageTitle(page)
	// 	const properties = getNotionPageProperties(page)
	// 	console.log("📝", title)
	// 	actions.createNode({
	// 		id: createNodeId(`${NOTION_NODE_TYPE}-${page.id}`),
	// 		title,
	// 		properties,
	// 		archived: page.archived,
	// 		createdAt: page.created_time,
	// 		updatedAt: page.last_edited_time,
	// 		raw: page,
	// 		json: JSON.stringify(page),
	// 		parent: null,
	// 		children: [],
	// 		internal: {
	// 			type: NOTION_NODE_TYPE,
	// 			mediaType: "application/json",
	// 			content: JSON.stringify(page),
	// 			contentDigest: createContentDigest(JSON.stringify(page)),
	// 		},
	// 	})
	// })
}

// const { getPages } = require("./src/notion-api/get-pages")
// const { getNotionPageProperties } = require("./src/transformers/get-page-properties")
// const { getNotionPageTitle } = require("./src/transformers/get-page-title")

// const NOTION_NODE_TYPE = "Notion"
