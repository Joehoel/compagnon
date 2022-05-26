import { Client } from "@notionhq/client";

export const notion = new Client({ auth: process.env.NOTION_KEY });

// Generated by https://quicktype.io

export interface Page {
    object: string;
    id: string;
    created_time: string;
    last_edited_time: string;
    created_by: TedBy;
    last_edited_by: TedBy;
    cover: null;
    icon: null;
    parent: Parent;
    archived: boolean;
    properties: Properties;
    url: string;
}

export interface TedBy {
    object: string;
    id: string;
}

export interface Parent {
    type: string;
    database_id: string;
}

export interface Properties {
    Tags: Tags;
    Name: Name;
}

export interface Name {
    id: string;
    type: string;
    title: null[];
}

export interface Tags {
    id: string;
    type: string;
    multi_select: any[];
}

// async function addItem(text: String) {
//     try {
//         const response = await notion.pages.create({
//             parent: { database_id: id },
//             properties: {
//                 title: {
//                     title: [
//                         {
//                             text: {
//                                 content: text,
//                             },
//                         },
//                     ],
//                 },
//             },
//         });
//         console.log(response);
//         console.log("Success! Entry added.");
//     } catch (error) {
//         console.error(error.body);
//     }
// }

// addItem("Yurts in Big Sur, California");