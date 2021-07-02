import * as MDAST from "mdast";

import { Note } from "./Note";

export default function createLinkMap(notes: Note[]) {
  const linkMap: Map<string, Map<string, MDAST.BlockContent[]>> = new Map();
  for (const note of notes) {
    for (const link of note.links) {
      const targetTitle = link.targetTitle;
      let backlinkEntryMap = linkMap.get(targetTitle);
      if (!backlinkEntryMap) {
        backlinkEntryMap = new Map();
        linkMap.set(targetTitle, backlinkEntryMap);
      }
      const context = []; //MT hackz, see below
      backlinkEntryMap.set(note.title, context);
      // MT: Do not include context, just want a very simple backlinks listing
      /*
      let contextList = backlinkEntryMap.get(note.title);
      if (!contextList) {
        contextList = [];
        backlinkEntryMap.set(note.title, contextList);
      }
      if (link.context) {
        contextList.push(link.context);
      }
      */
    }
  }

  return linkMap;
}
