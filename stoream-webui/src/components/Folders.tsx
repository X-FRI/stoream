import { Tree } from "@geist-ui/core"

const Folders = () => {
    /*
    -bin
      |-subBin
      |-subDocs
    -docs
    */
    const folderTree = [
        {
            name: 'Home',
            path: '/bin',
            sub: [
                { name: 'Document', path: '/bin/subBin', sub : [
                    { name: 'Books', path: '/bin/subBin'}
                ] },
                { name: 'Test', path: '/bin/subDocs' },
            ]
        },
        { name: 'docs', path: '/docs' },
    ]

    const mapFolder = (folder) => {
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
    const content = folderTree.map(mapFolder)
    return (
        <>
            <Tree>
                {content}
            </Tree>
        </>
    )
}

export default Folders