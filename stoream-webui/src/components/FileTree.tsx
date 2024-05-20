import { Tree } from "@geist-ui/core"
import { RequestPath } from "../model/FileTree.gen.tsx"
import { t as Folder } from "../model/FileTree.gen.tsx"
import React, { useState } from "react"

const mapFolder = (folder: Folder) => {
    if (folder.sub === undefined) {
        return <Tree.Folder name={folder.name} onClick={() => console.log(folder.path)} />
    } else {
        const subFolder = folder.sub.map(mapFolder)
        return (
            <Tree.Folder name={folder.name}>
                {subFolder}
            </Tree.Folder>
        )
    }
}

const FileTree = () => {
    const [content, setContent] = useState(null)
    React.useEffect(() => {
        RequestPath.request("").then(content => {
            setContent(content)
            setContent(mapFolder(content))
    })
    }, [content])

    return (
        <>
            <Tree>
                {content}
            </Tree>
        </>
    )
}

export default FileTree