import Tree from "@geist-ui/core/esm/tree/tree"

const Folders = () => {
    /*
    -bin
      |-subBin
      |-subDocs
    -docs
    */
    const folderTree = [
        {
            name: 'bin',
            path: '/bin',
            sub: [
                { name: 'subBin', path: '/bin/subBin' },
                { name: 'subDocs', path: '/bin/subDocs' },
            ]
        },
        { name: 'docs', path: '/docs' },
    ]

    const handleClick = (path) => {
        console.log(path)
        // window.location.href = `/${path}`
        window.location.href = `/`
    }

    const mapFolder = (folder) => {
        if (folder.sub === undefined) {
            return <Tree.Folder name={folder.name} onClick={() => handleClick(folder.path)} />
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