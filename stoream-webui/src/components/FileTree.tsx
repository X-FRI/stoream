import { Tree } from "@geist-ui/core"
import { t as Folder } from "../model/FileTree.gen.tsx"

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

const FileTree = ({content}) => {
    return (
        <>
            <Tree>
                {mapFolder(content)}
            </Tree>
        </>
    )
}

export default FileTree