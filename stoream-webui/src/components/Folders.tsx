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
            sub: [
                {
                    name: 'Document', path: '/bin/subBin', sub: [
                        { name: 'Books', path: '/bin/subBin' }
                    ]
                },
                { name: 'Videos' },
                { name: 'Pictures' },
                { name: 'Workspace' },
                { name: 'Applications' },
                { name: 'Music' },
                { name: 'Mail' }
            ]
        },
        { name: 'User' },
        { name: 'Softwares' },

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